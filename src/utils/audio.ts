/**
 * Minimalist, ethereal ambient chord generator using the Web Audio API.
 * Emulates a warm, gentle felt piano / music box with subtle harmonic shimmer.
 * Never fails with 404 or CORS issues.
 */

class AmbientSoundtrack {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;

  // Gentle pentatonic / lydian chords in key of Db / F / Ab
  private chordProgressions = [
    [261.63, 329.63, 392.0, 493.88], // Cmaj7
    [220.0, 261.63, 329.63, 392.0],  // Am7
    [174.61, 220.0, 261.63, 329.63], // Fmaj7
    [196.0, 246.94, 293.66, 392.0],  // Gadd9
    [130.81, 196.0, 246.94, 329.63], // C low pad
  ];

  private currentChordIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.08, this.ctx.currentTime); // Soft background volume
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playGentleTone(freq: number, startTime: number, duration: number, isHighShimmer = false) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Warm sine + subtle triangle for warm felt-key resonance
    osc.type = isHighShimmer ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    // Warm lowpass filter to remove harshness
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isHighShimmer ? 1800 : 750, startTime);

    // Envelope: slow, pillowy attack, long acoustic decay
    const attack = isHighShimmer ? 0.4 : 0.8;
    const decay = duration * 0.9;

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(isHighShimmer ? 0.025 : 0.06, startTime + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  private playNextChord() {
    if (!this.ctx || !this.isPlaying) return;

    const chord = this.chordProgressions[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chordProgressions.length;

    const now = this.ctx.currentTime;
    const chordDuration = 5.5; // Slow, contemplative cadence

    // Play base chord notes with slight humanized arpeggio delays
    chord.forEach((freq, idx) => {
      const stagger = idx * 0.18 + Math.random() * 0.08;
      this.playGentleTone(freq, now + stagger, chordDuration);
    });

    // Occasional gentle high chime
    if (Math.random() > 0.4) {
      const highFreq = chord[Math.floor(Math.random() * chord.length)] * 2;
      this.playGentleTone(highFreq, now + 1.2, 4.0, true);
    }

    this.timerId = window.setTimeout(() => {
      this.playNextChord();
    }, 4800);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    this.initContext();
    this.isPlaying = true;
    this.playNextChord();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }
}

export const ambientSoundtrack = new AmbientSoundtrack();
