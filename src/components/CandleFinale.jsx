import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';
import FallingRibbons from './FallingRibbons';

export default function CandleFinale({ onRestart }) {
  // Phases:
  // 1. 'IDLE': Clean and minimal, video paused at frame 0, "Blow The Candle" button, NO decorations
  // 2. 'PLAYING': 5-second MP4 plays, floating typography enters from left/right/sides towards center
  // 3. 'CELEBRATING': Video ends, small realistic photo ribbon appears (images only, no numbers/labels)
  const [phase, setPhase] = useState('IDLE');
  const [showSignature, setShowSignature] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef(null);
  const signatureFull = 'Crafted With All My Love,\nYour Lovable Navi ❤️';

  // Step 2 & 3: User clicks "Blow The Candle" -> 5-Second Video & Floating Typography
  const handleBlowCandle = () => {
    if (phase !== 'IDLE') return;
    setPhase('PLAYING');

    // 1. Immediately cut off any previous background audio and play /sound.mp3
    soundEngine.stopAmbientMusic();
    soundEngine.playBirthdaySong('/sound.mp3');

    // Play MP4 video
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Video autoplay policy or missing file fallback
      });
    }

    // Exactly 5 seconds duration
    setTimeout(() => {
      // Step 4: After 5 seconds, video finishes completely
      setPhase('CELEBRATING');

      // Celebration confetti
      confetti({
        particleCount: 85,
        spread: 75,
        origin: { y: 0.5 },
        colors: ['#f5c563', '#ff4d8d', '#ffffff', '#eab308'],
      });
      soundEngine.playConfettiPop();

      // Step 8: After small photo ribbons appear and settle (1.8s), type signature separately
      setTimeout(() => {
        setShowSignature(true);
      }, 1800);
    }, 5000);
  };

  // Slowly and elegantly type the closing signature
  useEffect(() => {
    if (!showSignature) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedText(signatureFull.slice(0, i));
      if (i >= signatureFull.length) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [showSignature]);

  const handleReset = () => {
    soundEngine.playCardClick();
    setPhase('IDLE');
    setShowSignature(false);
    setTypedText('');
    soundEngine.stopBirthdaySong();
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#7c1524] text-slate-100 flex flex-col justify-between items-center py-4 px-3 select-none overflow-hidden z-40">
      {/* Background subtle luxury lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(163,26,45,0.4)_0%,rgba(60,6,14,0.98)_100%)] pointer-events-none" />

      {/* ─────────────────────────────────────────────────────────────
          1. FLOATING CLOUD TYPOGRAPHY (ACTIVE ONLY DURING 5-SEC VIDEO)
          Positioned strictly OUTSIDE the center video in 4 open corners:
          Top-Left, Top-Right, Bottom-Left, Bottom-Right.
          NEVER touches or overlaps the video!
          ───────────────────────────────────────────────────────────── */}
      {phase === 'PLAYING' && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
          {/* Top-Left: Above Video on Left */}
          <div className="absolute top-[14%] sm:top-[16%] left-[4%] sm:left-[8%] animate-float-tl">
            <span className="font-heading font-extrabold text-[11px] sm:text-sm text-amber-200/90 tracking-wide drop-shadow-[0_2px_10px_rgba(245,197,99,0.7)] whitespace-nowrap">
              ✨ Happy Birthday Priyanga ✨
            </span>
          </div>

          {/* Top-Right: Above Video on Right */}
          <div className="absolute top-[14%] sm:top-[16%] right-[4%] sm:right-[8%] animate-float-tr">
            <span className="font-script text-base sm:text-xl text-pink-200/95 drop-shadow-[0_2px_12px_rgba(255,117,143,0.75)] whitespace-nowrap">
              🌸 Queen Priyanga @ 26 🌸
            </span>
          </div>

          {/* Bottom-Left: Below Video on Left */}
          <div className="absolute bottom-[17%] sm:bottom-[19%] left-[4%] sm:left-[8%] animate-float-bl">
            <span className="font-script text-base sm:text-xl text-pink-300/95 drop-shadow-[0_2px_12px_rgba(255,107,139,0.75)] whitespace-nowrap">
              💖 Forever Our #1 Akka 💖
            </span>
          </div>

          {/* Bottom-Right: Below Video on Right */}
          <div className="absolute bottom-[17%] sm:bottom-[19%] right-[4%] sm:right-[8%] animate-float-br">
            <span className="font-heading font-extrabold text-[11px] sm:text-sm text-amber-100/90 tracking-wide drop-shadow-[0_2px_10px_rgba(245,197,99,0.6)] whitespace-nowrap">
              🎂 Happy Birthday to You 🎂
            </span>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. SMALL REALISTIC PHOTO RIBBONS
          Appears ONLY AFTER the 5-second video completes!
          Images only, NO numbers, NO labels, NO balloons.
          ───────────────────────────────────────────────────────────── */}
      {phase === 'CELEBRATING' && <FallingRibbons />}

      {/* ─────────────────────────────────────────────────────────────
          TOP SECTION: CLEAN MINIMAL HEADER
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-sm w-full mx-auto text-center pt-1 animate-scale-up">
        <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-white/10 border border-white/20 text-amber-200 text-[11px] font-semibold uppercase tracking-wider mb-1 backdrop-blur-sm">
          <span>Born in 2000 • Chapter 26 Milestone</span>
        </div>

        <h2 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight drop-shadow-md">
          {phase === 'IDLE' && 'Make A Wish & Blow The Candle'}
          {phase === 'PLAYING' && 'Blowing The Candle... ✨'}
          {phase === 'CELEBRATING' && 'Happy 26th Birthday, Priyanga! 💖'}
        </h2>

        <p className="text-[11px] sm:text-xs text-rose-200/80 max-w-xs mx-auto mt-0.5 font-light">
          {phase === 'IDLE' && 'Close your eyes, make your wish, and tap blow below.'}
          {phase === 'PLAYING' && 'Wish in progress... blowing out the flame!'}
          {phase === 'CELEBRATING' && 'May this 26th year bring you boundless happiness!'}
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          CENTER SECTION: ENLARGED MP4 VIDEO CONTAINER
          Large, prominent, untouched by surrounding text or UI!
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center">
        <div className="relative w-[275px] xs:w-[305px] sm:w-[350px] md:w-[390px] aspect-[4/3] rounded-2xl overflow-hidden bg-black/70 border-2 border-amber-300/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex items-center justify-center">
          
          {/* Real MP4 Video from Public folder */}
          {!videoError ? (
            <video
              ref={videoRef}
              playsInline
              webkit-playsinline="true"
              preload="auto"
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover"
            >
              <source src="/candle.mp4" type="video/mp4" />
              <source src="/cake-video.mp4" type="video/mp4" />
              <source src="/cake.mp4" type="video/mp4" />
              <source src="/video.mp4" type="video/mp4" />
            </video>
          ) : (
            // Clean minimal fallback frame if video file not yet added to public
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <span className="text-3xl mb-1">🕯️</span>
              <span className="text-xs font-heading font-bold text-amber-200">
                Candle Video Ready
              </span>
              <span className="text-[9px] text-rose-200/70 font-mono mt-1">
                candle.mp4 in public/
              </span>
            </div>
          )}

          {/* Soft inner border glow */}
          <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          BOTTOM SECTION: CONTROLS & SEPARATE TYPED SIGNATURE
          Separated cleanly from photo ribbons, perfectly fixed without scrolling.
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-sm w-full mx-auto text-center flex flex-col items-center justify-end pb-2 min-h-[90px]">
        {/* Phase 1: Blow Candle Button */}
        {phase === 'IDLE' && (
          <button
            onClick={handleBlowCandle}
            className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-red-600 text-white font-heading font-extrabold text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_25px_rgba(245,158,11,0.65)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>Blow The Candle</span>
          </button>
        )}

        {/* Phase 2: Playing Indicator */}
        {phase === 'PLAYING' && (
          <div className="flex items-center gap-1.5 text-amber-200/90 font-mono text-xs uppercase tracking-widest animate-pulse">
            <span>✨</span>
            <span>Making Birthday Wish...</span>
            <span>✨</span>
          </div>
        )}

        {/* Phase 3 & 4: Separate Typed Signature (Slow, elegant, independent) */}
        {phase === 'CELEBRATING' && (
          <div className="flex flex-col items-center justify-center">
            {showSignature ? (
              <div className="flex flex-col items-center justify-center text-center">
                <p className="font-handwritten text-xl sm:text-2xl text-amber-200/95 font-bold tracking-wide drop-shadow-sm leading-tight">
                  {typedText.split('\n')[0] || ''}
                </p>
                {typedText.includes('\n') && (
                  <p className="font-handwritten text-2xl sm:text-3xl text-amber-300 font-extrabold tracking-wide drop-shadow-md mt-0.5 leading-tight animate-scale-up">
                    {typedText.split('\n')[1]}
                  </p>
                )}
              </div>
            ) : (
              <div className="h-10" />
            )}

            {/* Subtle replay button after signature finishes */}
            {typedText.length >= signatureFull.length && (
              <button
                onClick={handleReset}
                className="mt-2 text-[10px] text-rose-200/60 hover:text-white transition-colors underline underline-offset-4 relative z-50 pointer-events-auto"
              >
                Relight / Replay
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
