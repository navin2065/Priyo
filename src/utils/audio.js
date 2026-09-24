// High-end ambient audio synthesizer & sound effects generator for Priya's 25th Birthday
// Uses Web Audio API so it plays instantaneously without requiring any external mp3 files or network lag!

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicInterval = null;
    this.isMuted = false;
    this.customAudio = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft chime note (like a luxury music box / celesta)
  playNote(frequency, duration = 1.2, time = 0, gainLevel = 0.12) {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime + time;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Warm sine + subtle triangle harmonic
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, now);

    // Filter to soften the highs
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(gainLevel, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  // Melodic Birthday Ambient Soundtrack (Acoustic Dream Music Box)
  startAmbientMusic() {
    this.init();
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;

    // Birthday melody notes in C Major / G Major peaceful scale
    // C4, D4, E4, F4, G4, A4, B4, C5, D5, E5
    const notes = {
      C4: 261.63,
      D4: 293.66,
      E4: 329.63,
      F4: 349.23,
      G4: 392.00,
      A4: 440.00,
      B4: 493.88,
      C5: 523.25,
      D5: 587.33,
      E5: 659.25,
      G5: 783.99,
    };

    // Beautiful celestial arpeggiated motif
    const sequence = [
      { note: notes.G4, time: 0 },
      { note: notes.G4, time: 0.35 },
      { note: notes.A4, time: 0.7 },
      { note: notes.G4, time: 1.2 },
      { note: notes.C5, time: 1.7 },
      { note: notes.B4, time: 2.2 },

      { note: notes.G4, time: 3.2 },
      { note: notes.G4, time: 3.55 },
      { note: notes.A4, time: 3.9 },
      { note: notes.G4, time: 4.4 },
      { note: notes.D5, time: 4.9 },
      { note: notes.C5, time: 5.4 },

      { note: notes.G4, time: 6.4 },
      { note: notes.G4, time: 6.75 },
      { note: notes.G5, time: 7.1 },
      { note: notes.E5, time: 7.6 },
      { note: notes.C5, time: 8.1 },
      { note: notes.B4, time: 8.6 },
      { note: notes.A4, time: 9.1 },

      { note: notes.F4, time: 10.1 },
      { note: notes.F4, time: 10.45 },
      { note: notes.E5, time: 10.8 },
      { note: notes.C5, time: 11.3 },
      { note: notes.D5, time: 11.8 },
      { note: notes.C5, time: 12.4 },
    ];

    const playLoop = () => {
      if (!this.isPlayingMusic) return;
      sequence.forEach((item) => {
        this.playNote(item.note, 1.4, item.time, 0.08);
      });
    };

    playLoop();
    this.musicInterval = setInterval(playLoop, 13500);
  }

  stopAmbientMusic() {
    this.isPlayingMusic = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  toggleMusic() {
    if (this.isPlayingMusic) {
      this.stopAmbientMusic();
      return false;
    } else {
      this.startAmbientMusic();
      return true;
    }
  }

  // Sound Effect: Sparkle & Confetti Explosion
  playConfettiPop() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      this.playNote(freq, 0.6, idx * 0.06, 0.15);
    });
  }

  // Sound Effect: Candle Blow / Whoosh
  playCandleBlow() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.8;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, now);
    filter.Q.setValueAtTime(1.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 0.8);
  }

  // Sound Effect: Golden Bell Chime (Crystalline ringing bells on scroll)
  playBellChime() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    // Layered resonant bell tones with sparkling overtones
    [880, 1318.5, 1760, 2637].forEach((freq, idx) => {
      this.playNote(freq, 1.4, idx * 0.08, 0.09 / (idx + 1));
    });
  }

  // Sound Effect: Ancient parchment unrolling paper rustle
  playParchmentUnroll() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const bufferSize = Math.floor(this.ctx.sampleRate * 1.8);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Filtered pink/brown noise texture mimicking papyrus fiber sliding
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99 * b0 + white * 0.05;
      b1 = 0.96 * b1 + white * 0.07;
      b2 = 0.88 * b2 + white * 0.12;
      data[i] = (b0 + b1 + b2) * 0.18;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.linearRampToValueAtTime(1400, now + 0.9);
    filter.frequency.linearRampToValueAtTime(600, now + 1.8);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.2);
    gain.gain.setValueAtTime(0.07, now + 1.4);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 1.8);
  }

  // Sound Effect: Letter unseal chime
  playLetterOpen() {
    this.init();
    if (!this.ctx) return;
    [440, 554.37, 659.25, 880].forEach((freq, idx) => {
      this.playNote(freq, 0.8, idx * 0.09, 0.12);
    });
  }

  // Sound Effect: Card Flip / Interactive Click
  playCardClick() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Play Birthday Song from public folder (prioritizing /sound.mp3)
  playBirthdaySong(customUrl = null) {
    this.init();
    // 1. Immediately cut off any previous ambient music
    this.stopAmbientMusic();

    if (this.customAudio) {
      try {
        this.customAudio.pause();
        this.customAudio.currentTime = 0;
      } catch (err) {
        // ignore
      }
    }

    const candidateUrls = [
      customUrl,
      '/sound.mp3',
      '/birthday-song.mp3',
      '/song.mp3',
      '/birthday.mp3',
      '/music.mp3',
      '/bgm.mp3',
      '/audio.mp3'
    ].filter(Boolean);

    let currentIndex = 0;
    const tryNext = () => {
      if (currentIndex >= candidateUrls.length) {
        // Fallback to built-in ambient synthesizer if no file found
        this.startAmbientMusic();
        return;
      }
      const url = candidateUrls[currentIndex];
      currentIndex++;
      const audio = new Audio(url);
      audio.volume = 0.9;
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.customAudio = audio;
            // Stop synthesizer ambient if custom song is playing
            this.stopAmbientMusic();
          })
          .catch(() => {
            tryNext();
          });
      } else {
        this.customAudio = audio;
      }
    };

    tryNext();
  }

  stopBirthdaySong() {
    if (this.customAudio) {
      try {
        this.customAudio.pause();
        this.customAudio.currentTime = 0;
      } catch (err) {
        // ignore
      }
      this.customAudio = null;
    }
    this.stopAmbientMusic();
  }
}

export const soundEngine = new SoundEngine();

