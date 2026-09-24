import React, { useState } from 'react';
import { soundEngine } from '../utils/audio';

// Hanging ribbon photos using r1, r2, r3, etc. with graceful fallbacks
// Requirements:
// - Photos significantly enlarged so they are clear and beautiful
// - Tapping applies a prominent smooth zoom (scale 1.55) with golden glow and shadow
// - Positioned so they frame the screen and do not touch the center video
// - Images only (NO numbers, NO text, NO labels)
const RIBBON_COLUMNS = [
  {
    id: 'col-left-outer',
    style: { left: '1%' },
    delay: '0.1s',
    photos: [
      { id: 1, fallback: '/images/M1.jpg', rot: '-2deg', top: 'top-[7%]' },
      { id: 2, fallback: '/images/M2.jpg', rot: '2deg', top: 'top-[42%]' },
    ],
  },
  {
    id: 'col-left-inner',
    style: { left: '13%' },
    delay: '0.2s',
    photos: [
      { id: 3, fallback: '/images/M3.jpg', rot: '2deg', top: 'top-[13%]' },
      { id: 4, fallback: '/images/M4.jpg', rot: '-2deg', top: 'top-[74%]' },
    ],
  },
  {
    id: 'col-right-inner',
    style: { right: '13%' },
    delay: '0.18s',
    photos: [
      { id: 5, fallback: '/images/M5.jpg', rot: '-2deg', top: 'top-[13%]' },
      { id: 6, fallback: '/images/akka-real.jpg', rot: '2deg', top: 'top-[74%]' },
    ],
  },
  {
    id: 'col-right-outer',
    style: { right: '1%' },
    delay: '0.28s',
    photos: [
      { id: 7, fallback: '/images/sibling-hero.jpg', rot: '2deg', top: 'top-[7%]' },
      { id: 8, fallback: '/images/lock-polaroid.jpg', rot: '-2deg', top: 'top-[42%]' },
    ],
  },
];

// Handles r1, r2, etc. paths with /rX.jpg and local fallbacks
function RibbonPhotoImg({ id, fallback }) {
  const [src, setSrc] = useState(`/images/r${id}.jpg`);

  const handleError = () => {
    if (src.startsWith('/images/r')) {
      // Try root public folder /r1.jpg, /r2.jpg
      setSrc(`/r${id}.jpg`);
    } else if (src.startsWith('/r')) {
      // Fallback to existing memory photos
      setSrc(fallback);
    }
  };

  return (
    <img
      src={src}
      alt=""
      onError={handleError}
      className="w-full h-full object-cover object-center pointer-events-none"
    />
  );
}

export default function FallingRibbons() {
  const [activePhotoId, setActivePhotoId] = useState(null);

  const handlePhotoClick = (e, id) => {
    e.stopPropagation();
    soundEngine.playCardClick();
    setActivePhotoId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      onClick={() => setActivePhotoId(null)}
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
    >
      {RIBBON_COLUMNS.map((column) => (
        <div
          key={column.id}
          style={{
            ...column.style,
            animationDelay: column.delay,
          }}
          className="absolute top-0 bottom-0 w-20 xs:w-24 sm:w-28 animate-drop-ribbon flex flex-col items-center"
        >
          {/* Delicate Vertical Satin Ribbon String (Centered exactly in column) */}
          <div className="relative w-full h-full flex flex-col items-center animate-ribbon-sway origin-top">
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#ffd54f] via-[#ffca28] to-[#ffa000] shadow-[0_0_8px_rgba(255,202,40,0.7)] z-10 pointer-events-none" />

            {/* Photos physically attached and clamped directly onto this hanging ribbon string */}
            {column.photos.map((photo) => {
              const isZoomed = activePhotoId === photo.id;
              return (
                <div
                  key={photo.id}
                  style={{
                    zIndex: isZoomed ? 80 : 35,
                  }}
                  onClick={(e) => handlePhotoClick(e, photo.id)}
                  className={`absolute ${photo.top} left-1/2 -translate-x-1/2 pointer-events-auto cursor-pointer transition-all duration-300 ease-out flex flex-col items-center`}
                >
                  {/* Clothespin Peg Clip: Clamped directly over the vertical string */}
                  <div className="relative -mb-3 z-40 flex flex-col items-center pointer-events-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                    {/* Peg Top Body */}
                    <div className="w-3 h-4 rounded-t-[2px] bg-gradient-to-b from-[#ffe082] via-[#ffb300] to-[#e65100] border border-amber-200/90 relative flex items-center justify-center">
                      {/* Metallic Spring Wire Ring */}
                      <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-stone-300 border-y border-stone-600" />
                    </div>
                    {/* Peg Bottom Clamping Jaw (Clamps 12px over the white photo border) */}
                    <div className="w-2.5 h-3 rounded-b-[1px] bg-gradient-to-b from-[#ffb300] to-[#bf360c] border-x border-b border-amber-950/40" />
                  </div>

                  {/* Square Photo Print: Hanging firmly from the clothespin clip */}
                  <div
                    style={{
                      transform: `rotate(${isZoomed ? '0deg' : photo.rot}) ${
                        isZoomed ? 'scale(1.7)' : 'scale(1)'
                      }`,
                      transformOrigin: 'top center',
                    }}
                    className={`w-[78px] h-[78px] xs:w-[86px] xs:h-[86px] sm:w-[100px] sm:h-[100px] md:w-[112px] md:h-[112px] p-1 sm:p-1.5 bg-[#fefefe] rounded-[4px] transition-all duration-300 ${
                      isZoomed
                        ? 'shadow-[0_22px_45px_rgba(0,0,0,0.95)] ring-4 ring-amber-300/90'
                        : 'shadow-[0_8px_22px_rgba(0,0,0,0.75)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.9)] hover:scale-105'
                    }`}
                  >
                    <div className="w-full h-full aspect-square overflow-hidden rounded-[2px] bg-stone-900 shadow-inner">
                      <RibbonPhotoImg id={photo.id} fallback={photo.fallback} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
