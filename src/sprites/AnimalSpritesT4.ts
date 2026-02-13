import { SpriteFactory } from './SpriteFactory';

const ANIMAL_SCALE = 0.62;

export class AnimalSpritesT4 extends SpriteFactory {
  _ct(key: string, w: number, h: number, drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number) => void): void {
    this.createTexture(key, w, h, drawFn, ANIMAL_SCALE);
  }

  generate(): void {
    this._generateTigerFrames();
    this._generateBisonFrames();
    this._generateCondorFrames();
    this._generatePantherFrames();
    this._generateElkFrames();
    this._generateVultureFrames();
    this._generateAlligatorFrames();
  }

  // --- Shared helpers ---

  _drawEye(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, irisColor: string = '#332'): void {
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

  _drawXEye(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x - size, y - size);
    ctx.lineTo(x + size, y + size);
    ctx.moveTo(x + size, y - size);
    ctx.lineTo(x - size, y + size);
    ctx.stroke();
  }

  _drawShadow(ctx: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number): void {
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  _drawFur(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, count: number, color: string): void {
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

  // ===================== TIGER (72x54, 5 walk + 1 death) =====================

  _drawTigerBody(ctx: CanvasRenderingContext2D): void {
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

  _drawTigerLeg(ctx: CanvasRenderingContext2D, x: number, topY: number, kneeOff: number, color1: string, color2: string): void {
    // Upper leg
    ctx.fillStyle = color1;
    ctx.fillRect(x, topY, 6, 7);
    // Stripes on upper leg
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, topY + 2);
    ctx.lineTo(x + 6, topY + 3);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, topY + 5);
    ctx.lineTo(x + 6, topY + 6);
    ctx.stroke();
    // Lower leg with knee bend
    ctx.fillStyle = color2;
    ctx.fillRect(x + 1 + kneeOff, topY + 6, 5, 5);
    // Paw
    ctx.fillStyle = '#FFF5E0';
    ctx.fillRect(x + kneeOff, topY + 10, 6, 3);
  }

  _generateTigerFrames(): void {
    // 5-frame walk cycle: [frontLeft, frontRight, backLeft, backRight] as {topY, kneeOff}
    const frames = [
      // Frame 0: Left legs forward, right legs back
      [{ y: 36, k: -1 }, { y: 42, k: 1 }, { y: 36, k: -1 }, { y: 42, k: 1 }],
      // Frame 1: Transition - legs passing center
      [{ y: 38, k: 0 }, { y: 40, k: 0 }, { y: 39, k: 0 }, { y: 39, k: 0 }],
      // Frame 2: Neutral stance - all mid-stride
      [{ y: 40, k: 0 }, { y: 40, k: 0 }, { y: 40, k: 0 }, { y: 40, k: 0 }],
      // Frame 3: Right legs forward, left legs back
      [{ y: 42, k: 1 }, { y: 36, k: -1 }, { y: 42, k: 1 }, { y: 36, k: -1 }],
      // Frame 4: Transition - legs passing (opposite of frame 1)
      [{ y: 40, k: 0 }, { y: 38, k: 0 }, { y: 39, k: 0 }, { y: 39, k: 0 }],
    ];

    const xPositions = [24, 32, 46, 54];

    frames.forEach((legs, i) => {
      this._ct(`tiger_walk_${i}`, 72, 54, (ctx) => {
        // Shadow under body
        this._drawShadow(ctx, 38, 52, 20, 3);
        // Draw legs behind body
        legs.forEach((leg, idx) => {
          this._drawTigerLeg(ctx, xPositions[idx], leg.y, leg.k, '#CC6600', '#BB5500');
        });
        this._drawTigerBody(ctx);
      });
    });

    // Death frame
    this._ct('tiger_dead_0', 72, 54, (ctx) => {
      // Shadow
      this._drawShadow(ctx, 36, 48, 22, 4);

      ctx.save();
      ctx.translate(36, 38);
      ctx.rotate(Math.PI / 2);
      ctx.translate(-36, -38);

      // Body on side
      const bg = ctx.createRadialGradient(40, 30, 4, 40, 30, 22);
      bg.addColorStop(0, '#FF9933');
      bg.addColorStop(1, '#DD6600');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(36, 34, 20, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // White belly visible
      ctx.fillStyle = '#FFF5E0';
      ctx.beginPath();
      ctx.ellipse(36, 42, 14, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Stripes still visible
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 1.5;
      [26, 31, 36, 41, 46].forEach((sx, idx) => {
        ctx.beginPath();
        ctx.moveTo(sx, 24 + (idx % 2) * 2);
        ctx.quadraticCurveTo(sx + 1, 34, sx - 1, 42 - (idx % 2) * 2);
        ctx.stroke();
      });

      // Head
      ctx.fillStyle = '#FFAA44';
      ctx.beginPath();
      ctx.ellipse(16, 30, 11, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // Face stripes
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(10, 22); ctx.lineTo(8, 26); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(22, 22); ctx.lineTo(24, 26); ctx.stroke();

      ctx.restore();

      // Limp legs sticking out
      ctx.fillStyle = '#CC6600';
      ctx.fillRect(18, 26, 5, 8);
      ctx.fillRect(26, 22, 5, 10);
      ctx.fillRect(42, 24, 5, 9);
      ctx.fillRect(50, 28, 5, 7);

      // X eyes
      this._drawXEye(ctx, 24, 30, 2.5);

      // Tongue out
      ctx.fillStyle = '#FF6677';
      ctx.beginPath();
      ctx.ellipse(18, 38, 3, 2, 0.3, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // ===================== BISON (80x64, 5 walk + 1 death) =====================

  _drawBisonBody(ctx: CanvasRenderingContext2D): void {
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

  _drawBisonLeg(ctx: CanvasRenderingContext2D, x: number, topY: number, kneeOff: number): void {
    // Thick powerful upper leg
    ctx.fillStyle = '#3A1E0A';
    ctx.fillRect(x, topY, 8, 8);
    // Lower leg
    ctx.fillStyle = '#2A1000';
    ctx.fillRect(x + 1 + kneeOff, topY + 7, 7, 6);
    // Hoof
    ctx.fillStyle = '#111';
    ctx.fillRect(x + kneeOff, topY + 12, 8, 4);
  }

  _generateBisonFrames(): void {
    const frames = [
      // Frame 0: Left legs forward, right legs back
      [{ y: 42, k: -1 }, { y: 50, k: 1 }, { y: 42, k: -1 }, { y: 50, k: 1 }],
      // Frame 1: Transition
      [{ y: 44, k: 0 }, { y: 48, k: 0 }, { y: 45, k: 0 }, { y: 47, k: 0 }],
      // Frame 2: Neutral stance
      [{ y: 46, k: 0 }, { y: 46, k: 0 }, { y: 46, k: 0 }, { y: 46, k: 0 }],
      // Frame 3: Right legs forward, left legs back
      [{ y: 50, k: 1 }, { y: 42, k: -1 }, { y: 50, k: 1 }, { y: 42, k: -1 }],
      // Frame 4: Transition opposite
      [{ y: 48, k: 0 }, { y: 44, k: 0 }, { y: 47, k: 0 }, { y: 45, k: 0 }],
    ];

    const xPositions = [26, 36, 54, 64];

    frames.forEach((legs, i) => {
      this._ct(`bison_walk_${i}`, 80, 64, (ctx) => {
        // Shadow
        this._drawShadow(ctx, 44, 62, 24, 3);
        legs.forEach((leg, idx) => {
          this._drawBisonLeg(ctx, xPositions[idx], leg.y, leg.k);
        });
        this._drawBisonBody(ctx);
      });
    });

    // Death frame
    this._ct('bison_dead_0', 80, 64, (ctx) => {
      // Shadow
      this._drawShadow(ctx, 40, 56, 26, 5);

      // Massive body fallen on side
      const bg = ctx.createRadialGradient(40, 40, 6, 40, 40, 24);
      bg.addColorStop(0, '#5C3A1E');
      bg.addColorStop(1, '#3A1E0A');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(40, 40, 24, 14, 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Hump visible
      ctx.fillStyle = '#4A2A12';
      ctx.beginPath();
      ctx.ellipse(26, 32, 14, 10, -0.1, 0, Math.PI * 2);
      ctx.fill();

      // Shaggy fur texture on fallen body
      ctx.strokeStyle = 'rgba(80,50,20,0.4)';
      ctx.lineWidth = 1;
      for (let f = 0; f < 20; f++) {
        const fx = 16 + Math.random() * 28;
        const fy = 28 + Math.random() * 14;
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(fx + (Math.random() - 0.5) * 4, fy - 3 - Math.random() * 3);
        ctx.stroke();
      }

      // Head on ground
      ctx.fillStyle = '#4A2A12';
      ctx.beginPath();
      ctx.ellipse(14, 42, 12, 10, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Beard
      ctx.fillStyle = '#3A1A08';
      ctx.beginPath();
      ctx.ellipse(8, 48, 6, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Horns
      ctx.strokeStyle = '#8B8060';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(10, 34); ctx.lineTo(6, 28); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(18, 34); ctx.lineTo(22, 28); ctx.stroke();

      // Limp legs
      ctx.fillStyle = '#3A1E0A';
      ctx.fillRect(22, 50, 7, 8);
      ctx.fillRect(32, 48, 7, 10);
      ctx.fillRect(48, 50, 7, 8);
      ctx.fillRect(58, 52, 7, 6);

      // X eyes
      this._drawXEye(ctx, 10, 40, 2);
    });
  }

  // ===================== CONDOR (66x40, 5 walk + 1 death) =====================

  _drawCondorBody(ctx: CanvasRenderingContext2D): void {
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

  _drawCondorWing(ctx: CanvasRenderingContext2D, side: string, startX: number, startY: number, endY: number, isUpper: boolean): void {
    // Wing shape
    ctx.fillStyle = '#1A1A1A';
    ctx.beginPath();
    ctx.moveTo(startX, isUpper ? 20 : 24);
    ctx.quadraticCurveTo(38, endY, 56, endY + (isUpper ? 2 : -2));
    ctx.lineTo(50, isUpper ? 20 : 24);
    ctx.fill();

    // White wing patches
    ctx.fillStyle = '#DDDDCC';
    ctx.beginPath();
    ctx.moveTo(40, endY + (isUpper ? 3 : -6));
    ctx.lineTo(54, endY + (isUpper ? 2 : -2));
    ctx.lineTo(50, endY + (isUpper ? 6 : -5));
    ctx.lineTo(38, endY + (isUpper ? 6 : -6));
    ctx.fill();

    // Layered flight feather details
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.6;
    for (let f = 0; f < 5; f++) {
      const yOff = isUpper ? (4 + f) : (-4 - f);
      ctx.beginPath();
      ctx.moveTo(26 + f * 6, endY + yOff);
      ctx.lineTo(44 + f * 2, endY + yOff - (isUpper ? 1 : -1));
      ctx.stroke();
    }

    // Individual feather tips at wing edge
    ctx.strokeStyle = '#2A2A2A';
    ctx.lineWidth = 0.8;
    for (let t = 0; t < 4; t++) {
      const tx = 46 + t * 3;
      const ty = endY + (isUpper ? 1 : -1) + t * (isUpper ? 0.5 : -0.5);
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx + 2, ty + (isUpper ? -1 : 1));
      ctx.stroke();
    }
  }

  _generateCondorFrames(): void {
    // 5-frame wing cycle
    const wingAngles = [
      { upY: 6, downY: 34 },   // Frame 0: Wings level
      { upY: 2, downY: 28 },   // Frame 1: Wings halfway up
      { upY: -2, downY: 22 },  // Frame 2: Wings fully up
      { upY: 2, downY: 30 },   // Frame 3: Wings halfway down
      { upY: 10, downY: 40 },  // Frame 4: Wings fully down
    ];

    wingAngles.forEach(({ upY, downY }, i) => {
      this._ct(`condor_walk_${i}`, 66, 40, (ctx) => {
        // Upper wing
        this._drawCondorWing(ctx, 'top', 22, 20, upY, true);
        // Lower wing
        this._drawCondorWing(ctx, 'bottom', 22, 24, downY, false);

        this._drawCondorBody(ctx);
      });
    });

    // Death frame
    this._ct('condor_dead_0', 66, 40, (ctx) => {
      // Shadow
      this._drawShadow(ctx, 33, 36, 24, 4);

      // Body on side
      ctx.fillStyle = '#1A1A1A';
      ctx.beginPath();
      ctx.ellipse(30, 28, 12, 7, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Wings limp / spread out flat
      ctx.fillStyle = '#222';
      // Left wing drooping
      ctx.beginPath();
      ctx.moveTo(22, 26);
      ctx.lineTo(4, 34);
      ctx.lineTo(8, 36);
      ctx.lineTo(24, 30);
      ctx.fill();
      // Right wing drooping
      ctx.beginPath();
      ctx.moveTo(38, 26);
      ctx.lineTo(58, 32);
      ctx.lineTo(56, 36);
      ctx.lineTo(36, 30);
      ctx.fill();

      // White patches on limp wings
      ctx.fillStyle = '#DDDDCC';
      ctx.beginPath();
      ctx.moveTo(6, 34); ctx.lineTo(12, 33); ctx.lineTo(10, 36); ctx.lineTo(6, 36);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(52, 32); ctx.lineTo(58, 33); ctx.lineTo(56, 36); ctx.lineTo(50, 35);
      ctx.fill();

      // Head resting
      ctx.fillStyle = '#AA3322';
      ctx.beginPath();
      ctx.arc(16, 24, 5, 0, Math.PI * 2);
      ctx.fill();

      // White ruff
      ctx.fillStyle = '#EEEEDD';
      ctx.beginPath();
      ctx.ellipse(22, 24, 4, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Beak
      ctx.fillStyle = '#555';
      ctx.beginPath();
      ctx.moveTo(11, 24); ctx.lineTo(7, 26); ctx.lineTo(9, 28); ctx.lineTo(12, 26);
      ctx.fill();

      // Feet limp
      ctx.fillStyle = '#555';
      ctx.fillRect(26, 34, 2, 4);
      ctx.fillRect(32, 34, 2, 4);

      // Tail feathers splayed
      ctx.fillStyle = '#222';
      ctx.beginPath();
      ctx.moveTo(42, 26); ctx.lineTo(54, 24); ctx.lineTo(56, 30); ctx.lineTo(42, 30);
      ctx.fill();

      // X eyes
      this._drawXEye(ctx, 14, 23, 2);
    });
  }

  // ===================== PANTHER (66x48, 5 walk + 1 death) =====================

  _drawPantherBody(ctx: CanvasRenderingContext2D): void {
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

    // Glossy sheen highlight
    ctx.fillStyle = 'rgba(100,100,110,0.15)';
    ctx.beginPath();
    ctx.ellipse(38, 22, 16, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Belly - slightly lighter
    ctx.fillStyle = '#1A1A1A';
    ctx.beginPath();
    ctx.ellipse(36, 34, 14, 5, 0, 0, Math.PI * 2);
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

  _drawPantherLeg(ctx: CanvasRenderingContext2D, x: number, topY: number, kneeOff: number): void {
    // Sleek muscular upper leg
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(x, topY, 5, 6);
    // Muscle definition
    ctx.fillStyle = 'rgba(40,40,40,0.3)';
    ctx.beginPath();
    ctx.ellipse(x + 2.5, topY + 3, 2, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    // Lower leg
    ctx.fillStyle = '#080808';
    ctx.fillRect(x + 1 + kneeOff, topY + 5, 4, 5);
    // Paw
    ctx.fillStyle = '#151515';
    ctx.fillRect(x - 1 + kneeOff, topY + 9, 6, 3);
  }

  _generatePantherFrames(): void {
    const frames = [
      // Frame 0: Left legs forward, right legs back
      [{ y: 32, k: -1 }, { y: 38, k: 1 }, { y: 32, k: -1 }, { y: 38, k: 1 }],
      // Frame 1: Transition
      [{ y: 34, k: 0 }, { y: 36, k: 0 }, { y: 35, k: 0 }, { y: 35, k: 0 }],
      // Frame 2: Neutral
      [{ y: 36, k: 0 }, { y: 36, k: 0 }, { y: 36, k: 0 }, { y: 36, k: 0 }],
      // Frame 3: Right legs forward, left legs back
      [{ y: 38, k: 1 }, { y: 32, k: -1 }, { y: 38, k: 1 }, { y: 32, k: -1 }],
      // Frame 4: Transition opposite
      [{ y: 36, k: 0 }, { y: 34, k: 0 }, { y: 35, k: 0 }, { y: 35, k: 0 }],
    ];

    const xPositions = [22, 30, 44, 52];

    frames.forEach((legs, i) => {
      this._ct(`panther_walk_${i}`, 66, 48, (ctx) => {
        // Shadow
        this._drawShadow(ctx, 36, 46, 18, 3);
        legs.forEach((leg, idx) => {
          this._drawPantherLeg(ctx, xPositions[idx], leg.y, leg.k);
        });
        this._drawPantherBody(ctx);
      });
    });

    // Death frame
    this._ct('panther_dead_0', 66, 48, (ctx) => {
      // Shadow
      this._drawShadow(ctx, 34, 44, 22, 4);

      // Body on side
      const bg = ctx.createRadialGradient(34, 34, 4, 34, 34, 18);
      bg.addColorStop(0, '#2A2A2A');
      bg.addColorStop(1, '#0A0A0A');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(34, 34, 20, 10, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Glossy sheen on fallen body
      ctx.fillStyle = 'rgba(80,80,90,0.12)';
      ctx.beginPath();
      ctx.ellipse(34, 30, 16, 4, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = '#1A1A1A';
      ctx.beginPath();
      ctx.ellipse(12, 36, 10, 8, 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Ears flopped
      ctx.fillStyle = '#181818';
      ctx.beginPath();
      ctx.moveTo(8, 28); ctx.lineTo(4, 24); ctx.lineTo(12, 28);
      ctx.fill();

      // Limp legs
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(18, 40, 5, 6);
      ctx.fillRect(28, 38, 5, 8);
      ctx.fillRect(42, 40, 5, 6);
      ctx.fillRect(50, 42, 5, 5);

      // Tail limp
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(54, 32);
      ctx.quadraticCurveTo(62, 36, 64, 40);
      ctx.stroke();

      // X eyes (yellow-green outline for panther)
      this._drawXEye(ctx, 8, 34, 2.5);
    });
  }

  // ===================== ELK (76x62, 5 walk + 1 death) =====================

  _drawElkBody(ctx: CanvasRenderingContext2D): void {
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

  _drawElkLeg(ctx: CanvasRenderingContext2D, x: number, topY: number, kneeOff: number): void {
    // Upper leg
    ctx.fillStyle = '#906830';
    ctx.fillRect(x, topY, 6, 5);
    // Lower leg with knee articulation
    ctx.fillStyle = '#805828';
    ctx.fillRect(x + 1 + kneeOff, topY + 4, 5, 6);
    // Hoof
    ctx.fillStyle = '#333';
    ctx.fillRect(x + kneeOff, topY + 9, 6, 4);
  }

  _generateElkFrames(): void {
    const frames = [
      // Frame 0: Left legs forward, right legs back
      [{ y: 44, k: -1 }, { y: 52, k: 1 }, { y: 44, k: -1 }, { y: 52, k: 1 }],
      // Frame 1: Transition
      [{ y: 46, k: 0 }, { y: 50, k: 0 }, { y: 47, k: 0 }, { y: 49, k: 0 }],
      // Frame 2: Neutral
      [{ y: 48, k: 0 }, { y: 48, k: 0 }, { y: 48, k: 0 }, { y: 48, k: 0 }],
      // Frame 3: Right legs forward, left legs back
      [{ y: 52, k: 1 }, { y: 44, k: -1 }, { y: 52, k: 1 }, { y: 44, k: -1 }],
      // Frame 4: Transition opposite
      [{ y: 50, k: 0 }, { y: 46, k: 0 }, { y: 49, k: 0 }, { y: 47, k: 0 }],
    ];

    const xPositions = [28, 36, 52, 60];

    frames.forEach((legs, i) => {
      this._ct(`elk_walk_${i}`, 76, 62, (ctx) => {
        // Shadow
        this._drawShadow(ctx, 42, 60, 22, 3);
        legs.forEach((leg, idx) => {
          this._drawElkLeg(ctx, xPositions[idx], leg.y, leg.k);
        });
        this._drawElkBody(ctx);
      });
    });

    // Death frame
    this._ct('elk_dead_0', 76, 62, (ctx) => {
      // Shadow
      this._drawShadow(ctx, 38, 56, 24, 5);

      // Body on side
      const bg = ctx.createRadialGradient(38, 40, 4, 38, 40, 22);
      bg.addColorStop(0, '#C8A060');
      bg.addColorStop(1, '#A07838');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(38, 40, 22, 12, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Rump patch visible
      ctx.fillStyle = '#E8D098';
      ctx.beginPath();
      ctx.ellipse(56, 38, 6, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Belly
      ctx.fillStyle = '#D8B878';
      ctx.beginPath();
      ctx.ellipse(36, 46, 16, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Neck/mane
      ctx.fillStyle = '#6B4A2A';
      ctx.fillRect(14, 28, 12, 16);

      // Head resting
      ctx.fillStyle = '#B09050';
      ctx.beginPath();
      ctx.ellipse(12, 36, 10, 8, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Muzzle
      ctx.fillStyle = '#D8B878';
      ctx.beginPath();
      ctx.ellipse(4, 40, 5, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Antlers fallen sideways
      ctx.strokeStyle = '#9B8050';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(8, 28); ctx.lineTo(2, 18); ctx.stroke();
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(2, 18); ctx.lineTo(-4, 12); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(4, 22); ctx.lineTo(-2, 18); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, 16); ctx.lineTo(-4, 14); ctx.stroke();
      // Right antler
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(16, 28); ctx.lineTo(22, 18); ctx.stroke();
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(22, 18); ctx.lineTo(28, 12); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(20, 22); ctx.lineTo(26, 18); ctx.stroke();

      // Limp legs
      ctx.fillStyle = '#906830';
      ctx.fillRect(20, 48, 5, 8);
      ctx.fillRect(30, 46, 5, 10);
      ctx.fillRect(46, 48, 5, 8);
      ctx.fillRect(54, 50, 5, 7);

      // Hooves
      ctx.fillStyle = '#333';
      ctx.fillRect(20, 55, 5, 3);
      ctx.fillRect(30, 55, 5, 3);
      ctx.fillRect(46, 55, 5, 3);
      ctx.fillRect(54, 56, 5, 3);

      // X eyes
      this._drawXEye(ctx, 8, 34, 2.5);
    });
  }

  // ===================== VULTURE (54x36, 5 walk + 1 death) =====================

  _drawVultureBody(ctx: CanvasRenderingContext2D): void {
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

  _drawVultureWing(ctx: CanvasRenderingContext2D, endY: number, isUpper: boolean): void {
    ctx.fillStyle = '#2A1A0A';
    ctx.beginPath();
    ctx.moveTo(18, isUpper ? 18 : 22);
    ctx.quadraticCurveTo(30, endY, 46, endY + (isUpper ? 2 : -2));
    ctx.lineTo(40, isUpper ? 18 : 22);
    ctx.fill();

    // Feather lines
    ctx.strokeStyle = '#1A0A00';
    ctx.lineWidth = 0.5;
    for (let f = 0; f < 4; f++) {
      const yOff = isUpper ? (4 + f) : (-4 - f);
      ctx.beginPath();
      ctx.moveTo(22 + f * 5, endY + yOff);
      ctx.lineTo(36 + f * 2, endY + yOff - (isUpper ? 1 : -1));
      ctx.stroke();
    }
  }

  _generateVultureFrames(): void {
    // 5-frame wing cycle
    const wingAngles = [
      { upY: 6, downY: 30 },   // Frame 0: Wings level
      { upY: 2, downY: 26 },   // Frame 1: Wings halfway up
      { upY: -1, downY: 20 },  // Frame 2: Wings fully up
      { upY: 3, downY: 28 },   // Frame 3: Wings halfway down
      { upY: 10, downY: 36 },  // Frame 4: Wings fully down
    ];

    wingAngles.forEach(({ upY, downY }, i) => {
      this._ct(`vulture_walk_${i}`, 54, 36, (ctx) => {
        // Upper wing
        this._drawVultureWing(ctx, upY, true);
        // Lower wing
        this._drawVultureWing(ctx, downY, false);

        this._drawVultureBody(ctx);
      });
    });

    // Death frame
    this._ct('vulture_dead_0', 54, 36, (ctx) => {
      // Shadow
      this._drawShadow(ctx, 27, 32, 20, 4);

      // Body on side
      ctx.fillStyle = '#1A1008';
      ctx.beginPath();
      ctx.ellipse(26, 24, 10, 6, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Wings limp / spread flat
      ctx.fillStyle = '#2A1A0A';
      // Left wing drooping
      ctx.beginPath();
      ctx.moveTo(18, 22);
      ctx.lineTo(2, 30);
      ctx.lineTo(6, 32);
      ctx.lineTo(20, 26);
      ctx.fill();
      // Right wing drooping
      ctx.beginPath();
      ctx.moveTo(34, 22);
      ctx.lineTo(50, 28);
      ctx.lineTo(48, 32);
      ctx.lineTo(32, 26);
      ctx.fill();

      // Feather detail on limp wings
      ctx.strokeStyle = '#1A0A00';
      ctx.lineWidth = 0.4;
      for (let f = 0; f < 3; f++) {
        ctx.beginPath();
        ctx.moveTo(6 + f * 4, 30 + f * 0.5);
        ctx.lineTo(10 + f * 3, 29);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(40 + f * 3, 28 + f * 0.5);
        ctx.lineTo(44 + f * 2, 27);
        ctx.stroke();
      }

      // Hunched neck on ground
      ctx.fillStyle = '#CCBBAA';
      ctx.beginPath();
      ctx.ellipse(14, 18, 4, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Bald head resting
      ctx.fillStyle = '#BB6655';
      ctx.beginPath();
      ctx.arc(8, 16, 4, 0, Math.PI * 2);
      ctx.fill();

      // Beak
      ctx.fillStyle = '#555';
      ctx.beginPath();
      ctx.moveTo(4, 16); ctx.lineTo(1, 18); ctx.lineTo(2, 20); ctx.lineTo(5, 18);
      ctx.fill();

      // Feet limp
      ctx.fillStyle = '#666';
      ctx.fillRect(22, 30, 2, 4);
      ctx.fillRect(28, 30, 2, 4);

      // Tail splayed
      ctx.fillStyle = '#2A1A0A';
      ctx.beginPath();
      ctx.moveTo(36, 22); ctx.lineTo(46, 20); ctx.lineTo(48, 26); ctx.lineTo(36, 26);
      ctx.fill();

      // X eyes
      this._drawXEye(ctx, 7, 15, 1.8);
    });
  }

  // ===================== ALLIGATOR (74x24, 5 walk + 1 death) =====================

  _drawAlligatorBody(ctx: CanvasRenderingContext2D, frame: number): void {
    // Tail sway based on frame
    const tailSwayAngles = [0, -0.08, 0, 0.08, -0.04];
    const tailSway = tailSwayAngles[frame] || 0;

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

    // Armored scale pattern - rows of small diamonds
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

    // Additional armored ridge detail
    ctx.strokeStyle = 'rgba(30,60,30,0.3)';
    ctx.lineWidth = 0.5;
    for (let rx = 18; rx < 54; rx += 5) {
      ctx.beginPath();
      ctx.moveTo(rx, 7);
      ctx.lineTo(rx + 3, 7);
      ctx.stroke();
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

    // Jaw opening varies per frame
    const jawOpen = frame === 1 || frame === 3 ? 1.5 : 0;
    if (jawOpen > 0) {
      // Show inside of mouth
      ctx.fillStyle = '#CC6666';
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.lineTo(0, 10 + jawOpen);
      ctx.lineTo(12, 10 + jawOpen);
      ctx.lineTo(12, 10);
      ctx.fill();
    }

    // Teeth visible - jagged line between jaws
    ctx.fillStyle = '#FFFFEE';
    for (let t = 1; t < 14; t += 2) {
      ctx.beginPath();
      ctx.moveTo(t, 10);
      ctx.lineTo(t + 0.5, 11.5 + jawOpen);
      ctx.lineTo(t + 1, 10);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(t, 12 + jawOpen);
      ctx.lineTo(t + 0.5, 10.5);
      ctx.lineTo(t + 1, 12 + jawOpen);
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

    // Tail - tapers, with sway
    ctx.save();
    ctx.translate(60, 12);
    ctx.rotate(tailSway);
    ctx.translate(-60, -12);
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
    ctx.restore();

    // Legs splayed to sides - animated per frame
    const legPhases = [
      { fl: 0, fr: 0, bl: 0, br: 0 },     // Frame 0: neutral
      { fl: -2, fr: 1, bl: 1, br: -2 },    // Frame 1: left forward
      { fl: -1, fr: 0, bl: 0, br: -1 },    // Frame 2: passing center
      { fl: 1, fr: -2, bl: -2, br: 1 },    // Frame 3: right forward
      { fl: 0, fr: -1, bl: -1, br: 0 },    // Frame 4: passing back
    ];
    const phase = legPhases[frame] || legPhases[0];

    ctx.fillStyle = '#2A5522';

    // Front left (upper, splayed out)
    ctx.fillRect(18, 4 + phase.fl, 4, 3);
    ctx.fillRect(16 + phase.fl, 3 + phase.fl, 3, 2);
    // Front right (lower, splayed out)
    ctx.fillRect(18, 17 + phase.fr, 4, 3);
    ctx.fillRect(16 + phase.fr, 19 + phase.fr, 3, 2);

    // Back left
    ctx.fillRect(50, 4 + phase.bl, 4, 3);
    ctx.fillRect(48 + phase.bl, 3 + phase.bl, 3, 2);
    // Back right
    ctx.fillRect(50, 17 + phase.br, 4, 3);
    ctx.fillRect(48 + phase.br, 19 + phase.br, 3, 2);

    // Claws
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 0.5;
    // Front left claws
    ctx.beginPath();
    ctx.moveTo(16 + phase.fl, 3 + phase.fl); ctx.lineTo(14 + phase.fl, 2 + phase.fl);
    ctx.moveTo(16 + phase.fl, 4 + phase.fl); ctx.lineTo(14 + phase.fl, 4 + phase.fl);
    ctx.stroke();
    // Front right claws
    ctx.beginPath();
    ctx.moveTo(16 + phase.fr, 20 + phase.fr); ctx.lineTo(14 + phase.fr, 20 + phase.fr);
    ctx.moveTo(16 + phase.fr, 21 + phase.fr); ctx.lineTo(14 + phase.fr, 22 + phase.fr);
    ctx.stroke();
    // Back left claws
    ctx.beginPath();
    ctx.moveTo(48 + phase.bl, 3 + phase.bl); ctx.lineTo(46 + phase.bl, 2 + phase.bl);
    ctx.moveTo(48 + phase.bl, 4 + phase.bl); ctx.lineTo(46 + phase.bl, 4 + phase.bl);
    ctx.stroke();
    // Back right claws
    ctx.beginPath();
    ctx.moveTo(48 + phase.br, 20 + phase.br); ctx.lineTo(46 + phase.br, 20 + phase.br);
    ctx.moveTo(48 + phase.br, 21 + phase.br); ctx.lineTo(46 + phase.br, 22 + phase.br);
    ctx.stroke();
  }

  _generateAlligatorFrames(): void {
    // 5-frame walk cycle
    [0, 1, 2, 3, 4].forEach(i => {
      this._ct(`alligator_walk_${i}`, 74, 24, (ctx) => {
        // Shadow
        this._drawShadow(ctx, 36, 22, 22, 2);
        this._drawAlligatorBody(ctx, i);
      });
    });

    // Death frame - belly up / on side
    this._ct('alligator_dead_0', 74, 24, (ctx) => {
      // Shadow
      this._drawShadow(ctx, 36, 22, 24, 3);

      // Body flipped - belly up
      ctx.fillStyle = '#88AA66';
      ctx.beginPath();
      ctx.ellipse(36, 12, 22, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Darker edges (top ridge now at bottom since flipped)
      ctx.fillStyle = '#224422';
      ctx.beginPath();
      ctx.ellipse(36, 17, 20, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Belly scutes (rectangular pattern visible when belly-up)
      ctx.strokeStyle = 'rgba(100,130,80,0.4)';
      ctx.lineWidth = 0.5;
      for (let bx = 18; bx < 54; bx += 5) {
        ctx.beginPath();
        ctx.rect(bx, 8, 4, 6);
        ctx.stroke();
      }

      // Head on side with jaws open
      ctx.fillStyle = '#3A6633';
      ctx.beginPath();
      ctx.moveTo(0, 6);
      ctx.lineTo(0, 16);
      ctx.lineTo(14, 16);
      ctx.lineTo(14, 4);
      ctx.closePath();
      ctx.fill();

      // Open jaw
      ctx.fillStyle = '#CC6666';
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.lineTo(0, 14);
      ctx.lineTo(12, 14);
      ctx.lineTo(12, 10);
      ctx.fill();

      // Teeth
      ctx.fillStyle = '#FFFFEE';
      for (let t = 1; t < 12; t += 2) {
        ctx.beginPath();
        ctx.moveTo(t, 10);
        ctx.lineTo(t + 0.5, 12);
        ctx.lineTo(t + 1, 10);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(t, 14);
        ctx.lineTo(t + 0.5, 12);
        ctx.lineTo(t + 1, 14);
        ctx.fill();
      }

      // Legs limp, splayed out
      ctx.fillStyle = '#2A5522';
      ctx.fillRect(18, 2, 4, 3);
      ctx.fillRect(14, 1, 3, 2);
      ctx.fillRect(18, 19, 4, 3);
      ctx.fillRect(14, 21, 3, 2);
      ctx.fillRect(50, 2, 4, 3);
      ctx.fillRect(46, 1, 3, 2);
      ctx.fillRect(50, 19, 4, 3);
      ctx.fillRect(46, 21, 3, 2);

      // Tail limp
      ctx.fillStyle = '#2A4A22';
      ctx.beginPath();
      ctx.moveTo(58, 10);
      ctx.lineTo(74, 12);
      ctx.lineTo(74, 14);
      ctx.lineTo(58, 14);
      ctx.closePath();
      ctx.fill();

      // X eye
      this._drawXEye(ctx, 10, 6, 1.8);
    });
  }
}
