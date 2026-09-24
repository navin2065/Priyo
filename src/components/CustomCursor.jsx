import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailerPos, setTrailerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, input, textarea, [data-interactive="true"]')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Smooth trailing interpolation
  useEffect(() => {
    let animationFrame;
    const animateTrailer = () => {
      setTrailerPos((prev) => {
        const dx = pos.x - prev.x;
        const dy = pos.y - prev.y;
        return {
          x: prev.x + dx * 0.2,
          y: prev.y + dy * 0.2,
        };
      });
      animationFrame = requestAnimationFrame(animateTrailer);
    };
    animationFrame = requestAnimationFrame(animateTrailer);
    return () => cancelAnimationFrame(animationFrame);
  }, [pos]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Smooth Trailing Ring with subtle Akka & Thambi pill */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out select-none flex items-center gap-1.5"
        style={{
          transform: `translate3d(${trailerPos.x + 12}px, ${trailerPos.y + 12}px, 0)`,
        }}
      >
        <div
          className={`flex items-center px-2 py-0.5 rounded-full border shadow-md backdrop-blur-md transition-all duration-200 ${
            isHovered
              ? 'bg-rose-900/90 border-rose-300/80 text-white scale-105'
              : 'bg-black/60 border-amber-300/30 text-rose-200/90'
          }`}
        >
          <span className="text-[10px] font-semibold tracking-wider font-heading">
            ✨ Queen Priyanga ✨
          </span>
        </div>
      </div>

      {/* Main Focus Center Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          transform: `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0)`,
        }}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#fde047] transition-transform duration-100 ${
            isHovered ? 'scale-150 bg-rose-300 shadow-[0_0_10px_#fda4af]' : 'scale-100'
          }`}
        />
      </div>
    </>
  );
}
