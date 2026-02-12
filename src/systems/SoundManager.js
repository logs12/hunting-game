export class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.volume = 0.3;
    this._initialized = false;
  }

  init() {
    if (this._initialized) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this._initialized = true;
    } catch (e) {
      // Web Audio not supported
    }
  }

  setMuted(muted) {
    this.muted = muted;
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  _gain(vol, time) {
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol * this.volume, time);
    return g;
  }

  _noise(duration) {
    const sampleRate = this.ctx.sampleRate;
    const length = sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    return src;
  }

  playShot(weaponKey) {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;

    switch (weaponKey) {
      case 'pistol': {
        const noise = this._noise(0.05);
        const hp = this.ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 2000;
        const g = this._gain(0.4, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
        noise.connect(hp).connect(g).connect(this.ctx.destination);
        noise.start(t);
        noise.stop(t + 0.05);
        break;
      }
      case 'shotgun': {
        const noise = this._noise(0.1);
        const lp = this.ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.setValueAtTime(3000, t);
        lp.frequency.exponentialRampToValueAtTime(200, t + 0.1);
        const g = this._gain(0.5, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        noise.connect(lp).connect(g).connect(this.ctx.destination);
        noise.start(t);
        noise.stop(t + 0.1);
        break;
      }
      case 'rifle': {
        // Sharp crack + sine ring
        const noise = this._noise(0.03);
        const hp = this.ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 3000;
        const g1 = this._gain(0.4, t);
        g1.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
        noise.connect(hp).connect(g1).connect(this.ctx.destination);
        noise.start(t);
        noise.stop(t + 0.03);
        // Sine tail
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 1200;
        const g2 = this._gain(0.15, t);
        g2.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        osc.connect(g2).connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.1);
        break;
      }
      case 'machinegun': {
        const noise = this._noise(0.02);
        const bp = this.ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 1500;
        const g = this._gain(0.3, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
        noise.connect(bp).connect(g).connect(this.ctx.destination);
        noise.start(t);
        noise.stop(t + 0.02);
        break;
      }
      case 'rocket': {
        // Low sweep + whoosh
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, t);
        osc.frequency.exponentialRampToValueAtTime(200, t + 0.2);
        const g1 = this._gain(0.3, t);
        g1.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        osc.connect(g1).connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.2);
        // Noise whoosh
        const noise = this._noise(0.15);
        const lp = this.ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 800;
        const g2 = this._gain(0.2, t);
        g2.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        noise.connect(lp).connect(g2).connect(this.ctx.destination);
        noise.start(t);
        noise.stop(t + 0.15);
        break;
      }
    }
  }

  playHit() {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    const noise = this._noise(0.04);
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 800;
    bp.Q.value = 2;
    const g = this._gain(0.25, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    noise.connect(bp).connect(g).connect(this.ctx.destination);
    noise.start(t);
    noise.stop(t + 0.04);
  }

  playKill() {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    // Ascending 3-tone
    const notes = [523, 659, 784]; // C5, E5, G5
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const g = this._gain(0.2, t + i * 0.035);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.035 + 0.08);
      osc.connect(g).connect(this.ctx.destination);
      osc.start(t + i * 0.035);
      osc.stop(t + i * 0.035 + 0.08);
    });
  }

  playExplosion() {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    const noise = this._noise(0.4);
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(1000, t);
    lp.frequency.exponentialRampToValueAtTime(100, t + 0.4);
    const g = this._gain(0.5, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    noise.connect(lp).connect(g).connect(this.ctx.destination);
    noise.start(t);
    noise.stop(t + 0.4);
  }

  playWeaponSwitch() {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 1000;
    const g = this._gain(0.15, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
    osc.connect(g).connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.02);
  }

  playWaveStart() {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    const notes = [392, 494, 587]; // G4, B4, D5
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const g = this._gain(0.2, t + i * 0.1);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.1 + 0.15);
      osc.connect(g).connect(this.ctx.destination);
      osc.start(t + i * 0.1);
      osc.stop(t + i * 0.1 + 0.15);
    });
  }

  playLifeLost() {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    // Descending tone
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.15);
    const g = this._gain(0.25, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.connect(g).connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.15);
  }

  playGameOver() {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    // Sad descending 3-note
    const notes = [392, 330, 262]; // G4, E4, C4
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const g = this._gain(0.25, t + i * 0.15);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.15 + 0.2);
      osc.connect(g).connect(this.ctx.destination);
      osc.start(t + i * 0.15);
      osc.stop(t + i * 0.15 + 0.2);
    });
  }
}
