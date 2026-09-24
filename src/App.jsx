import React, { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import LockScreen from './components/LockScreen';
import DateExplosion from './components/DateExplosion';
import SurpriseLoader from './components/SurpriseLoader';
import EnvelopeLetter from './components/EnvelopeLetter';
import SceneHero from './components/SceneHero';
import CandleFinale from './components/CandleFinale';
import { soundEngine } from './utils/audio';

export default function App() {
  // Flow requested by user:
  // 1: 'LOCK' (Passcode screen with polaroid & big ribbon bow)
  // 2: 'EXPLOSION' (Date particle blast: 26 • 09 • 2026)
  // 3: 'LOADING' (Luxury crimson editorial loader)
  // 4: 'LETTER' (Cover letter -> Rolled scroll with thread untie -> Scalloped letter & 3-photo column)
  // 5: 'HERO' (100% Fullscreen Sibling Photo & 'Blow Candle' button)
  // 6: 'CANDLE' (Single candle blow -> Falling photo ribbons & confetti blast!)
  const [stage, setStage] = useState('LOCK');

  const handleUnlock = (code) => {
    setStage('EXPLOSION');
  };

  const handleExplosionComplete = () => {
    setStage('LOADING');
  };

  const handleLoadingComplete = () => {
    // Directly go to Cover Letter after Loading!
    setStage('LETTER');
    soundEngine.startAmbientMusic();
  };

  const handleLetterComplete = () => {
    // After Letter -> go to Fullscreen Sibling Hero Photo!
    setStage('HERO');
  };

  const handleHeroComplete = () => {
    // After Hero Photo -> go to Candle Blow Finale!
    setStage('CANDLE');
  };

  const handleRestart = () => {
    setStage('LOCK');
  };

  return (
    <div className="min-h-screen w-full bg-[#7c1524] text-slate-100 font-sans relative selection:bg-rose-400 selection:text-black overflow-x-hidden">
      {/* Sibling Love Magnetic Cursor for Desktop */}
      <CustomCursor />

      {/* Stage 1: Passcode Keypad Screen */}
      {stage === 'LOCK' && <LockScreen onUnlock={handleUnlock} />}

      {/* Stage 2: Date Explosion Particle Blast */}
      {stage === 'EXPLOSION' && (
        <DateExplosion onComplete={handleExplosionComplete} />
      )}

      {/* Stage 3: Luxury Crimson Editorial Loader */}
      {stage === 'LOADING' && (
        <SurpriseLoader onLoaded={handleLoadingComplete} />
      )}

      {/* Stage 4: Cover Letter -> Rolled Scroll with Thread Untie -> Letter & 3 Photos */}
      {stage === 'LETTER' && <EnvelopeLetter onNext={handleLetterComplete} />}

      {/* Stage 5: 100% Fullscreen Cinematic Sibling Hero Screen */}
      {stage === 'HERO' && <SceneHero onNext={handleHeroComplete} />}

      {/* Stage 6: Single Candle Blow Finale & Falling Photo Ribbons Blast */}
      {stage === 'CANDLE' && <CandleFinale onRestart={handleRestart} />}
    </div>
  );
}
