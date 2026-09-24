import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Global Heart Shadow Touch/Click Effect with Rodnoy (Instant on both mobile tap & desktop click)
    const handleTouchOrClick = (e) => {
      const clientX =
        e.clientX !== undefined
          ? e.clientX
          : e.touches && e.touches[0]
          ? e.touches[0].clientX
          : window.innerWidth / 2;
      const clientY =
        e.clientY !== undefined
          ? e.clientY
          : e.touches && e.touches[0]
          ? e.touches[0].clientY
          : window.innerHeight / 2;
      const id = Date.now() + Math.random();

      setHearts((prev) => [...prev.slice(-6), { id, x: clientX, y: clientY }]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 760);
    };

    window.addEventListener('pointerdown', handleTouchOrClick, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleTouchOrClick);
    };
  }, []);

  return (
    <>
      {/* Floating Ethereal Heart Shadow + Rodnoy Badge at Touch / Click Location (Blooms on click, then fades cleanly) */}
      {hearts.map((h) => (
        <div
          key={h.id}
          style={{ left: h.x, top: h.y }}
          className="fixed pointer-events-none z-[99999] select-none animate-heart-shadow flex flex-col items-center gap-1"
        >
          <div className="relative flex items-center justify-center">
            {/* Soft Heart Glow Aura */}
            <div className="absolute w-10 h-10 rounded-full bg-rose-500/25 blur-md pointer-events-none" />

            {/* Glowing Heart Shadow Silhouette */}
            <svg
              viewBox="0 0 24 24"
              className="w-7 h-7 fill-rose-500/35 stroke-rose-300/85 stroke-[1.5] filter drop-shadow-[0_0_12px_rgba(244,63,94,0.9)]"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          {/* Floating Rodnoy Text with Golden Sparkle Glow on Click */}
          <div className="px-2 py-0.5 rounded-full bg-black/75 border border-amber-300/60 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.7)] whitespace-nowrap">
            <span className="text-[10px] sm:text-xs font-heading font-extrabold text-amber-200 tracking-wider">
              ✨ Rodnoy ✨
            </span>
          </div>
        </div>
      ))}
    </>
  );
}
