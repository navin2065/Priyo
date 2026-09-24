import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

// Exactly 5 memories requested by user in clean English without paragraph clutter:
// 1. Childhood photo of Akka & Navi
// 2. Nature outing photo
// 3. Akka's Wedding
// 4. Promoted to Mama
// 5. With Akka's little one
const MEMORIES = [
  {
    id: 1,
    keyword: 'Childhood Days',
    image: '/images/M1.jpg',
  },
  {
    id: 2,
    keyword: 'Nature Escape',
    image: '/images/M2.jpg',
  },
  {
    id: 3,
    keyword: 'The Royal Wedding',
    image: '/images/M3.jpg',
  },
  {
    id: 4,
    keyword: 'Promoted To Mama',
    image: '/images/M4.jpg',
  },
  {
    id: 5,
    keyword: 'With Our Little One',
    image: '/images/M5.jpg',
  },
];

export default function SceneHero({ onNext }) {
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 438
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const handleCardClick = (e, idx) => {
    e.stopPropagation();
    soundEngine.playCardClick();
    setActiveCardIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div
      onClick={() => setActiveCardIndex(null)}
      className="fixed inset-0 w-full h-[100dvh] max-h-[100dvh] overflow-hidden select-none flex flex-col justify-between pt-2 sm:pt-4 pb-8 sm:pb-6 px-2 sm:px-4 z-40 bg-[#160206]"
    >
      {/* Luxury Ambient Background with Warm Rose Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(190,24,93,0.32)_0%,rgba(136,19,55,0.18)_40%,rgba(22,2,6,0.98)_90%)] pointer-events-none" />

      {/* Glowing ambient lights */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-rose-600/15 blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 -right-20 w-72 h-72 rounded-full bg-amber-500/15 blur-3xl pointer-events-none animate-pulse-slow" />

      {/* ─────────────────────────────────────────────────────────────
          TOP SECTION: HEADINGS MATCHING SCREENSHOT
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-2xl w-full mx-auto text-center pt-1 sm:pt-3 animate-scale-up">
        <h1 className="font-script text-3xl sm:text-5xl md:text-6xl text-[#ff758f] drop-shadow-[0_4px_25px_rgba(255,117,143,0.55)] leading-tight tracking-wide">
          Our Beautiful Moments Together
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-rose-100/80 font-light tracking-wide max-w-md mx-auto drop-shadow-sm">
          Every moment spent with you has been magical. Let's cherish these precious memories ...
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MIDDLE SECTION: 5-CARD MOUNTAIN DECK (Click-Only Activation)
          No auto-hover! Activates ONLY when user explicitly clicks/taps!
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex items-center justify-center min-h-[220px] xs:min-h-[250px] sm:min-h-[400px] my-auto">
        <div className="relative w-full flex items-center justify-center h-full">
          {MEMORIES.map((memory, i) => {
            const offset = i - 2; // -2, -1, 0, 1, 2
            const isActive = activeCardIndex === i;
            const hasAnyActive = activeCardIndex !== null;

            // DYNAMIC RESPONSIVE SPREAD:
            let spreadStep = 56;
            if (windowWidth < 380) {
              spreadStep = 45;
            } else if (windowWidth < 500) {
              spreadStep = 58;
            } else if (windowWidth < 640) {
              spreadStep = 68;
            } else if (isTablet) {
              spreadStep = 105;
            } else {
              spreadStep = 150;
            }

            const baseRotate = offset * (isMobile ? 6 : 9);
            const baseX = offset * spreadStep;
            const baseY =
              Math.abs(offset) === 0
                ? 0
                : Math.abs(offset) === 1
                ? (isMobile ? 10 : 18)
                : (isMobile ? 22 : 40);
            const baseZ = 10 - Math.abs(offset);

            // DYNAMIC CLICK TRANSFORM
            let tx = baseX;
            let ty = baseY;
            let rot = baseRotate;
            let scale = 1;
            let zIndex = baseZ;
            let opacity = 1;

            if (hasAnyActive) {
              if (isActive) {
                zIndex = 50;
                scale = isMobile ? 1.12 : 1.18;
                opacity = 1;

                if (i === 0) {
                  tx = isMobile ? -40 : -80;
                  ty = isMobile ? -30 : -50;
                  rot = isMobile ? 4 : 5;
                } else if (i === 1) {
                  tx = isMobile ? -20 : -40;
                  ty = isMobile ? -30 : -50;
                  rot = isMobile ? 2 : 3;
                } else if (i === 2) {
                  tx = 0;
                  ty = isMobile ? -34 : -55;
                  rot = 0;
                } else if (i === 3) {
                  tx = isMobile ? 20 : 40;
                  ty = isMobile ? -30 : -50;
                  rot = isMobile ? -2 : -3;
                } else {
                  tx = isMobile ? 40 : 80;
                  ty = isMobile ? -30 : -50;
                  rot = isMobile ? -4 : -5;
                }
              } else {
                // Inactive cards part gently and subtly dim
                const otherShift = isMobile ? 22 : 45;
                if (i < activeCardIndex) {
                  tx = baseX - otherShift;
                  rot = baseRotate - (isMobile ? 2 : 3);
                } else {
                  tx = baseX + otherShift;
                  rot = baseRotate + (isMobile ? 2 : 3);
                }
                ty = baseY + (isMobile ? 8 : 14);
                scale = 0.94;
                opacity = 0.55;
              }
            }

            return (
              <div
                key={memory.id}
                onClick={(e) => handleCardClick(e, i)}
                style={{
                  transform: `translate3d(${tx}px, ${ty}px, 0px) rotate(${rot}deg) scale(${scale})`,
                  zIndex: zIndex,
                  opacity: opacity,
                  transition: 'all 0.38s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="absolute w-[124px] xs:w-[134px] sm:w-[210px] md:w-[250px] lg:w-[275px] aspect-[3/4.2] cursor-pointer group select-none origin-bottom"
              >
                {/* Card Container with Rounded Corners */}
                <div
                  className={`w-full h-full rounded-[18px] sm:rounded-[26px] overflow-hidden bg-stone-900 border-2 transition-all duration-300 shadow-[0_16px_38px_rgba(0,0,0,0.85)] relative ${
                    isActive
                      ? 'border-amber-300 shadow-[0_22px_55px_rgba(244,63,94,0.65)] ring-4 ring-rose-500/35'
                      : 'border-white/25 hover:border-white/45'
                  }`}
                >
                  {/* Photo - Crystal clear & top-aligned to preserve heads/faces */}
                  <img
                    src={memory.image}
                    alt={memory.keyword}
                    className={`w-full h-full object-cover object-[center_15%] transition-transform duration-500 ${
                      isActive ? 'scale-105 brightness-105' : 'brightness-95'
                    }`}
                    onError={(e) => {
                      e.target.src = '/images/akka-real.jpg';
                    }}
                  />

                  {/* Ultra-minimal bottom gradient ONLY at bottom 18% to preserve full photo view */}
                  <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                  {/* Sleek Bottom English Keyword Badge */}
                  <div className="absolute inset-x-0 bottom-2 px-1.5 flex justify-center pointer-events-none z-10">
                    <div
                      className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full backdrop-blur-md border shadow-md transition-all ${
                        isActive
                          ? 'bg-amber-400 text-stone-950 border-amber-200 scale-105'
                          : 'bg-black/65 text-amber-200 border-white/20'
                      }`}
                    >
                      <span className="font-heading font-extrabold text-[9px] xs:text-[10px] sm:text-xs tracking-wider uppercase drop-shadow-sm whitespace-nowrap">
                        {memory.keyword}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          BOTTOM SECTION: BLOW CANDLE CALL TO ACTION
          Elevated cleanly well above mobile browser bar, perfectly visible and clickable.
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-30 max-w-md w-full mx-auto text-center flex flex-col items-center pb-6 sm:pb-4 mb-3 sm:mb-2 animate-scale-up">
        <button
          onClick={onNext}
          className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-amber-300 text-stone-900 font-heading font-extrabold text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_25px_rgba(244,63,94,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          BLOW YOUR BIRTHDAY CANDLE →
        </button>
      </div>
    </div>
  );
}
