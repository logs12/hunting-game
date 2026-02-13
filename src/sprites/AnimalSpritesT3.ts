import { SpriteFactory } from './SpriteFactory';

const ANIMAL_SCALE = 0.62;

export class AnimalSpritesT3 extends SpriteFactory {
  _ct(key: string, w: number, h: number, drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number) => void): void {
    this.createTexture(key, w, h, drawFn, ANIMAL_SCALE);
  }

  generate(): void {
    this._generateLynxFrames();
    this._generateHawkFrames();
    this._generateCoyoteFrames();
    this._generateGooseFrames();
    this._generatePorcupineFrames();
    this._generateWolverineFrames();
    this._generateOwlFrames();
    this._generateRamFrames();
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

  _drawXEyes(ctx: CanvasRenderingContext2D, x: number, y: number, r: number): void {
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

  // ===================== LYNX (56x44, 5 walk + 1 death) =====================

  _drawLynxBody(ctx: CanvasRenderingContext2D): void {
    // Main body - tawny/golden muscular build
    const bg = ctx.createRadialGradient(32, 24, 4, 32, 24, 18);
    bg.addColorStop(0, '#D4A855');
    bg.addColorStop(1, '#B8863C');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(32, 24, 18, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lighter underside
    ctx.fillStyle = '#E8CFA0';
    ctx.beginPath();
    ctx.ellipse(30, 30, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Dark spots on body (ticked/spotted pattern)
    ctx.fillStyle = 'rgba(100,60,20,0.35)';
    const spots = [
      [24, 20, 2], [30, 18, 1.8], [36, 22, 2.2], [28, 26, 1.5],
      [38, 26, 1.8], [42, 20, 1.6], [34, 16, 1.4], [26, 24, 1.3],
      [40, 28, 1.5], [32, 28, 1.2]
    ];
    spots.forEach(([sx, sy, sr]) => {
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    });

    // Fur texture
    this._drawFur(ctx, 18, 14, 28, 18, 14, 'rgba(140,90,30,0.2)');

    // Head
    const hg = ctx.createRadialGradient(12, 16, 2, 12, 16, 11);
    hg.addColorStop(0, '#D4A855');
    hg.addColorStop(1, '#C09040');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.arc(12, 16, 11, 0, Math.PI * 2);
    ctx.fill();

    // Facial ruff (cheek fur) - distinctive lynx feature
    ctx.fillStyle = '#E0C890';
    ctx.beginPath();
    ctx.moveTo(4, 14);
    ctx.quadraticCurveTo(-2, 20, 2, 26);
    ctx.quadraticCurveTo(8, 28, 12, 24);
    ctx.quadraticCurveTo(18, 28, 22, 24);
    ctx.quadraticCurveTo(24, 18, 20, 14);
    ctx.fill();

    // Ruff fur detail strokes
    ctx.strokeStyle = 'rgba(180,140,70,0.4)';
    ctx.lineWidth = 0.6;
    for (let r = 0; r < 8; r++) {
      const angle = -0.5 + r * 0.25;
      const rx = 12 + Math.cos(angle) * 10;
      const ry = 20 + Math.sin(angle) * 6;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx + Math.cos(angle) * 4, ry + Math.sin(angle) * 4);
      ctx.stroke();
    }

    // Nose bridge lighter patch
    ctx.fillStyle = '#E8CFA0';
    ctx.beginPath();
    ctx.ellipse(6, 18, 4, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Nose
    ctx.fillStyle = '#885544';
    ctx.beginPath();
    ctx.ellipse(3, 18, 2.5, 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#553322';
    ctx.beginPath();
    ctx.ellipse(2, 18, 1.5, 1.2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mouth line
    ctx.strokeStyle = '#664433';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(3, 20);
    ctx.lineTo(5, 22);
    ctx.lineTo(8, 20);
    ctx.stroke();

    // Whiskers
    ctx.strokeStyle = 'rgba(200,180,140,0.5)';
    ctx.lineWidth = 0.4;
    ctx.beginPath();
    ctx.moveTo(3, 19); ctx.lineTo(-3, 17);
    ctx.moveTo(3, 20); ctx.lineTo(-4, 21);
    ctx.moveTo(3, 21); ctx.lineTo(-2, 24);
    ctx.stroke();

    // Ears - pointed with black tufts (distinctive lynx feature)
    // Left ear
    ctx.fillStyle = '#C09040';
    ctx.beginPath();
    ctx.moveTo(6, 8);
    ctx.lineTo(2, -2);
    ctx.lineTo(12, 6);
    ctx.fill();
    ctx.fillStyle = '#E0C080';
    ctx.beginPath();
    ctx.moveTo(7, 8);
    ctx.lineTo(4, 1);
    ctx.lineTo(10, 7);
    ctx.fill();
    // Black tuft on left ear
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.moveTo(2, -2);
    ctx.lineTo(0, -6);
    ctx.lineTo(4, -2);
    ctx.fill();

    // Right ear
    ctx.fillStyle = '#C09040';
    ctx.beginPath();
    ctx.moveTo(14, 6);
    ctx.lineTo(18, -3);
    ctx.lineTo(22, 6);
    ctx.fill();
    ctx.fillStyle = '#E0C080';
    ctx.beginPath();
    ctx.moveTo(15, 6);
    ctx.lineTo(18, 0);
    ctx.lineTo(20, 6);
    ctx.fill();
    // Black tuft on right ear
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.moveTo(18, -3);
    ctx.lineTo(17, -7);
    ctx.lineTo(20, -3);
    ctx.fill();

    // Eye
    this._drawEye(ctx, 8, 14, 2.5, '#AA8822');

    // Dark markings around eye (lynx facial markings)
    ctx.strokeStyle = 'rgba(80,40,10,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(8, 14, 4, -0.5, 1.5);
    ctx.stroke();

    // Short bobbed tail
    ctx.fillStyle = '#C09040';
    ctx.beginPath();
    ctx.ellipse(50, 20, 5, 4, 0.2, 0, Math.PI * 2);
    ctx.fill();
    // Black tip on tail
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.ellipse(53, 19, 3, 3, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  _drawLynxLeg(ctx: CanvasRenderingContext2D, x: number, ly: number, upperLen: number, lowerLen: number, kneeAngle: number): void {
    // Upper leg
    const legGrad = ctx.createLinearGradient(0, ly, 0, ly + upperLen);
    legGrad.addColorStop(0, '#B8863C');
    legGrad.addColorStop(1, '#A07530');
    ctx.fillStyle = legGrad;
    const kneeX = x + Math.sin(kneeAngle) * 3;
    const kneeY = ly + upperLen;
    ctx.beginPath();
    ctx.moveTo(x, ly);
    ctx.lineTo(x + 5, ly);
    ctx.lineTo(kneeX + 5, kneeY);
    ctx.lineTo(kneeX, kneeY);
    ctx.fill();
    // Lower leg
    ctx.fillStyle = '#A07530';
    const pawY = kneeY + lowerLen;
    ctx.beginPath();
    ctx.moveTo(kneeX + 1, kneeY);
    ctx.lineTo(kneeX + 5, kneeY);
    ctx.lineTo(kneeX + 4, pawY);
    ctx.lineTo(kneeX, pawY);
    ctx.fill();
    // Paw
    ctx.fillStyle = '#C0A070';
    ctx.fillRect(kneeX - 1, pawY, 6, 3);
  }

  _generateLynxFrames(): void {
    // 5 walk frames: leg Y positions and knee bends
    // Frame 0: Left legs forward, right legs back
    // Frame 1: Transition - legs passing center
    // Frame 2: Neutral stance - all legs mid-stride
    // Frame 3: Right legs forward, left legs back
    // Frame 4: Transition - legs passing (opposite of frame 1)
    const frames = [
      { legs: [30, 34, 34, 30], knees: [-0.3, 0.2, 0.2, -0.3] },
      { legs: [31, 33, 33, 31], knees: [-0.15, 0.1, 0.1, -0.15] },
      { legs: [32, 32, 32, 32], knees: [0, 0, 0, 0] },
      { legs: [34, 30, 30, 34], knees: [0.2, -0.3, -0.3, 0.2] },
      { legs: [33, 31, 31, 33], knees: [0.1, -0.15, -0.15, 0.1] },
    ];

    frames.forEach(({ legs, knees }, i) => {
      this._ct(`lynx_walk_${i}`, 56, 44, (ctx) => {
        const xPositions = [18, 24, 36, 42];
        // Draw legs behind body
        legs.forEach((ly, idx) => {
          this._drawLynxLeg(ctx, xPositions[idx], ly, 5, 5, knees[idx]);
        });
        this._drawLynxBody(ctx);
      });
    });

    // Death frame
    this._ct('lynx_dead_0', 56, 44, (ctx) => {
      // Shadow underneath
      this._drawShadow(ctx, 28, 36, 20, 5);

      // Body on its side (rotated)
      ctx.save();
      ctx.translate(28, 28);
      ctx.rotate(Math.PI / 2);
      ctx.translate(-28, -28);

      // Main body ellipse sideways
      const bg = ctx.createRadialGradient(28, 28, 4, 28, 28, 16);
      bg.addColorStop(0, '#D4A855');
      bg.addColorStop(1, '#B8863C');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(28, 28, 16, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // Spots
      ctx.fillStyle = 'rgba(100,60,20,0.3)';
      [[22, 24, 2], [28, 22, 1.8], [34, 26, 2], [26, 30, 1.5]].forEach(([sx, sy, sr]) => {
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      // Head on side
      ctx.fillStyle = '#C09040';
      ctx.beginPath();
      ctx.ellipse(14, 30, 9, 7, 0.3, 0, Math.PI * 2);
      ctx.fill();

      // Ruff
      ctx.fillStyle = '#E0C890';
      ctx.beginPath();
      ctx.ellipse(12, 33, 7, 4, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // X eyes
      this._drawXEyes(ctx, 10, 28, 2.5);

      // Nose
      ctx.fillStyle = '#553322';
      ctx.beginPath();
      ctx.ellipse(6, 31, 1.5, 1.2, 0, 0, Math.PI * 2);
      ctx.fill();

      // Ear tufts visible
      ctx.fillStyle = '#222';
      ctx.beginPath();
      ctx.moveTo(10, 22);
      ctx.lineTo(8, 19);
      ctx.lineTo(12, 21);
      ctx.fill();

      // Limp legs sticking out
      ctx.fillStyle = '#A07530';
      ctx.fillRect(20, 36, 4, 6);
      ctx.fillRect(28, 37, 4, 5);
      ctx.fillRect(36, 36, 4, 6);
      ctx.fillRect(42, 37, 4, 5);

      // Bobbed tail limp
      ctx.fillStyle = '#C09040';
      ctx.beginPath();
      ctx.ellipse(46, 26, 4, 3, 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.ellipse(49, 25, 2.5, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // ===================== HAWK (52x32, 5 walk + 1 death) =====================

  _drawHawkBody(ctx: CanvasRenderingContext2D): void {
    // Main body - brown/grey raptor
    const bg = ctx.createRadialGradient(24, 17, 2, 24, 17, 12);
    bg.addColorStop(0, '#8B6B4A');
    bg.addColorStop(1, '#5C4530');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(24, 17, 12, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lighter breast/underside
    ctx.fillStyle = '#D4B896';
    ctx.beginPath();
    ctx.ellipse(20, 20, 8, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Breast streaking
    ctx.strokeStyle = 'rgba(80,50,20,0.3)';
    ctx.lineWidth = 0.5;
    for (let s = 0; s < 6; s++) {
      ctx.beginPath();
      ctx.moveTo(15 + s * 2, 18);
      ctx.lineTo(15 + s * 2 + 1, 23);
      ctx.stroke();
    }

    // Feather lines on body
    ctx.strokeStyle = 'rgba(60,40,20,0.2)';
    ctx.lineWidth = 0.6;
    for (let f = 0; f < 5; f++) {
      ctx.beginPath();
      ctx.moveTo(16 + f * 4, 12);
      ctx.lineTo(18 + f * 4, 22);
      ctx.stroke();
    }

    // Head - brown/grey
    const hg = ctx.createRadialGradient(10, 13, 1, 10, 13, 7);
    hg.addColorStop(0, '#7B5B3A');
    hg.addColorStop(1, '#5C4530');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.arc(10, 13, 7, 0, Math.PI * 2);
    ctx.fill();

    // Lighter face area
    ctx.fillStyle = '#C4A878';
    ctx.beginPath();
    ctx.ellipse(7, 15, 4, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Sharp hooked beak - distinctive raptor feature
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.moveTo(3, 13);
    ctx.lineTo(0, 15);
    ctx.lineTo(1, 17);
    ctx.lineTo(4, 15);
    ctx.fill();
    // Beak hook
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(0, 15);
    ctx.lineTo(-1, 16);
    ctx.lineTo(1, 17);
    ctx.fill();

    // Eye with fierce expression
    this._drawEye(ctx, 7, 12, 2, '#DD8800');

    // Brow ridge (fierce raptor look)
    ctx.strokeStyle = '#4A3020';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(5, 10);
    ctx.lineTo(10, 10);
    ctx.stroke();

    // Banded tail feathers
    ctx.fillStyle = '#5C4530';
    ctx.beginPath();
    ctx.moveTo(36, 14);
    ctx.lineTo(52, 10);
    ctx.lineTo(52, 22);
    ctx.lineTo(36, 20);
    ctx.fill();
    // Tail bands
    ctx.strokeStyle = '#3A2818';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(40, 12); ctx.lineTo(40, 22);
    ctx.moveTo(44, 11); ctx.lineTo(44, 22);
    ctx.moveTo(48, 10); ctx.lineTo(48, 22);
    ctx.stroke();

    // Lighter tail tip
    ctx.fillStyle = '#D4B896';
    ctx.beginPath();
    ctx.moveTo(50, 11);
    ctx.lineTo(52, 10);
    ctx.lineTo(52, 22);
    ctx.lineTo(50, 21);
    ctx.fill();

    // Yellow feet/talons
    ctx.fillStyle = '#DAA520';
    ctx.fillRect(18, 24, 3, 4);
    ctx.fillRect(24, 24, 3, 4);
    // Talon details
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(18, 28); ctx.lineTo(17, 31);
    ctx.moveTo(20, 28); ctx.lineTo(20, 31);
    ctx.moveTo(24, 28); ctx.lineTo(23, 31);
    ctx.moveTo(26, 28); ctx.lineTo(26, 31);
    ctx.stroke();
  }

  _drawHawkWings(ctx: CanvasRenderingContext2D, upY: number, downY: number): void {
    // Upper wing
    const wingGrad1 = ctx.createLinearGradient(16, upY, 44, upY);
    wingGrad1.addColorStop(0, '#6B4B30');
    wingGrad1.addColorStop(0.7, '#5C4530');
    wingGrad1.addColorStop(1, '#8B7B5A');
    ctx.fillStyle = wingGrad1;
    ctx.beginPath();
    ctx.moveTo(16, 15);
    ctx.quadraticCurveTo(30, upY, 46, upY + 1);
    ctx.lineTo(40, 15);
    ctx.fill();

    // Lower wing
    const wingGrad2 = ctx.createLinearGradient(16, downY, 44, downY);
    wingGrad2.addColorStop(0, '#6B4B30');
    wingGrad2.addColorStop(0.7, '#5C4530');
    wingGrad2.addColorStop(1, '#8B7B5A');
    ctx.fillStyle = wingGrad2;
    ctx.beginPath();
    ctx.moveTo(16, 19);
    ctx.quadraticCurveTo(30, downY, 46, downY - 1);
    ctx.lineTo(40, 19);
    ctx.fill();

    // Feather lines on wings
    ctx.strokeStyle = 'rgba(40,25,10,0.3)';
    ctx.lineWidth = 0.7;
    for (let f = 0; f < 5; f++) {
      // Upper wing feathers
      const ux = 20 + f * 5;
      const uy = upY + 3 + f * 0.5;
      ctx.beginPath();
      ctx.moveTo(ux, uy);
      ctx.lineTo(ux + 4, uy + 2);
      ctx.stroke();
      // Lower wing feathers
      const lx = 20 + f * 5;
      const ly = downY - 3 - f * 0.5;
      ctx.beginPath();
      ctx.moveTo(lx, ly);
      ctx.lineTo(lx + 4, ly - 2);
      ctx.stroke();
    }

    // Wing tips detail
    ctx.fillStyle = '#4A3020';
    ctx.beginPath();
    ctx.moveTo(42, upY + 1);
    ctx.lineTo(46, upY + 1);
    ctx.lineTo(44, upY + 3);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(42, downY - 1);
    ctx.lineTo(46, downY - 1);
    ctx.lineTo(44, downY - 3);
    ctx.fill();
  }

  _generateHawkFrames(): void {
    // 5 wing cycle frames
    // Frame 0: Wings level
    // Frame 1: Wings halfway up
    // Frame 2: Wings fully up
    // Frame 3: Wings halfway down
    // Frame 4: Wings fully down
    const wingAngles = [
      { upY: 5, downY: 26 },    // wings level
      { upY: 2, downY: 22 },    // wings halfway up
      { upY: -1, downY: 18 },   // wings fully up
      { upY: 3, downY: 28 },    // wings halfway down
      { upY: 9, downY: 32 },    // wings fully down
    ];

    wingAngles.forEach(({ upY, downY }, i) => {
      this._ct(`hawk_walk_${i}`, 52, 32, (ctx) => {
        this._drawHawkWings(ctx, upY, downY);
        this._drawHawkBody(ctx);
      });
    });

    // Death frame
    this._ct('hawk_dead_0', 52, 32, (ctx) => {
      // Shadow underneath
      this._drawShadow(ctx, 26, 28, 18, 4);

      // Body on its side
      const bg = ctx.createRadialGradient(26, 22, 2, 26, 22, 10);
      bg.addColorStop(0, '#8B6B4A');
      bg.addColorStop(1, '#5C4530');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(26, 22, 12, 6, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Lighter breast
      ctx.fillStyle = '#D4B896';
      ctx.beginPath();
      ctx.ellipse(22, 24, 7, 3, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Wings limp/splayed out
      ctx.fillStyle = '#5C4530';
      // Upper wing limp
      ctx.beginPath();
      ctx.moveTo(18, 18);
      ctx.quadraticCurveTo(30, 12, 44, 14);
      ctx.lineTo(40, 20);
      ctx.fill();
      // Lower wing limp on ground
      ctx.beginPath();
      ctx.moveTo(18, 24);
      ctx.quadraticCurveTo(32, 30, 46, 28);
      ctx.lineTo(40, 24);
      ctx.fill();

      // Wing feather details
      ctx.strokeStyle = 'rgba(40,25,10,0.3)';
      ctx.lineWidth = 0.6;
      for (let f = 0; f < 4; f++) {
        ctx.beginPath();
        ctx.moveTo(22 + f * 5, 14 + f * 0.5);
        ctx.lineTo(26 + f * 5, 13 + f * 0.5);
        ctx.stroke();
      }

      // Head on side
      ctx.fillStyle = '#5C4530';
      ctx.beginPath();
      ctx.arc(12, 22, 6, 0, Math.PI * 2);
      ctx.fill();

      // Beak limp
      ctx.fillStyle = '#444';
      ctx.beginPath();
      ctx.moveTo(6, 22);
      ctx.lineTo(4, 24);
      ctx.lineTo(6, 25);
      ctx.fill();

      // X eyes
      this._drawXEyes(ctx, 9, 21, 2);

      // Tail feathers splayed
      ctx.fillStyle = '#5C4530';
      ctx.beginPath();
      ctx.moveTo(38, 18);
      ctx.lineTo(50, 16);
      ctx.lineTo(52, 22);
      ctx.lineTo(50, 26);
      ctx.lineTo(38, 24);
      ctx.fill();

      // Talons limp
      ctx.fillStyle = '#DAA520';
      ctx.fillRect(20, 26, 2, 3);
      ctx.fillRect(26, 27, 2, 3);
    });
  }

  // ===================== COYOTE (60x46, 5 walk + 1 death) =====================

  _drawCoyoteBody(ctx: CanvasRenderingContext2D): void {
    // Main body - tan/grey-brown, slender build
    const bg = ctx.createRadialGradient(34, 26, 4, 34, 26, 18);
    bg.addColorStop(0, '#C4A878');
    bg.addColorStop(1, '#9C8060');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(34, 26, 18, 11, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lighter underside
    ctx.fillStyle = '#E8D8C0';
    ctx.beginPath();
    ctx.ellipse(32, 32, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Grey-brown back ridge
    ctx.fillStyle = '#8C7050';
    ctx.beginPath();
    ctx.ellipse(34, 18, 16, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Fur texture
    this._drawFur(ctx, 20, 18, 28, 16, 14, 'rgba(120,90,50,0.2)');

    // Neck
    ctx.fillStyle = '#B09868';
    ctx.fillRect(18, 16, 10, 14);

    // Head - more slender/narrow than wolf
    const hg = ctx.createRadialGradient(12, 16, 2, 12, 16, 11);
    hg.addColorStop(0, '#C4A878');
    hg.addColorStop(1, '#A08858');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.ellipse(12, 16, 11, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Narrow snout - more pointed than wolf
    ctx.fillStyle = '#B8A070';
    ctx.beginPath();
    ctx.moveTo(3, 16);
    ctx.lineTo(-2, 18);
    ctx.lineTo(-2, 22);
    ctx.lineTo(4, 24);
    ctx.lineTo(10, 22);
    ctx.lineTo(10, 16);
    ctx.fill();

    // Lighter muzzle
    ctx.fillStyle = '#E0D0B8';
    ctx.beginPath();
    ctx.ellipse(2, 20, 5, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Nose
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.ellipse(-1, 19, 2.5, 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.beginPath();
    ctx.ellipse(-1.5, 18, 1, 0.8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mouth line
    ctx.strokeStyle = '#664433';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, 21);
    ctx.lineTo(4, 24);
    ctx.lineTo(8, 22);
    ctx.stroke();

    // Pointed ears (larger relative to head than wolf)
    ctx.fillStyle = '#A08858';
    ctx.beginPath();
    ctx.moveTo(6, 8);
    ctx.lineTo(2, -3);
    ctx.lineTo(12, 6);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(16, 8);
    ctx.lineTo(20, -4);
    ctx.lineTo(24, 8);
    ctx.fill();
    // Inner ear
    ctx.fillStyle = '#D0B898';
    ctx.beginPath();
    ctx.moveTo(7, 8);
    ctx.lineTo(4, 0);
    ctx.lineTo(10, 7);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(17, 8);
    ctx.lineTo(20, -1);
    ctx.lineTo(22, 8);
    ctx.fill();

    // Eye
    this._drawEye(ctx, 8, 14, 2.2, '#BB8822');

    // Bushy tail - distinctive coyote feature
    const tg = ctx.createRadialGradient(52, 18, 2, 52, 18, 10);
    tg.addColorStop(0, '#B09868');
    tg.addColorStop(1, '#8C7050');
    ctx.fillStyle = tg;
    ctx.beginPath();
    ctx.moveTo(50, 22);
    ctx.quadraticCurveTo(58, 8, 56, 18);
    ctx.quadraticCurveTo(62, 28, 50, 30);
    ctx.fill();
    // Black tail tip
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.arc(57, 14, 4, 0, Math.PI * 2);
    ctx.fill();
    // Tail fur detail
    ctx.strokeStyle = 'rgba(100,70,40,0.3)';
    ctx.lineWidth = 0.5;
    for (let t = 0; t < 5; t++) {
      ctx.beginPath();
      ctx.moveTo(50 + t * 2, 20 - t);
      ctx.lineTo(52 + t * 2, 16 - t);
      ctx.stroke();
    }
  }

  _drawCoyoteLeg(ctx: CanvasRenderingContext2D, x: number, ly: number, kneeAngle: number): void {
    // Upper leg
    const legGrad = ctx.createLinearGradient(0, ly, 0, ly + 5);
    legGrad.addColorStop(0, '#9C8060');
    legGrad.addColorStop(1, '#887050');
    ctx.fillStyle = legGrad;
    const kneeX = x + Math.sin(kneeAngle) * 3;
    const kneeY = ly + 5;
    ctx.beginPath();
    ctx.moveTo(x, ly);
    ctx.lineTo(x + 5, ly);
    ctx.lineTo(kneeX + 5, kneeY);
    ctx.lineTo(kneeX, kneeY);
    ctx.fill();
    // Lower leg - slender
    ctx.fillStyle = '#887050';
    const pawY = kneeY + 5;
    ctx.beginPath();
    ctx.moveTo(kneeX + 1, kneeY);
    ctx.lineTo(kneeX + 4, kneeY);
    ctx.lineTo(kneeX + 3, pawY);
    ctx.lineTo(kneeX, pawY);
    ctx.fill();
    // Paw
    ctx.fillStyle = '#776040';
    ctx.fillRect(kneeX - 1, pawY, 6, 3);
  }

  _generateCoyoteFrames(): void {
    // 5 walk frames with knee articulation
    const frames = [
      { legs: [30, 38, 38, 30], knees: [-0.35, 0.25, 0.25, -0.35] },
      { legs: [32, 36, 36, 32], knees: [-0.15, 0.12, 0.12, -0.15] },
      { legs: [34, 34, 34, 34], knees: [0, 0, 0, 0] },
      { legs: [38, 30, 30, 38], knees: [0.25, -0.35, -0.35, 0.25] },
      { legs: [36, 32, 32, 36], knees: [0.12, -0.15, -0.15, 0.12] },
    ];

    frames.forEach(({ legs, knees }, i) => {
      this._ct(`coyote_walk_${i}`, 60, 46, (ctx) => {
        const xPositions = [20, 28, 38, 46];
        legs.forEach((ly, idx) => {
          this._drawCoyoteLeg(ctx, xPositions[idx], ly, knees[idx]);
        });
        this._drawCoyoteBody(ctx);
      });
    });

    // Death frame
    this._ct('coyote_dead_0', 60, 46, (ctx) => {
      // Shadow underneath
      this._drawShadow(ctx, 30, 38, 22, 5);

      // Body on side
      const bg = ctx.createRadialGradient(30, 28, 4, 30, 28, 16);
      bg.addColorStop(0, '#C4A878');
      bg.addColorStop(1, '#9C8060');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(32, 28, 18, 8, 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Lighter underside exposed
      ctx.fillStyle = '#E8D8C0';
      ctx.beginPath();
      ctx.ellipse(30, 32, 14, 4, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Back ridge
      ctx.fillStyle = '#8C7050';
      ctx.beginPath();
      ctx.ellipse(32, 24, 14, 3, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Head on side
      ctx.fillStyle = '#A08858';
      ctx.beginPath();
      ctx.ellipse(12, 30, 9, 7, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Muzzle
      ctx.fillStyle = '#E0D0B8';
      ctx.beginPath();
      ctx.ellipse(4, 33, 4, 3, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Nose
      ctx.fillStyle = '#222';
      ctx.beginPath();
      ctx.ellipse(1, 33, 2, 1.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // X eyes
      this._drawXEyes(ctx, 9, 29, 2.2);

      // Ears flopped
      ctx.fillStyle = '#A08858';
      ctx.beginPath();
      ctx.ellipse(8, 24, 4, 3, -0.5, 0, Math.PI * 2);
      ctx.fill();

      // Limp legs
      ctx.fillStyle = '#887050';
      ctx.fillRect(22, 34, 4, 7);
      ctx.fillRect(30, 35, 4, 6);
      ctx.fillRect(40, 34, 4, 7);
      ctx.fillRect(48, 35, 4, 6);

      // Paws
      ctx.fillStyle = '#776040';
      ctx.fillRect(21, 40, 6, 3);
      ctx.fillRect(29, 40, 6, 3);
      ctx.fillRect(39, 40, 6, 3);
      ctx.fillRect(47, 40, 6, 3);

      // Tail limp on ground
      ctx.fillStyle = '#8C7050';
      ctx.beginPath();
      ctx.moveTo(50, 26);
      ctx.quadraticCurveTo(56, 28, 58, 32);
      ctx.quadraticCurveTo(56, 36, 52, 34);
      ctx.fill();
      ctx.fillStyle = '#444';
      ctx.beginPath();
      ctx.arc(57, 32, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // ===================== GOOSE (48x34, 5 walk + 1 death) =====================

  _drawGooseBody(ctx: CanvasRenderingContext2D): void {
    // Main body - white/grey plump
    const bg = ctx.createRadialGradient(26, 20, 2, 26, 20, 12);
    bg.addColorStop(0, '#F0F0F0');
    bg.addColorStop(1, '#D0D0D4');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(26, 20, 12, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lighter breast
    ctx.fillStyle = '#FAFAFA';
    ctx.beginPath();
    ctx.ellipse(22, 23, 8, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Grey shading on back
    ctx.fillStyle = 'rgba(160,165,170,0.3)';
    ctx.beginPath();
    ctx.ellipse(28, 16, 10, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Feather line details on body
    ctx.strokeStyle = 'rgba(180,180,185,0.4)';
    ctx.lineWidth = 0.5;
    for (let f = 0; f < 5; f++) {
      ctx.beginPath();
      ctx.moveTo(20 + f * 3, 15);
      ctx.lineTo(21 + f * 3, 26);
      ctx.stroke();
    }

    // Long neck - distinctive goose feature
    const neckGrad = ctx.createLinearGradient(10, 6, 18, 18);
    neckGrad.addColorStop(0, '#E8E8EC');
    neckGrad.addColorStop(1, '#D4D4D8');
    ctx.fillStyle = neckGrad;
    ctx.beginPath();
    ctx.moveTo(14, 14);
    ctx.quadraticCurveTo(8, 8, 6, 4);
    ctx.lineTo(10, 2);
    ctx.quadraticCurveTo(14, 6, 18, 14);
    ctx.fill();

    // Head (small, round)
    ctx.fillStyle = '#E8E8EC';
    ctx.beginPath();
    ctx.arc(7, 3, 5, 0, Math.PI * 2);
    ctx.fill();

    // Dark crown/cap
    ctx.fillStyle = '#555';
    ctx.beginPath();
    ctx.arc(7, 1, 4, Math.PI, Math.PI * 2);
    ctx.fill();

    // Orange beak
    ctx.fillStyle = '#E87030';
    ctx.beginPath();
    ctx.moveTo(2, 3);
    ctx.lineTo(-1, 2);
    ctx.lineTo(-1, 5);
    ctx.lineTo(2, 5);
    ctx.fill();
    // Beak nostril
    ctx.fillStyle = '#C05020';
    ctx.beginPath();
    ctx.arc(1, 3.5, 0.5, 0, Math.PI * 2);
    ctx.fill();

    // Eye
    this._drawEye(ctx, 5, 2, 1.5, '#332');

    // Tail feathers
    ctx.fillStyle = '#D0D0D4';
    ctx.beginPath();
    ctx.moveTo(38, 16);
    ctx.lineTo(46, 14);
    ctx.lineTo(48, 18);
    ctx.lineTo(46, 22);
    ctx.lineTo(38, 22);
    ctx.fill();

    // Tail feather lines
    ctx.strokeStyle = 'rgba(140,140,145,0.4)';
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(40, 15); ctx.lineTo(46, 15);
    ctx.moveTo(40, 18); ctx.lineTo(47, 18);
    ctx.moveTo(40, 21); ctx.lineTo(46, 21);
    ctx.stroke();

    // Orange feet
    ctx.fillStyle = '#E87030';
    ctx.fillRect(20, 26, 3, 4);
    ctx.fillRect(26, 26, 3, 4);
    // Webbed toes
    ctx.beginPath();
    ctx.moveTo(19, 30);
    ctx.lineTo(24, 32);
    ctx.lineTo(19, 32);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(25, 30);
    ctx.lineTo(30, 32);
    ctx.lineTo(25, 32);
    ctx.fill();
  }

  _drawGooseWings(ctx: CanvasRenderingContext2D, upY: number, downY: number): void {
    // Upper wing
    ctx.fillStyle = '#D8D8DC';
    ctx.beginPath();
    ctx.moveTo(18, 18);
    ctx.quadraticCurveTo(30, upY, 42, upY + 1);
    ctx.lineTo(38, 18);
    ctx.fill();
    // Black wing tips
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(38, upY + 1);
    ctx.lineTo(42, upY + 1);
    ctx.lineTo(40, upY + 4);
    ctx.fill();

    // Lower wing
    ctx.fillStyle = '#D8D8DC';
    ctx.beginPath();
    ctx.moveTo(18, 22);
    ctx.quadraticCurveTo(30, downY, 42, downY - 1);
    ctx.lineTo(38, 22);
    ctx.fill();
    // Black wing tips
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(38, downY - 1);
    ctx.lineTo(42, downY - 1);
    ctx.lineTo(40, downY - 4);
    ctx.fill();

    // Wing feather detail
    ctx.strokeStyle = 'rgba(150,150,155,0.3)';
    ctx.lineWidth = 0.6;
    for (let f = 0; f < 4; f++) {
      ctx.beginPath();
      ctx.moveTo(22 + f * 5, upY + 3 + f);
      ctx.lineTo(36 + f * 2, upY + 2 + f);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(22 + f * 5, downY - 3 - f);
      ctx.lineTo(36 + f * 2, downY - 2 - f);
      ctx.stroke();
    }
  }

  _generateGooseFrames(): void {
    // 5 wing flap frames
    // Frame 0: Wings level
    // Frame 1: Wings halfway up
    // Frame 2: Wings fully up
    // Frame 3: Wings halfway down
    // Frame 4: Wings fully down
    const wingAngles = [
      { upY: 8, downY: 28 },    // wings level
      { upY: 4, downY: 24 },    // wings halfway up
      { upY: 1, downY: 20 },    // wings fully up
      { upY: 6, downY: 30 },    // wings halfway down
      { upY: 12, downY: 34 },   // wings fully down
    ];

    wingAngles.forEach(({ upY, downY }, i) => {
      this._ct(`goose_walk_${i}`, 48, 34, (ctx) => {
        this._drawGooseWings(ctx, upY, downY);
        this._drawGooseBody(ctx);
      });
    });

    // Death frame
    this._ct('goose_dead_0', 48, 34, (ctx) => {
      // Shadow underneath
      this._drawShadow(ctx, 24, 30, 16, 4);

      // Body on its side
      const bg = ctx.createRadialGradient(26, 22, 2, 26, 22, 10);
      bg.addColorStop(0, '#F0F0F0');
      bg.addColorStop(1, '#D0D0D4');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(26, 22, 12, 6, 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Wings limp and splayed
      ctx.fillStyle = '#D8D8DC';
      ctx.beginPath();
      ctx.moveTo(18, 18);
      ctx.quadraticCurveTo(30, 12, 42, 14);
      ctx.lineTo(38, 20);
      ctx.fill();
      // Black wing tips
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.moveTo(39, 14);
      ctx.lineTo(42, 14);
      ctx.lineTo(40, 17);
      ctx.fill();

      ctx.fillStyle = '#D8D8DC';
      ctx.beginPath();
      ctx.moveTo(18, 24);
      ctx.quadraticCurveTo(32, 30, 44, 28);
      ctx.lineTo(38, 24);
      ctx.fill();

      // Neck flopped down
      ctx.fillStyle = '#D4D4D8';
      ctx.beginPath();
      ctx.moveTo(14, 20);
      ctx.quadraticCurveTo(8, 24, 4, 26);
      ctx.lineTo(8, 28);
      ctx.quadraticCurveTo(12, 24, 18, 22);
      ctx.fill();

      // Head on ground
      ctx.fillStyle = '#E8E8EC';
      ctx.beginPath();
      ctx.arc(4, 27, 4, 0, Math.PI * 2);
      ctx.fill();

      // Dark cap
      ctx.fillStyle = '#555';
      ctx.beginPath();
      ctx.arc(4, 25, 3, Math.PI, Math.PI * 2);
      ctx.fill();

      // Beak
      ctx.fillStyle = '#E87030';
      ctx.beginPath();
      ctx.moveTo(0, 27);
      ctx.lineTo(-2, 26);
      ctx.lineTo(-2, 29);
      ctx.lineTo(0, 29);
      ctx.fill();

      // X eyes
      this._drawXEyes(ctx, 3, 26, 1.5);

      // Tail feathers spread
      ctx.fillStyle = '#D0D0D4';
      ctx.beginPath();
      ctx.moveTo(38, 18);
      ctx.lineTo(46, 16);
      ctx.lineTo(48, 22);
      ctx.lineTo(46, 26);
      ctx.lineTo(38, 24);
      ctx.fill();

      // Feet limp
      ctx.fillStyle = '#E87030';
      ctx.fillRect(22, 28, 2, 3);
      ctx.fillRect(28, 28, 2, 3);
    });
  }

  // ===================== PORCUPINE (48x38, 5 walk + 1 death) =====================

  _drawPorcupineBody(ctx: CanvasRenderingContext2D): void {
    // Main body - dark brown, rounded
    const bg = ctx.createRadialGradient(26, 20, 3, 26, 20, 14);
    bg.addColorStop(0, '#6B4A30');
    bg.addColorStop(1, '#4A3020');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(26, 20, 14, 11, 0, 0, Math.PI * 2);
    ctx.fill();

    // Darker back/top
    ctx.fillStyle = '#3A2010';
    ctx.beginPath();
    ctx.ellipse(26, 14, 13, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lighter underside
    ctx.fillStyle = '#7B5A3A';
    ctx.beginPath();
    ctx.ellipse(24, 26, 10, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // QUILLS - the defining feature! Lines/spikes radiating from back
    ctx.strokeStyle = '#C8B090';
    ctx.lineWidth = 1;
    // Back quills (pointing up and back)
    for (let q = 0; q < 16; q++) {
      const qx = 18 + q * 1.8;
      const qy = 12 + Math.sin(q * 0.4) * 2;
      const angle = -1.2 + q * 0.06;
      const len = 8 + Math.random() * 4;
      ctx.beginPath();
      ctx.moveTo(qx, qy);
      ctx.lineTo(qx + Math.cos(angle) * len, qy + Math.sin(angle) * len);
      ctx.stroke();
    }
    // Side quills
    ctx.strokeStyle = '#B8A080';
    ctx.lineWidth = 0.8;
    for (let q = 0; q < 10; q++) {
      const qx = 20 + q * 2.2;
      const qy = 18 + Math.sin(q * 0.5) * 2;
      const angle = -0.8 + q * 0.04;
      const len = 6 + Math.random() * 3;
      ctx.beginPath();
      ctx.moveTo(qx, qy);
      ctx.lineTo(qx + Math.cos(angle) * len, qy + Math.sin(angle) * len);
      ctx.stroke();
    }
    // Darker quill tips
    ctx.strokeStyle = '#8A7060';
    ctx.lineWidth = 0.6;
    for (let q = 0; q < 12; q++) {
      const qx = 19 + q * 2;
      const qy = 10 + Math.sin(q * 0.35) * 1.5;
      const angle = -1.4 + q * 0.07;
      const len = 10 + Math.random() * 3;
      ctx.beginPath();
      ctx.moveTo(qx + Math.cos(angle) * (len - 3), qy + Math.sin(angle) * (len - 3));
      ctx.lineTo(qx + Math.cos(angle) * len, qy + Math.sin(angle) * len);
      ctx.stroke();
    }

    // Small head
    const hg = ctx.createRadialGradient(10, 18, 1, 10, 18, 7);
    hg.addColorStop(0, '#6B4A30');
    hg.addColorStop(1, '#5A3A20');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.arc(10, 18, 7, 0, Math.PI * 2);
    ctx.fill();

    // Snout
    ctx.fillStyle = '#5A3A20';
    ctx.beginPath();
    ctx.ellipse(4, 20, 4, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Nose
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.ellipse(1, 20, 2, 1.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Small eye
    this._drawEye(ctx, 7, 16, 1.5, '#332');

    // Small ears
    ctx.fillStyle = '#5A3A20';
    ctx.beginPath();
    ctx.arc(8, 12, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#7B5A3A';
    ctx.beginPath();
    ctx.arc(8, 12, 1.8, 0, Math.PI * 2);
    ctx.fill();

    // Short tail (barely visible, also with some quills)
    ctx.fillStyle = '#4A3020';
    ctx.beginPath();
    ctx.ellipse(40, 20, 4, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#B8A080';
    ctx.lineWidth = 0.7;
    for (let tq = 0; tq < 4; tq++) {
      ctx.beginPath();
      ctx.moveTo(40, 18 + tq);
      ctx.lineTo(44 + tq, 16 + tq * 0.5);
      ctx.stroke();
    }
  }

  _generatePorcupineFrames(): void {
    // 5 waddling walk frames: body sways and legs alternate
    const waddle = [
      { bodyOffY: 0, bodyRot: 0 },
      { bodyOffY: 1, bodyRot: 0.025 },
      { bodyOffY: 1, bodyRot: 0 },
      { bodyOffY: 1, bodyRot: -0.025 },
      { bodyOffY: 0, bodyRot: 0 },
    ];
    const legFrames = [
      [24, 28, 28, 24],
      [25, 27, 27, 25],
      [26, 26, 26, 26],
      [28, 24, 24, 28],
      [27, 25, 25, 27],
    ];

    waddle.forEach(({ bodyOffY, bodyRot }, i) => {
      this._ct(`porcupine_walk_${i}`, 48, 38, (ctx) => {
        const xPositions = [14, 20, 30, 36];
        // Short stubby legs
        legFrames[i].forEach((ly, idx) => {
          ctx.fillStyle = '#3A2818';
          ctx.fillRect(xPositions[idx], ly, 5, 5);
          // Small paws
          ctx.fillStyle = '#2A1808';
          ctx.fillRect(xPositions[idx] - 1, ly + 4, 6, 3);
        });

        ctx.save();
        ctx.translate(0, bodyOffY);
        ctx.translate(24, 20);
        ctx.rotate(bodyRot);
        ctx.translate(-24, -20);
        this._drawPorcupineBody(ctx);
        ctx.restore();
      });
    });

    // Death frame
    this._ct('porcupine_dead_0', 48, 38, (ctx) => {
      // Shadow underneath
      this._drawShadow(ctx, 24, 34, 18, 4);

      // Quills spread out flat underneath/around body
      ctx.strokeStyle = '#C8B090';
      ctx.lineWidth = 1;
      for (let q = 0; q < 20; q++) {
        const qx = 10 + q * 1.8;
        const angle = -0.3 + Math.random() * 0.6;
        const len = 6 + Math.random() * 5;
        // Quills splayed outward from body (flat on ground)
        ctx.beginPath();
        ctx.moveTo(qx, 26);
        ctx.lineTo(qx + Math.cos(angle) * len, 26 + Math.sin(angle) * len);
        ctx.stroke();
      }
      // Quills pointing upward from body top
      ctx.strokeStyle = '#B8A080';
      ctx.lineWidth = 0.8;
      for (let q = 0; q < 14; q++) {
        const qx = 14 + q * 2;
        const len = 5 + Math.random() * 4;
        ctx.beginPath();
        ctx.moveTo(qx, 24);
        ctx.lineTo(qx + (Math.random() - 0.5) * 4, 24 - len);
        ctx.stroke();
      }

      // Body on side
      const bg = ctx.createRadialGradient(24, 26, 3, 24, 26, 12);
      bg.addColorStop(0, '#6B4A30');
      bg.addColorStop(1, '#4A3020');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(24, 26, 14, 8, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Lighter underside exposed
      ctx.fillStyle = '#7B5A3A';
      ctx.beginPath();
      ctx.ellipse(22, 30, 10, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head on side
      ctx.fillStyle = '#5A3A20';
      ctx.beginPath();
      ctx.arc(8, 28, 6, 0, Math.PI * 2);
      ctx.fill();

      // Snout
      ctx.fillStyle = '#5A3A20';
      ctx.beginPath();
      ctx.ellipse(3, 30, 3, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Nose
      ctx.fillStyle = '#222';
      ctx.beginPath();
      ctx.ellipse(1, 30, 1.5, 1.2, 0, 0, Math.PI * 2);
      ctx.fill();

      // X eyes
      this._drawXEyes(ctx, 6, 27, 1.5);

      // Limp stubby legs
      ctx.fillStyle = '#3A2818';
      ctx.fillRect(16, 32, 4, 4);
      ctx.fillRect(22, 33, 4, 3);
      ctx.fillRect(30, 32, 4, 4);
      ctx.fillRect(36, 33, 4, 3);
    });
  }

  // ===================== WOLVERINE (54x40, 5 walk + 1 death) =====================

  _drawWolverineBody(ctx: CanvasRenderingContext2D): void {
    // Main body - dark brown/black, compact and stocky
    const bg = ctx.createRadialGradient(30, 22, 4, 30, 22, 16);
    bg.addColorStop(0, '#3A2818');
    bg.addColorStop(1, '#1A0C04');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(30, 22, 16, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lighter side stripe - distinctive wolverine marking
    const stripeGrad = ctx.createLinearGradient(16, 16, 44, 16);
    stripeGrad.addColorStop(0, 'rgba(180,150,90,0.5)');
    stripeGrad.addColorStop(0.5, 'rgba(200,170,100,0.6)');
    stripeGrad.addColorStop(1, 'rgba(180,150,90,0.4)');
    ctx.fillStyle = stripeGrad;
    ctx.beginPath();
    ctx.moveTo(16, 18);
    ctx.quadraticCurveTo(30, 14, 44, 18);
    ctx.lineTo(44, 24);
    ctx.quadraticCurveTo(30, 20, 16, 24);
    ctx.fill();

    // Darker back
    ctx.fillStyle = '#1A0C04';
    ctx.beginPath();
    ctx.ellipse(30, 14, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lighter underside
    ctx.fillStyle = '#4A3020';
    ctx.beginPath();
    ctx.ellipse(28, 28, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Fur texture
    this._drawFur(ctx, 18, 14, 24, 16, 12, 'rgba(40,20,5,0.2)');

    // Broad head
    const hg = ctx.createRadialGradient(12, 16, 2, 12, 16, 10);
    hg.addColorStop(0, '#3A2818');
    hg.addColorStop(1, '#2A1808');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.ellipse(12, 16, 10, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lighter face mask
    ctx.fillStyle = '#5A4030';
    ctx.beginPath();
    ctx.ellipse(8, 18, 6, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lighter face stripe
    ctx.fillStyle = 'rgba(180,150,90,0.3)';
    ctx.beginPath();
    ctx.moveTo(4, 10);
    ctx.lineTo(8, 8);
    ctx.lineTo(14, 10);
    ctx.lineTo(12, 14);
    ctx.lineTo(6, 14);
    ctx.fill();

    // Broad snout
    ctx.fillStyle = '#3A2818';
    ctx.beginPath();
    ctx.ellipse(4, 18, 5, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Nose
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.ellipse(1, 18, 2.5, 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mouth
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(1, 20);
    ctx.lineTo(4, 22);
    ctx.lineTo(7, 20);
    ctx.stroke();

    // Small ears
    ctx.fillStyle = '#2A1808';
    ctx.beginPath();
    ctx.arc(7, 8, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(17, 8, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#4A3020';
    ctx.beginPath();
    ctx.arc(7, 8, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(17, 8, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Eye - small and fierce
    this._drawEye(ctx, 8, 14, 2, '#663300');

    // Bushy tail
    ctx.fillStyle = '#2A1808';
    ctx.beginPath();
    ctx.moveTo(44, 18);
    ctx.quadraticCurveTo(54, 12, 52, 20);
    ctx.quadraticCurveTo(54, 26, 44, 24);
    ctx.fill();
    // Tail fur texture
    ctx.strokeStyle = 'rgba(60,40,15,0.3)';
    ctx.lineWidth = 0.5;
    for (let t = 0; t < 4; t++) {
      ctx.beginPath();
      ctx.moveTo(46 + t * 2, 16 + t);
      ctx.lineTo(48 + t * 2, 14 + t);
      ctx.stroke();
    }
  }

  _drawWolverineLeg(ctx: CanvasRenderingContext2D, x: number, ly: number, kneeAngle: number): void {
    // Thick strong legs
    const legGrad = ctx.createLinearGradient(0, ly, 0, ly + 5);
    legGrad.addColorStop(0, '#2A1808');
    legGrad.addColorStop(1, '#1A0C04');
    ctx.fillStyle = legGrad;
    const kneeX = x + Math.sin(kneeAngle) * 3;
    const kneeY = ly + 5;
    ctx.beginPath();
    ctx.moveTo(x, ly);
    ctx.lineTo(x + 6, ly);
    ctx.lineTo(kneeX + 6, kneeY);
    ctx.lineTo(kneeX, kneeY);
    ctx.fill();
    // Lower leg
    ctx.fillStyle = '#1A0C04';
    const pawY = kneeY + 4;
    ctx.beginPath();
    ctx.moveTo(kneeX, kneeY);
    ctx.lineTo(kneeX + 6, kneeY);
    ctx.lineTo(kneeX + 6, pawY);
    ctx.lineTo(kneeX, pawY);
    ctx.fill();
    // Strong paw with claws
    ctx.fillStyle = '#2A1808';
    ctx.fillRect(kneeX - 1, pawY, 7, 3);
    // Claws
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(kneeX - 1, pawY + 3);
    ctx.lineTo(kneeX - 2, pawY + 5);
    ctx.moveTo(kneeX + 2, pawY + 3);
    ctx.lineTo(kneeX + 2, pawY + 5);
    ctx.moveTo(kneeX + 5, pawY + 3);
    ctx.lineTo(kneeX + 6, pawY + 5);
    ctx.stroke();
  }

  _generateWolverineFrames(): void {
    // 5 walk frames
    const frames = [
      { legs: [26, 30, 30, 26], knees: [-0.3, 0.2, 0.2, -0.3] },
      { legs: [27, 29, 29, 27], knees: [-0.15, 0.1, 0.1, -0.15] },
      { legs: [28, 28, 28, 28], knees: [0, 0, 0, 0] },
      { legs: [30, 26, 26, 30], knees: [0.2, -0.3, -0.3, 0.2] },
      { legs: [29, 27, 27, 29], knees: [0.1, -0.15, -0.15, 0.1] },
    ];

    frames.forEach(({ legs, knees }, i) => {
      this._ct(`wolverine_walk_${i}`, 54, 40, (ctx) => {
        const xPositions = [16, 24, 34, 42];
        legs.forEach((ly, idx) => {
          this._drawWolverineLeg(ctx, xPositions[idx], ly, knees[idx]);
        });
        this._drawWolverineBody(ctx);
      });
    });

    // Death frame
    this._ct('wolverine_dead_0', 54, 40, (ctx) => {
      // Shadow underneath
      this._drawShadow(ctx, 27, 36, 20, 4);

      // Body on its side
      const bg = ctx.createRadialGradient(28, 26, 4, 28, 26, 14);
      bg.addColorStop(0, '#3A2818');
      bg.addColorStop(1, '#1A0C04');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(28, 26, 16, 8, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Side stripe visible
      ctx.fillStyle = 'rgba(200,170,100,0.4)';
      ctx.beginPath();
      ctx.moveTo(14, 22);
      ctx.quadraticCurveTo(28, 18, 42, 22);
      ctx.lineTo(42, 26);
      ctx.quadraticCurveTo(28, 24, 14, 26);
      ctx.fill();

      // Underside exposed
      ctx.fillStyle = '#4A3020';
      ctx.beginPath();
      ctx.ellipse(26, 30, 12, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head on side
      ctx.fillStyle = '#2A1808';
      ctx.beginPath();
      ctx.ellipse(10, 28, 8, 7, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Face mask
      ctx.fillStyle = '#5A4030';
      ctx.beginPath();
      ctx.ellipse(6, 30, 5, 3, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Nose
      ctx.fillStyle = '#111';
      ctx.beginPath();
      ctx.ellipse(2, 30, 2, 1.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // X eyes - fierce even in death
      this._drawXEyes(ctx, 7, 27, 2);

      // Small ears flopped
      ctx.fillStyle = '#2A1808';
      ctx.beginPath();
      ctx.arc(6, 22, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Limp thick legs
      ctx.fillStyle = '#1A0C04';
      ctx.fillRect(18, 32, 5, 6);
      ctx.fillRect(26, 33, 5, 5);
      ctx.fillRect(36, 32, 5, 6);
      ctx.fillRect(44, 33, 5, 5);
      // Paws with claws
      ctx.fillStyle = '#2A1808';
      ctx.fillRect(17, 37, 7, 3);
      ctx.fillRect(25, 37, 7, 3);
      ctx.fillRect(35, 37, 7, 3);
      ctx.fillRect(43, 37, 7, 3);

      // Tail limp
      ctx.fillStyle = '#2A1808';
      ctx.beginPath();
      ctx.ellipse(46, 24, 5, 3, 0.4, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // ===================== OWL (40x36, 5 walk + 1 death) =====================

  _drawOwlBody(ctx: CanvasRenderingContext2D): void {
    // Main body - mottled brown/grey feathers
    const bg = ctx.createRadialGradient(20, 22, 2, 20, 22, 12);
    bg.addColorStop(0, '#8B7355');
    bg.addColorStop(1, '#6B5335');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(20, 22, 10, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mottled feather texture on body
    ctx.fillStyle = 'rgba(160,140,100,0.3)';
    for (let m = 0; m < 8; m++) {
      const mx = 14 + Math.random() * 12;
      const my = 16 + Math.random() * 10;
      ctx.beginPath();
      ctx.ellipse(mx, my, 2, 1.5, Math.random(), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = 'rgba(80,60,30,0.2)';
    for (let m = 0; m < 6; m++) {
      const mx = 14 + Math.random() * 12;
      const my = 18 + Math.random() * 8;
      ctx.beginPath();
      ctx.ellipse(mx, my, 1.5, 1, Math.random(), 0, Math.PI * 2);
      ctx.fill();
    }

    // Breast - lighter with streaks
    ctx.fillStyle = '#B8A880';
    ctx.beginPath();
    ctx.ellipse(18, 26, 6, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    // Breast streaking
    ctx.strokeStyle = 'rgba(80,60,30,0.3)';
    ctx.lineWidth = 0.5;
    for (let s = 0; s < 5; s++) {
      ctx.beginPath();
      ctx.moveTo(14 + s * 2, 22);
      ctx.lineTo(15 + s * 2, 30);
      ctx.stroke();
    }

    // Round head - large relative to body (owl feature)
    const hg = ctx.createRadialGradient(12, 10, 2, 12, 10, 10);
    hg.addColorStop(0, '#8B7355');
    hg.addColorStop(1, '#7B6345');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.arc(12, 10, 10, 0, Math.PI * 2);
    ctx.fill();

    // Facial disc pattern - distinctive owl feature
    // Outer disc ring
    ctx.fillStyle = '#9B8365';
    ctx.beginPath();
    ctx.arc(10, 12, 8, 0, Math.PI * 2);
    ctx.fill();
    // Inner disc - lighter
    ctx.fillStyle = '#C4AA80';
    ctx.beginPath();
    ctx.arc(10, 12, 6, 0, Math.PI * 2);
    ctx.fill();
    // Disc border detail
    ctx.strokeStyle = '#6B5335';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(10, 12, 7.5, 0, Math.PI * 2);
    ctx.stroke();

    // Facial disc radial lines
    ctx.strokeStyle = 'rgba(100,80,50,0.25)';
    ctx.lineWidth = 0.4;
    for (let r = 0; r < 12; r++) {
      const angle = r * (Math.PI * 2 / 12);
      ctx.beginPath();
      ctx.moveTo(10 + Math.cos(angle) * 4, 12 + Math.sin(angle) * 4);
      ctx.lineTo(10 + Math.cos(angle) * 7, 12 + Math.sin(angle) * 7);
      ctx.stroke();
    }

    // Large forward-facing eyes - distinctive owl feature
    // Left eye (closer to viewer since facing left)
    ctx.fillStyle = '#FFD040';
    ctx.beginPath();
    ctx.arc(7, 11, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FF8800';
    ctx.beginPath();
    ctx.arc(7, 11, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.arc(7, 11, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(6, 10, 0.8, 0, Math.PI * 2);
    ctx.fill();

    // Right eye (partially visible)
    ctx.fillStyle = '#FFD040';
    ctx.beginPath();
    ctx.arc(14, 11, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FF8800';
    ctx.beginPath();
    ctx.arc(14, 11, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.arc(14, 11, 1.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(13.2, 10.2, 0.6, 0, Math.PI * 2);
    ctx.fill();

    // Dark eye rings
    ctx.strokeStyle = '#4A3020';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(7, 11, 3.8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(14, 11, 3.3, 0, Math.PI * 2);
    ctx.stroke();

    // Hooked beak (small, between eyes)
    ctx.fillStyle = '#888060';
    ctx.beginPath();
    ctx.moveTo(9, 14);
    ctx.lineTo(10, 17);
    ctx.lineTo(12, 14);
    ctx.fill();
    ctx.fillStyle = '#666040';
    ctx.beginPath();
    ctx.moveTo(9.5, 14.5);
    ctx.lineTo(10, 16);
    ctx.lineTo(11, 14.5);
    ctx.fill();

    // Ear tufts - another distinctive owl feature
    ctx.fillStyle = '#7B6345';
    ctx.beginPath();
    ctx.moveTo(5, 3);
    ctx.lineTo(2, -4);
    ctx.lineTo(8, 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(17, 3);
    ctx.lineTo(20, -4);
    ctx.lineTo(22, 3);
    ctx.fill();
    // Lighter tuft edges
    ctx.fillStyle = '#9B8365';
    ctx.beginPath();
    ctx.moveTo(6, 3);
    ctx.lineTo(3, -2);
    ctx.lineTo(7, 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(18, 3);
    ctx.lineTo(19, -2);
    ctx.lineTo(21, 3);
    ctx.fill();

    // Tail (short)
    ctx.fillStyle = '#6B5335';
    ctx.beginPath();
    ctx.moveTo(30, 20);
    ctx.lineTo(38, 18);
    ctx.lineTo(40, 22);
    ctx.lineTo(38, 26);
    ctx.lineTo(30, 24);
    ctx.fill();
    // Tail band
    ctx.strokeStyle = '#8B7355';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(34, 18); ctx.lineTo(34, 26);
    ctx.stroke();

    // Talons
    ctx.fillStyle = '#888060';
    ctx.fillRect(16, 28, 2, 4);
    ctx.fillRect(22, 28, 2, 4);
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(16, 32); ctx.lineTo(15, 34);
    ctx.moveTo(17, 32); ctx.lineTo(18, 34);
    ctx.moveTo(22, 32); ctx.lineTo(21, 34);
    ctx.moveTo(23, 32); ctx.lineTo(24, 34);
    ctx.stroke();
  }

  _drawOwlWings(ctx: CanvasRenderingContext2D, upY: number, downY: number): void {
    // Upper wing
    const wingGrad1 = ctx.createLinearGradient(14, upY, 36, upY);
    wingGrad1.addColorStop(0, '#7B6345');
    wingGrad1.addColorStop(0.6, '#6B5335');
    wingGrad1.addColorStop(1, '#8B7355');
    ctx.fillStyle = wingGrad1;
    ctx.beginPath();
    ctx.moveTo(14, 18);
    ctx.quadraticCurveTo(24, upY, 36, upY + 1);
    ctx.lineTo(32, 18);
    ctx.fill();

    // Lower wing
    const wingGrad2 = ctx.createLinearGradient(14, downY, 36, downY);
    wingGrad2.addColorStop(0, '#7B6345');
    wingGrad2.addColorStop(0.6, '#6B5335');
    wingGrad2.addColorStop(1, '#8B7355');
    ctx.fillStyle = wingGrad2;
    ctx.beginPath();
    ctx.moveTo(14, 24);
    ctx.quadraticCurveTo(24, downY, 36, downY - 1);
    ctx.lineTo(32, 24);
    ctx.fill();

    // Mottled wing feather detail
    ctx.fillStyle = 'rgba(140,120,80,0.25)';
    for (let f = 0; f < 4; f++) {
      // Upper wing spots
      ctx.beginPath();
      ctx.ellipse(18 + f * 5, upY + 4 + f, 2, 1.2, 0, 0, Math.PI * 2);
      ctx.fill();
      // Lower wing spots
      ctx.beginPath();
      ctx.ellipse(18 + f * 5, downY - 4 - f, 2, 1.2, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Wing feather lines
    ctx.strokeStyle = 'rgba(60,45,20,0.3)';
    ctx.lineWidth = 0.5;
    for (let f = 0; f < 4; f++) {
      ctx.beginPath();
      ctx.moveTo(18 + f * 5, upY + 2 + f);
      ctx.lineTo(30 + f * 2, upY + 1 + f);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(18 + f * 5, downY - 2 - f);
      ctx.lineTo(30 + f * 2, downY - 1 - f);
      ctx.stroke();
    }
  }

  _generateOwlFrames(): void {
    // 5 wing flap frames
    // Frame 0: Wings level
    // Frame 1: Wings halfway up
    // Frame 2: Wings fully up
    // Frame 3: Wings halfway down
    // Frame 4: Wings fully down
    const wingAngles = [
      { upY: 8, downY: 30 },    // wings level
      { upY: 4, downY: 26 },    // wings halfway up
      { upY: 1, downY: 22 },    // wings fully up
      { upY: 6, downY: 32 },    // wings halfway down
      { upY: 13, downY: 36 },   // wings fully down
    ];

    wingAngles.forEach(({ upY, downY }, i) => {
      this._ct(`owl_walk_${i}`, 40, 36, (ctx) => {
        this._drawOwlWings(ctx, upY, downY);
        this._drawOwlBody(ctx);
      });
    });

    // Death frame
    this._ct('owl_dead_0', 40, 36, (ctx) => {
      // Shadow underneath
      this._drawShadow(ctx, 20, 32, 14, 4);

      // Wings limp and splayed out
      ctx.fillStyle = '#6B5335';
      // Upper wing limp
      ctx.beginPath();
      ctx.moveTo(14, 20);
      ctx.quadraticCurveTo(24, 14, 36, 16);
      ctx.lineTo(32, 22);
      ctx.fill();
      // Lower wing limp on ground
      ctx.beginPath();
      ctx.moveTo(14, 26);
      ctx.quadraticCurveTo(26, 32, 38, 30);
      ctx.lineTo(32, 26);
      ctx.fill();

      // Mottled wing detail
      ctx.fillStyle = 'rgba(140,120,80,0.2)';
      for (let f = 0; f < 3; f++) {
        ctx.beginPath();
        ctx.ellipse(18 + f * 6, 16 + f, 2, 1, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Body on side
      const bg = ctx.createRadialGradient(18, 24, 2, 18, 24, 8);
      bg.addColorStop(0, '#8B7355');
      bg.addColorStop(1, '#6B5335');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(18, 24, 8, 6, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Breast
      ctx.fillStyle = '#B8A880';
      ctx.beginPath();
      ctx.ellipse(16, 27, 5, 3, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Large round head on side - prominent feature
      ctx.fillStyle = '#7B6345';
      ctx.beginPath();
      ctx.arc(10, 22, 8, 0, Math.PI * 2);
      ctx.fill();

      // Facial disc still visible
      ctx.fillStyle = '#C4AA80';
      ctx.beginPath();
      ctx.arc(8, 23, 5, 0, Math.PI * 2);
      ctx.fill();

      // Large X eyes - prominent on owl's flat face
      this._drawXEyes(ctx, 6, 22, 3);
      this._drawXEyes(ctx, 12, 22, 2.5);

      // Beak
      ctx.fillStyle = '#888060';
      ctx.beginPath();
      ctx.moveTo(8, 25);
      ctx.lineTo(9, 28);
      ctx.lineTo(10, 25);
      ctx.fill();

      // Ear tufts flopped
      ctx.fillStyle = '#7B6345';
      ctx.beginPath();
      ctx.moveTo(4, 16);
      ctx.lineTo(2, 14);
      ctx.lineTo(6, 16);
      ctx.fill();

      // Tail spread
      ctx.fillStyle = '#6B5335';
      ctx.beginPath();
      ctx.moveTo(26, 22);
      ctx.lineTo(34, 20);
      ctx.lineTo(36, 24);
      ctx.lineTo(34, 28);
      ctx.lineTo(26, 26);
      ctx.fill();

      // Talons limp
      ctx.fillStyle = '#888060';
      ctx.fillRect(16, 30, 2, 3);
      ctx.fillRect(22, 30, 2, 3);
    });
  }

  // ===================== RAM (62x52, 5 walk + 1 death) =====================

  _drawRamBody(ctx: CanvasRenderingContext2D, headOffY: number = 0): void {
    // Main body - muscular with thick wool
    const bg = ctx.createRadialGradient(36, 28, 4, 36, 28, 20);
    bg.addColorStop(0, '#E8E0D4');
    bg.addColorStop(1, '#C8C0B0');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(36, 28, 20, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    // Wool texture - fluffy bumps
    ctx.fillStyle = '#F0EAE0';
    const woolBumps = [
      [28, 20, 5], [36, 18, 6], [44, 20, 5], [24, 26, 5],
      [32, 24, 4], [40, 24, 5], [48, 26, 4], [30, 32, 4],
      [38, 32, 5], [46, 30, 4], [26, 30, 3], [42, 18, 4]
    ];
    woolBumps.forEach(([wx, wy, wr]) => {
      ctx.beginPath();
      ctx.arc(wx, wy, wr, 0, Math.PI * 2);
      ctx.fill();
    });

    // Wool shading detail
    ctx.fillStyle = 'rgba(160,150,130,0.2)';
    const woolShadows = [
      [30, 22, 3], [38, 20, 4], [46, 22, 3], [26, 28, 3],
      [42, 28, 3], [34, 30, 3]
    ];
    woolShadows.forEach(([wx, wy, wr]) => {
      ctx.beginPath();
      ctx.arc(wx, wy, wr, 0, Math.PI * 2);
      ctx.fill();
    });

    // Darker back wool
    ctx.fillStyle = 'rgba(170,160,140,0.25)';
    ctx.beginPath();
    ctx.ellipse(36, 18, 18, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lighter underside
    ctx.fillStyle = '#F4EEE4';
    ctx.beginPath();
    ctx.ellipse(34, 36, 14, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Fur texture
    this._drawFur(ctx, 20, 18, 30, 18, 10, 'rgba(140,130,110,0.15)');

    // Neck (wool-covered)
    ctx.fillStyle = '#D8D0C4';
    ctx.beginPath();
    ctx.ellipse(18, 22 + headOffY, 6, 8, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#E8E0D4';
    ctx.beginPath();
    ctx.arc(17, 20 + headOffY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Head - slightly lowered, darker than wool
    const hg = ctx.createRadialGradient(10, 18 + headOffY, 2, 10, 18 + headOffY, 9);
    hg.addColorStop(0, '#A09888');
    hg.addColorStop(1, '#887868');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.ellipse(10, 18 + headOffY, 9, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Muzzle
    ctx.fillStyle = '#B0A898';
    ctx.beginPath();
    ctx.ellipse(3, 22 + headOffY, 5, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Nose/nostrils
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.ellipse(0, 22 + headOffY, 2.5, 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.ellipse(-0.5, 21.5 + headOffY, 1, 0.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-0.5, 23 + headOffY, 1, 0.8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mouth
    ctx.strokeStyle = '#665850';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, 24 + headOffY);
    ctx.lineTo(4, 26 + headOffY);
    ctx.lineTo(8, 24 + headOffY);
    ctx.stroke();

    // Eye
    this._drawEye(ctx, 7, 16 + headOffY, 2.2, '#886622');

    // Large curved horns - the ram's most distinctive feature
    // Left horn (closer, bigger)
    const hornGrad1 = ctx.createLinearGradient(2, 8 + headOffY, 12, 24 + headOffY);
    hornGrad1.addColorStop(0, '#C4B89C');
    hornGrad1.addColorStop(0.5, '#A89878');
    hornGrad1.addColorStop(1, '#8C7C5C');
    ctx.fillStyle = hornGrad1;
    ctx.beginPath();
    ctx.moveTo(8, 12 + headOffY);
    ctx.quadraticCurveTo(2, 4 + headOffY, -4, 8 + headOffY);
    ctx.quadraticCurveTo(-8, 14 + headOffY, -4, 20 + headOffY);
    ctx.quadraticCurveTo(0, 24 + headOffY, 4, 22 + headOffY);
    ctx.quadraticCurveTo(2, 18 + headOffY, 4, 14 + headOffY);
    ctx.fill();

    // Horn ridges (growth rings)
    ctx.strokeStyle = 'rgba(80,60,40,0.35)';
    ctx.lineWidth = 0.6;
    for (let h = 0; h < 6; h++) {
      const t = h / 6;
      const hx = 8 - 12 * t + 4 * t * t;
      const hy = 12 + headOffY + (-4) * t + 8 * t * t;
      ctx.beginPath();
      ctx.arc(hx, hy, 3 - t * 1.5, -0.5, 2.5);
      ctx.stroke();
    }

    // Right horn (further, partially visible)
    const hornGrad2 = ctx.createLinearGradient(14, 8 + headOffY, 22, 20 + headOffY);
    hornGrad2.addColorStop(0, '#B8AC90');
    hornGrad2.addColorStop(1, '#988868');
    ctx.fillStyle = hornGrad2;
    ctx.beginPath();
    ctx.moveTo(14, 12 + headOffY);
    ctx.quadraticCurveTo(18, 6 + headOffY, 22, 8 + headOffY);
    ctx.quadraticCurveTo(24, 12 + headOffY, 22, 16 + headOffY);
    ctx.quadraticCurveTo(20, 20 + headOffY, 16, 18 + headOffY);
    ctx.quadraticCurveTo(14, 16 + headOffY, 14, 14 + headOffY);
    ctx.fill();
    // Right horn ridges
    ctx.strokeStyle = 'rgba(80,60,40,0.25)';
    ctx.lineWidth = 0.5;
    for (let h = 0; h < 4; h++) {
      const t = h / 4;
      const hx = 14 + 8 * t - 4 * t * t;
      const hy = 12 + headOffY + (-2) * t + 6 * t * t;
      ctx.beginPath();
      ctx.arc(hx, hy, 2.5 - t, -1, 2);
      ctx.stroke();
    }

    // Ears (behind horns, small)
    ctx.fillStyle = '#887868';
    ctx.beginPath();
    ctx.ellipse(4, 10 + headOffY, 3, 5, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#B0A090';
    ctx.beginPath();
    ctx.ellipse(4, 10 + headOffY, 1.5, 3, -0.4, 0, Math.PI * 2);
    ctx.fill();

    // Short tail
    ctx.fillStyle = '#D8D0C4';
    ctx.beginPath();
    ctx.ellipse(56, 24, 4, 3, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#E8E0D4';
    ctx.beginPath();
    ctx.arc(57, 23, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  _drawRamLeg(ctx: CanvasRenderingContext2D, x: number, ly: number, kneeAngle: number): void {
    // Strong sturdy legs
    const legGrad = ctx.createLinearGradient(0, ly, 0, ly + 6);
    legGrad.addColorStop(0, '#A09080');
    legGrad.addColorStop(1, '#887060');
    ctx.fillStyle = legGrad;
    const kneeX = x + Math.sin(kneeAngle) * 3;
    const kneeY = ly + 6;
    ctx.beginPath();
    ctx.moveTo(x, ly);
    ctx.lineTo(x + 6, ly);
    ctx.lineTo(kneeX + 6, kneeY);
    ctx.lineTo(kneeX, kneeY);
    ctx.fill();
    // Lower leg
    ctx.fillStyle = '#887060';
    const hoofY = kneeY + 5;
    ctx.beginPath();
    ctx.moveTo(kneeX + 1, kneeY);
    ctx.lineTo(kneeX + 5, kneeY);
    ctx.lineTo(kneeX + 5, hoofY);
    ctx.lineTo(kneeX, hoofY);
    ctx.fill();
    // Hoof
    ctx.fillStyle = '#333';
    ctx.fillRect(kneeX, hoofY, 6, 4);
    // Hoof split
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(kneeX + 3, hoofY);
    ctx.lineTo(kneeX + 3, hoofY + 4);
    ctx.stroke();
  }

  _generateRamFrames(): void {
    // 5 walk frames with head bob
    const frames = [
      { legs: [36, 40, 40, 36], knees: [-0.3, 0.2, 0.2, -0.3], headOff: 3 },
      { legs: [37, 39, 39, 37], knees: [-0.15, 0.1, 0.1, -0.15], headOff: 2.5 },
      { legs: [38, 38, 38, 38], knees: [0, 0, 0, 0], headOff: 2 },
      { legs: [40, 36, 36, 40], knees: [0.2, -0.3, -0.3, 0.2], headOff: 1 },
      { legs: [39, 37, 37, 39], knees: [0.1, -0.15, -0.15, 0.1], headOff: 1.5 },
    ];

    frames.forEach(({ legs, knees, headOff }, i) => {
      this._ct(`ram_walk_${i}`, 62, 52, (ctx) => {
        const xPositions = [22, 30, 42, 50];
        legs.forEach((ly, idx) => {
          this._drawRamLeg(ctx, xPositions[idx], ly, knees[idx]);
        });
        this._drawRamBody(ctx, headOff);
      });
    });

    // Death frame
    this._ct('ram_dead_0', 62, 52, (ctx) => {
      // Shadow underneath
      this._drawShadow(ctx, 31, 44, 24, 5);

      // Body on its side, twisted
      const bg = ctx.createRadialGradient(34, 34, 4, 34, 34, 18);
      bg.addColorStop(0, '#E8E0D4');
      bg.addColorStop(1, '#C8C0B0');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(34, 34, 18, 10, 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Wool texture bumps
      ctx.fillStyle = '#F0EAE0';
      [[26, 28, 4], [34, 26, 5], [42, 28, 4], [30, 36, 3], [38, 36, 4]].forEach(([wx, wy, wr]) => {
        ctx.beginPath();
        ctx.arc(wx, wy, wr, 0, Math.PI * 2);
        ctx.fill();
      });

      // Wool shadows
      ctx.fillStyle = 'rgba(160,150,130,0.25)';
      [[28, 30, 3], [36, 28, 3], [40, 32, 2.5]].forEach(([wx, wy, wr]) => {
        ctx.beginPath();
        ctx.arc(wx, wy, wr, 0, Math.PI * 2);
        ctx.fill();
      });

      // Lighter underside exposed (body twisted)
      ctx.fillStyle = '#F4EEE4';
      ctx.beginPath();
      ctx.ellipse(32, 38, 12, 4, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Head on side
      ctx.fillStyle = '#887868';
      ctx.beginPath();
      ctx.ellipse(10, 36, 8, 7, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Muzzle
      ctx.fillStyle = '#B0A898';
      ctx.beginPath();
      ctx.ellipse(4, 39, 4, 3, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Nose
      ctx.fillStyle = '#444';
      ctx.beginPath();
      ctx.ellipse(1, 39, 2, 1.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // X eyes
      this._drawXEyes(ctx, 8, 34, 2.2);

      // Large curved horns visible (still prominent in death)
      // Left horn curving on ground
      const hornGrad = ctx.createLinearGradient(2, 26, 12, 40);
      hornGrad.addColorStop(0, '#C4B89C');
      hornGrad.addColorStop(0.5, '#A89878');
      hornGrad.addColorStop(1, '#8C7C5C');
      ctx.fillStyle = hornGrad;
      ctx.beginPath();
      ctx.moveTo(8, 30);
      ctx.quadraticCurveTo(2, 22, -4, 26);
      ctx.quadraticCurveTo(-8, 32, -4, 38);
      ctx.quadraticCurveTo(0, 42, 4, 40);
      ctx.quadraticCurveTo(2, 36, 4, 32);
      ctx.fill();
      // Horn ridges
      ctx.strokeStyle = 'rgba(80,60,40,0.3)';
      ctx.lineWidth = 0.6;
      for (let h = 0; h < 5; h++) {
        const t = h / 5;
        const hx = 8 - 12 * t + 4 * t * t;
        const hy = 30 + (-4) * t + 8 * t * t;
        ctx.beginPath();
        ctx.arc(hx, hy, 3 - t * 1.5, -0.5, 2.5);
        ctx.stroke();
      }

      // Right horn partially visible behind head
      ctx.fillStyle = '#B8AC90';
      ctx.beginPath();
      ctx.moveTo(14, 30);
      ctx.quadraticCurveTo(18, 24, 20, 26);
      ctx.quadraticCurveTo(22, 30, 18, 34);
      ctx.quadraticCurveTo(16, 36, 14, 34);
      ctx.fill();

      // Neck wool
      ctx.fillStyle = '#D8D0C4';
      ctx.beginPath();
      ctx.ellipse(18, 34, 5, 6, -0.15, 0, Math.PI * 2);
      ctx.fill();

      // Limp legs sticking out
      ctx.fillStyle = '#887060';
      ctx.fillRect(24, 40, 5, 7);
      ctx.fillRect(32, 41, 5, 6);
      ctx.fillRect(42, 40, 5, 7);
      ctx.fillRect(50, 41, 5, 6);
      // Hooves
      ctx.fillStyle = '#333';
      ctx.fillRect(24, 46, 5, 3);
      ctx.fillRect(32, 46, 5, 3);
      ctx.fillRect(42, 46, 5, 3);
      ctx.fillRect(50, 46, 5, 3);

      // Short tail limp
      ctx.fillStyle = '#D8D0C4';
      ctx.beginPath();
      ctx.ellipse(54, 32, 3, 2.5, 0.4, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}
