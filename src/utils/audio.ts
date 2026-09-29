/**
 * Web Audio API gentle ambient music generator fallback
 * Plays pleasant, soothing pentatonic notes if music.mp3 is not supplied.
 */

class AmbientMusicController {
  private ctx: AudioContext | null = null;
  private isRunning = false;
  private timer: number | null = null;
  private audioEl: HTMLAudioElement | null = null;
  private usingFileAudio = false;

  public initAudioFile(filePath: string) {
    if (typeof window === 'undefined') return;
    this.audioEl = new Audio(filePath);
    this.audioEl.loop = true;
    this.audioEl.preload = 'auto';

    this.audioEl.addEventListener('error', () => {
      // Audio file not present or failed to load; will fall back to Web Audio API
      this.usingFileAudio = false;
    });

    this.audioEl.addEventListener('canplaythrough', () => {
      this.usingFileAudio = true;
    });
  }

  public play() {
    this.isRunning = true;

    // Try playing actual audio element first
    if (this.audioEl && this.usingFileAudio) {
      this.audioEl.play().catch(() => {
        // Autoplay policy or load failed, use Web Audio API synthesis
        this.usingFileAudio = false;
        this.startSynth();
      });
      return;
    }

    this.startSynth();
  }

  private startSynth() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (!this.ctx) return;

    // Pleasant calm chords in C Major / Pentatonic: C4, E4, G4, A4, B4, C5, D5, E5
    const notes = [261.63, 329.63, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25];
    let noteIdx = 0;

    const playChime = () => {
      if (!this.isRunning || !this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      // Pick soothing sequence
      const freq = notes[noteIdx % notes.length];
      noteIdx = (noteIdx + Math.floor(Math.random() * 2) + 1) % notes.length;

      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.045, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 2.4);

      // Schedule next chime with natural rhythmic variation (1.2s - 2.0s)
      const nextTime = 1200 + Math.random() * 800;
      this.timer = window.setTimeout(playChime, nextTime);
    };

    playChime();
  }

  public pause() {
    this.isRunning = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.audioEl) {
      this.audioEl.pause();
    }
  }

  public toggle(): boolean {
    if (this.isRunning) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public playSoundEffect(type: 'click' | 'sparkle' | 'chime' | 'reveal') {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'sparkle') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.25);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'chime' || type === 'reveal') {
        // Beautiful two-tone celebration chime
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          if (!this.ctx) return;
          const toneOsc = this.ctx.createOscillator();
          const toneGain = this.ctx.createGain();
          const toneTime = now + idx * 0.08;

          toneOsc.type = 'sine';
          toneOsc.frequency.setValueAtTime(freq, toneTime);

          toneGain.gain.setValueAtTime(0.001, toneTime);
          toneGain.gain.exponentialRampToValueAtTime(0.06, toneTime + 0.04);
          toneGain.gain.exponentialRampToValueAtTime(0.0001, toneTime + 0.9);

          toneOsc.connect(toneGain);
          toneGain.connect(this.ctx.destination);
          toneOsc.start(toneTime);
          toneOsc.stop(toneTime + 1.0);
        });
      }
    } catch {
      // Audio context might be restricted before interaction; safely silent
    }
  }
}

export const ambientMusic = new AmbientMusicController();
