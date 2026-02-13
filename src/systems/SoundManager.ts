export class SoundManager {
  ctx: AudioContext | null;
  muted: boolean;
  volume: number;
  _initialized: boolean;

  constructor() {
    this.ctx = null;
    this.muted = false;
    this.volume = 0.3;
    this._initialized = false;
  }

  init(): void {
    if (this._initialized) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext!)();
      this._initialized = true;
    } catch (e) {
      // Web Audio not supported
    }
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
  }

  toggleMute(): boolean {
    this.muted = !this.muted;
    return this.muted;
  }

  _gain(vol: number, time: number): GainNode {
    const ctx = this.ctx!;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol * this.volume, time);
    return g;
  }

  _noise(duration: number): AudioBufferSourceNode {
    const ctx = this.ctx!;
    const sampleRate = ctx.sampleRate;
    const length = sampleRate * duration;
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    return src;
  }

  playShot(weaponKey: string): void {
    if (!this.ctx || this.muted) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;

    switch (weaponKey) {
      case 'slingshot': {
        // Rubber snap — short noise burst + frequency sweep up
        const noise = this._noise(0.04);
        const bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.setValueAtTime(800, t);
        bp.frequency.exponentialRampToValueAtTime(3000, t + 0.04);
        bp.Q.value = 3;
        const g = this._gain(0.3, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
        noise.connect(bp).connect(g).connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.04);
        // Twang overtone
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, t);
        osc.frequency.exponentialRampToValueAtTime(1200, t + 0.03);
        const g2 = this._gain(0.15, t);
        g2.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
        osc.connect(g2).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.05);
        break;
      }
      case 'pistol': {
        const noise = this._noise(0.05);
        const hp = ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 2000;
        const g = this._gain(0.4, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
        noise.connect(hp).connect(g).connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.05);
        break;
      }
      case 'revolver': {
        // Deep boom — like shotgun but shorter, more punch
        const noise = this._noise(0.08);
        const lp = ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.setValueAtTime(2000, t);
        lp.frequency.exponentialRampToValueAtTime(150, t + 0.08);
        const g = this._gain(0.5, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
        noise.connect(lp).connect(g).connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.08);
        // Low punch
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(120, t);
        osc.frequency.exponentialRampToValueAtTime(60, t + 0.06);
        const g2 = this._gain(0.3, t);
        g2.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
        osc.connect(g2).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.06);
        break;
      }
      case 'shotgun': {
        const noise = this._noise(0.1);
        const lp = ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.setValueAtTime(3000, t);
        lp.frequency.exponentialRampToValueAtTime(200, t + 0.1);
        const g = this._gain(0.5, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        noise.connect(lp).connect(g).connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.1);
        break;
      }
      case 'doublebarrel': {
        // Two shotgun booms 100ms apart
        for (let i = 0; i < 2; i++) {
          const offset = i * 0.1;
          const noise = this._noise(0.1);
          const lp = ctx.createBiquadFilter();
          lp.type = 'lowpass';
          lp.frequency.setValueAtTime(3000, t + offset);
          lp.frequency.exponentialRampToValueAtTime(200, t + offset + 0.1);
          const g = this._gain(0.45, t + offset);
          g.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.1);
          noise.connect(lp).connect(g).connect(ctx.destination);
          noise.start(t + offset);
          noise.stop(t + offset + 0.1);
        }
        break;
      }
      case 'smg': {
        // Rapid click — like machinegun but higher pitch
        const noise = this._noise(0.02);
        const bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 2500;
        const g = this._gain(0.25, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
        noise.connect(bp).connect(g).connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.02);
        break;
      }
      case 'rifle': {
        // Sharp crack + sine ring
        const noise = this._noise(0.03);
        const hp = ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 3000;
        const g1 = this._gain(0.4, t);
        g1.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
        noise.connect(hp).connect(g1).connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.03);
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 1200;
        const g2 = this._gain(0.15, t);
        g2.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        osc.connect(g2).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.1);
        break;
      }
      case 'crossbow': {
        // Twang — sine sweep down + short noise
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1500, t);
        osc.frequency.exponentialRampToValueAtTime(200, t + 0.12);
        const g1 = this._gain(0.3, t);
        g1.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        osc.connect(g1).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.12);
        const noise = this._noise(0.03);
        const hp = ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 4000;
        const g2 = this._gain(0.2, t);
        g2.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
        noise.connect(hp).connect(g2).connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.03);
        break;
      }
      case 'lever_rifle': {
        // Click preceding + crack
        const clickOsc = ctx.createOscillator();
        clickOsc.type = 'square';
        clickOsc.frequency.value = 3000;
        const gClick = this._gain(0.15, t);
        gClick.gain.exponentialRampToValueAtTime(0.001, t + 0.01);
        clickOsc.connect(gClick).connect(ctx.destination);
        clickOsc.start(t);
        clickOsc.stop(t + 0.01);
        // Main crack
        const noise = this._noise(0.04);
        const hp = ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 2500;
        const g1 = this._gain(0.4, t + 0.015);
        g1.gain.exponentialRampToValueAtTime(0.001, t + 0.055);
        noise.connect(hp).connect(g1).connect(ctx.destination);
        noise.start(t + 0.015);
        noise.stop(t + 0.055);
        break;
      }
      case 'machinegun': {
        const noise = this._noise(0.02);
        const bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 1500;
        const g = this._gain(0.3, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
        noise.connect(bp).connect(g).connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.02);
        break;
      }
      case 'hunting_rifle': {
        // Heavy crack — rifle with more bass
        const noise = this._noise(0.04);
        const bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 1800;
        bp.Q.value = 1;
        const g1 = this._gain(0.45, t);
        g1.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
        noise.connect(bp).connect(g1).connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.04);
        // Bass body
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, t);
        osc.frequency.exponentialRampToValueAtTime(80, t + 0.08);
        const g2 = this._gain(0.3, t);
        g2.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
        osc.connect(g2).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.08);
        break;
      }
      case 'auto_shotgun': {
        // Punchy boom
        const noise = this._noise(0.07);
        const lp = ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.setValueAtTime(2500, t);
        lp.frequency.exponentialRampToValueAtTime(300, t + 0.07);
        const g = this._gain(0.45, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
        noise.connect(lp).connect(g).connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.07);
        break;
      }
      case 'sniper': {
        // Sharp crack + long echo
        const noise = this._noise(0.03);
        const hp = ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 4000;
        const g1 = this._gain(0.5, t);
        g1.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
        noise.connect(hp).connect(g1).connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.03);
        // Long reverb tail
        const echo = this._noise(0.3);
        const lp = ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.setValueAtTime(2000, t + 0.03);
        lp.frequency.exponentialRampToValueAtTime(200, t + 0.33);
        const g2 = this._gain(0.15, t + 0.03);
        g2.gain.exponentialRampToValueAtTime(0.001, t + 0.33);
        echo.connect(lp).connect(g2).connect(ctx.destination);
        echo.start(t + 0.03);
        echo.stop(t + 0.33);
        break;
      }
      case 'flamethrower': {
        // Continuous hiss — low-pass noise
        const noise = this._noise(0.08);
        const lp = ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 1200;
        const g = this._gain(0.2, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
        noise.connect(lp).connect(g).connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.08);
        break;
      }
      case 'grenade_launcher': {
        // Hollow thump
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, t);
        osc.frequency.exponentialRampToValueAtTime(60, t + 0.1);
        const g1 = this._gain(0.4, t);
        g1.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        osc.connect(g1).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.1);
        // Breathy noise
        const noise = this._noise(0.06);
        const bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 400;
        bp.Q.value = 1;
        const g2 = this._gain(0.25, t);
        g2.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
        noise.connect(bp).connect(g2).connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.06);
        break;
      }
      case 'assault_rifle': {
        // Sharp crack — like rifle but shorter
        const noise = this._noise(0.025);
        const hp = ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 2800;
        const g = this._gain(0.35, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.025);
        noise.connect(hp).connect(g).connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.025);
        break;
      }
      case 'heavy_mg': {
        // Deep thud
        const noise = this._noise(0.03);
        const lp = ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 1200;
        const g = this._gain(0.4, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
        noise.connect(lp).connect(g).connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.03);
        break;
      }
      case 'rocket':
      case 'rpg': {
        // Rocket whoosh
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, t);
        osc.frequency.exponentialRampToValueAtTime(200, t + 0.2);
        const g1 = this._gain(0.3, t);
        g1.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        osc.connect(g1).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.2);
        const noise = this._noise(0.15);
        const lp = ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 800;
        const g2 = this._gain(0.2, t);
        g2.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        noise.connect(lp).connect(g2).connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.15);
        break;
      }
      case 'laser_rifle': {
        // Sci-fi zap — sine sweep up + harmonics
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(400, t);
        osc1.frequency.exponentialRampToValueAtTime(4000, t + 0.08);
        const g1 = this._gain(0.3, t);
        g1.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        osc1.connect(g1).connect(ctx.destination);
        osc1.start(t);
        osc1.stop(t + 0.1);
        // Harmonic
        const osc2 = ctx.createOscillator();
        osc2.type = 'square';
        osc2.frequency.setValueAtTime(800, t);
        osc2.frequency.exponentialRampToValueAtTime(6000, t + 0.06);
        const g2 = this._gain(0.1, t);
        g2.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
        osc2.connect(g2).connect(ctx.destination);
        osc2.start(t);
        osc2.stop(t + 0.06);
        break;
      }
      case 'minigun': {
        // Rapid buzz
        const noise = this._noise(0.015);
        const bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 2000;
        bp.Q.value = 2;
        const g = this._gain(0.25, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.015);
        noise.connect(bp).connect(g).connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.015);
        break;
      }
      case 'railgun': {
        // Electric crack — noise burst + high sine
        const noise = this._noise(0.02);
        const hp = ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 5000;
        const g1 = this._gain(0.5, t);
        g1.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
        noise.connect(hp).connect(g1).connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.02);
        // High sine ring
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(6000, t);
        osc.frequency.exponentialRampToValueAtTime(2000, t + 0.15);
        const g2 = this._gain(0.2, t);
        g2.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        osc.connect(g2).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.15);
        break;
      }
      case 'plasma_cannon': {
        // Deep zap
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, t);
        osc.frequency.exponentialRampToValueAtTime(1500, t + 0.06);
        const g1 = this._gain(0.35, t);
        g1.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        osc.connect(g1).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.1);
        // Noise burst
        const noise = this._noise(0.04);
        const lp = ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 1000;
        const g2 = this._gain(0.3, t);
        g2.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
        noise.connect(lp).connect(g2).connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.04);
        break;
      }
      case 'gauss_rifle': {
        // Magnetic hum + crack
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(60, t);
        osc.frequency.exponentialRampToValueAtTime(300, t + 0.05);
        const g1 = this._gain(0.3, t);
        g1.gain.exponentialRampToValueAtTime(0.5 * this.volume, t + 0.04);
        g1.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        osc.connect(g1).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.15);
        // Crack
        const noise = this._noise(0.02);
        const hp = ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 4000;
        const g2 = this._gain(0.5, t + 0.04);
        g2.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
        noise.connect(hp).connect(g2).connect(ctx.destination);
        noise.start(t + 0.04);
        noise.stop(t + 0.06);
        break;
      }
      case 'tesla_cannon': {
        // Electric arc — buzzy oscillator + crackling noise
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, t);
        osc.frequency.exponentialRampToValueAtTime(3000, t + 0.05);
        osc.frequency.exponentialRampToValueAtTime(500, t + 0.12);
        const g1 = this._gain(0.3, t);
        g1.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        osc.connect(g1).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.12);
        // Crackle
        const noise = this._noise(0.08);
        const hp = ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 3000;
        const g2 = this._gain(0.2, t);
        g2.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
        noise.connect(hp).connect(g2).connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.08);
        break;
      }
    }
  }

  playHit(): void {
    if (!this.ctx || this.muted) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const noise = this._noise(0.04);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 800;
    bp.Q.value = 2;
    const g = this._gain(0.25, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    noise.connect(bp).connect(g).connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.04);
  }

  playKill(): void {
    if (!this.ctx || this.muted) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    // Satisfying thud/splat
    const noise = this._noise(0.08);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(600, t);
    lp.frequency.exponentialRampToValueAtTime(100, t + 0.08);
    const g1 = this._gain(0.35, t);
    g1.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    noise.connect(lp).connect(g1).connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.08);
    // Quick ascending ding for satisfaction
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.04);
    const g2 = this._gain(0.15, t);
    g2.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    osc.connect(g2).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.06);
  }

  playAnimalDeath(animalType: string): void {
    if (!this.ctx || this.muted) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;

    // Group animals by sound type
    const small = ['mouse', 'rabbit', 'hare', 'frog', 'snake', 'porcupine'];
    const birds = ['sparrow', 'pheasant', 'eagle', 'duck', 'crow', 'hawk', 'owl', 'goose', 'condor', 'vulture', 'golden_eagle', 'dragon'];
    const large = ['moose', 'bear', 'boar', 'bison', 'rhino', 'hippo', 'gorilla', 'mammoth', 'alligator', 'elk'];

    if (small.includes(animalType)) {
      // Squeak — high frequency short chirp
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2000 + Math.random() * 1000, t);
      osc.frequency.exponentialRampToValueAtTime(800, t + 0.06);
      const g = this._gain(0.15, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
      osc.connect(g).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.06);
    } else if (birds.includes(animalType)) {
      // Screech — fast sine sweep down
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(3000 + Math.random() * 1000, t);
      osc.frequency.exponentialRampToValueAtTime(500, t + 0.1);
      const g = this._gain(0.12, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      osc.connect(g).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.1);
    } else if (large.includes(animalType)) {
      // Growl — low noise + sine
      const noise = this._noise(0.12);
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 400;
      const g1 = this._gain(0.2, t);
      g1.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      noise.connect(lp).connect(g1).connect(ctx.destination);
      noise.start(t);
      noise.stop(t + 0.12);
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, t);
      osc.frequency.exponentialRampToValueAtTime(60, t + 0.1);
      const g2 = this._gain(0.15, t);
      g2.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      osc.connect(g2).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.1);
    } else {
      // Medium — bark
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(300, t + 0.08);
      const g = this._gain(0.18, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc.connect(g).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.08);
    }
  }

  playReload(): void {
    if (!this.ctx || this.muted) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    // Metallic click — bandpass noise + sine tap
    const noise = this._noise(0.03);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 3000;
    bp.Q.value = 5;
    const g1 = this._gain(0.2, t);
    g1.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
    noise.connect(bp).connect(g1).connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.03);
    // Mechanical clunk
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 500;
    const g2 = this._gain(0.15, t + 0.02);
    g2.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    osc.connect(g2).connect(ctx.destination);
    osc.start(t + 0.02);
    osc.stop(t + 0.04);
  }

  playExplosion(): void {
    if (!this.ctx || this.muted) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const noise = this._noise(0.4);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(1000, t);
    lp.frequency.exponentialRampToValueAtTime(100, t + 0.4);
    const g = this._gain(0.5, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    noise.connect(lp).connect(g).connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.4);
  }

  playWeaponSwitch(): void {
    if (!this.ctx || this.muted) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 1000;
    const g = this._gain(0.15, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
    osc.connect(g).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.02);
  }

  playWaveStart(): void {
    if (!this.ctx || this.muted) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const notes = [392, 494, 587]; // G4, B4, D5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const g = this._gain(0.2, t + i * 0.1);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.1 + 0.15);
      osc.connect(g).connect(ctx.destination);
      osc.start(t + i * 0.1);
      osc.stop(t + i * 0.1 + 0.15);
    });
  }

  playLifeLost(): void {
    if (!this.ctx || this.muted) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.15);
    const g = this._gain(0.25, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.connect(g).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.15);
  }

  playGameOver(): void {
    if (!this.ctx || this.muted) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const notes = [392, 330, 262]; // G4, E4, C4
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const g = this._gain(0.25, t + i * 0.15);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.15 + 0.2);
      osc.connect(g).connect(ctx.destination);
      osc.start(t + i * 0.15);
      osc.stop(t + i * 0.15 + 0.2);
    });
  }
}
