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
      { id: 1, fallback: '/images/M1.jpg', rot: '-5deg', top: 'top-[7%]' },
      { id: 2, fallback: '/images/M2.jpg', rot: '4deg', top: 'top-[42%]' },
    ],
  },
  {
    id: 'col-left-inner',
    style: { left: '13%' },
    delay: '0.2s',
    photos: [
      { id: 3, fallback: '/images/M3.jpg', rot: '3deg', top: 'top-[13%]' },
      { id: 4, fallback: '/images/M4.jpg', rot: '-4deg', top: 'top-[74%]' },
    ],
  },
  {
    id: 'col-right-inner',
    style: { right: '13%' },
    delay: '0.18s',
    photos: [
      { id: 5, fallback: '/images/M5.jpg', rot: '-3deg', top: 'top-[13%]' },
      { id: 6, fallback: '/images/akka-real.jpg', rot: '4deg', top: 'top-[74%]' },
    ],
  },
  {
    id: 'col-right-outer',
    style: { right: '1%' },
    delay: '0.28s',
    photos: [
      { id: 7, fallback: '/images/sibling-hero.jpg', rot: '5deg', top: 'top-[7%]' },
      { id: 8, fallback: '/images/lock-polaroid.jpg', rot: '-4deg', top: 'top-[42%]' },
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
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none"
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
          {/* Delicate Vertical Satin Ribbon String */}
          <div className="relative w-full h-full flex flex-col items-center animate-ribbon-sway origin-top">
            <div className="absolute top-0 bottom-6 w-[1.5px] bg-gradient-to-b from-amber-200 via-rose-300 to-amber-500/80 shadow-[0_0_6px_rgba(245,197,99,0.3)] rounded-full z-10" />

            {/* Enlarged Realistic Photographs on this Ribbon */}
            {column.photos.map((photo) => {
              const isZoomed = activePhotoId === photo.id;
              return (
                <div
                  key={photo.id}
                  style={{
                    transform: `rotate(${isZoomed ? '0deg' : photo.rot}) ${
                      isZoomed ? 'scale(1.58)' : 'scale(1)'
                    }`,
                    zIndex: isZoomed ? 60 : 20,
                  }}
                  onClick={(e) => handlePhotoClick(e, photo.id)}
                  className={`absolute ${photo.top} -translate-x-1/2 left-1/2 pointer-events-auto cursor-pointer transition-all duration-300 ease-out origin-center`}
                >
                  {/* Delicate Brass Pin Clip */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2.5 rounded-[1px] bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 shadow-xs border border-white/50 z-30" />

                  {/* Enlarged Realistic Photo Print (r1, r2... Images only) */}
                  <div
                    className={`w-18 h-24 xs:w-20 xs:h-27 sm:w-25 sm:h-33 p-1 pb-2 sm:p-1.5 sm:pb-2.5 bg-[#fefefe] rounded-[3px] transition-all duration-300 ${
                      isZoomed
                        ? 'shadow-[0_20px_40px_rgba(0,0,0,0.95)] ring-4 ring-amber-300/90'
                        : 'shadow-[0_6px_18px_rgba(0,0,0,0.7)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.9)] hover:scale-105'
                    }`}
                  >
                    <div className="w-full h-full overflow-hidden rounded-[2px] bg-stone-900 shadow-inner">
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
