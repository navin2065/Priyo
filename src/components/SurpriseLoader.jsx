import React, { useState, useEffect } from 'react';

export default function SurpriseLoader({ onLoaded }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoaded?.();
          }, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 35);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div className="fixed inset-0 z-50 bg-[#7c1524] flex items-center justify-center p-6 select-none overflow-hidden">
      {/* Background subtle radial lighting matching crimson theme */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(163,26,45,0.45)_0%,rgba(88,10,20,0.98)_100%)] pointer-events-none" />

      {/* Luxury Trending Editorial Loader */}
      <div className="relative z-10 max-w-sm w-full text-center flex flex-col items-center animate-scale-up">
        {/* Monogram Seal / Emblem */}
        <div className="w-16 h-16 rounded-full border border-amber-300/30 bg-black/20 backdrop-blur-md flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(245,197,99,0.15)]">
          <span className="font-royal text-xl font-bold tracking-widest text-amber-200">
            P
          </span>
        </div>

        {/* Minimalist Editorial Headline */}
        <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-amber-300/80 mb-2">
          CHAPTER 26
        </div>

        <h3 className="font-royal text-2xl sm:text-3xl text-white font-bold tracking-wider mb-6">
          Unveiling The Surprise
        </h3>

        {/* Minimalist Glowing Progress Track */}
        <div className="w-56 sm:w-64 h-[2px] bg-white/15 relative overflow-hidden mb-4 rounded-full">
          <div
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-amber-300 via-rose-300 to-amber-200 shadow-[0_0_12px_#fde047] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Monospace Percentage */}
        <div className="text-xs font-mono tracking-widest text-rose-200/70">
          {String(progress).padStart(2, '0')}%
        </div>
      </div>
    </div>
  );
}
