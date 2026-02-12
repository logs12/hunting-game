import { SpriteFactory } from './SpriteFactory.js';

const ANIMAL_SCALE = 0.62;

export class AnimalSpritesT4 extends SpriteFactory {
  _ct(key, w, h, drawFn) {
    this.createTexture(key, w, h, drawFn, ANIMAL_SCALE);
  }

  generate() {
    this._generateTigerFrames();
    this._generateBisonFrames();
    this._generateCondorFrames();
    this._generatePantherFrames();
    this._generateElkFrames();
    this._generateVultureFrames();
    this._generateAlligatorFrames();
  }

  // --- Shared helpers ---

  _drawEye(ctx, x, y, r, irisColor = '#332') {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.ellipse(x, y, r * 1.4, r, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = irisColor;
    ctx.beginPath();
    ctx.arc(x, y, r * 0.9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.arc(x, y, r * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  _drawFur(ctx, x, y, w, h, count, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.5;
    for (let i = 0; i < count; i++) {
      const fx = x + Math.random() * w;
      const fy = y + Math.random() * h;
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx + (Math.random() - 0.5) * 3, fy - 2 - Math.random() * 3);
      ctx.stroke();
    }
  }

  // ===================== TIGER (72x54, 3 frames) =====================

  _drawTigerBody(ctx) {
    // Main body
    const bg = ctx.createRadialGradient(40, 30, 4, 40, 30, 22);
    bg.addColorStop(0, '#FF9933');
    bg.addColorStop(1, '#DD6600');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(40, 30, 22, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    // White belly
    ctx.fillStyle = '#FFF5E0';
    ctx.beginPath();
    ctx.ellipse(38, 38, 16, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Black stripes on body
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 2;
    const stripeXs = [28, 34, 40, 46, 52, 56];
    stripeXs.forEach((sx, idx) => {
      ctx.beginPath();
      ctx.moveTo(sx, 20 + (idx % 2) * 2);
      ctx.quadraticCurveTo(sx + 1, 30, sx - 1, 40 - (idx % 2) * 2);
      ctx.stroke();
    });

    // Head
    const hg = ctx.createRadialGradient(14, 24, 2, 14, 24, 13);
    hg.addColorStop(0, '#FFAA44');
    hg.addColorStop(1, '#DD7711');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.ellipse(14, 24, 13, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // White face patches
    ctx.fillStyle = '#FFF8EE';
    ctx.beginPath();
    ctx.ellipse(8, 28, 6, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(14, 22, 4, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Face stripes
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(6, 16); ctx.lineTo(4, 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(10, 14); ctx.lineTo(9, 18); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(18, 14); ctx.lineTo(19, 18); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(22, 16); ctx.lineTo(24, 20); ctx.stroke();
    // Cheek stripes
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(2, 26); ctx.lineTo(5, 24); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(2, 30); ctx.lineTo(5, 28); ctx.stroke();

    // Ears
    ctx.fillStyle = '#DD7711';
    ctx.beginPath();
    ctx.ellipse(7, 13, 4, 5, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(21, 13, 4, 5, 0.2, 0, Math.PI * 2);
    ctx.fill();
    // Inner ears
    ctx.fillStyle = '#FFCC88';
    ctx.beginPath();
    ctx.ellipse(7, 13, 2, 3, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(21, 13, 2, 3, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Nose
    ctx.fillStyle = '#FF8888';
    ctx.beginPath();
    ctx.ellipse(4, 27, 2.5, 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.ellipse(3, 27, 1.5, 1, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mouth
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(4, 29);
    ctx.lineTo(6, 31);
    ctx.lineTo(9, 29);
    ctx.stroke();

    // Whiskers
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(3, 28); ctx.lineTo(-2, 26);
    ctx.moveTo(3, 30); ctx.lineTo(-2, 32);
    ctx.stroke();

    // Eye - green/yellow
    this._drawEye(ctx, 10, 22, 2.5, '#88AA00');

    // Tail with stripes
    ctx.strokeStyle = '#DD7711';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(62, 26);
    ctx.quadraticCurveTo(70, 18, 68, 12);
    ctx.stroke();
    // Tail stripes
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(63, 24); ctx.lineTo(65, 22); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(66, 20); ctx.lineTo(68, 18); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(68, 15); ctx.lineTo(69, 13); ctx.stroke();
  }

  _generateTigerFrames() {
    const frames = [
      [40, 40, 40, 40],
      [38, 42, 42, 38],
      [42, 38, 38, 42],
    ];

    frames.forEach((legYs, i) => {
      this._ct(`tiger_walk_${i}`, 72, 54, (ctx) => {
        const xPositions = [24, 32, 46, 54];
        // Legs behind body
        legYs.forEach((ly, idx) => {
          ctx.fillStyle = '#CC6600';
          ctx.fillRect(xPositions[idx], ly, 6, 7);
          ctx.fillStyle = '#BB5500';
          ctx.fillRect(xPositions[idx] + 1, ly + 6, 5, 5);
          // Stripes on legs
          ctx.strokeStyle = '#111';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(xPositions[idx], ly + 2);
          ctx.lineTo(xPositions[idx] + 6, ly + 3);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(xPositions[idx], ly + 5);
          ctx.lineTo(xPositions[idx] + 6, ly + 6);
          ctx.stroke();
          // Paws
          ctx.fillStyle = '#FFF5E0';
          ctx.fillRect(xPositions[idx], ly + 10, 6, 3);
        });
        this._drawTigerBody(ctx);
      });
    });
  }

  // ===================== BISON (80x64, 3 frames) =====================

  _drawBisonBody(ctx) {
    // Massive body
    const bg = ctx.createRadialGradient(48, 34, 6, 48, 34, 26);
    bg.addColorStop(0, '#5C3A1E');
    bg.addColorStop(1, '#3A1E0A');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(48, 34, 26, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    // Humped shoulders
    ctx.fillStyle = '#4A2A12';
    ctx.beginPath();
    ctx.ellipse(30, 22, 16, 14, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Belly
    ctx.fillStyle = '#5C3A1E';
    ctx.beginPath();
    ctx.ellipse(48, 44, 20, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Shaggy fur on hump and shoulders
    ctx.strokeStyle = 'rgba(80,50,20,0.4)';
    ctx.lineWidth = 1;
    for (let f = 0; f < 30; f++) {
      const fx = 18 + Math.random() * 30;
      const fy = 14 + Math.random() * 20;
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx + (Math.random() - 0.5) * 4, fy - 3 - Math.random() * 4);
      ctx.stroke();
    }

    // Head
    const hg = ctx.createRadialGradient(14, 28, 2, 14, 28, 14);
    hg.addColorStop(0, '#5C3A1E');
    hg.addColorStop(1, '#3A1E0A');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.ellipse(14, 28, 14, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    // Shaggy beard / chin fur
    ctx.fillStyle = '#4A2A12';
    ctx.beginPath();
    ctx.ellipse(10, 38, 8, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    // Beard fur lines
    ctx.strokeStyle = 'rgba(60,30,10,0.5)';
    ctx.lineWidth = 0.8;
    for (let f = 0; f < 12; f++) {
      const fx = 4 + Math.random() * 12;
      const fy = 34 + Math.random() * 6;
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx + (Math.random() - 0.5) * 2, fy + 2 + Math.random() * 3);
      ctx.stroke();
    }

    // Forehead shaggy fur
    ctx.fillStyle = '#4A2A12';
    ctx.beginPath();
    ctx.ellipse(14, 20, 10, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(60,30,10,0.5)';
    ctx.lineWidth = 0.8;
    for (let f = 0; f < 10; f++) {
      const fx = 6 + Math.random() * 16;
      const fy = 16 + Math.random() * 8;
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx + (Math.random() - 0.5) * 3, fy - 2 - Math.random() * 3);
      ctx.stroke();
    }

    // Horns - short curved
    ctx.fillStyle = '#8B8060';
    ctx.strokeStyle = '#8B8060';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(8, 16);
    ctx.quadraticCurveTo(2, 10, 4, 6);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(20, 16);
    ctx.quadraticCurveTo(26, 10, 24, 6);
    ctx.stroke();
    // Horn tips
    ctx.fillStyle = '#555';
    ctx.beginPath(); ctx.arc(4, 6, 2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(24, 6, 2, 0, Math.PI * 2); ctx.fill();

    // Snout
    ctx.fillStyle = '#6B4A2E';
    ctx.beginPath();
    ctx.ellipse(4, 30, 6, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    // Nostrils
    ctx.fillStyle = '#222';
    ctx.beginPath(); ctx.ellipse(2, 29, 1.5, 1, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(2, 32, 1.5, 1, 0, 0, Math.PI * 2); ctx.fill();

    // Eye - small, dark
    this._drawEye(ctx, 10, 24, 2, '#442200');

    // Tail - short tuft
    ctx.strokeStyle = '#3A1E0A';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(74, 30);
    ctx.quadraticCurveTo(80, 26, 78, 22);
    ctx.stroke();
    // Tail tuft
    ctx.fillStyle = '#2A1000';
    ctx.beginPath();
    ctx.ellipse(78, 22, 3, 4, -0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  _generateBisonFrames() {
    const frames = [
      [46, 46, 46, 46],
      [44, 48, 48, 44],
      [48, 44, 44, 48],
    ];

    frames.forEach((legYs, i) => {
      this._ct(`bison_walk_${i}`, 80, 64, (ctx) => {
        const xPositions = [26, 36, 54, 64];
        legYs.forEach((ly, idx) => {
          // Thick powerful legs
          ctx.fillStyle = '#3A1E0A';
          ctx.fillRect(xPositions[idx], ly, 8, 8);
          ctx.fillStyle = '#2A1000';
          ctx.fillRect(xPositions[idx] + 1, ly + 7, 7, 6);
          // Hooves
          ctx.fillStyle = '#111';
          ctx.fillRect(xPositions[idx], ly + 12, 8, 4);
        });
        this._drawBisonBody(ctx);
      });
    });
  }

  // ===================== CONDOR (66x40, 3 frames) =====================

  _drawCondorBody(ctx) {
    // Body - black
    const bg = ctx.createRadialGradient(30, 22, 2, 30, 22, 12);
    bg.addColorStop(0, '#333333');
    bg.addColorStop(1, '#111111');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(30, 22, 12, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head - bald reddish
    const hg = ctx.createRadialGradient(14, 16, 1, 14, 16, 7);
    hg.addColorStop(0, '#DD5544');
    hg.addColorStop(1, '#AA3322');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.arc(14, 16, 7, 0, Math.PI * 2);
    ctx.fill();

    // Wrinkled skin texture on head
    ctx.strokeStyle = 'rgba(150,40,30,0.4)';
    ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.arc(14, 16, 4, 0.5, 2.0); ctx.stroke();
    ctx.beginPath(); ctx.arc(14, 16, 5, 1.0, 2.5); ctx.stroke();

    // White neck ruff
    ctx.fillStyle = '#EEEEDD';
    ctx.beginPath();
    ctx.ellipse(20, 20, 6, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    // Ruff feather lines
    ctx.strokeStyle = 'rgba(200,200,180,0.5)';
    ctx.lineWidth = 0.5;
    for (let f = 0; f < 8; f++) {
      const angle = (f / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(20 + Math.cos(angle) * 3, 20 + Math.sin(angle) * 3);
      ctx.lineTo(20 + Math.cos(angle) * 6, 20 + Math.sin(angle) * 5);
      ctx.stroke();
    }

    // Hooked beak
    ctx.fillStyle = '#555';
    ctx.beginPath();
    ctx.moveTo(7, 16);
    ctx.lineTo(3, 18);
    ctx.lineTo(5, 20);
    ctx.lineTo(8, 18);
    ctx.fill();
    // Hook tip
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(3, 18);
    ctx.lineTo(2, 20);
    ctx.lineTo(5, 20);
    ctx.fill();

    // Eye
    this._drawEye(ctx, 11, 15, 1.8, '#880000');

    // Tail
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.moveTo(42, 20);
    ctx.lineTo(52, 18);
    ctx.lineTo(52, 26);
    ctx.lineTo(42, 24);
    ctx.fill();

    // Feet (tucked in flight)
    ctx.fillStyle = '#555';
    ctx.fillRect(26, 30, 2, 4);
    ctx.fillRect(32, 30, 2, 4);
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(26, 34); ctx.lineTo(25, 36);
    ctx.moveTo(27, 34); ctx.lineTo(28, 36);
    ctx.moveTo(32, 34); ctx.lineTo(31, 36);
    ctx.moveTo(33, 34); ctx.lineTo(34, 36);
    ctx.stroke();
  }

  _generateCondorFrames() {
    const wingAngles = [
      { upY: 6, downY: 34 },
      { upY: 0, downY: 28 },
      { upY: 10, downY: 40 },
    ];

    wingAngles.forEach(({ upY, downY }, i) => {
      this._ct(`condor_walk_${i}`, 66, 40, (ctx) => {
        // Upper wing
        ctx.fillStyle = '#1A1A1A';
        ctx.beginPath();
        ctx.moveTo(22, 20);
        ctx.quadraticCurveTo(38, upY, 56, upY + 2);
        ctx.lineTo(50, 20);
        ctx.fill();
        // White wing patches on upper wing
        ctx.fillStyle = '#DDDDCC';
        ctx.beginPath();
        ctx.moveTo(40, upY + 3);
        ctx.lineTo(54, upY + 2);
        ctx.lineTo(50, upY + 6);
        ctx.lineTo(38, upY + 6);
        ctx.fill();

        // Lower wing
        ctx.fillStyle = '#1A1A1A';
        ctx.beginPath();
        ctx.moveTo(22, 24);
        ctx.quadraticCurveTo(38, downY, 56, downY - 2);
        ctx.lineTo(50, 24);
        ctx.fill();
        // White wing patches on lower wing
        ctx.fillStyle = '#DDDDCC';
        ctx.beginPath();
        ctx.moveTo(40, downY - 6);
        ctx.lineTo(54, downY - 2);
        ctx.lineTo(50, downY - 5);
        ctx.lineTo(38, downY - 6);
        ctx.fill();

        // Feather detail lines
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 0.6;
        for (let f = 0; f < 5; f++) {
          ctx.beginPath();
          ctx.moveTo(26 + f * 6, upY + 4 + f);
          ctx.lineTo(44 + f * 2, upY + 3 + f);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(26 + f * 6, downY - 4 - f);
          ctx.lineTo(44 + f * 2, downY - 3 - f);
          ctx.stroke();
        }

        this._drawCondorBody(ctx);
      });
    });
  }

  // ===================== PANTHER (66x48, 3 frames) =====================

  _drawPantherBody(ctx) {
    // Sleek body - all black with subtle gradients
    const bg = ctx.createRadialGradient(38, 28, 4, 38, 28, 20);
    bg.addColorStop(0, '#2A2A2A');
    bg.addColorStop(1, '#0A0A0A');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(38, 28, 20, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Subtle muscle highlights
    ctx.fillStyle = 'rgba(60,60,60,0.3)';
    ctx.beginPath();
    ctx.ellipse(32, 24, 8, 5, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(46, 26, 7, 4, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Belly - slightly lighter
    ctx.fillStyle = '#1A1A1A';
    ctx.beginPath();
    ctx.ellipse(36, 34, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Subtle fur sheen
    ctx.fillStyle = 'rgba(80,80,80,0.1)';
    ctx.beginPath();
    ctx.ellipse(38, 22, 16, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head
    const hg = ctx.createRadialGradient(14, 22, 2, 14, 22, 12);
    hg.addColorStop(0, '#2A2A2A');
    hg.addColorStop(1, '#111111');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.ellipse(14, 22, 12, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Muzzle
    ctx.fillStyle = '#1A1A1A';
    ctx.beginPath();
    ctx.ellipse(4, 24, 5, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Nose
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.ellipse(1, 24, 2, 1.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mouth line
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(2, 26);
    ctx.lineTo(5, 28);
    ctx.lineTo(8, 26);
    ctx.stroke();

    // Whiskers
    ctx.strokeStyle = 'rgba(100,100,100,0.5)';
    ctx.lineWidth = 0.4;
    ctx.beginPath();
    ctx.moveTo(2, 24); ctx.lineTo(-3, 22);
    ctx.moveTo(2, 26); ctx.lineTo(-3, 28);
    ctx.stroke();

    // Ears
    ctx.fillStyle = '#181818';
    ctx.beginPath();
    ctx.moveTo(9, 12); ctx.lineTo(6, 4); ctx.lineTo(14, 10);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(19, 12); ctx.lineTo(22, 4); ctx.lineTo(24, 12);
    ctx.fill();

    // Eyes - bright yellow/green - the signature feature
    this._drawEye(ctx, 9, 20, 2.5, '#88CC00');

    // Second eye hint (slightly visible on other side)
    ctx.fillStyle = 'rgba(136,204,0,0.4)';
    ctx.beginPath();
    ctx.arc(18, 20, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Long curved tail
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(58, 24);
    ctx.quadraticCurveTo(66, 14, 64, 6);
    ctx.stroke();
    // Tail tip
    ctx.strokeStyle = '#0A0A0A';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(64, 8);
    ctx.quadraticCurveTo(66, 4, 62, 4);
    ctx.stroke();
  }

  _generatePantherFrames() {
    const frames = [
      [36, 36, 36, 36],
      [34, 38, 38, 34],
      [38, 34, 34, 38],
    ];

    frames.forEach((legYs, i) => {
      this._ct(`panther_walk_${i}`, 66, 48, (ctx) => {
        const xPositions = [22, 30, 44, 52];
        legYs.forEach((ly, idx) => {
          // Sleek black legs
          ctx.fillStyle = '#0A0A0A';
          ctx.fillRect(xPositions[idx], ly, 5, 6);
          ctx.fillStyle = '#080808';
          ctx.fillRect(xPositions[idx] + 1, ly + 5, 4, 5);
          // Paws
          ctx.fillStyle = '#151515';
          ctx.fillRect(xPositions[idx] - 1, ly + 9, 6, 3);
        });
        this._drawPantherBody(ctx);
      });
    });
  }

  // ===================== ELK (76x62, 3 frames) =====================

  _drawElkBody(ctx) {
    // Main body
    const bg = ctx.createRadialGradient(44, 34, 4, 44, 34, 24);
    bg.addColorStop(0, '#C8A060');
    bg.addColorStop(1, '#A07838');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(44, 34, 24, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lighter rump patch
    ctx.fillStyle = '#E8D098';
    ctx.beginPath();
    ctx.ellipse(64, 32, 8, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Belly
    ctx.fillStyle = '#D8B878';
    ctx.beginPath();
    ctx.ellipse(42, 42, 18, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Darker neck mane
    const ng = ctx.createLinearGradient(18, 16, 30, 16);
    ng.addColorStop(0, '#6B4A2A');
    ng.addColorStop(1, '#7B5A3A');
    ctx.fillStyle = ng;
    ctx.fillRect(18, 16, 14, 22);
    // Mane fur detail
    ctx.strokeStyle = 'rgba(80,40,20,0.4)';
    ctx.lineWidth = 0.8;
    for (let f = 0; f < 12; f++) {
      const fx = 18 + Math.random() * 14;
      const fy = 16 + Math.random() * 22;
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx + (Math.random() - 0.5) * 3, fy - 2 - Math.random() * 3);
      ctx.stroke();
    }

    this._drawFur(ctx, 26, 26, 32, 18, 12, 'rgba(120,80,40,0.2)');

    // Head
    const hg = ctx.createRadialGradient(14, 20, 2, 14, 20, 12);
    hg.addColorStop(0, '#C8A060');
    hg.addColorStop(1, '#A07838');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.ellipse(14, 20, 12, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Muzzle
    ctx.fillStyle = '#D8B878';
    ctx.beginPath();
    ctx.ellipse(4, 24, 6, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Nose
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.ellipse(0, 23, 2.5, 1.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Large branching antlers - multi-pointed
    ctx.strokeStyle = '#9B8050';
    ctx.lineWidth = 3;
    // Main beam left
    ctx.beginPath(); ctx.moveTo(8, 10); ctx.lineTo(2, -2); ctx.stroke();
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(2, -2); ctx.lineTo(-4, -8); ctx.stroke();
    // Tines on left antler
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(5, 4); ctx.lineTo(0, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(3, 0); ctx.lineTo(-2, -4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-1, -4); ctx.lineTo(-6, -6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-2, -6); ctx.lineTo(-4, -10); ctx.stroke();

    // Main beam right
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(20, 10); ctx.lineTo(28, -2); ctx.stroke();
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(28, -2); ctx.lineTo(34, -8); ctx.stroke();
    // Tines on right antler
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(24, 4); ctx.lineTo(30, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(27, 0); ctx.lineTo(32, -4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(31, -4); ctx.lineTo(36, -6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(33, -6); ctx.lineTo(36, -10); ctx.stroke();

    // Eye
    this._drawEye(ctx, 10, 18, 2.5, '#553311');

    // Ear
    ctx.fillStyle = '#B09050';
    ctx.beginPath();
    ctx.ellipse(22, 12, 3, 6, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#D8B878';
    ctx.beginPath();
    ctx.ellipse(22, 12, 1.5, 4, 0.4, 0, Math.PI * 2);
    ctx.fill();

    // Short tail
    ctx.fillStyle = '#E8D098';
    ctx.beginPath();
    ctx.ellipse(68, 28, 3, 4, 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  _generateElkFrames() {
    const frames = [
      [48, 48, 46, 48],
      [46, 50, 48, 44],
      [50, 46, 44, 50],
    ];

    frames.forEach((legYs, i) => {
      this._ct(`elk_walk_${i}`, 76, 62, (ctx) => {
        const xPositions = [28, 36, 52, 60];
        legYs.forEach((ly, idx) => {
          // Long thin legs
          ctx.fillStyle = '#906830';
          ctx.fillRect(xPositions[idx], ly, 6, 5);
          ctx.fillStyle = '#805828';
          ctx.fillRect(xPositions[idx] + 1, ly + 4, 5, 6);
          // Hooves
          ctx.fillStyle = '#333';
          ctx.fillRect(xPositions[idx], ly + 9, 6, 4);
        });
        this._drawElkBody(ctx);
      });
    });
  }

  // ===================== VULTURE (54x36, 3 frames) =====================

  _drawVultureBody(ctx) {
    // Body - dark brown/black, hunched
    const bg = ctx.createRadialGradient(26, 20, 2, 26, 20, 10);
    bg.addColorStop(0, '#3A2A1A');
    bg.addColorStop(1, '#1A1008');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(26, 20, 10, 8, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Hunched neck
    ctx.fillStyle = '#2A1A0A';
    ctx.beginPath();
    ctx.moveTo(16, 18);
    ctx.quadraticCurveTo(12, 14, 12, 10);
    ctx.lineTo(16, 10);
    ctx.quadraticCurveTo(18, 14, 18, 18);
    ctx.fill();

    // Neck ruff of feathers
    ctx.fillStyle = '#CCBBAA';
    ctx.beginPath();
    ctx.ellipse(16, 14, 5, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    // Ruff feather detail
    ctx.strokeStyle = 'rgba(180,160,140,0.5)';
    ctx.lineWidth = 0.5;
    for (let f = 0; f < 6; f++) {
      const angle = (f / 6) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(16 + Math.cos(angle) * 2, 14 + Math.sin(angle) * 2);
      ctx.lineTo(16 + Math.cos(angle) * 5, 14 + Math.sin(angle) * 4);
      ctx.stroke();
    }

    // Bald pinkish head
    const hg = ctx.createRadialGradient(10, 8, 1, 10, 8, 5);
    hg.addColorStop(0, '#DD8877');
    hg.addColorStop(1, '#BB6655');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.arc(10, 8, 5, 0, Math.PI * 2);
    ctx.fill();

    // Wrinkled skin
    ctx.strokeStyle = 'rgba(150,60,50,0.3)';
    ctx.lineWidth = 0.4;
    ctx.beginPath(); ctx.arc(10, 8, 3, 0.3, 1.8); ctx.stroke();
    ctx.beginPath(); ctx.arc(10, 8, 4, 0.8, 2.2); ctx.stroke();

    // Hooked beak
    ctx.fillStyle = '#555';
    ctx.beginPath();
    ctx.moveTo(5, 8);
    ctx.lineTo(1, 10);
    ctx.lineTo(2, 12);
    ctx.lineTo(6, 10);
    ctx.fill();
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(1, 10);
    ctx.lineTo(0, 12);
    ctx.lineTo(2, 12);
    ctx.fill();

    // Eye
    this._drawEye(ctx, 8, 7, 1.5, '#882200');

    // Tail
    ctx.fillStyle = '#2A1A0A';
    ctx.beginPath();
    ctx.moveTo(36, 18);
    ctx.lineTo(46, 16);
    ctx.lineTo(46, 24);
    ctx.lineTo(36, 22);
    ctx.fill();

    // Feet
    ctx.fillStyle = '#666';
    ctx.fillRect(22, 28, 2, 4);
    ctx.fillRect(28, 28, 2, 4);
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.moveTo(22, 32); ctx.lineTo(21, 34);
    ctx.moveTo(23, 32); ctx.lineTo(24, 34);
    ctx.moveTo(28, 32); ctx.lineTo(27, 34);
    ctx.moveTo(29, 32); ctx.lineTo(30, 34);
    ctx.stroke();
  }

  _generateVultureFrames() {
    const wingAngles = [
      { upY: 6, downY: 30 },
      { upY: 1, downY: 24 },
      { upY: 10, downY: 36 },
    ];

    wingAngles.forEach(({ upY, downY }, i) => {
      this._ct(`vulture_walk_${i}`, 54, 36, (ctx) => {
        // Upper wing
        ctx.fillStyle = '#2A1A0A';
        ctx.beginPath();
        ctx.moveTo(18, 18);
        ctx.quadraticCurveTo(30, upY, 46, upY + 2);
        ctx.lineTo(40, 18);
        ctx.fill();

        // Lower wing
        ctx.fillStyle = '#2A1A0A';
        ctx.beginPath();
        ctx.moveTo(18, 22);
        ctx.quadraticCurveTo(30, downY, 46, downY - 2);
        ctx.lineTo(40, 22);
        ctx.fill();

        // Feather lines
        ctx.strokeStyle = '#1A0A00';
        ctx.lineWidth = 0.5;
        for (let f = 0; f < 4; f++) {
          ctx.beginPath();
          ctx.moveTo(22 + f * 5, upY + 4 + f);
          ctx.lineTo(36 + f * 2, upY + 3 + f);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(22 + f * 5, downY - 4 - f);
          ctx.lineTo(36 + f * 2, downY - 3 - f);
          ctx.stroke();
        }

        this._drawVultureBody(ctx);
      });
    });
  }

  // ===================== ALLIGATOR (74x24, 3 frames) =====================

  _drawAlligatorBody(ctx, frame) {
    // Long body with scaly texture
    const bg = ctx.createRadialGradient(36, 12, 4, 36, 12, 24);
    bg.addColorStop(0, '#3A6633');
    bg.addColorStop(1, '#224422');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(36, 12, 24, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Darker top ridge
    ctx.fillStyle = '#1A3A1A';
    ctx.beginPath();
    ctx.ellipse(36, 9, 22, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lighter belly
    ctx.fillStyle = '#88AA66';
    ctx.beginPath();
    ctx.ellipse(36, 16, 18, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Scale pattern - small diamonds on body
    ctx.fillStyle = 'rgba(20,50,20,0.3)';
    for (let sx = 16; sx < 56; sx += 4) {
      for (let sy = 8; sy < 16; sy += 3) {
        ctx.beginPath();
        ctx.moveTo(sx, sy - 1.5);
        ctx.lineTo(sx + 1.5, sy);
        ctx.lineTo(sx, sy + 1.5);
        ctx.lineTo(sx - 1.5, sy);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Ridge spines along back
    ctx.fillStyle = '#1A3A1A';
    for (let rx = 18; rx < 56; rx += 3) {
      ctx.beginPath();
      ctx.moveTo(rx, 6);
      ctx.lineTo(rx + 1, 4);
      ctx.lineTo(rx + 2, 6);
      ctx.fill();
    }

    // Head / snout - long
    const hg = ctx.createRadialGradient(8, 10, 2, 8, 10, 10);
    hg.addColorStop(0, '#3A6633');
    hg.addColorStop(1, '#2A4A22');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.lineTo(0, 14);
    ctx.lineTo(14, 16);
    ctx.lineTo(14, 6);
    ctx.closePath();
    ctx.fill();

    // Upper jaw
    ctx.fillStyle = '#2A4A22';
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.lineTo(0, 10);
    ctx.lineTo(14, 10);
    ctx.lineTo(14, 6);
    ctx.closePath();
    ctx.fill();

    // Teeth visible - jagged line between jaws
    ctx.fillStyle = '#FFFFEE';
    for (let t = 1; t < 14; t += 2) {
      ctx.beginPath();
      ctx.moveTo(t, 10);
      ctx.lineTo(t + 0.5, 11.5);
      ctx.lineTo(t + 1, 10);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(t, 12);
      ctx.lineTo(t + 0.5, 10.5);
      ctx.lineTo(t + 1, 12);
      ctx.fill();
    }

    // Nostril
    ctx.fillStyle = '#1A3A1A';
    ctx.beginPath();
    ctx.arc(2, 8, 1, 0, Math.PI * 2);
    ctx.fill();

    // Eye - raised bump
    ctx.fillStyle = '#3A6633';
    ctx.beginPath();
    ctx.ellipse(10, 6, 3, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();
    this._drawEye(ctx, 10, 6, 1.8, '#AACC00');

    // Tail - tapers
    ctx.fillStyle = '#2A4A22';
    ctx.beginPath();
    ctx.moveTo(60, 10);
    ctx.lineTo(74, 10);
    ctx.lineTo(74, 12);
    ctx.lineTo(60, 14);
    ctx.closePath();
    ctx.fill();
    // Tail scales
    ctx.fillStyle = 'rgba(20,50,20,0.3)';
    for (let tx = 60; tx < 72; tx += 3) {
      ctx.beginPath();
      ctx.moveTo(tx, 10);
      ctx.lineTo(tx + 1, 9);
      ctx.lineTo(tx + 2, 10);
      ctx.fill();
    }

    // Legs splayed to sides - animated
    const legOff = frame === 0 ? 0 : frame === 1 ? -1 : 1;
    const legOff2 = -legOff;

    // Front legs
    ctx.fillStyle = '#2A5522';
    // Front left (upper, splayed out)
    ctx.fillRect(18, 4 + legOff, 4, 3);
    ctx.fillRect(16 + legOff, 3 + legOff, 3, 2);
    // Front right (lower, splayed out)
    ctx.fillRect(18, 17 + legOff2, 4, 3);
    ctx.fillRect(16 + legOff2, 19 + legOff2, 3, 2);

    // Back legs
    // Back left
    ctx.fillRect(50, 4 + legOff2, 4, 3);
    ctx.fillRect(48 + legOff2, 3 + legOff2, 3, 2);
    // Back right
    ctx.fillRect(50, 17 + legOff, 4, 3);
    ctx.fillRect(48 + legOff, 19 + legOff, 3, 2);

    // Claws
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 0.5;
    // Front left claws
    ctx.beginPath();
    ctx.moveTo(16 + legOff, 3 + legOff); ctx.lineTo(14 + legOff, 2 + legOff);
    ctx.moveTo(16 + legOff, 4 + legOff); ctx.lineTo(14 + legOff, 4 + legOff);
    ctx.stroke();
    // Front right claws
    ctx.beginPath();
    ctx.moveTo(16 + legOff2, 20 + legOff2); ctx.lineTo(14 + legOff2, 20 + legOff2);
    ctx.moveTo(16 + legOff2, 21 + legOff2); ctx.lineTo(14 + legOff2, 22 + legOff2);
    ctx.stroke();
  }

  _generateAlligatorFrames() {
    [0, 1, 2].forEach(i => {
      this._ct(`alligator_walk_${i}`, 74, 24, (ctx) => {
        this._drawAlligatorBody(ctx, i);
      });
    });
  }
}
