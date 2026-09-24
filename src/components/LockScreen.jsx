import React, { useState } from 'react';
import { soundEngine } from '../utils/audio';

export default function LockScreen({ onUnlock }) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isZoomingOut, setIsZoomingOut] = useState(false); // Smooth zoom-out on success

  // Target Birthday Date: 25.09.26
  const CORRECT_PASSCODES = ['250926', '260900', '250900', '200026', '262626', '010101'];

  const handleKeyPress = (val) => {
    if (isZoomingOut) return;

    if (val === '•') {
      setShowHint(!showHint);
      soundEngine.playCardClick();
      return;
    }

    if (passcode.length >= 6) return;
    soundEngine.playCardClick();
    setError(false);
    const newCode = passcode + val;
    setPasscode(newCode);

    if (newCode.length === 6) {
      if (CORRECT_PASSCODES.includes(newCode)) {
        soundEngine.playConfettiPop();
        // Trigger smooth zoom-out into the center before revealing date!
        setIsZoomingOut(true);
        setTimeout(() => {
          onUnlock(newCode);
        }, 650);
      } else {
        setError(true);
        setTimeout(() => {
          setPasscode('');
          setError(false);
        }, 700);
      }
    }
  };

  const handleDelete = () => {
    if (isZoomingOut) return;
    soundEngine.playCardClick();
    setError(false);
    setPasscode((prev) => prev.slice(0, -1));
  };

  // Circular Keypad
  const keypad = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['•', '0', '⌫'],
  ];

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#7c1524] flex flex-col justify-center items-center p-3 sm:p-6 overflow-y-auto select-none transition-all duration-700 ease-in-out ${
        isZoomingOut ? 'scale-75 opacity-0 blur-sm pointer-events-none' : 'scale-100 opacity-100'
      }`}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(163,26,45,0.45)_0%,rgba(92,10,21,0.98)_100%)] pointer-events-none" />

      {/* Main Grid: Fully optimized for 100% Mobile & Desktop viewports without clipping */}
      <div className="relative max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-8 md:gap-12 items-center justify-items-center z-10 my-auto">
        {/* Left Column: Polaroid Frame with Real Red Ribbon Bow */}
        <div className="md:col-span-6 flex justify-center pt-2 sm:pt-4">
          <div className="relative w-44 sm:w-64 md:w-72 max-w-[190px] sm:max-w-[300px]">
            {/* Real Photorealistic Red Satin Ribbon Bow (Pinned on top-left corner, fully visible on mobile) */}
            <div className="absolute -top-5 -left-5 sm:-top-8 sm:-left-8 z-30 transform -rotate-12 pointer-events-none filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.65)]">
              <img
                src="/images/red-bow.png"
                alt="Red Ribbon Bow"
                className="w-14 sm:w-20 md:w-24 h-auto object-contain"
              />
            </div>

            {/* White Polaroid Frame (Tilted slightly) */}
            <div className="bg-[#fcfcfc] p-2 pb-4 sm:p-3 sm:pb-7 rounded-xl shadow-[0_18px_45px_rgba(0,0,0,0.7)] transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-stone-900 shadow-inner">
                <img
                  src="/images/lock-polaroid.jpg"
                  alt="Birthday Queen Priyanga"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>

              {/* Handwritten Note for Priyanga */}
              <div className="mt-2 sm:mt-3 text-center">
                <p className="font-handwritten text-xl sm:text-2xl md:text-3xl text-stone-800 font-bold leading-tight">
                  Happy Birthday! Rodnoy
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Keypad (Clean, compact on mobile so zero scrolling is needed) */}
        <div className="md:col-span-6 flex flex-col items-center text-center pb-2">
          <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase text-rose-200/90 mb-2 sm:mb-4">
            ENTER A PASSCODE
          </h3>

          {/* 6 Rounded Square Indicator Boxes */}
          <div
            className={`flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-5 ${
              error ? 'animate-shake' : ''
            }`}
          >
            {Array.from({ length: 6 }).map((_, idx) => {
              const isFilled = idx < passcode.length;
              return (
                <div
                  key={idx}
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg border border-rose-300/40 bg-black/20 flex items-center justify-center transition-all"
                >
                  {isFilled && (
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Round Circle Keypad Buttons */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 max-w-[200px] sm:max-w-[240px] w-full mb-2 sm:mb-3">
            {keypad.map((row, rIdx) =>
              row.map((btn, cIdx) => {
                if (btn === '⌫') {
                  return (
                    <button
                      key={cIdx}
                      onClick={handleDelete}
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#9c2436] hover:bg-[#b02c40] active:scale-95 text-rose-100 flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-all mx-auto border border-rose-300/20 text-base sm:text-lg font-bold"
                    >
                      ⌫
                    </button>
                  );
                }
                return (
                  <button
                    key={cIdx}
                    onClick={() => handleKeyPress(btn)}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#9c2436] hover:bg-[#b02c40] active:scale-95 text-white font-heading text-lg sm:text-xl md:text-2xl font-bold flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-all mx-auto border border-rose-300/20"
                  >
                    {btn}
                  </button>
                );
              })
            )}
          </div>

          {/* Hint Indicator: Shows "Today" when clicked */}
          <div className="min-h-[22px] flex items-center justify-center">
            {showHint ? (
              <span className="text-[11px] sm:text-xs font-bold tracking-widest text-amber-300 animate-scale-up px-3 py-0.5 rounded-full bg-black/40 border border-amber-300/40 font-mono">
                Today (25.09.26)
              </span>
            ) : (
              <button
                onClick={() => setShowHint(true)}
                className="text-[10px] sm:text-xs text-rose-200/60 hover:text-rose-100 transition-colors tracking-wide"
              >
                Need a hint?
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
