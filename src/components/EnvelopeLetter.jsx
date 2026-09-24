import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

// Heartfelt sibling letter written by Navi for his Akka Priyanga with personal sibling banter
const LETTER_SECTIONS = [
  {
    id: 'greeting',
    type: 'greeting',
    text: 'My dear Akka,',
  },
  {
    id: 'p1',
    type: 'body',
    text: 'If I had to name one person who means the most to me in this world, it would always be you.',
  },
  {
    id: 'p2',
    type: 'body',
    text: "No matter what happens—whether I’m happy, sad, confused, or going through a problem—you are always the first person I think of and the first person I come to. You’ve always been my first option, my biggest support, and someone I can share absolutely anything with.",
  },
  {
    id: 'p3',
    type: 'body',
    text: "From my studies to my career, from my smallest worries to my biggest decisions, you’ve always pushed me, guided me, and helped me grow into the person I am today. A big part of where I am now is because of you.",
  },
  {
    id: 'p4',
    type: 'body',
    text: "I still remember the days when you used to carry me on your hip. And now, life has come full circle—you’re carrying your own little one. ❤️ Somehow, so much time has passed, but all our memories, silly fights, endless gossip, secrets, laughter, and those random conversations will always stay with me. And now, life has given me another beautiful promotion — from being your thambi to becoming a Mama. ❤️ I’m so happy and proud to see you become a mother. But no matter how much life changes, no matter how much you grow into this new role, you will always be my second mother first. You’ve always cared for me, guided me, supported me, and stood by me like a mother would.",
  },
  {
    id: 'p5',
    type: 'body',
    text: "You’ll always be more than just my sister — my second mother, my gossip partner, my secret keeper, my biggest support, and my person. You are, and always will be, my everything.",
  },
  {
    id: 'banter',
    type: 'banter',
    text: "To be honest, I've never talked to you like this in person... if I did, you'd probably just burst out laughing and call me a boomer uncle! 😄 But it was truly in my heart, so I wanted to express it all here.",
  },
  {
    id: 'closing',
    type: 'closing',
    text: 'Happy Birthday Akka ❤️',
  },
  {
    id: 'signoff',
    type: 'signoff',
    text: 'Love you always.',
  },
];

// 11 Aesthetic Scattered Memory Photos filling the entire space between letter & button
const AESTHETIC_MEMORY_PHOTOS = [
  // Tier 1: Upper Row (4 photos spread across width)
  {
    id: 'l1',
    src: '/images/l1.jpg',
    altSrc: '/l1.jpg',
    fallback: '/images/M1.jpg',
    tilt: '-rotate-6 -translate-y-1',
    tapeStyle: 'bg-amber-100/80 border-amber-300/50 -rotate-3',
    label: 'Sister Love',
  },
  {
    id: 'l2',
    src: '/images/l2.jpg',
    altSrc: '/l2.jpg',
    fallback: '/images/gallery-1.jpg',
    tilt: 'rotate-4 translate-y-1',
    tapeStyle: 'bg-rose-100/80 border-rose-300/50 rotate-2',
    label: 'Precious Moments',
  },
  {
    id: 'l3',
    src: '/images/l3.jpg',
    altSrc: '/l3.jpg',
    fallback: '/images/journey-1.jpg',
    tilt: '-rotate-3 -translate-y-0.5',
    tapeStyle: 'bg-stone-100/80 border-stone-300/50 -rotate-2',
    label: 'Pure Joy',
  },
  {
    id: 'l4',
    src: '/images/l4.jpg',
    altSrc: '/l4.jpg',
    fallback: '/images/M2.jpg',
    tilt: 'rotate-5 translate-y-1',
    tapeStyle: 'bg-amber-100/80 border-amber-300/50 rotate-4',
    label: 'Golden Heart',
  },

  // Tier 2: Middle Row (4 photos bridging the middle gap)
  {
    id: 'l5',
    src: '/images/l5.jpg',
    altSrc: '/l5.jpg',
    fallback: '/images/gallery-3.jpg',
    tilt: '-rotate-5 translate-y-0.5',
    tapeStyle: 'bg-rose-100/80 border-rose-300/50 -rotate-1',
    label: 'Akka & Navi',
  },
  {
    id: 'l6',
    src: '/images/l6.jpg',
    altSrc: '/l6.jpg',
    fallback: '/images/M4.jpg',
    tilt: 'rotate-5 -translate-y-1',
    tapeStyle: 'bg-amber-100/80 border-amber-300/50 rotate-3',
    label: 'Smiling Memories',
  },
  {
    id: 'l7',
    src: '/images/l7.jpg',
    altSrc: '/l7.jpg',
    fallback: '/images/M5.jpg',
    tilt: '-rotate-4 translate-y-1',
    tapeStyle: 'bg-purple-100/80 border-purple-300/50 -rotate-3',
    label: 'Together Always',
  },
  {
    id: 'l8',
    src: '/images/l8.jpg',
    altSrc: '/l8.jpg',
    fallback: '/images/gallery-2.jpg',
    tilt: 'rotate-6 -translate-y-0.5',
    tapeStyle: 'bg-stone-100/80 border-stone-300/50 rotate-2',
    label: 'Pure Radiance',
  },

  // Tier 3: Lower Highlight Row (3 milestone photos right above button)
  {
    id: 'l9',
    src: '/images/l9.jpg',
    altSrc: '/images/letter-photo-1.jpg',
    fallback: '/images/letter-photo-1.jpg',
    tilt: '-rotate-6 -translate-y-1.5',
    tapeStyle: 'bg-amber-100/80 border-amber-300/50 -rotate-2',
    label: 'Childhood Days',
  },
  {
    id: 'l10',
    src: '/images/l10.jpg',
    altSrc: '/images/letter-photo-2.jpg',
    fallback: '/images/letter-photo-2.jpg',
    tilt: 'rotate-2 translate-y-1',
    tapeStyle: 'bg-rose-100/80 border-rose-300/50 rotate-1',
    label: 'Forever Akka',
  },
  {
    id: 'l11',
    src: '/images/l11.jpg',
    altSrc: '/images/letter-photo-3.jpg',
    fallback: '/images/letter-photo-3.jpg',
    tilt: 'rotate-7 -translate-y-1',
    tapeStyle: 'bg-amber-100/80 border-amber-300/50 -rotate-3',
    label: 'Royal Milestone',
  },
];

export default function EnvelopeLetter({ onNext }) {
  // Stages: 'COVER' -> 'SCROLL' -> 'UNTYING' -> 'UNROLLING' -> 'LETTER_OPEN'
  const [viewState, setViewState] = useState('COVER');
  const [unrollProgress, setUnrollProgress] = useState(0);
  const [visibleWords, setVisibleWords] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const scrollRef = useRef(null);

  // Flatten all words for word-by-word streaming
  const allWords = useRef(
    LETTER_SECTIONS.map((s) => s.text)
      .join(' ')
      .split(' ')
      .filter(Boolean)
  ).current;

  // Active zoomed photo state
  const [activePhotoId, setActivePhotoId] = useState(null);

  const handleOpenSeal = () => {
    soundEngine.playLetterOpen();
    setViewState('SCROLL');
  };

  const handleUntieAndUnroll = () => {
    if (viewState !== 'SCROLL') return;

    soundEngine.playBellChime();
    setViewState('UNTYING');

    setTimeout(() => {
      setViewState('UNROLLING');
      soundEngine.playParchmentUnroll();

      requestAnimationFrame(() => {
        setUnrollProgress(1);
      });

      // Once paper opens, letter typing starts IMMEDIATELY from "My dear Akka,"
      setTimeout(() => {
        setViewState('LETTER_OPEN');
        setVisibleWords(1); // Start immediately!
        confetti({
          particleCount: 45,
          spread: 55,
          origin: { y: 0.5 },
          colors: ['#ffd700', '#f59e0b', '#ffffff', '#e11d48'],
        });
      }, 1800);
    }, 900);
  };

  // Word-by-word typing animation with clearly visible golden sparkle
  useEffect(() => {
    if (viewState !== 'LETTER_OPEN') return;
    if (visibleWords >= allWords.length) {
      setIsTypingDone(true);
      return;
    }

    const timer = setTimeout(() => {
      setVisibleWords((prev) => prev + 1);

      // Smoothly auto-scroll writing container so the active typing line is always in view
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 28);

    return () => clearTimeout(timer);
  }, [viewState, visibleWords, allWords.length]);

  // Tap anywhere on paper to reveal full letter immediately
  const handleSkipTyping = () => {
    setVisibleWords(allWords.length);
    setIsTypingDone(true);
  };

  // Smooth Zoom-out transition before navigating to memories
  const handleNextWithAnimation = () => {
    soundEngine.playCardClick();
    setIsExiting(true);
    setTimeout(() => {
      onNext?.();
    }, 600);
  };

  // Movable touch & hover interaction for bottom photos
  const handlePhotoInteraction = (index, deltaX) => {
    setCardPositions((prev) => {
      const next = [...prev];
      next[index] = {
        x: Math.max(-20, Math.min(20, deltaX * 0.15)),
        y: -5,
        rot: next[index].rot > 0 ? 7 : -7,
      };
      return next;
    });
  };

  const resetPhotoPosition = (index) => {
    setCardPositions((prev) => {
      const next = [...prev];
      const defaultRotations = [-3, 2, -4];
      next[index] = { x: 0, y: 0, rot: defaultRotations[index] };
      return next;
    });
  };

  // Prominent Golden Sparkle Component
  const GoldenSparkle = () => (
    <span className="inline-flex items-center align-middle ml-1.5 pointer-events-none select-none">
      <span className="relative flex items-center justify-center">
        <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-amber-400 opacity-80" />
        <span className="relative text-lg sm:text-xl drop-shadow-[0_0_12px_#f59e0b] filter brightness-125 animate-bounce">
          ✨
        </span>
        <span className="w-1 h-3.5 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 rounded-full shadow-[0_0_8px_#f59e0b] ml-1 animate-pulse" />
      </span>
    </span>
  );

  // Render paragraphs with classic typography, elegant maroon ink, and visible sparkle
  const renderLetterContent = () => {
    let wordsLeft = visibleWords;

    return LETTER_SECTIONS.map((section) => {
      const secWords = section.text.split(' ').filter(Boolean);
      const showCount = Math.min(wordsLeft, secWords.length);
      wordsLeft = Math.max(0, wordsLeft - secWords.length);

      if (showCount === 0) return null;

      const displayedText = secWords.slice(0, showCount).join(' ');
      const isCurrentlyTyping = showCount < secWords.length && showCount > 0;

      // Greeting: "My dear Akka," (Clear, bold & vibrant - NOT dim)
      if (section.type === 'greeting') {
        return (
          <div key={section.id} className="pt-2 sm:pt-3 pb-1.5">
            <h2 className="font-handwritten text-2xl sm:text-3xl md:text-4xl text-[#3d060f] font-black tracking-wide leading-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              {displayedText}
              {isCurrentlyTyping && <GoldenSparkle />}
            </h2>
          </div>
        );
      }

      // Sibling Banter Note
      if (section.type === 'banter') {
        return (
          <p
            key={section.id}
            className="font-classic italic text-xs sm:text-sm text-[#681827] leading-relaxed pt-1 border-t border-[#8b1528]/15"
          >
            {displayedText}
            {isCurrentlyTyping && <GoldenSparkle />}
          </p>
        );
      }

      // Closing Highlight: “Happy Birthday Akka ❤️”
      if (section.type === 'closing') {
        return (
          <div key={section.id} className="pt-2 text-center">
            <p className="font-handwritten text-xl sm:text-2xl md:text-3xl text-[#8b1528] font-bold tracking-wide drop-shadow-sm">
              {displayedText}
              {isCurrentlyTyping && <GoldenSparkle />}
            </p>
          </div>
        );
      }

      // Signoff: "Love you always."
      if (section.type === 'signoff') {
        return (
          <div key={section.id} className="text-center font-classic text-xs sm:text-sm text-[#7c1524] font-semibold tracking-wider">
            {displayedText}
            {isCurrentlyTyping && <GoldenSparkle />}
          </div>
        );
      }

      // Classic Body Paragraphs
      return (
        <p
          key={section.id}
          className="font-classic text-[11px] sm:text-xs md:text-[13px] text-[#4c0f1a] leading-relaxed sm:leading-[1.65] font-medium tracking-normal text-justify"
        >
          {displayedText}
          {isCurrentlyTyping && <GoldenSparkle />}
        </p>
      );
    });
  };

  return (
    <div
      onClick={() => {
        setActivePhoto(null);
        setActiveScatterPhoto(null);
      }}
      className={`fixed inset-0 w-full h-[100dvh] max-h-[100dvh] bg-[#7c1524] flex flex-col justify-between items-center py-1 sm:py-2 px-2 sm:px-4 select-none overflow-hidden z-40 transition-all duration-700 ease-in-out ${
        isExiting ? 'scale-75 opacity-0 blur-md pointer-events-none' : 'scale-100 opacity-100'
      }`}
    >
      {/* Background radial spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(163,26,45,0.45)_0%,rgba(92,10,21,0.98)_100%)] pointer-events-none" />

      {/* Floating subtle ambient golden sparkles in the background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            style={{
              top: `${(i * 19 + 7) % 95}%`,
              left: `${(i * 29 + 11) % 95}%`,
              animationDelay: `${(i * 0.4) % 3}s`,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-amber-300/40 blur-[0.5px] animate-pulse"
          />
        ))}
        <div className="absolute -top-16 -left-16 w-60 h-60 rounded-full bg-rose-600/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-60 h-60 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          STAGE 1: COVER ENVELOPE (Cream Card with Crimson Envelope)
          ───────────────────────────────────────────────────────────── */}
      {viewState === 'COVER' && (
        <div className="relative z-10 max-w-[320px] sm:max-w-[380px] w-full bg-[#fbf9f6] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.65)] p-5 sm:p-7 text-center animate-scale-up border border-stone-200 my-auto">
          <div className="mb-4 sm:mb-5">
            <h2 className="font-handwritten text-4xl sm:text-5xl text-[#8b1528] font-bold leading-none tracking-wide">
              Happy Birthday!
            </h2>
            <p className="font-handwritten text-3xl sm:text-4xl text-[#8b1528] font-bold mt-1">
              Priyanga
            </p>
          </div>

          <div
            onClick={handleOpenSeal}
            className="relative w-full max-w-[250px] sm:max-w-[280px] mx-auto aspect-[16/11] bg-gradient-to-b from-[#8f192b] to-[#6d1120] rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.45)] border border-rose-950 flex items-center justify-center overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 border-t-[68px] sm:border-t-[80px] border-t-[#a82236] border-l-[125px] sm:border-l-[140px] border-l-transparent border-r-[125px] sm:border-r-[140px] border-r-transparent pointer-events-none opacity-85" />
            <div className="absolute inset-0 border-b-[68px] sm:border-b-[80px] border-b-[#5a0d18] border-l-[125px] sm:border-l-[140px] border-l-transparent border-r-[125px] sm:border-r-[140px] border-r-transparent pointer-events-none opacity-90" />

            <button
              onClick={handleOpenSeal}
              className="relative z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 shadow-[0_0_20px_rgba(245,158,11,0.7)] flex items-center justify-center border-2 border-amber-200 group-hover:scale-110 active:scale-95 transition-transform"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-amber-600/40 flex items-center justify-center bg-amber-400 shadow-inner">
                <span className="font-royal text-base font-black text-amber-950 tracking-wider">
                  P
                </span>
              </div>
            </button>
          </div>

          <p className="text-[10px] sm:text-[11px] text-stone-500 font-sans mt-3.5 sm:mt-4 tracking-wider uppercase font-medium">
            Tap the golden seal to open
          </p>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STAGE 2 & 3: ROLLED SCROLL & THREAD UNTYING
          ───────────────────────────────────────────────────────────── */}
      {(viewState === 'SCROLL' || viewState === 'UNTYING') && (
        <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center animate-scale-up px-3 my-auto">
          <div
            onClick={handleUntieAndUnroll}
            className="relative w-full max-w-[440px] sm:max-w-[580px] aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_25px_65px_rgba(0,0,0,0.85)] cursor-pointer group transition-transform duration-500 hover:scale-[1.02] active:scale-[0.98]"
          >
            <img
              src="/images/royal-scroll.jpg"
              alt="Royal Papyrus Scroll"
              className={`w-full h-full object-cover object-center transition-opacity duration-700 ${
                viewState === 'UNTYING' ? 'opacity-0' : 'opacity-100'
              }`}
            />

            <img
              src="/images/scroll-untied.jpg"
              alt="Untied Papyrus Scroll"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
                viewState === 'UNTYING' ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />

            {viewState === 'SCROLL' && (
              <div className="absolute left-[52%] top-[42%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <span className="relative flex h-8 w-8">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-8 w-8 bg-amber-400/30 border border-amber-200" />
                </span>
              </div>
            )}
          </div>

          <button
            onClick={handleUntieAndUnroll}
            disabled={viewState !== 'SCROLL'}
            className="mt-4 px-7 py-3 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-stone-900 font-heading font-extrabold text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all"
          >
            {viewState === 'SCROLL' && 'Untie Red Thread & Open Letter →'}
            {viewState === 'UNTYING' && 'Untying thread cord & bells...'}
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STAGE 4: NATURAL PAPER UNROLLING (NO FAKE BARS)
          ───────────────────────────────────────────────────────────── */}
      {viewState === 'UNROLLING' && (
        <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center px-3 animate-scale-up my-auto">
          <div
            className="relative w-full max-w-[440px] sm:max-w-[580px] aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-amber-900/40 transition-all duration-[1800ms] ease-out"
            style={{
              clipPath:
                unrollProgress === 1
                  ? 'inset(0% 0% 0% 0%)'
                  : 'inset(42% 0% 42% 0%)',
              transform: unrollProgress === 1 ? 'scale(1)' : 'scale(0.96)',
            }}
          >
            <img
              src="/images/unrolled-scroll.jpg"
              alt="Unrolling Scroll"
              className="w-full h-full object-cover object-center pointer-events-none"
            />
          </div>

          <p className="text-xs sm:text-sm text-amber-300 font-sans mt-3 tracking-widest uppercase font-semibold animate-pulse">
            Unrolling royal papyrus parchment...
          </p>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STAGE 5: FINAL LETTER SCREEN (STRICTLY INSIDE GREEN/RED BOUNDS)
          ───────────────────────────────────────────────────────────── */}
      {viewState === 'LETTER_OPEN' && (
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col justify-between items-center h-full max-h-[100dvh] py-1 animate-scale-up">
          {/* Main Large Parchment Paper - Restored to FULL original vertical length */}
          <div
            onClick={handleSkipTyping}
            title="Tap to reveal entire letter"
            className="relative w-full max-w-[420px] sm:max-w-[560px] md:max-w-[620px] flex-1 min-h-[250px] xs:min-h-[280px] sm:min-h-[360px] max-h-[53dvh] xs:max-h-[55dvh] sm:max-h-[64dvh] md:max-h-[68dvh] rounded-2xl overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.85)] border border-amber-900/30 cursor-pointer flex-shrink-0"
          >
            {/* Real Unrolled Parchment Background with Top & Bottom Folds and Bells on Right */}
            <img
              src="/images/unrolled-scroll.jpg"
              alt="Unrolled Papyrus Parchment"
              className="absolute inset-0 w-full h-full object-fill pointer-events-none"
            />

            {/* ─────────────────────────────────────────────────────────
                EXACT GREEN & RED BOUNDARIES:
                top: 23% (lowered down so 'My dear Akka' is 100% bright, crisp & clear)
                bottom: 15% (cleanly above bottom roll)
                left: 14% (inside left paper edge)
                right: 20% (fills natural paper width, removing right gap)
                ───────────────────────────────────────────────────────── */}
            <div
              ref={scrollRef}
              style={{
                top: '23%',
                bottom: '15%',
                left: '14%',
                right: '20%',
              }}
              className="absolute overflow-y-auto no-scrollbar scroll-smooth pr-1.5 select-text"
            >
              <div className="space-y-3 sm:space-y-4 pb-4">
                {renderLetterContent()}
              </div>
            </div>

            {/* Gentle scroll fade gradient indicator at bottom inside paper */}
            <div
              style={{
                bottom: '15%',
                left: '14%',
                right: '20%',
              }}
              className="absolute h-6 bg-gradient-to-t from-[#e9dbbe]/80 to-transparent pointer-events-none rounded-b-md"
            />
          </div>

          {/* ─────────────────────────────────────────────────────────────
              AESTHETIC SCATTERED MEMORY SCRAPBOOK WALL (l1 to l11)
              Clean horizontal and vertical gaps: airy, aesthetic & zero congestion
              ───────────────────────────────────────────────────────────── */}
          <div className="w-full flex flex-col justify-center items-center gap-2.5 xs:gap-3 sm:gap-4 my-auto py-1.5 z-20 flex-shrink-0">
            {/* Tier 1: Upper Scattered Row (4 photos with clean horizontal gap) */}
            <div className="flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 w-full max-w-[340px] xs:max-w-[370px] sm:max-w-xl px-1">
              {AESTHETIC_MEMORY_PHOTOS.slice(0, 4).map((photo) => {
                const isZoomed = activePhotoId === photo.id;
                return (
                  <div
                    key={photo.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEngine.playCardClick();
                      setActivePhotoId(isZoomed ? null : photo.id);
                    }}
                    style={{
                      transform: isZoomed
                        ? 'translate3d(0px, -20px, 0px) scale(1.85) rotate(0deg)'
                        : undefined,
                      zIndex: isZoomed ? 60 : undefined,
                    }}
                    className={`relative w-[60px] xs:w-[68px] sm:w-[84px] md:w-[96px] aspect-[4/3.2] bg-[#fefefe] p-0.5 sm:p-1 pb-1.5 sm:pb-2 rounded-lg sm:rounded-xl shadow-[0_6px_18px_rgba(0,0,0,0.65)] border border-stone-200 cursor-pointer select-none transition-all duration-300 ease-out origin-center ${
                      photo.tilt
                    } ${
                      isZoomed
                        ? 'shadow-[0_25px_50px_rgba(0,0,0,0.95)] ring-4 ring-amber-300'
                        : 'hover:scale-105 hover:z-30'
                    }`}
                  >
                    {/* Washi Tape */}
                    <div
                      className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-5 sm:w-6 h-1.5 sm:h-2 rounded-xs border shadow-xs pointer-events-none ${photo.tapeStyle}`}
                    />

                    <div className="w-full h-full rounded sm:rounded-md overflow-hidden bg-slate-900 shadow-inner">
                      <img
                        src={photo.src}
                        alt={photo.label}
                        className="w-full h-full object-cover pointer-events-none object-[center_15%]"
                        onError={(e) => {
                          const attempts = parseInt(e.target.dataset.attempts || '0', 10);
                          const altPaths = [
                            photo.altSrc,
                            `/${photo.id}.jpg`,
                            `/images/${photo.id}.png`,
                            `/${photo.id}.png`,
                            `/images/${photo.id}.jpeg`,
                            `/${photo.id}.jpeg`,
                          ];
                          if (attempts < altPaths.length) {
                            e.target.dataset.attempts = (attempts + 1).toString();
                            e.target.src = altPaths[attempts];
                          } else {
                            e.target.src = photo.fallback;
                          }
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tier 2: Middle Scattered Row (4 photos with clean horizontal gap) */}
            <div className="flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 w-full max-w-[340px] xs:max-w-[370px] sm:max-w-xl px-1">
              {AESTHETIC_MEMORY_PHOTOS.slice(4, 8).map((photo) => {
                const isZoomed = activePhotoId === photo.id;
                return (
                  <div
                    key={photo.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEngine.playCardClick();
                      setActivePhotoId(isZoomed ? null : photo.id);
                    }}
                    style={{
                      transform: isZoomed
                        ? 'translate3d(0px, -20px, 0px) scale(1.85) rotate(0deg)'
                        : undefined,
                      zIndex: isZoomed ? 60 : undefined,
                    }}
                    className={`relative w-[60px] xs:w-[68px] sm:w-[84px] md:w-[96px] aspect-[4/3.2] bg-[#fefefe] p-0.5 sm:p-1 pb-1.5 sm:pb-2 rounded-lg sm:rounded-xl shadow-[0_6px_18px_rgba(0,0,0,0.65)] border border-stone-200 cursor-pointer select-none transition-all duration-300 ease-out origin-center ${
                      photo.tilt
                    } ${
                      isZoomed
                        ? 'shadow-[0_25px_50px_rgba(0,0,0,0.95)] ring-4 ring-amber-300'
                        : 'hover:scale-105 hover:z-30'
                    }`}
                  >
                    {/* Washi Tape */}
                    <div
                      className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-5 sm:w-6 h-1.5 sm:h-2 rounded-xs border shadow-xs pointer-events-none ${photo.tapeStyle}`}
                    />

                    <div className="w-full h-full rounded sm:rounded-md overflow-hidden bg-slate-900 shadow-inner">
                      <img
                        src={photo.src}
                        alt={photo.label}
                        className="w-full h-full object-cover pointer-events-none object-[center_15%]"
                        onError={(e) => {
                          const attempts = parseInt(e.target.dataset.attempts || '0', 10);
                          const altPaths = [
                            photo.altSrc,
                            `/${photo.id}.jpg`,
                            `/images/${photo.id}.png`,
                            `/${photo.id}.png`,
                            `/images/${photo.id}.jpeg`,
                            `/${photo.id}.jpeg`,
                          ];
                          if (attempts < altPaths.length) {
                            e.target.dataset.attempts = (attempts + 1).toString();
                            e.target.src = altPaths[attempts];
                          } else {
                            e.target.src = photo.fallback;
                          }
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tier 3: Lower Milestone Row (3 photos with clean horizontal gap) */}
            <div className="flex items-center justify-center gap-2 xs:gap-2.5 sm:gap-3.5 w-full max-w-[340px] xs:max-w-[370px] sm:max-w-xl px-1">
              {AESTHETIC_MEMORY_PHOTOS.slice(8, 11).map((photo) => {
                const isZoomed = activePhotoId === photo.id;
                return (
                  <div
                    key={photo.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEngine.playCardClick();
                      setActivePhotoId(isZoomed ? null : photo.id);
                    }}
                    style={{
                      transform: isZoomed
                        ? 'translate3d(0px, -22px, 0px) scale(1.85) rotate(0deg)'
                        : undefined,
                      zIndex: isZoomed ? 60 : undefined,
                    }}
                    className={`relative w-[66px] xs:w-[74px] sm:w-[90px] md:w-[102px] aspect-[4/3.2] bg-[#fefefe] p-0.5 sm:p-1 pb-1.5 sm:pb-2 rounded-lg sm:rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.7)] border border-stone-200 cursor-pointer select-none transition-all duration-300 ease-out origin-center ${
                      photo.tilt
                    } ${
                      isZoomed
                        ? 'shadow-[0_25px_50px_rgba(0,0,0,0.95)] ring-4 ring-amber-300'
                        : 'hover:scale-105'
                    }`}
                  >
                    {/* Washi Tape */}
                    <div
                      className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 sm:w-7 h-1.5 sm:h-2 rounded-xs border shadow-xs pointer-events-none ${photo.tapeStyle}`}
                    />

                    <div className="w-full h-full rounded sm:rounded-lg overflow-hidden bg-slate-900 shadow-inner">
                      <img
                        src={photo.src}
                        alt={photo.label}
                        className="w-full h-full object-cover pointer-events-none object-[center_15%]"
                        onError={(e) => {
                          const attempts = parseInt(e.target.dataset.attempts || '0', 10);
                          const altPaths = [
                            photo.altSrc,
                            `/${photo.id}.jpg`,
                            `/images/${photo.id}.png`,
                            `/${photo.id}.png`,
                          ];
                          if (attempts < altPaths.length) {
                            e.target.dataset.attempts = (attempts + 1).toString();
                            e.target.src = altPaths[attempts];
                          } else {
                            e.target.src = photo.fallback;
                          }
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Button Section - 100% Clearly Visible & Elevated */}
          <div className="flex-shrink-0 z-30 pt-1 pb-6 sm:pb-4 mb-2">
            <button
              onClick={handleNextWithAnimation}
              className="px-7 py-2.5 sm:px-9 sm:py-3 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-amber-300 text-stone-900 font-heading font-extrabold text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_22px_rgba(244,63,94,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              EXPLORE OUR MEMORIES →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
