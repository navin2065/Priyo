import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

export default function DateExplosion({ onComplete }) {
  useEffect(() => {
    // 1. Initial golden cracker blast from left and right
    soundEngine.playConfettiPop();

    const fireGoldenCrackers = () => {
      // Left side golden cracker cannon
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.65 },
        colors: ['#ffd700', '#ffeb3b', '#f59e0b', '#ffffff', '#fcd34d'],
        ticks: 200,
      });

      // Right side golden cracker cannon
      confetti({
        particleCount: 45,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.65 },
        colors: ['#ffd700', '#ffeb3b', '#f59e0b', '#ffffff', '#fcd34d'],
        ticks: 200,
      });
    };

    // First blast immediately
    fireGoldenCrackers();

    // Second staggered burst after 400ms
    const burst1 = setTimeout(() => {
      soundEngine.playConfettiPop();
      fireGoldenCrackers();
      confetti({
        particleCount: 40,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#f59e0b', '#ffd700', '#ffffff'],
      });
    }, 450);

    // Third burst after 950ms
    const burst2 = setTimeout(() => {
      fireGoldenCrackers();
    }, 950);

    // Move to loader after celebration completes
    const timer = setTimeout(() => {
      onComplete?.();
    }, 2800);

    return () => {
      clearTimeout(burst1);
      clearTimeout(burst2);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#7c1524] flex items-center justify-center p-4 overflow-hidden select-none">
      {/* Background radial spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.25)_0%,rgba(124,21,36,0.95)_100%)] pointer-events-none" />

      {/* Golden Radiating Rings and Particles */}
      <div className="relative flex flex-col items-center justify-center text-center animate-scale-up">
        {/* Animated Expanding Golden Shockwave Rings */}
        <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full border border-amber-300/30 animate-ping opacity-60 pointer-events-none" />
        <div className="absolute w-56 sm:w-80 h-56 sm:h-80 rounded-full border-2 border-amber-400/40 pointer-events-none animate-pulse-slow" />

        {/* Floating Golden Sparks Ring */}
        <div className="absolute -inset-16 sm:-inset-28 flex items-center justify-center pointer-events-none">
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            const radius = 120 + (i % 3) * 22;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            return (
              <div
                key={i}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                className={`absolute rounded-full bg-gradient-to-r from-amber-200 to-yellow-400 shadow-[0_0_12px_#fbbf24] animate-pulse ${
                  i % 2 === 0 ? 'w-2 h-2' : 'w-1.5 h-1.5 opacity-70'
                }`}
              />
            );
          })}
        </div>

        {/* Top Golden Tag */}
        <div className="relative z-10 mb-3 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400/20 via-yellow-300/30 to-amber-400/20 border border-amber-300/50 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.4)]">
          <span className="text-[11px] sm:text-xs font-mono tracking-widest uppercase text-amber-200 font-bold">
             LEVEL 26 UNLOCKED 
          </span>
        </div>

        {/* Center Glowing 24K Golden Date (25 • 09 • 2026) */}
        <div className="relative z-10 px-4 sm:px-8 py-3">
          <h2 className="font-heading font-black text-4xl sm:text-7xl md:text-8xl tracking-wider sm:tracking-widest bg-gradient-to-b from-[#fff7d6] via-[#ffd54f] to-[#e68a00] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,215,0,0.8)] leading-tight">
            25 • 09 • 2026
          </h2>
          <p className="font-mono text-xs sm:text-sm text-amber-200/90 font-bold tracking-[0.3em] mt-2 drop-shadow-md">
            25 . 09 . 26
          </p>
        </div>

        
      </div>
    </div>
  );
}
