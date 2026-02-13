import { SpriteFactory } from './SpriteFactory';

const ANIMAL_SCALE = 0.62;

export class AnimalSpritesT5 extends SpriteFactory {
  _ct(key: string, w: number, h: number, drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number) => void): void {
    this.createTexture(key, w, h, drawFn, ANIMAL_SCALE);
  }

  generate(): void {
    this._generateRhinoFrames();
    this._generateHippoFrames();
    this._generateGorillaFrames();
    this._generateGoldenEagleFrames();
    this._generateMammothFrames();
    this._generateDragonFrames();
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

  _drawXEye(ctx: CanvasRenderingContext2D, x: number, y: number, r: number): void {
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x - r, y - r);
    ctx.lineTo(x + r, y + r);
    ctx.moveTo(x + r, y - r);
    ctx.lineTo(x - r, y + r);
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

  // ===================== RHINO (78x58, 5 walk + 1 death) =====================

  _drawRhinoBody(ctx: CanvasRenderingContext2D): void {
    // Massive thick body
    const bg = ctx.createRadialGradient(46, 30, 6, 46, 30, 26);
    bg.addColorStop(0, '#888888');
    bg.addColorStop(1, '#5A5A5A');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(46, 30, 26, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    // Armored skin fold lines
    ctx.strokeStyle = 'rgba(60,60,60,0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(28, 18);
    ctx.quadraticCurveTo(32, 30, 28, 42);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(42, 16);
    ctx.quadraticCurveTo(44, 28, 42, 44);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(58, 18);
    ctx.quadraticCurveTo(60, 28, 58, 42);
    ctx.stroke();

    // Belly
    ctx.fillStyle = '#7A7A7A';
    ctx.beginPath();
    ctx.ellipse(44, 40, 20, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Subtle skin texture bumps
    ctx.fillStyle = 'rgba(90,90,90,0.3)';
    for (let bx = 28; bx < 64; bx += 5) {
      for (let by = 20; by < 38; by += 5) {
        ctx.beginPath();
        ctx.arc(bx + Math.random() * 3, by + Math.random() * 3, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Head
    const hg = ctx.createRadialGradient(14, 24, 2, 14, 24, 14);
    hg.addColorStop(0, '#888888');
    hg.addColorStop(1, '#666666');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.ellipse(14, 24, 14, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Snout area
    ctx.fillStyle = '#777';
    ctx.beginPath();
    ctx.ellipse(4, 26, 7, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Large horn on nose
    ctx.fillStyle = '#AAA088';
    ctx.beginPath();
    ctx.moveTo(2, 20);
    ctx.lineTo(-2, 8);
    ctx.lineTo(6, 8);
    ctx.lineTo(8, 18);
    ctx.closePath();
    ctx.fill();
    // Horn shading
    ctx.fillStyle = 'rgba(140,130,110,0.5)';
    ctx.beginPath();
    ctx.moveTo(2, 20);
    ctx.lineTo(0, 10);
    ctx.lineTo(4, 10);
    ctx.lineTo(5, 18);
    ctx.closePath();
    ctx.fill();

    // Smaller horn behind
    ctx.fillStyle = '#AAA088';
    ctx.beginPath();
    ctx.moveTo(10, 16);
    ctx.lineTo(9, 10);
    ctx.lineTo(13, 10);
    ctx.lineTo(14, 16);
    ctx.closePath();
    ctx.fill();

    // Nostrils
    ctx.fillStyle = '#444';
    ctx.beginPath(); ctx.ellipse(1, 26, 1.5, 1, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(1, 28, 1.5, 1, 0, 0, Math.PI * 2); ctx.fill();

    // Small eye
    this._drawEye(ctx, 12, 22, 2, '#443322');

    // Ears
    ctx.fillStyle = '#777';
    ctx.beginPath();
    ctx.ellipse(18, 14, 3, 4, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#999';
    ctx.beginPath();
    ctx.ellipse(18, 14, 1.5, 2.5, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Short tail
    ctx.strokeStyle = '#5A5A5A';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(72, 26);
    ctx.quadraticCurveTo(78, 22, 76, 18);
    ctx.stroke();
    // Tail tuft
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.ellipse(76, 18, 2, 3, -0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  _generateRhinoFrames(): void {
    // 5-frame walk cycle: left fwd, transition, neutral, right fwd, transition back
    const xPositions = [24, 34, 54, 64];
    const frames = [
      // Frame 0: Left legs forward, right legs back
      { legs: [38, 38, 46, 46], xOff: [-2, -2, 2, 2] },
      // Frame 1: Transition — legs passing center
      { legs: [40, 42, 44, 42], xOff: [-1, 0, 1, 0] },
      // Frame 2: Neutral stance — all legs mid-stride
      { legs: [42, 42, 42, 42], xOff: [0, 0, 0, 0] },
      // Frame 3: Right legs forward, left legs back
      { legs: [46, 46, 38, 38], xOff: [2, 2, -2, -2] },
      // Frame 4: Transition — legs passing (opposite of 1)
      { legs: [44, 42, 40, 42], xOff: [1, 0, -1, 0] },
    ];

    frames.forEach((f, i) => {
      this._ct(`rhino_walk_${i}`, 78, 58, (ctx) => {
        // Shadow under body
        this._drawShadow(ctx, 44, 54, 24, 3);

        f.legs.forEach((ly, idx) => {
          const lx = xPositions[idx] + f.xOff[idx];
          // Very thick legs
          ctx.fillStyle = '#5A5A5A';
          ctx.fillRect(lx, ly, 9, 7);
          ctx.fillStyle = '#4A4A4A';
          ctx.fillRect(lx + 1, ly + 6, 8, 6);
          // Hooves
          ctx.fillStyle = '#333';
          ctx.fillRect(lx - 1, ly + 11, 10, 4);
        });
        this._drawRhinoBody(ctx);
      });
    });

    // Death frame
    this._ct('rhino_dead_0', 78, 58, (ctx) => {
      // Shadow
      this._drawShadow(ctx, 40, 48, 28, 5);

      ctx.save();
      ctx.translate(40, 36);
      ctx.rotate(Math.PI / 2);
      ctx.translate(-40, -36);

      // Body on side
      const bg = ctx.createRadialGradient(46, 30, 6, 46, 30, 26);
      bg.addColorStop(0, '#888888');
      bg.addColorStop(1, '#5A5A5A');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(46, 30, 26, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      // Skin folds
      ctx.strokeStyle = 'rgba(60,60,60,0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(28, 18); ctx.quadraticCurveTo(32, 30, 28, 42); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(42, 16); ctx.quadraticCurveTo(44, 28, 42, 44); ctx.stroke();

      // Head
      ctx.fillStyle = '#777';
      ctx.beginPath();
      ctx.ellipse(14, 24, 14, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Snout
      ctx.fillStyle = '#777';
      ctx.beginPath();
      ctx.ellipse(4, 26, 7, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Horn visible
      ctx.fillStyle = '#AAA088';
      ctx.beginPath();
      ctx.moveTo(2, 20); ctx.lineTo(-2, 8); ctx.lineTo(6, 8); ctx.lineTo(8, 18);
      ctx.closePath();
      ctx.fill();

      // X eyes
      this._drawXEye(ctx, 12, 22, 2.5);

      // Limp legs sticking out
      ctx.fillStyle = '#5A5A5A';
      ctx.fillRect(30, 46, 8, 6);
      ctx.fillRect(44, 46, 8, 6);
      ctx.fillRect(56, 44, 8, 5);
      ctx.fillRect(66, 44, 8, 5);

      ctx.restore();
    });
  }

  // ===================== HIPPO (82x60, 5 walk + 1 death) =====================

  _drawHippoBody(ctx: CanvasRenderingContext2D): void {
    // Massive barrel-shaped body
    const bg = ctx.createRadialGradient(48, 30, 6, 48, 30, 28);
    bg.addColorStop(0, '#887799');
    bg.addColorStop(1, '#665577');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(48, 30, 28, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lighter belly
    ctx.fillStyle = '#998899';
    ctx.beginPath();
    ctx.ellipse(46, 42, 22, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Skin sheen highlights
    ctx.fillStyle = 'rgba(180,160,180,0.15)';
    ctx.beginPath();
    ctx.ellipse(42, 22, 16, 8, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Subtle skin folds
    ctx.strokeStyle = 'rgba(80,60,80,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(32, 18); ctx.quadraticCurveTo(34, 30, 32, 42); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(56, 16); ctx.quadraticCurveTo(58, 28, 56, 44); ctx.stroke();

    // Head - very large
    const hg = ctx.createRadialGradient(16, 24, 3, 16, 24, 16);
    hg.addColorStop(0, '#887799');
    hg.addColorStop(1, '#776688');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.ellipse(16, 24, 16, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    // Huge wide mouth / jaw
    ctx.fillStyle = '#776688';
    ctx.beginPath();
    ctx.ellipse(6, 30, 10, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mouth opening / lip line
    ctx.strokeStyle = '#554466';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 30); ctx.lineTo(14, 30); ctx.stroke();

    // Lower lip
    ctx.fillStyle = '#998899';
    ctx.beginPath();
    ctx.ellipse(6, 34, 8, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Inner mouth hint with teeth/tusks
    ctx.fillStyle = '#CC6688';
    ctx.beginPath();
    ctx.ellipse(6, 31, 6, 2, 0, 0, Math.PI * 2);
    ctx.fill();
    // Small tusks visible
    ctx.fillStyle = '#EEEEDD';
    ctx.beginPath();
    ctx.moveTo(2, 30); ctx.lineTo(1, 27); ctx.lineTo(3, 30); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(8, 30); ctx.lineTo(9, 27); ctx.lineTo(10, 30); ctx.fill();

    // Nostrils - bumps on top of snout
    ctx.fillStyle = '#776688';
    ctx.beginPath();
    ctx.ellipse(2, 24, 3, 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#444';
    ctx.beginPath(); ctx.arc(1, 24, 1, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(4, 24, 1, 0, Math.PI * 2); ctx.fill();

    // Small eyes - set high
    this._drawEye(ctx, 10, 18, 2, '#443322');

    // Small ears
    ctx.fillStyle = '#776688';
    ctx.beginPath();
    ctx.ellipse(12, 12, 3, 4, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(20, 12, 3, 4, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#998899';
    ctx.beginPath();
    ctx.ellipse(12, 12, 1.5, 2.5, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(20, 12, 1.5, 2.5, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Short tail
    ctx.strokeStyle = '#665577';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(76, 26);
    ctx.quadraticCurveTo(80, 22, 78, 20);
    ctx.stroke();
  }

  _generateHippoFrames(): void {
    const xPositions = [28, 38, 56, 66];
    // 5-frame walk: left fwd, transition, neutral, right fwd, transition back
    const frames = [
      { legs: [40, 40, 48, 48], xOff: [-2, -2, 2, 2] },
      { legs: [42, 44, 46, 44], xOff: [-1, 0, 1, 0] },
      { legs: [44, 44, 44, 44], xOff: [0, 0, 0, 0] },
      { legs: [48, 48, 40, 40], xOff: [2, 2, -2, -2] },
      { legs: [46, 44, 42, 44], xOff: [1, 0, -1, 0] },
    ];

    frames.forEach((f, i) => {
      this._ct(`hippo_walk_${i}`, 82, 60, (ctx) => {
        // Shadow
        this._drawShadow(ctx, 46, 56, 26, 3);

        f.legs.forEach((ly, idx) => {
          const lx = xPositions[idx] + f.xOff[idx];
          // Very thick short legs
          ctx.fillStyle = '#665577';
          ctx.fillRect(lx, ly, 10, 6);
          ctx.fillStyle = '#554466';
          ctx.fillRect(lx + 1, ly + 5, 9, 5);
          // Wide feet
          ctx.fillStyle = '#443355';
          ctx.fillRect(lx - 1, ly + 9, 11, 4);
          // Toenails
          ctx.fillStyle = '#333';
          ctx.fillRect(lx, ly + 12, 3, 2);
          ctx.fillRect(lx + 4, ly + 12, 3, 2);
          ctx.fillRect(lx + 7, ly + 12, 3, 2);
        });
        this._drawHippoBody(ctx);
      });
    });

    // Death frame
    this._ct('hippo_dead_0', 82, 60, (ctx) => {
      // Shadow
      this._drawShadow(ctx, 42, 50, 30, 5);

      ctx.save();
      ctx.translate(42, 36);
      ctx.rotate(Math.PI / 2);
      ctx.translate(-42, -36);

      // Body on side
      const bg = ctx.createRadialGradient(48, 30, 6, 48, 30, 28);
      bg.addColorStop(0, '#887799');
      bg.addColorStop(1, '#665577');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(48, 30, 28, 20, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = '#776688';
      ctx.beginPath();
      ctx.ellipse(16, 24, 16, 14, 0, 0, Math.PI * 2);
      ctx.fill();

      // Jaw slack open - mouth wide
      ctx.fillStyle = '#776688';
      ctx.beginPath();
      ctx.ellipse(6, 32, 10, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      // Open mouth
      ctx.fillStyle = '#CC6688';
      ctx.beginPath();
      ctx.ellipse(6, 32, 7, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      // Teeth
      ctx.fillStyle = '#EEEEDD';
      ctx.beginPath();
      ctx.moveTo(1, 28); ctx.lineTo(0, 25); ctx.lineTo(3, 28); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(9, 28); ctx.lineTo(10, 25); ctx.lineTo(11, 28); ctx.fill();

      // X eyes
      this._drawXEye(ctx, 10, 18, 2.5);

      // Limp legs
      ctx.fillStyle = '#665577';
      ctx.fillRect(34, 48, 9, 5);
      ctx.fillRect(48, 48, 9, 5);
      ctx.fillRect(60, 46, 9, 4);
      ctx.fillRect(70, 46, 9, 4);

      ctx.restore();
    });
  }

  // ===================== GORILLA (68x64, 5 walk + 1 death) =====================

  _drawGorillaBody(ctx: CanvasRenderingContext2D, frame: number): void {
    // Massive upper body
    const bg = ctx.createRadialGradient(38, 30, 6, 38, 30, 22);
    bg.addColorStop(0, '#333333');
    bg.addColorStop(1, '#1A1A1A');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(38, 30, 22, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    // Silver back stripe
    ctx.fillStyle = 'rgba(180,180,180,0.3)';
    ctx.beginPath();
    ctx.ellipse(44, 26, 14, 8, 0.1, 0, Math.PI * 2);
    ctx.fill();
    // Silver hair detail
    ctx.strokeStyle = 'rgba(160,160,160,0.2)';
    ctx.lineWidth = 0.5;
    for (let f = 0; f < 14; f++) {
      const fx = 32 + Math.random() * 24;
      const fy = 20 + Math.random() * 12;
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx + (Math.random() - 0.5) * 3, fy - 2 - Math.random() * 2);
      ctx.stroke();
    }

    // Muscle definition on shoulders
    ctx.strokeStyle = 'rgba(50,50,50,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(24, 22); ctx.quadraticCurveTo(28, 28, 24, 36); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(52, 22); ctx.quadraticCurveTo(50, 28, 52, 36); ctx.stroke();

    // Dark belly
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.ellipse(36, 40, 16, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Fur texture
    this._drawFur(ctx, 20, 18, 36, 24, 16, 'rgba(30,30,30,0.3)');

    // Head
    const hg = ctx.createRadialGradient(16, 20, 2, 16, 20, 12);
    hg.addColorStop(0, '#2A2A2A');
    hg.addColorStop(1, '#1A1A1A');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.arc(16, 20, 12, 0, Math.PI * 2);
    ctx.fill();

    // Face area
    ctx.fillStyle = '#3A2A2A';
    ctx.beginPath();
    ctx.ellipse(10, 22, 8, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Brow ridge
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.ellipse(12, 17, 8, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Nose
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.ellipse(6, 24, 4, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#222';
    ctx.beginPath(); ctx.ellipse(4, 24, 1.2, 1, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(8, 24, 1.2, 1, 0, 0, Math.PI * 2); ctx.fill();

    // Mouth
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(4, 27);
    ctx.quadraticCurveTo(6, 29, 10, 27);
    ctx.stroke();

    // Eyes
    this._drawEye(ctx, 8, 20, 2, '#442200');

    // Ears
    ctx.fillStyle = '#2A2A2A';
    ctx.beginPath(); ctx.arc(22, 16, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#3A2A2A';
    ctx.beginPath(); ctx.arc(22, 16, 1.5, 0, Math.PI * 2); ctx.fill();

    // Crest on top
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.ellipse(16, 10, 6, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Arms — bipedal/knuckle-walk, 5 positions
    // frame: 0=left arm fwd, 1=transition, 2=neutral, 3=right arm fwd, 4=transition back
    const armOffsets = [
      { l: -4, r: 4 },   // 0: left arm forward, right back
      { l: -2, r: 2 },   // 1: transition
      { l: 0, r: 0 },    // 2: neutral
      { l: 4, r: -4 },   // 3: right arm forward, left back
      { l: 2, r: -2 },   // 4: transition back
    ];
    const aOff = armOffsets[frame] || armOffsets[2];

    // Left arm
    ctx.fillStyle = '#1A1A1A';
    ctx.beginPath();
    ctx.moveTo(22, 26);
    ctx.lineTo(18, 42 + aOff.l);
    ctx.lineTo(14, 52 + aOff.l);
    ctx.lineTo(20, 52 + aOff.l);
    ctx.lineTo(24, 42 + aOff.l);
    ctx.lineTo(26, 28);
    ctx.fill();
    // Knuckle
    ctx.fillStyle = '#2A2A2A';
    ctx.beginPath();
    ctx.ellipse(16, 53 + aOff.l, 4, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Right arm
    ctx.fillStyle = '#151515';
    ctx.beginPath();
    ctx.moveTo(30, 28);
    ctx.lineTo(28, 42 + aOff.r);
    ctx.lineTo(24, 52 + aOff.r);
    ctx.lineTo(30, 52 + aOff.r);
    ctx.lineTo(32, 42 + aOff.r);
    ctx.lineTo(34, 30);
    ctx.fill();
    // Knuckle
    ctx.fillStyle = '#252525';
    ctx.beginPath();
    ctx.ellipse(26, 53 + aOff.r, 4, 3, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  _generateGorillaFrames(): void {
    const xPositions = [40, 52];
    // 5-frame bipedal walk (legs alternate with arms)
    const frames = [
      { legs: [44, 52], lxOff: [-2, 2] },   // 0: left leg fwd, right back
      { legs: [46, 50], lxOff: [-1, 1] },   // 1: transition
      { legs: [48, 48], lxOff: [0, 0] },    // 2: neutral
      { legs: [52, 44], lxOff: [2, -2] },   // 3: right leg fwd, left back
      { legs: [50, 46], lxOff: [1, -1] },   // 4: transition back
    ];

    frames.forEach((f, i) => {
      this._ct(`gorilla_walk_${i}`, 68, 64, (ctx) => {
        // Shadow
        this._drawShadow(ctx, 36, 60, 20, 3);

        // Legs (shorter, behind body)
        f.legs.forEach((ly, idx) => {
          const lx = xPositions[idx] + f.lxOff[idx];
          ctx.fillStyle = '#1A1A1A';
          ctx.fillRect(lx, ly, 8, 7);
          ctx.fillStyle = '#151515';
          ctx.fillRect(lx + 1, ly + 6, 7, 5);
          // Feet
          ctx.fillStyle = '#222';
          ctx.fillRect(lx - 1, ly + 10, 9, 4);
        });
        this._drawGorillaBody(ctx, i);
      });
    });

    // Death frame — fallen forward
    this._ct('gorilla_dead_0', 68, 64, (ctx) => {
      // Shadow
      this._drawShadow(ctx, 34, 54, 24, 5);

      ctx.save();
      ctx.translate(34, 40);
      ctx.rotate(Math.PI * 0.45);
      ctx.translate(-34, -40);

      // Body
      const bg = ctx.createRadialGradient(38, 30, 6, 38, 30, 22);
      bg.addColorStop(0, '#333333');
      bg.addColorStop(1, '#1A1A1A');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(38, 30, 22, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      // Silver back
      ctx.fillStyle = 'rgba(180,180,180,0.3)';
      ctx.beginPath();
      ctx.ellipse(44, 26, 14, 8, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = '#1A1A1A';
      ctx.beginPath();
      ctx.arc(16, 20, 12, 0, Math.PI * 2);
      ctx.fill();

      // Face
      ctx.fillStyle = '#3A2A2A';
      ctx.beginPath();
      ctx.ellipse(10, 22, 8, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // X eyes
      this._drawXEye(ctx, 8, 20, 2.5);

      // Limp arms splayed out
      ctx.fillStyle = '#1A1A1A';
      ctx.fillRect(10, 34, 6, 18);
      ctx.fillRect(24, 36, 6, 16);

      // Knuckles limp
      ctx.fillStyle = '#2A2A2A';
      ctx.beginPath();
      ctx.ellipse(13, 53, 4, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(27, 53, 4, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Limp legs
      ctx.fillStyle = '#1A1A1A';
      ctx.fillRect(44, 42, 7, 8);
      ctx.fillRect(54, 40, 7, 8);

      ctx.restore();
    });
  }

  // ===================== GOLDEN EAGLE (70x42, 5 walk + 1 death) =====================

  _drawGoldenEagleBody(ctx: CanvasRenderingContext2D): void {
    // Body - golden brown
    const bg = ctx.createRadialGradient(32, 22, 3, 32, 22, 14);
    bg.addColorStop(0, '#8B6914');
    bg.addColorStop(1, '#5A4010');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(32, 22, 14, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Feather texture on body (layered)
    ctx.strokeStyle = 'rgba(100,70,20,0.3)';
    ctx.lineWidth = 0.5;
    for (let f = 0; f < 12; f++) {
      const fx = 22 + Math.random() * 20;
      const fy = 16 + Math.random() * 12;
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx + 2, fy + 3);
      ctx.stroke();
    }
    // Layered feather pattern
    ctx.strokeStyle = 'rgba(80,50,10,0.2)';
    ctx.lineWidth = 0.8;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 5; col++) {
        const fx = 22 + col * 4;
        const fy = 16 + row * 4;
        ctx.beginPath();
        ctx.arc(fx, fy, 2.5, 0.5, Math.PI - 0.5);
        ctx.stroke();
      }
    }

    // Head
    const hg = ctx.createRadialGradient(14, 16, 1, 14, 16, 10);
    hg.addColorStop(0, '#DAA520');
    hg.addColorStop(1, '#8B6914');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.arc(14, 16, 10, 0, Math.PI * 2);
    ctx.fill();

    // Golden nape - crown
    ctx.fillStyle = '#DAA520';
    ctx.beginPath();
    ctx.ellipse(18, 12, 7, 5, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(240,200,60,0.3)';
    ctx.beginPath();
    ctx.ellipse(18, 10, 5, 3, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Dark face/crown
    ctx.fillStyle = '#5A4010';
    ctx.beginPath();
    ctx.ellipse(10, 14, 6, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Powerful hooked beak
    ctx.fillStyle = '#555';
    ctx.beginPath();
    ctx.moveTo(5, 16); ctx.lineTo(0, 18); ctx.lineTo(1, 21); ctx.lineTo(6, 19);
    ctx.fill();
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(0, 18); ctx.lineTo(-1, 20); ctx.lineTo(1, 21);
    ctx.fill();

    // Eye - piercing
    this._drawEye(ctx, 9, 15, 2.5, '#DAA520');

    // Tail - white tail feathers
    ctx.fillStyle = '#5A4010';
    ctx.beginPath();
    ctx.moveTo(46, 20); ctx.lineTo(62, 16); ctx.lineTo(62, 26); ctx.lineTo(46, 24);
    ctx.fill();
    // White tail tip
    ctx.fillStyle = 'rgba(240,235,220,0.5)';
    ctx.beginPath();
    ctx.moveTo(56, 17); ctx.lineTo(62, 16); ctx.lineTo(62, 26); ctx.lineTo(56, 25);
    ctx.fill();
    // Tail feather lines
    ctx.strokeStyle = '#4A3008';
    ctx.lineWidth = 0.6;
    for (let t = 0; t < 4; t++) {
      ctx.beginPath();
      ctx.moveTo(48, 20 + t * 2); ctx.lineTo(60, 17 + t * 2); ctx.stroke();
    }

    // Yellow feet with powerful talons
    ctx.fillStyle = '#DAA520';
    ctx.fillRect(26, 30, 3, 6);
    ctx.fillRect(32, 30, 3, 6);
    // Talons
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(26, 36); ctx.lineTo(24, 40);
    ctx.moveTo(28, 36); ctx.lineTo(28, 40);
    ctx.moveTo(32, 36); ctx.lineTo(31, 40);
    ctx.moveTo(34, 36); ctx.lineTo(35, 40);
    ctx.stroke();
  }

  _generateGoldenEagleFrames(): void {
    // 5-frame wing cycle: level, half up, full up, half down, full down
    const wingAngles = [
      { upY: 6, downY: 34 },    // 0: Wings level
      { upY: 0, downY: 28 },    // 1: Wings halfway up
      { upY: -4, downY: 22 },   // 2: Wings fully up
      { upY: 2, downY: 36 },    // 3: Wings halfway down
      { upY: 10, downY: 42 },   // 4: Wings fully down
    ];

    wingAngles.forEach(({ upY, downY }, i) => {
      this._ct(`golden_eagle_walk_${i}`, 70, 42, (ctx) => {
        // Upper wing
        ctx.fillStyle = '#6B4910';
        ctx.beginPath();
        ctx.moveTo(24, 20);
        ctx.quadraticCurveTo(40, upY, 60, upY + 2);
        ctx.lineTo(54, 20);
        ctx.fill();
        // Wing feather detail
        ctx.fillStyle = '#8B6914';
        ctx.beginPath();
        ctx.moveTo(30, upY + 6);
        ctx.lineTo(56, upY + 3);
        ctx.lineTo(52, upY + 8);
        ctx.lineTo(28, upY + 9);
        ctx.fill();
        // Primary feather tips
        ctx.strokeStyle = '#4A3008';
        ctx.lineWidth = 0.8;
        for (let f = 0; f < 4; f++) {
          ctx.beginPath();
          ctx.moveTo(50 + f * 3, upY + 1 + f);
          ctx.lineTo(54 + f * 2, upY + 3 + f);
          ctx.stroke();
        }

        // Lower wing
        ctx.fillStyle = '#6B4910';
        ctx.beginPath();
        ctx.moveTo(24, 24);
        ctx.quadraticCurveTo(40, downY, 60, downY - 2);
        ctx.lineTo(54, 24);
        ctx.fill();
        // Lower wing feather detail
        ctx.fillStyle = '#8B6914';
        ctx.beginPath();
        ctx.moveTo(30, downY - 8);
        ctx.lineTo(56, downY - 3);
        ctx.lineTo(52, downY - 6);
        ctx.lineTo(28, downY - 9);
        ctx.fill();

        // Feather lines on both wings
        ctx.strokeStyle = '#4A3008';
        ctx.lineWidth = 0.7;
        for (let f = 0; f < 6; f++) {
          ctx.beginPath();
          ctx.moveTo(28 + f * 5, upY + 4 + f);
          ctx.lineTo(46 + f * 2, upY + 3 + f);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(28 + f * 5, downY - 4 - f);
          ctx.lineTo(46 + f * 2, downY - 3 - f);
          ctx.stroke();
        }

        ctx.save();
        ctx.translate(0, 2);
        this._drawGoldenEagleBody(ctx);
        ctx.restore();
      });
    });

    // Death frame
    this._ct('golden_eagle_dead_0', 70, 42, (ctx) => {
      // Shadow
      this._drawShadow(ctx, 35, 36, 26, 4);

      ctx.save();
      ctx.translate(35, 28);
      ctx.rotate(Math.PI / 2);
      ctx.translate(-35, -28);

      // Body on side
      ctx.fillStyle = '#5A4010';
      ctx.beginPath();
      ctx.ellipse(32, 22, 14, 9, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = '#8B6914';
      ctx.beginPath();
      ctx.arc(14, 16, 10, 0, Math.PI * 2);
      ctx.fill();

      // Golden crown
      ctx.fillStyle = '#DAA520';
      ctx.beginPath();
      ctx.ellipse(18, 12, 7, 5, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Beak
      ctx.fillStyle = '#555';
      ctx.beginPath();
      ctx.moveTo(5, 16); ctx.lineTo(0, 18); ctx.lineTo(1, 21); ctx.lineTo(6, 19);
      ctx.fill();

      // X eyes
      this._drawXEye(ctx, 9, 15, 2.5);

      // Limp wings crumpled
      ctx.fillStyle = 'rgba(107,73,16,0.7)';
      ctx.beginPath();
      ctx.moveTo(24, 20);
      ctx.lineTo(30, 30); ctx.lineTo(42, 32); ctx.lineTo(50, 28);
      ctx.lineTo(46, 22);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(24, 24);
      ctx.lineTo(28, 14); ctx.lineTo(38, 10); ctx.lineTo(46, 14);
      ctx.lineTo(44, 22);
      ctx.fill();

      // Talons limp
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(28, 30); ctx.lineTo(26, 34);
      ctx.moveTo(30, 30); ctx.lineTo(32, 34);
      ctx.stroke();

      ctx.restore();
    });
  }

  // ===================== MAMMOTH (90x76, 5 walk + 1 death) =====================

  _drawMammothBody(ctx: CanvasRenderingContext2D): void {
    // Massive shaggy body
    const bg = ctx.createRadialGradient(52, 38, 8, 52, 38, 30);
    bg.addColorStop(0, '#8B5A2A');
    bg.addColorStop(1, '#5A3010');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(52, 38, 30, 22, 0, 0, Math.PI * 2);
    ctx.fill();

    // Shaggy fur covering
    ctx.strokeStyle = 'rgba(100,50,15,0.3)';
    ctx.lineWidth = 1;
    for (let f = 0; f < 40; f++) {
      const fx = 26 + Math.random() * 52;
      const fy = 20 + Math.random() * 36;
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx + (Math.random() - 0.5) * 4, fy + 3 + Math.random() * 5);
      ctx.stroke();
    }

    // Reddish-brown shaggy fringe along belly
    ctx.strokeStyle = 'rgba(140,70,20,0.4)';
    ctx.lineWidth = 1.2;
    for (let f = 0; f < 20; f++) {
      const fx = 30 + Math.random() * 40;
      const fy = 50 + Math.random() * 6;
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx + (Math.random() - 0.5) * 2, fy + 4 + Math.random() * 4);
      ctx.stroke();
    }

    // Humped back
    ctx.fillStyle = '#7B4A1A';
    ctx.beginPath();
    ctx.ellipse(42, 18, 18, 10, -0.1, 0, Math.PI * 2);
    ctx.fill();
    // More fur on hump
    ctx.strokeStyle = 'rgba(90,40,10,0.3)';
    ctx.lineWidth = 0.8;
    for (let f = 0; f < 15; f++) {
      const fx = 28 + Math.random() * 28;
      const fy = 12 + Math.random() * 12;
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx + (Math.random() - 0.5) * 3, fy - 2 - Math.random() * 4);
      ctx.stroke();
    }

    // Head
    const hg = ctx.createRadialGradient(18, 28, 3, 18, 28, 16);
    hg.addColorStop(0, '#8B5A2A');
    hg.addColorStop(1, '#6B3A1A');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.ellipse(18, 28, 16, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head fur
    ctx.strokeStyle = 'rgba(100,50,15,0.3)';
    ctx.lineWidth = 0.8;
    for (let f = 0; f < 10; f++) {
      const fx = 6 + Math.random() * 24;
      const fy = 18 + Math.random() * 16;
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx + (Math.random() - 0.5) * 3, fy + 2 + Math.random() * 3);
      ctx.stroke();
    }

    // Forehead dome
    ctx.fillStyle = '#7B4A1A';
    ctx.beginPath();
    ctx.ellipse(18, 18, 10, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Long curved tusks - ivory white
    ctx.strokeStyle = '#FFFFF0';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(10, 32);
    ctx.quadraticCurveTo(0, 48, 8, 56);
    ctx.stroke();
    // Tusk tip
    ctx.strokeStyle = '#EEEEDD';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(6, 52);
    ctx.quadraticCurveTo(8, 56, 10, 58);
    ctx.stroke();

    // Second tusk (behind)
    ctx.strokeStyle = 'rgba(255,255,240,0.5)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(14, 34);
    ctx.quadraticCurveTo(6, 48, 12, 54);
    ctx.stroke();

    // Trunk
    ctx.fillStyle = '#7B4A1A';
    ctx.beginPath();
    ctx.moveTo(6, 28);
    ctx.quadraticCurveTo(0, 40, 2, 52);
    ctx.quadraticCurveTo(4, 60, 8, 62);
    ctx.lineTo(10, 60);
    ctx.quadraticCurveTo(8, 56, 6, 48);
    ctx.quadraticCurveTo(4, 36, 10, 30);
    ctx.fill();
    // Trunk ridges
    ctx.strokeStyle = 'rgba(60,30,10,0.3)';
    ctx.lineWidth = 0.6;
    for (let r = 0; r < 8; r++) {
      const ry = 32 + r * 3.5;
      ctx.beginPath();
      ctx.moveTo(4, ry); ctx.lineTo(9, ry); ctx.stroke();
    }
    // Trunk tip
    ctx.fillStyle = '#6B3A1A';
    ctx.beginPath();
    ctx.ellipse(8, 62, 3, 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tiny eye
    this._drawEye(ctx, 12, 24, 2, '#442200');

    // Small ear (mammoths have small ears)
    ctx.fillStyle = '#7B4A1A';
    ctx.beginPath();
    ctx.ellipse(26, 22, 4, 6, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#9B6A3A';
    ctx.beginPath();
    ctx.ellipse(26, 22, 2, 4, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Short tail
    ctx.strokeStyle = '#5A3010';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(82, 32);
    ctx.quadraticCurveTo(88, 28, 86, 24);
    ctx.stroke();
    // Tail tuft
    ctx.fillStyle = '#4A2A0A';
    ctx.beginPath();
    ctx.ellipse(86, 24, 3, 4, -0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  _generateMammothFrames(): void {
    const xPositions = [32, 44, 60, 72];
    // 5-frame walk cycle
    const frames = [
      { legs: [50, 50, 56, 56], xOff: [-2, -2, 2, 2] },   // 0: left fwd
      { legs: [52, 54, 54, 52], xOff: [-1, 0, 1, 0] },     // 1: transition
      { legs: [54, 54, 52, 54], xOff: [0, 0, 0, 0] },      // 2: neutral
      { legs: [56, 56, 50, 50], xOff: [2, 2, -2, -2] },    // 3: right fwd
      { legs: [54, 52, 52, 54], xOff: [1, 0, -1, 0] },     // 4: transition back
    ];

    frames.forEach((f, i) => {
      this._ct(`mammoth_walk_${i}`, 90, 76, (ctx) => {
        // Shadow
        this._drawShadow(ctx, 52, 72, 28, 3);

        f.legs.forEach((ly, idx) => {
          const lx = xPositions[idx] + f.xOff[idx];
          // Massive thick legs
          const legGrad = ctx.createLinearGradient(0, ly, 0, ly + 20);
          legGrad.addColorStop(0, '#5A3010');
          legGrad.addColorStop(1, '#4A2008');
          ctx.fillStyle = legGrad;
          ctx.fillRect(lx, ly, 10, 9);
          ctx.fillRect(lx + 1, ly + 8, 9, 9);
          // Fur on legs
          ctx.strokeStyle = 'rgba(100,50,15,0.3)';
          ctx.lineWidth = 0.8;
          for (let fl = 0; fl < 4; fl++) {
            const fx = lx + Math.random() * 10;
            ctx.beginPath();
            ctx.moveTo(fx, ly + Math.random() * 8);
            ctx.lineTo(fx + (Math.random() - 0.5) * 2, ly + 10 + Math.random() * 4);
            ctx.stroke();
          }
          // Wide flat feet
          ctx.fillStyle = '#3A2008';
          ctx.fillRect(lx - 1, ly + 16, 12, 5);
          // Toenails
          ctx.fillStyle = '#555';
          for (let t = 0; t < 3; t++) {
            ctx.fillRect(lx + t * 3, ly + 19, 2, 3);
          }
        });
        this._drawMammothBody(ctx);
      });
    });

    // Death frame
    this._ct('mammoth_dead_0', 90, 76, (ctx) => {
      // Shadow
      this._drawShadow(ctx, 46, 66, 34, 6);

      ctx.save();
      ctx.translate(46, 46);
      ctx.rotate(Math.PI / 2);
      ctx.translate(-46, -46);

      // Body on side
      const bg = ctx.createRadialGradient(52, 38, 8, 52, 38, 30);
      bg.addColorStop(0, '#8B5A2A');
      bg.addColorStop(1, '#5A3010');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(52, 38, 30, 22, 0, 0, Math.PI * 2);
      ctx.fill();

      // Shaggy fur
      ctx.strokeStyle = 'rgba(100,50,15,0.3)';
      ctx.lineWidth = 1;
      for (let f = 0; f < 25; f++) {
        const fx = 26 + Math.random() * 52;
        const fy = 20 + Math.random() * 36;
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(fx + (Math.random() - 0.5) * 4, fy + 3 + Math.random() * 5);
        ctx.stroke();
      }

      // Head
      ctx.fillStyle = '#6B3A1A';
      ctx.beginPath();
      ctx.ellipse(18, 28, 16, 14, 0, 0, Math.PI * 2);
      ctx.fill();

      // Tusks still visible
      ctx.strokeStyle = '#FFFFF0';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(10, 32);
      ctx.quadraticCurveTo(2, 44, 8, 50);
      ctx.stroke();

      // Trunk limp, hanging down
      ctx.fillStyle = '#7B4A1A';
      ctx.beginPath();
      ctx.moveTo(6, 28);
      ctx.quadraticCurveTo(2, 38, 4, 48);
      ctx.lineTo(8, 48);
      ctx.quadraticCurveTo(6, 38, 10, 30);
      ctx.fill();

      // X eyes
      this._drawXEye(ctx, 12, 24, 2.5);

      // Limp legs
      ctx.fillStyle = '#5A3010';
      ctx.fillRect(38, 56, 9, 8);
      ctx.fillRect(50, 56, 9, 8);
      ctx.fillRect(64, 54, 9, 7);
      ctx.fillRect(74, 54, 9, 7);

      ctx.restore();
    });
  }

  // ===================== DRAGON (86x66, 5 walk + 1 death) =====================

  _drawDragonBody(ctx: CanvasRenderingContext2D): void {
    // Main body - red/dark red
    const bg = ctx.createRadialGradient(46, 36, 6, 46, 36, 22);
    bg.addColorStop(0, '#CC2222');
    bg.addColorStop(1, '#881111');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(46, 36, 22, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    // Yellow/orange belly
    ctx.fillStyle = '#DDAA44';
    ctx.beginPath();
    ctx.ellipse(44, 44, 16, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    // Belly scale lines
    ctx.strokeStyle = 'rgba(180,120,30,0.4)';
    ctx.lineWidth = 0.5;
    for (let s = 0; s < 8; s++) {
      ctx.beginPath();
      ctx.moveTo(32 + s * 3, 40); ctx.lineTo(32 + s * 3, 48); ctx.stroke();
    }

    // Scale texture on body
    ctx.fillStyle = 'rgba(100,10,10,0.2)';
    for (let sx = 28; sx < 64; sx += 4) {
      for (let sy = 26; sy < 42; sy += 4) {
        ctx.beginPath();
        ctx.arc(sx + Math.random() * 2, sy + Math.random() * 2, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Spined back ridge
    ctx.fillStyle = '#AA1111';
    for (let rx = 30; rx < 64; rx += 4) {
      ctx.beginPath();
      ctx.moveTo(rx, 22); ctx.lineTo(rx + 1.5, 18); ctx.lineTo(rx + 3, 22);
      ctx.fill();
    }

    // Head
    const hg = ctx.createRadialGradient(18, 28, 2, 18, 28, 14);
    hg.addColorStop(0, '#CC2222');
    hg.addColorStop(1, '#991111');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.ellipse(18, 28, 14, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Snout
    ctx.fillStyle = '#AA1818';
    ctx.beginPath();
    ctx.ellipse(4, 30, 8, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Horns
    ctx.fillStyle = '#664422';
    ctx.beginPath();
    ctx.moveTo(14, 16); ctx.lineTo(10, 6); ctx.lineTo(16, 12); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(24, 16); ctx.lineTo(28, 6); ctx.lineTo(22, 12); ctx.fill();
    ctx.fillStyle = '#886644';
    ctx.beginPath(); ctx.arc(10, 6, 1.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(28, 6, 1.5, 0, Math.PI * 2); ctx.fill();

    // Nostril with fire/smoke
    ctx.fillStyle = '#FF6600';
    ctx.beginPath();
    ctx.ellipse(0, 28, 2, 1.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FF4400';
    ctx.beginPath();
    ctx.ellipse(0, 31, 2, 1.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Fire breath hint
    ctx.fillStyle = 'rgba(255,100,0,0.4)';
    ctx.beginPath();
    ctx.moveTo(-2, 32); ctx.lineTo(-8, 28); ctx.lineTo(-6, 34); ctx.fill();
    ctx.fillStyle = 'rgba(255,200,0,0.3)';
    ctx.beginPath();
    ctx.moveTo(-2, 31); ctx.lineTo(-6, 30); ctx.lineTo(-5, 33); ctx.fill();

    // Mouth line
    ctx.strokeStyle = '#661111';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-2, 30); ctx.lineTo(10, 32); ctx.stroke();

    // Teeth
    ctx.fillStyle = '#FFFFEE';
    for (let t = 0; t < 4; t++) {
      ctx.beginPath();
      ctx.moveTo(t * 2.5 + 1, 30);
      ctx.lineTo(t * 2.5 + 1.2, 32);
      ctx.lineTo(t * 2.5 + 2.4, 30);
      ctx.fill();
    }

    // Glowing orange eyes
    ctx.fillStyle = '#FF8800';
    ctx.beginPath();
    ctx.ellipse(10, 26, 3, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFAA00';
    ctx.beginPath();
    ctx.arc(10, 26, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FF4400';
    ctx.beginPath();
    ctx.arc(10, 26, 0.8, 0, Math.PI * 2);
    ctx.fill();
    // Eye glow
    ctx.fillStyle = 'rgba(255,136,0,0.2)';
    ctx.beginPath();
    ctx.arc(10, 26, 5, 0, Math.PI * 2);
    ctx.fill();

    // Spined tail
    ctx.fillStyle = '#991111';
    ctx.beginPath();
    ctx.moveTo(68, 32);
    ctx.quadraticCurveTo(78, 24, 84, 20);
    ctx.lineTo(86, 22);
    ctx.quadraticCurveTo(80, 28, 68, 38);
    ctx.fill();
    // Tail spines
    ctx.fillStyle = '#AA1111';
    ctx.beginPath();
    ctx.moveTo(72, 28); ctx.lineTo(73, 24); ctx.lineTo(74, 28); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(77, 26); ctx.lineTo(78, 22); ctx.lineTo(79, 26); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(82, 23); ctx.lineTo(83, 19); ctx.lineTo(84, 23); ctx.fill();
    // Tail tip - arrow shape
    ctx.fillStyle = '#771111';
    ctx.beginPath();
    ctx.moveTo(84, 20); ctx.lineTo(86, 16); ctx.lineTo(88, 20); ctx.lineTo(86, 24);
    ctx.closePath();
    ctx.fill();

    // Legs with claws
    ctx.fillStyle = '#881111';
    ctx.fillRect(36, 48, 7, 7);
    ctx.fillRect(52, 48, 7, 7);
    ctx.fillStyle = '#771111';
    ctx.fillRect(37, 54, 6, 5);
    ctx.fillRect(53, 54, 6, 5);
    // Claws
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.moveTo(36, 59); ctx.lineTo(35, 62); ctx.lineTo(37, 60); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(39, 59); ctx.lineTo(39, 62); ctx.lineTo(41, 60); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(42, 59); ctx.lineTo(43, 62); ctx.lineTo(44, 60); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(52, 59); ctx.lineTo(51, 62); ctx.lineTo(53, 60); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(55, 59); ctx.lineTo(55, 62); ctx.lineTo(57, 60); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(58, 59); ctx.lineTo(59, 62); ctx.lineTo(60, 60); ctx.fill();
  }

  _generateDragonFrames(): void {
    // 5-frame wing cycle: level, half up, full up, half down, full down
    const wingAngles = [
      { upY: 8, downY: 50 },    // 0: Wings level
      { upY: 2, downY: 44 },    // 1: Wings halfway up
      { upY: -4, downY: 38 },   // 2: Wings fully up
      { upY: 4, downY: 52 },    // 3: Wings halfway down
      { upY: 14, downY: 60 },   // 4: Wings fully down
    ];

    wingAngles.forEach(({ upY, downY }, i) => {
      this._ct(`dragon_walk_${i}`, 86, 66, (ctx) => {
        // Upper bat-like wing with membrane
        ctx.fillStyle = 'rgba(180,20,20,0.7)';
        ctx.beginPath();
        ctx.moveTo(30, 30);
        ctx.lineTo(34, upY + 4);
        ctx.lineTo(48, upY);
        ctx.lineTo(56, upY + 2);
        ctx.lineTo(64, upY + 6);
        ctx.lineTo(58, 28);
        ctx.fill();
        // Wing bone structure
        ctx.strokeStyle = '#661111';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(30, 30); ctx.lineTo(48, upY); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(34, upY + 10); ctx.lineTo(56, upY + 2); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(40, upY + 14); ctx.lineTo(64, upY + 6); ctx.stroke();
        // Membrane veins
        ctx.strokeStyle = 'rgba(100,10,10,0.3)';
        ctx.lineWidth = 0.5;
        for (let v = 0; v < 4; v++) {
          ctx.beginPath();
          ctx.moveTo(34 + v * 6, upY + 6 + v * 2);
          ctx.lineTo(50 + v * 3, upY + 2 + v);
          ctx.stroke();
        }
        // Wing claw at tip
        ctx.fillStyle = '#444';
        ctx.beginPath();
        ctx.moveTo(48, upY); ctx.lineTo(46, upY - 3); ctx.lineTo(50, upY); ctx.fill();

        // Lower bat-like wing
        ctx.fillStyle = 'rgba(180,20,20,0.5)';
        ctx.beginPath();
        ctx.moveTo(30, 38);
        ctx.lineTo(34, downY - 4);
        ctx.lineTo(48, downY);
        ctx.lineTo(56, downY - 2);
        ctx.lineTo(64, downY - 6);
        ctx.lineTo(58, 40);
        ctx.fill();
        // Wing bone
        ctx.strokeStyle = '#661111';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(30, 38); ctx.lineTo(48, downY); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(34, downY - 10); ctx.lineTo(56, downY - 2); ctx.stroke();
        // Membrane veins
        ctx.strokeStyle = 'rgba(100,10,10,0.3)';
        ctx.lineWidth = 0.5;
        for (let v = 0; v < 3; v++) {
          ctx.beginPath();
          ctx.moveTo(36 + v * 6, downY - 6 - v * 2);
          ctx.lineTo(50 + v * 3, downY - 2 - v);
          ctx.stroke();
        }

        this._drawDragonBody(ctx);
      });
    });

    // Death frame
    this._ct('dragon_dead_0', 86, 66, (ctx) => {
      // Shadow
      this._drawShadow(ctx, 44, 56, 32, 5);

      ctx.save();
      ctx.translate(44, 40);
      ctx.rotate(Math.PI / 2);
      ctx.translate(-44, -40);

      // Body on side
      const bg = ctx.createRadialGradient(46, 36, 6, 46, 36, 22);
      bg.addColorStop(0, '#CC2222');
      bg.addColorStop(1, '#881111');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(46, 36, 22, 14, 0, 0, Math.PI * 2);
      ctx.fill();

      // Scale texture
      ctx.fillStyle = 'rgba(100,10,10,0.2)';
      for (let sx = 28; sx < 64; sx += 5) {
        for (let sy = 26; sy < 42; sy += 5) {
          ctx.beginPath();
          ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Belly
      ctx.fillStyle = '#DDAA44';
      ctx.beginPath();
      ctx.ellipse(44, 44, 16, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = '#991111';
      ctx.beginPath();
      ctx.ellipse(18, 28, 14, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Snout
      ctx.fillStyle = '#AA1818';
      ctx.beginPath();
      ctx.ellipse(4, 30, 8, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Horns
      ctx.fillStyle = '#664422';
      ctx.beginPath();
      ctx.moveTo(14, 16); ctx.lineTo(10, 6); ctx.lineTo(16, 12); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(24, 16); ctx.lineTo(28, 6); ctx.lineTo(22, 12); ctx.fill();

      // X eyes (replacing glowing eyes)
      this._drawXEye(ctx, 10, 26, 3);

      // No fire - mouth closed
      ctx.strokeStyle = '#661111';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 30); ctx.lineTo(10, 32); ctx.stroke();

      // Crumpled wings (no longer spread)
      ctx.fillStyle = 'rgba(180,20,20,0.5)';
      ctx.beginPath();
      ctx.moveTo(30, 30);
      ctx.lineTo(36, 22); ctx.lineTo(44, 18); ctx.lineTo(50, 22);
      ctx.lineTo(48, 28);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(30, 42);
      ctx.lineTo(38, 50); ctx.lineTo(46, 52); ctx.lineTo(52, 48);
      ctx.lineTo(48, 40);
      ctx.fill();
      // Wing bone fragments visible
      ctx.strokeStyle = '#661111';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(32, 24); ctx.lineTo(44, 18); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(34, 46); ctx.lineTo(46, 52); ctx.stroke();

      // Tail limp
      ctx.fillStyle = '#991111';
      ctx.beginPath();
      ctx.moveTo(68, 32);
      ctx.quadraticCurveTo(74, 30, 78, 32);
      ctx.lineTo(78, 36);
      ctx.quadraticCurveTo(74, 34, 68, 38);
      ctx.fill();

      // Limp legs
      ctx.fillStyle = '#881111';
      ctx.fillRect(38, 52, 6, 6);
      ctx.fillRect(52, 52, 6, 6);

      ctx.restore();
    });
  }
}
