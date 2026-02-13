import { SpriteFactory } from './SpriteFactory';

const ANIMAL_SCALE = 0.62;

export class AnimalSpritesT2 extends SpriteFactory {
  _ct(key: string, w: number, h: number, drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number) => void): void {
    this.createTexture(key, w, h, drawFn, ANIMAL_SCALE);
  }

  generate(): void {
    this._generateRaccoonFrames();
    this._generateDuckFrames();
    this._generateCrowFrames();
    this._generateHareFrames();
    this._generateTurkeyFrames();
    this._generateBadgerFrames();
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
    ctx.strokeStyle = '#222';
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

  // ===================== RACCOON (52x40, 6 frames, ground) =====================

  _drawRaccoonBody(ctx: CanvasRenderingContext2D): void {
    // Body - grey-brown, stocky
    const bg = ctx.createRadialGradient(28, 22, 3, 28, 22, 16);
    bg.addColorStop(0, '#A09888');
    bg.addColorStop(1, '#706858');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(28, 22, 16, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lighter underside
    ctx.fillStyle = '#B8B0A0';
    ctx.beginPath();
    ctx.ellipse(26, 28, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Fur texture
    this._drawFur(ctx, 16, 14, 22, 14, 10, 'rgba(80,70,60,0.2)');

    // Head - rounded
    const hg = ctx.createRadialGradient(10, 16, 2, 10, 16, 10);
    hg.addColorStop(0, '#B0A898');
    hg.addColorStop(1, '#807868');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.arc(10, 16, 10, 0, Math.PI * 2);
    ctx.fill();

    // White face patches
    ctx.fillStyle = '#E0DDD5';
    ctx.beginPath();
    ctx.ellipse(6, 18, 5, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(14, 18, 4, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Black mask band across eyes
    ctx.fillStyle = '#222222';
    ctx.beginPath();
    ctx.ellipse(5, 14, 4, 3, -0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(14, 14, 3.5, 2.8, 0.15, 0, Math.PI * 2);
    ctx.fill();
    // Connect mask across nose bridge
    ctx.fillStyle = '#222222';
    ctx.fillRect(5, 12, 9, 4);

    // Eyes on top of mask
    this._drawEye(ctx, 5, 14, 1.8, '#443300');
    this._drawEye(ctx, 14, 14, 1.5, '#443300');

    // White above mask (forehead stripe)
    ctx.fillStyle = '#D8D4CC';
    ctx.beginPath();
    ctx.ellipse(9, 9, 5, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Dark stripe on forehead
    ctx.fillStyle = '#555';
    ctx.beginPath();
    ctx.moveTo(8, 6);
    ctx.lineTo(10, 6);
    ctx.lineTo(10, 11);
    ctx.lineTo(8, 11);
    ctx.fill();

    // Pointed snout
    ctx.fillStyle = '#908880';
    ctx.beginPath();
    ctx.ellipse(2, 19, 4, 3, -0.1, 0, Math.PI * 2);
    ctx.fill();

    // Dark nose
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.arc(0, 19, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Whiskers
    ctx.strokeStyle = 'rgba(100,100,100,0.4)';
    ctx.lineWidth = 0.4;
    ctx.beginPath();
    ctx.moveTo(1, 19);
    ctx.lineTo(-3, 17);
    ctx.moveTo(1, 20);
    ctx.lineTo(-3, 21);
    ctx.stroke();

    // Small rounded ears
    ctx.fillStyle = '#807868';
    ctx.beginPath();
    ctx.arc(6, 7, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(14, 7, 3, 0, Math.PI * 2);
    ctx.fill();
    // Inner ear
    ctx.fillStyle = '#AAA098';
    ctx.beginPath();
    ctx.arc(6, 7, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(14, 7, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Ringed tail - alternating dark/light bands
    ctx.save();
    const tailColors = ['#706858', '#C0B8A8', '#555045', '#C0B8A8', '#444038'];
    let tx = 42;
    for (let t = 0; t < 5; t++) {
      ctx.fillStyle = tailColors[t];
      ctx.beginPath();
      ctx.ellipse(tx, 16 - t * 0.5, 3, 4 - t * 0.3, 0.2 + t * 0.08, 0, Math.PI * 2);
      ctx.fill();
      tx += 2;
    }
    ctx.restore();
  }

  _drawRaccoonLeg(ctx: CanvasRenderingContext2D, x: number, y: number, isBack: boolean): void {
    const w = isBack ? 5 : 4;
    // Upper leg
    ctx.fillStyle = '#605848';
    ctx.fillRect(x, y, w, 5);
    // Lower leg with slight knee bend
    ctx.fillStyle = '#504840';
    ctx.fillRect(x, y + 4, w, 4);
    // Dark paws
    ctx.fillStyle = '#222';
    ctx.fillRect(x - 1, y + 7, w + 1, 2);
  }

  _generateRaccoonFrames(): void {
    // 5-frame walk cycle: left-forward, transition, neutral, right-forward, transition-back
    const legFrames = [
      // [frontLeft, frontRight, backLeft, backRight]
      { fl: 26, fr: 33, bl: 33, br: 26 },  // frame 0: left legs forward
      { fl: 28, fr: 31, bl: 31, br: 28 },  // frame 1: transition
      { fl: 30, fr: 30, bl: 30, br: 30 },  // frame 2: neutral
      { fl: 33, fr: 26, bl: 26, br: 33 },  // frame 3: right legs forward
      { fl: 31, fr: 28, bl: 28, br: 31 },  // frame 4: transition back
    ];

    legFrames.forEach(({ fl, fr, bl, br }, i) => {
      this._ct(`raccoon_walk_${i}`, 52, 40, (ctx) => {
        // Back legs (drawn first, behind body)
        this._drawRaccoonLeg(ctx, 30, bl, true);
        this._drawRaccoonLeg(ctx, 36, br, true);
        // Front legs
        this._drawRaccoonLeg(ctx, 14, fl, false);
        this._drawRaccoonLeg(ctx, 20, fr, false);

        this._drawRaccoonBody(ctx);
      });
    });

    // Death frame
    this._ct('raccoon_dead_0', 52, 40, (ctx) => {
      // Shadow underneath
      this._drawShadow(ctx, 26, 32, 18, 5);

      ctx.save();
      ctx.translate(26, 28);
      ctx.rotate(Math.PI / 2);
      ctx.translate(-26, -28);

      // Body on its side
      const bg = ctx.createRadialGradient(28, 22, 3, 28, 22, 16);
      bg.addColorStop(0, '#A09888');
      bg.addColorStop(1, '#706858');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(28, 22, 14, 9, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = '#907868';
      ctx.beginPath();
      ctx.arc(14, 18, 8, 0, Math.PI * 2);
      ctx.fill();

      // Mask
      ctx.fillStyle = '#222';
      ctx.fillRect(8, 15, 8, 3);

      // X eyes
      this._drawXEye(ctx, 10, 16, 2);
      this._drawXEye(ctx, 17, 16, 1.8);

      // Limp tail - drooping
      ctx.fillStyle = '#706858';
      ctx.beginPath();
      ctx.ellipse(40, 24, 5, 3, 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#C0B8A8';
      ctx.beginPath();
      ctx.ellipse(43, 25, 3, 2, 0.5, 0, Math.PI * 2);
      ctx.fill();

      // Limp legs sticking out
      ctx.fillStyle = '#504840';
      ctx.fillRect(20, 28, 3, 6);
      ctx.fillRect(26, 29, 3, 5);
      ctx.fillRect(32, 28, 3, 6);
      ctx.fillRect(36, 29, 3, 5);

      ctx.restore();
    });
  }

  // ===================== DUCK (44x30, 6 frames, flying) =====================

  _drawDuckBody(ctx: CanvasRenderingContext2D): void {
    // Body - brown
    const bg = ctx.createRadialGradient(22, 16, 2, 22, 16, 12);
    bg.addColorStop(0, '#A07840');
    bg.addColorStop(1, '#7A5828');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(22, 16, 12, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lighter belly
    ctx.fillStyle = '#C0A878';
    ctx.beginPath();
    ctx.ellipse(20, 20, 9, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Wing marking on body (folded wing contour)
    ctx.fillStyle = '#6A4820';
    ctx.beginPath();
    ctx.ellipse(26, 14, 8, 5, 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Speculum patch (blue-purple wing patch)
    ctx.fillStyle = '#3355AA';
    ctx.beginPath();
    ctx.ellipse(28, 16, 4, 2, 0, 0, Math.PI * 2);
    ctx.fill();
    // White border on speculum
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.ellipse(28, 16, 4.5, 2.5, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Head - green (mallard)
    const hg = ctx.createRadialGradient(7, 10, 1, 7, 10, 7);
    hg.addColorStop(0, '#228833');
    hg.addColorStop(1, '#115522');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.arc(7, 10, 7, 0, Math.PI * 2);
    ctx.fill();

    // Iridescent sheen on head
    ctx.fillStyle = 'rgba(100,220,150,0.15)';
    ctx.beginPath();
    ctx.arc(5, 8, 5, 0, Math.PI * 2);
    ctx.fill();

    // White neck ring
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(7, 10, 7, 0.3, 1.2);
    ctx.stroke();

    // Yellow beak
    ctx.fillStyle = '#E8B830';
    ctx.beginPath();
    ctx.moveTo(0, 11);
    ctx.lineTo(-2, 10);
    ctx.lineTo(-2, 13);
    ctx.lineTo(2, 13);
    ctx.lineTo(2, 10);
    ctx.fill();
    // Beak detail
    ctx.fillStyle = '#CC9920';
    ctx.beginPath();
    ctx.moveTo(-2, 11);
    ctx.lineTo(0, 11);
    ctx.lineTo(0, 13);
    ctx.lineTo(-2, 13);
    ctx.fill();
    // Nostril
    ctx.fillStyle = '#AA7710';
    ctx.beginPath();
    ctx.arc(0, 11, 0.5, 0, Math.PI * 2);
    ctx.fill();

    // Eye
    this._drawEye(ctx, 5, 9, 1.5, '#332200');

    // Short tail
    ctx.fillStyle = '#6A4820';
    ctx.beginPath();
    ctx.moveTo(34, 13);
    ctx.lineTo(40, 11);
    ctx.lineTo(40, 17);
    ctx.lineTo(34, 17);
    ctx.fill();

    // Upturned tail feathers (curl)
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.moveTo(38, 12);
    ctx.quadraticCurveTo(42, 10, 41, 13);
    ctx.fill();
  }

  _drawDuckWing(ctx: CanvasRenderingContext2D, startX: number, startY: number, tipY: number, color: string): void {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(startX + 12, tipY, startX + 22, tipY + 1);
    ctx.lineTo(startX + 18, startY);
    ctx.fill();
  }

  _generateDuckFrames(): void {
    // 5-frame wing cycle: level, half-up, full-up, half-down, full-down
    const wingData = [
      { upY: 6, downY: 24 },   // frame 0: wings level
      { upY: 3, downY: 20 },   // frame 1: wings halfway up
      { upY: -1, downY: 16 },  // frame 2: wings fully up
      { upY: 3, downY: 22 },   // frame 3: wings halfway down
      { upY: 8, downY: 28 },   // frame 4: wings fully down
    ];

    wingData.forEach(({ upY, downY }, i) => {
      this._ct(`duck_walk_${i}`, 44, 30, (ctx) => {
        // Upper wing
        ctx.fillStyle = '#6A4820';
        ctx.beginPath();
        ctx.moveTo(14, 14);
        ctx.quadraticCurveTo(26, upY, 36, upY + 1);
        ctx.lineTo(32, 14);
        ctx.fill();
        // Speculum on wing
        ctx.fillStyle = '#3355AA';
        ctx.beginPath();
        ctx.moveTo(28, upY + 3);
        ctx.lineTo(34, upY + 2);
        ctx.lineTo(34, upY + 5);
        ctx.lineTo(28, upY + 5);
        ctx.fill();

        // Lower wing
        ctx.fillStyle = '#7A5828';
        ctx.beginPath();
        ctx.moveTo(14, 18);
        ctx.quadraticCurveTo(26, downY, 36, downY - 1);
        ctx.lineTo(32, 18);
        ctx.fill();

        // Wing feather lines
        ctx.strokeStyle = '#5A3818';
        ctx.lineWidth = 0.5;
        for (let f = 0; f < 4; f++) {
          ctx.beginPath();
          ctx.moveTo(16 + f * 4, upY + 4 + f);
          ctx.lineTo(30 + f * 2, upY + 2 + f);
          ctx.stroke();
        }

        // Body
        this._drawDuckBody(ctx);

        // Orange feet (visible when flying)
        ctx.fillStyle = '#E88820';
        // Left foot
        ctx.beginPath();
        ctx.moveTo(18, 24);
        ctx.lineTo(16, 27);
        ctx.lineTo(20, 27);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(16, 27);
        ctx.lineTo(14, 29);
        ctx.moveTo(18, 27);
        ctx.lineTo(18, 29);
        ctx.moveTo(20, 27);
        ctx.lineTo(22, 29);
        ctx.strokeStyle = '#E88820';
        ctx.lineWidth = 0.7;
        ctx.stroke();

        // Right foot
        ctx.fillStyle = '#E88820';
        ctx.beginPath();
        ctx.moveTo(24, 24);
        ctx.lineTo(22, 27);
        ctx.lineTo(26, 27);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(22, 27);
        ctx.lineTo(20, 29);
        ctx.moveTo(24, 27);
        ctx.lineTo(24, 29);
        ctx.moveTo(26, 27);
        ctx.lineTo(28, 29);
        ctx.strokeStyle = '#E88820';
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });
    });

    // Death frame
    this._ct('duck_dead_0', 44, 30, (ctx) => {
      // Shadow underneath
      this._drawShadow(ctx, 22, 26, 16, 4);

      // Body on its side, rotated
      ctx.save();
      ctx.translate(22, 20);
      ctx.rotate(Math.PI * 0.55);
      ctx.translate(-22, -20);

      // Body
      const bg = ctx.createRadialGradient(22, 16, 2, 22, 16, 10);
      bg.addColorStop(0, '#A07840');
      bg.addColorStop(1, '#7A5828');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(22, 16, 10, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = '#1A6633';
      ctx.beginPath();
      ctx.arc(10, 14, 6, 0, Math.PI * 2);
      ctx.fill();

      // Beak
      ctx.fillStyle = '#E8B830';
      ctx.beginPath();
      ctx.moveTo(4, 15);
      ctx.lineTo(2, 14);
      ctx.lineTo(2, 17);
      ctx.lineTo(5, 16);
      ctx.fill();

      // X eyes
      this._drawXEye(ctx, 8, 13, 1.8);

      // Limp wings
      ctx.fillStyle = '#6A4820';
      ctx.beginPath();
      ctx.moveTo(16, 14);
      ctx.lineTo(20, 6);
      ctx.lineTo(30, 8);
      ctx.lineTo(28, 16);
      ctx.fill();

      // Limp feet
      ctx.fillStyle = '#E88820';
      ctx.fillRect(18, 22, 2, 4);
      ctx.fillRect(22, 23, 2, 3);

      ctx.restore();
    });
  }

  // ===================== CROW (40x28, 6 frames, flying) =====================

  _drawCrowBody(ctx: CanvasRenderingContext2D): void {
    // Body - black with purple/blue sheen
    const bg = ctx.createRadialGradient(20, 14, 2, 20, 14, 11);
    bg.addColorStop(0, '#333340');
    bg.addColorStop(1, '#111118');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(20, 14, 11, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Iridescent purple sheen
    const sheen = ctx.createRadialGradient(18, 12, 1, 18, 12, 8);
    sheen.addColorStop(0, 'rgba(80,50,120,0.25)');
    sheen.addColorStop(1, 'rgba(30,30,80,0)');
    ctx.fillStyle = sheen;
    ctx.beginPath();
    ctx.ellipse(18, 12, 8, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Blue sheen highlight
    const blueSheen = ctx.createRadialGradient(22, 16, 1, 22, 16, 6);
    blueSheen.addColorStop(0, 'rgba(50,60,140,0.2)');
    blueSheen.addColorStop(1, 'rgba(20,20,60,0)');
    ctx.fillStyle = blueSheen;
    ctx.beginPath();
    ctx.ellipse(22, 16, 6, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head - black
    const hg = ctx.createRadialGradient(7, 10, 1, 7, 10, 6);
    hg.addColorStop(0, '#2A2A30');
    hg.addColorStop(1, '#111116');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.arc(7, 10, 6, 0, Math.PI * 2);
    ctx.fill();

    // Purple sheen on head
    ctx.fillStyle = 'rgba(70,40,100,0.2)';
    ctx.beginPath();
    ctx.arc(6, 8, 4, 0, Math.PI * 2);
    ctx.fill();

    // Sharp beak - dark, pointed
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(1, 10);
    ctx.lineTo(-2, 9);
    ctx.lineTo(3, 9);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(1, 11);
    ctx.lineTo(-2, 12);
    ctx.lineTo(3, 12);
    ctx.fill();
    // Beak ridge
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 0.3;
    ctx.beginPath();
    ctx.moveTo(-1, 10);
    ctx.lineTo(3, 10);
    ctx.stroke();

    // Beady eye
    this._drawEye(ctx, 5, 9, 1.3, '#222');

    // Tail feathers
    ctx.fillStyle = '#111118';
    ctx.beginPath();
    ctx.moveTo(31, 12);
    ctx.lineTo(40, 9);
    ctx.lineTo(39, 14);
    ctx.lineTo(40, 19);
    ctx.lineTo(31, 16);
    ctx.fill();

    // Tail feather lines
    ctx.strokeStyle = '#222230';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(32, 13);
    ctx.lineTo(38, 10);
    ctx.moveTo(32, 14);
    ctx.lineTo(39, 14);
    ctx.moveTo(32, 15);
    ctx.lineTo(38, 18);
    ctx.stroke();

    // Legs/feet (small, tucked)
    ctx.fillStyle = '#333';
    ctx.fillRect(16, 20, 2, 4);
    ctx.fillRect(20, 20, 2, 4);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(16, 24);
    ctx.lineTo(14, 26);
    ctx.moveTo(17, 24);
    ctx.lineTo(17, 26);
    ctx.moveTo(18, 24);
    ctx.lineTo(19, 26);
    ctx.moveTo(20, 24);
    ctx.lineTo(19, 26);
    ctx.moveTo(21, 24);
    ctx.lineTo(21, 26);
    ctx.moveTo(22, 24);
    ctx.lineTo(23, 26);
    ctx.stroke();
  }

  _generateCrowFrames(): void {
    // 5-frame wing cycle: level, half-up, full-up, half-down, full-down
    const wingData = [
      { upY: 4, downY: 22 },   // frame 0: wings level
      { upY: 1, downY: 18 },   // frame 1: wings halfway up
      { upY: -3, downY: 14 },  // frame 2: wings fully up
      { upY: 1, downY: 20 },   // frame 3: wings halfway down
      { upY: 7, downY: 26 },   // frame 4: wings fully down
    ];

    wingData.forEach(({ upY, downY }, i) => {
      this._ct(`crow_walk_${i}`, 40, 28, (ctx) => {
        // Upper wing
        ctx.fillStyle = '#1A1A22';
        ctx.beginPath();
        ctx.moveTo(12, 12);
        ctx.quadraticCurveTo(24, upY, 34, upY + 1);
        ctx.lineTo(30, 12);
        ctx.fill();
        // Wing sheen
        ctx.fillStyle = 'rgba(60,50,100,0.15)';
        ctx.beginPath();
        ctx.moveTo(14, 12);
        ctx.quadraticCurveTo(22, upY + 2, 30, upY + 2);
        ctx.lineTo(28, 12);
        ctx.fill();

        // Lower wing
        ctx.fillStyle = '#151520';
        ctx.beginPath();
        ctx.moveTo(12, 16);
        ctx.quadraticCurveTo(24, downY, 34, downY - 1);
        ctx.lineTo(30, 16);
        ctx.fill();

        // Feather details
        ctx.strokeStyle = '#2A2A35';
        ctx.lineWidth = 0.5;
        for (let f = 0; f < 4; f++) {
          ctx.beginPath();
          ctx.moveTo(14 + f * 4, upY + 3 + f);
          ctx.lineTo(28 + f * 2, upY + 1 + f);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(14 + f * 4, downY - 3 - f);
          ctx.lineTo(28 + f * 2, downY - 1 - f);
          ctx.stroke();
        }

        this._drawCrowBody(ctx);
      });
    });

    // Death frame
    this._ct('crow_dead_0', 40, 28, (ctx) => {
      // Shadow underneath
      this._drawShadow(ctx, 20, 24, 14, 3);

      ctx.save();
      ctx.translate(20, 18);
      ctx.rotate(Math.PI * 0.5);
      ctx.translate(-20, -18);

      // Body on its side
      const bg = ctx.createRadialGradient(20, 14, 2, 20, 14, 9);
      bg.addColorStop(0, '#333340');
      bg.addColorStop(1, '#111118');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(20, 14, 9, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = '#1A1A22';
      ctx.beginPath();
      ctx.arc(10, 12, 5, 0, Math.PI * 2);
      ctx.fill();

      // Beak
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.moveTo(5, 12);
      ctx.lineTo(3, 11);
      ctx.lineTo(3, 13);
      ctx.fill();

      // X eyes
      this._drawXEye(ctx, 9, 11, 1.5);

      // Limp wings
      ctx.fillStyle = '#1A1A22';
      ctx.beginPath();
      ctx.moveTo(14, 12);
      ctx.lineTo(18, 4);
      ctx.lineTo(28, 6);
      ctx.lineTo(26, 14);
      ctx.fill();

      // Limp feet
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(16, 19);
      ctx.lineTo(14, 23);
      ctx.moveTo(20, 19);
      ctx.lineTo(22, 23);
      ctx.stroke();

      ctx.restore();
    });
  }

  // ===================== HARE (50x40, 6 frames, ground) =====================

  _drawHareBody(ctx: CanvasRenderingContext2D): void {
    // Body - brown/tan, elongated and sleek
    const bg = ctx.createRadialGradient(26, 22, 3, 26, 22, 15);
    bg.addColorStop(0, '#C4A070');
    bg.addColorStop(1, '#907040');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(26, 22, 15, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lighter belly
    ctx.fillStyle = '#DBC8A0';
    ctx.beginPath();
    ctx.ellipse(24, 28, 11, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Fur texture
    this._drawFur(ctx, 14, 14, 22, 14, 10, 'rgba(100,70,40,0.2)');

    // Head - smaller relative to body, fast-looking
    const hg = ctx.createRadialGradient(10, 16, 2, 10, 16, 9);
    hg.addColorStop(0, '#C4A070');
    hg.addColorStop(1, '#A08050');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.ellipse(10, 16, 9, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cheek / muzzle
    ctx.fillStyle = '#DBC8A0';
    ctx.beginPath();
    ctx.ellipse(4, 19, 5, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Nose
    ctx.fillStyle = '#997766';
    ctx.beginPath();
    ctx.ellipse(1, 18, 1.5, 1, 0, 0, Math.PI * 2);
    ctx.fill();

    // Whiskers
    ctx.strokeStyle = 'rgba(100,80,60,0.4)';
    ctx.lineWidth = 0.4;
    ctx.beginPath();
    ctx.moveTo(2, 18);
    ctx.lineTo(-3, 16);
    ctx.moveTo(2, 19);
    ctx.lineTo(-3, 20);
    ctx.stroke();

    // Long ears - key distinguishing feature from rabbit
    ctx.fillStyle = '#A08050';
    ctx.beginPath();
    ctx.ellipse(5, 2, 3, 12, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(16, 1, 3, 13, 0.15, 0, Math.PI * 2);
    ctx.fill();
    // Inner ear
    ctx.fillStyle = '#DDAA88';
    ctx.beginPath();
    ctx.ellipse(5, 2, 1.5, 9, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(16, 1, 1.5, 10, 0.15, 0, Math.PI * 2);
    ctx.fill();
    // Black ear tips
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.ellipse(4, -9, 2.5, 3, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(16, -11, 2.5, 3, 0.15, 0, Math.PI * 2);
    ctx.fill();

    // Eye
    this._drawEye(ctx, 6, 14, 2.5, '#775500');

    // Short white tail
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(42, 18, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  _generateHareFrames(): void {
    // 5-frame running cycle with extended stride and body bob
    const legSets = [
      { fl: 24, fr: 32, bl: 32, br: 24, bodyOff: -1 },   // frame 0: left legs forward
      { fl: 27, fr: 30, bl: 30, br: 27, bodyOff: -1 },   // frame 1: transition
      { fl: 28, fr: 28, bl: 28, br: 28, bodyOff: 0 },    // frame 2: neutral stance
      { fl: 32, fr: 24, bl: 24, br: 32, bodyOff: -1 },   // frame 3: right legs forward
      { fl: 30, fr: 27, bl: 27, br: 30, bodyOff: -1 },   // frame 4: transition back
    ];

    legSets.forEach(({ fl, fr, bl, br, bodyOff }, i) => {
      this._ct(`hare_walk_${i}`, 50, 40, (ctx) => {
        // Back legs - longer, powerful
        ctx.fillStyle = '#907040';
        ctx.fillRect(32, bl, 5, 7);
        ctx.fillStyle = '#806030';
        ctx.fillRect(33, bl + 6, 4, 5);
        ctx.fillStyle = '#907040';
        ctx.fillRect(38, br, 5, 7);
        ctx.fillStyle = '#806030';
        ctx.fillRect(39, br + 6, 4, 5);
        // Hind paws (larger)
        ctx.fillStyle = '#CCBB99';
        ctx.fillRect(31, bl + 10, 6, 3);
        ctx.fillRect(37, br + 10, 6, 3);

        // Front legs - thinner
        ctx.fillStyle = '#907040';
        ctx.fillRect(14, fl, 4, 5);
        ctx.fillStyle = '#806030';
        ctx.fillRect(14, fl + 4, 3, 4);
        ctx.fillStyle = '#907040';
        ctx.fillRect(20, fr, 4, 5);
        ctx.fillStyle = '#806030';
        ctx.fillRect(20, fr + 4, 3, 4);
        // Front paws
        ctx.fillStyle = '#CCBB99';
        ctx.fillRect(13, fl + 7, 5, 2);
        ctx.fillRect(19, fr + 7, 5, 2);

        ctx.save();
        ctx.translate(0, bodyOff);
        this._drawHareBody(ctx);
        ctx.restore();
      });
    });

    // Death frame
    this._ct('hare_dead_0', 50, 40, (ctx) => {
      // Shadow underneath
      this._drawShadow(ctx, 25, 34, 18, 4);

      ctx.save();
      ctx.translate(25, 28);
      ctx.rotate(Math.PI / 2);
      ctx.translate(-25, -28);

      // Body on its side
      const bg = ctx.createRadialGradient(26, 22, 3, 26, 22, 13);
      bg.addColorStop(0, '#C4A070');
      bg.addColorStop(1, '#907040');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(26, 22, 13, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = '#B09060';
      ctx.beginPath();
      ctx.ellipse(12, 18, 7, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Floppy ears (limp)
      ctx.fillStyle = '#A08050';
      ctx.beginPath();
      ctx.ellipse(8, 12, 2.5, 8, -0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#DDAA88';
      ctx.beginPath();
      ctx.ellipse(8, 12, 1.2, 6, -0.6, 0, Math.PI * 2);
      ctx.fill();

      // X eyes
      this._drawXEye(ctx, 9, 17, 2);

      // Nose
      ctx.fillStyle = '#997766';
      ctx.beginPath();
      ctx.arc(5, 20, 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Limp legs
      ctx.fillStyle = '#907040';
      ctx.fillRect(18, 28, 3, 7);
      ctx.fillRect(24, 29, 3, 6);
      ctx.fillRect(30, 28, 4, 7);
      ctx.fillRect(35, 29, 4, 6);

      // White tail
      ctx.fillStyle = '#eee';
      ctx.beginPath();
      ctx.arc(40, 20, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });
  }

  // ===================== TURKEY (56x48, 6 frames, ground) =====================

  _drawTurkeyBody(ctx: CanvasRenderingContext2D, fanCollapsed: boolean): void {
    // Body - brown, plump
    const bg = ctx.createRadialGradient(28, 28, 3, 28, 28, 16);
    bg.addColorStop(0, '#8B6340');
    bg.addColorStop(1, '#5A3A20');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(28, 28, 16, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Breast feathers
    ctx.fillStyle = '#704828';
    ctx.beginPath();
    ctx.ellipse(22, 32, 10, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Feather detail lines on body
    ctx.strokeStyle = '#4A2A10';
    ctx.lineWidth = 0.5;
    for (let f = 0; f < 6; f++) {
      ctx.beginPath();
      ctx.arc(26, 26 + f * 2, 10 - f, 0.5, 2.5);
      ctx.stroke();
    }

    // Copper/bronze feather sheen
    ctx.fillStyle = 'rgba(180,120,60,0.15)';
    ctx.beginPath();
    ctx.ellipse(30, 26, 12, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    if (fanCollapsed) {
      // Collapsed tail (for death frame)
      ctx.fillStyle = '#3A2210';
      ctx.beginPath();
      ctx.moveTo(40, 22);
      ctx.lineTo(50, 20);
      ctx.lineTo(50, 30);
      ctx.lineTo(40, 30);
      ctx.fill();
    } else {
      // Fan-shaped tail feathers
      ctx.fillStyle = '#3A2210';
      ctx.beginPath();
      ctx.moveTo(40, 20);
      ctx.quadraticCurveTo(56, 8, 54, 18);
      ctx.lineTo(54, 30);
      ctx.quadraticCurveTo(56, 38, 40, 32);
      ctx.fill();

      // Tail feather lighter tips
      ctx.fillStyle = '#AA8860';
      for (let t = 0; t < 5; t++) {
        const angle = -0.5 + t * 0.25;
        const tipX = 50 + Math.cos(angle) * 4;
        const tipY = 14 + t * 4 + Math.sin(angle) * 2;
        ctx.beginPath();
        ctx.ellipse(tipX, tipY, 3, 1.5, angle, 0, Math.PI * 2);
        ctx.fill();
      }

      // Tail feather lines
      ctx.strokeStyle = '#5A3A20';
      ctx.lineWidth = 0.6;
      for (let t = 0; t < 6; t++) {
        ctx.beginPath();
        ctx.moveTo(42, 22 + t * 2);
        ctx.lineTo(52, 12 + t * 4);
        ctx.stroke();
      }
    }

    // Neck
    const ng = ctx.createLinearGradient(14, 14, 18, 14);
    ng.addColorStop(0, '#8B4040');
    ng.addColorStop(1, '#6B3030');
    ctx.fillStyle = ng;
    ctx.fillRect(12, 12, 8, 18);

    // Head - small, bluish-grey
    const hg = ctx.createRadialGradient(10, 10, 1, 10, 10, 7);
    hg.addColorStop(0, '#8899AA');
    hg.addColorStop(1, '#667788');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.arc(10, 10, 7, 0, Math.PI * 2);
    ctx.fill();

    // Red bumpy skin on head
    ctx.fillStyle = '#CC3333';
    ctx.beginPath();
    ctx.arc(8, 8, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#DD4444';
    ctx.beginPath();
    ctx.arc(12, 7, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Red wattle/snood hanging from beak
    ctx.fillStyle = '#CC2222';
    ctx.beginPath();
    ctx.moveTo(4, 12);
    ctx.quadraticCurveTo(2, 18, 5, 20);
    ctx.quadraticCurveTo(7, 18, 6, 12);
    ctx.fill();
    // Snood (fleshy horn above beak)
    ctx.fillStyle = '#DD3333';
    ctx.beginPath();
    ctx.moveTo(4, 9);
    ctx.quadraticCurveTo(2, 4, 5, 7);
    ctx.fill();

    // Beak - short, curved
    ctx.fillStyle = '#CCAA66';
    ctx.beginPath();
    ctx.moveTo(3, 10);
    ctx.lineTo(1, 10);
    ctx.lineTo(2, 12);
    ctx.lineTo(4, 11);
    ctx.fill();
  }

  _drawTurkeyLeg(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    // Thick upper leg
    ctx.fillStyle = '#886655';
    ctx.fillRect(x, y, 4, 4);
    // Scaly lower leg
    ctx.fillStyle = '#998866';
    ctx.fillRect(x, y + 3, 4, 4);
    // Feet with toes
    ctx.strokeStyle = '#886655';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y + 7);
    ctx.lineTo(x - 2, y + 9);
    ctx.moveTo(x + 2, y + 7);
    ctx.lineTo(x + 2, y + 9);
    ctx.moveTo(x + 4, y + 7);
    ctx.lineTo(x + 6, y + 9);
    ctx.stroke();
  }

  _generateTurkeyFrames(): void {
    // 5-frame walk cycle
    const legFrames = [
      { fl: 36, fr: 42, bl: 42, br: 36 },  // frame 0: left legs forward
      { fl: 38, fr: 40, bl: 40, br: 38 },  // frame 1: transition
      { fl: 38, fr: 38, bl: 38, br: 38 },  // frame 2: neutral
      { fl: 42, fr: 36, bl: 36, br: 42 },  // frame 3: right legs forward
      { fl: 40, fr: 38, bl: 38, br: 40 },  // frame 4: transition back
    ];

    legFrames.forEach(({ fl, fr, bl, br }, i) => {
      this._ct(`turkey_walk_${i}`, 56, 48, (ctx) => {
        // Back legs
        this._drawTurkeyLeg(ctx, 32, bl);
        this._drawTurkeyLeg(ctx, 38, br);
        // Front legs
        this._drawTurkeyLeg(ctx, 18, fl);
        this._drawTurkeyLeg(ctx, 24, fr);

        this._drawTurkeyBody(ctx, false);

        // Eye (on top of body drawing)
        this._drawEye(ctx, 8, 9, 1.5, '#442200');
      });
    });

    // Death frame
    this._ct('turkey_dead_0', 56, 48, (ctx) => {
      // Shadow underneath
      this._drawShadow(ctx, 28, 42, 20, 5);

      ctx.save();
      ctx.translate(28, 36);
      ctx.rotate(Math.PI / 2);
      ctx.translate(-28, -36);

      // Body on its side
      const bg = ctx.createRadialGradient(28, 28, 3, 28, 28, 14);
      bg.addColorStop(0, '#8B6340');
      bg.addColorStop(1, '#5A3A20');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(28, 28, 14, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // Collapsed fan tail
      ctx.fillStyle = '#3A2210';
      ctx.beginPath();
      ctx.moveTo(40, 24);
      ctx.lineTo(48, 22);
      ctx.lineTo(48, 32);
      ctx.lineTo(40, 32);
      ctx.fill();

      // Neck (limp)
      ctx.fillStyle = '#7B3535';
      ctx.fillRect(14, 18, 6, 12);

      // Head
      ctx.fillStyle = '#778899';
      ctx.beginPath();
      ctx.arc(12, 16, 5, 0, Math.PI * 2);
      ctx.fill();

      // Red skin
      ctx.fillStyle = '#CC3333';
      ctx.beginPath();
      ctx.arc(10, 14, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Wattle drooping
      ctx.fillStyle = '#CC2222';
      ctx.beginPath();
      ctx.moveTo(7, 17);
      ctx.quadraticCurveTo(5, 22, 8, 23);
      ctx.quadraticCurveTo(10, 21, 9, 17);
      ctx.fill();

      // X eyes
      this._drawXEye(ctx, 10, 15, 1.8);

      // Beak
      ctx.fillStyle = '#CCAA66';
      ctx.beginPath();
      ctx.moveTo(7, 16);
      ctx.lineTo(5, 16);
      ctx.lineTo(6, 18);
      ctx.fill();

      // Limp legs
      ctx.fillStyle = '#886655';
      ctx.fillRect(22, 36, 3, 6);
      ctx.fillRect(28, 37, 3, 5);
      ctx.fillRect(34, 36, 3, 6);
      ctx.fillRect(38, 37, 3, 5);

      ctx.restore();
    });
  }

  // ===================== BADGER (50x36, 6 frames, ground) =====================

  _drawBadgerBody(ctx: CanvasRenderingContext2D): void {
    // Body - dark, stocky
    const bg = ctx.createRadialGradient(26, 20, 3, 26, 20, 16);
    bg.addColorStop(0, '#555555');
    bg.addColorStop(1, '#333333');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(26, 20, 16, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lighter underside
    ctx.fillStyle = '#777770';
    ctx.beginPath();
    ctx.ellipse(24, 26, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Coarse fur on back
    ctx.fillStyle = '#444440';
    ctx.beginPath();
    ctx.ellipse(28, 14, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Grizzled fur texture
    this._drawFur(ctx, 14, 12, 24, 14, 12, 'rgba(80,80,75,0.3)');

    // Head - elongated, wedge-shaped
    const hg = ctx.createRadialGradient(8, 16, 2, 8, 16, 9);
    hg.addColorStop(0, '#555555');
    hg.addColorStop(1, '#3A3A3A');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.ellipse(8, 16, 9, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // WHITE STRIPES on face - characteristic badger markings
    // White stripe #1 (top)
    ctx.fillStyle = '#EEEEEE';
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.quadraticCurveTo(4, 8, 8, 8);
    ctx.quadraticCurveTo(12, 8, 16, 10);
    ctx.lineTo(16, 12);
    ctx.quadraticCurveTo(12, 10, 8, 10);
    ctx.quadraticCurveTo(4, 10, 0, 12);
    ctx.fill();

    // Black stripe #1 (through eye area)
    ctx.fillStyle = '#111111';
    ctx.beginPath();
    ctx.moveTo(0, 12);
    ctx.quadraticCurveTo(4, 11, 8, 11);
    ctx.quadraticCurveTo(12, 11, 16, 12);
    ctx.lineTo(16, 16);
    ctx.quadraticCurveTo(12, 15, 8, 15);
    ctx.quadraticCurveTo(4, 15, 0, 16);
    ctx.fill();

    // White stripe #2 (bottom, through cheeks)
    ctx.fillStyle = '#EEEEEE';
    ctx.beginPath();
    ctx.moveTo(0, 16);
    ctx.quadraticCurveTo(4, 16, 8, 16);
    ctx.quadraticCurveTo(12, 16, 16, 16);
    ctx.lineTo(16, 19);
    ctx.quadraticCurveTo(12, 18, 8, 18);
    ctx.quadraticCurveTo(4, 18, 0, 19);
    ctx.fill();

    // Snout
    ctx.fillStyle = '#444444';
    ctx.beginPath();
    ctx.ellipse(1, 17, 3, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Black nose
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.arc(0, 17, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Eyes (in the black stripe)
    this._drawEye(ctx, 4, 13, 1.5, '#332211');
    this._drawEye(ctx, 12, 13, 1.3, '#332211');

    // Small rounded ears
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.arc(4, 8, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(12, 8, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Short bushy tail
    ctx.fillStyle = '#444444';
    ctx.beginPath();
    ctx.ellipse(42, 16, 4, 3, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#555555';
    ctx.beginPath();
    ctx.ellipse(43, 15, 2.5, 2, 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  _drawBadgerLeg(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    // Short stocky legs
    ctx.fillStyle = '#2A2A2A';
    ctx.fillRect(x, y, 5, 5);
    ctx.fillStyle = '#222222';
    ctx.fillRect(x, y + 4, 5, 3);
    // Big clawed paws
    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(x - 1, y + 6, 6, 3);
    // Claws
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(x - 1, y + 8);
    ctx.lineTo(x - 2, y + 10);
    ctx.moveTo(x + 1, y + 8);
    ctx.lineTo(x + 1, y + 10);
    ctx.moveTo(x + 3, y + 8);
    ctx.lineTo(x + 4, y + 10);
    ctx.stroke();
  }

  _generateBadgerFrames(): void {
    // 5-frame walk cycle
    const legFrames = [
      { fl: 23, fr: 29, bl: 29, br: 23 },  // frame 0: left legs forward
      { fl: 25, fr: 28, bl: 28, br: 25 },  // frame 1: transition
      { fl: 26, fr: 26, bl: 26, br: 26 },  // frame 2: neutral
      { fl: 29, fr: 23, bl: 23, br: 29 },  // frame 3: right legs forward
      { fl: 28, fr: 25, bl: 25, br: 28 },  // frame 4: transition back
    ];

    legFrames.forEach(({ fl, fr, bl, br }, i) => {
      this._ct(`badger_walk_${i}`, 50, 36, (ctx) => {
        // Back legs (drawn first)
        this._drawBadgerLeg(ctx, 30, bl);
        this._drawBadgerLeg(ctx, 36, br);
        // Front legs
        this._drawBadgerLeg(ctx, 12, fl);
        this._drawBadgerLeg(ctx, 18, fr);

        this._drawBadgerBody(ctx);
      });
    });

    // Death frame
    this._ct('badger_dead_0', 50, 36, (ctx) => {
      // Shadow underneath
      this._drawShadow(ctx, 25, 30, 18, 4);

      ctx.save();
      ctx.translate(25, 24);
      ctx.rotate(Math.PI / 2);
      ctx.translate(-25, -24);

      // Body on its side
      const bg = ctx.createRadialGradient(26, 20, 3, 26, 20, 14);
      bg.addColorStop(0, '#555555');
      bg.addColorStop(1, '#333333');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(26, 20, 14, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = '#444';
      ctx.beginPath();
      ctx.ellipse(12, 18, 7, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // White face stripes (simplified for side view)
      ctx.fillStyle = '#EEE';
      ctx.beginPath();
      ctx.moveTo(5, 14);
      ctx.quadraticCurveTo(8, 13, 12, 13);
      ctx.lineTo(12, 15);
      ctx.quadraticCurveTo(8, 15, 5, 16);
      ctx.fill();

      // Black stripe through eye
      ctx.fillStyle = '#111';
      ctx.beginPath();
      ctx.moveTo(5, 16);
      ctx.quadraticCurveTo(8, 15.5, 12, 16);
      ctx.lineTo(12, 19);
      ctx.quadraticCurveTo(8, 18.5, 5, 19);
      ctx.fill();

      // White lower stripe
      ctx.fillStyle = '#EEE';
      ctx.beginPath();
      ctx.moveTo(5, 19);
      ctx.quadraticCurveTo(8, 19, 12, 19);
      ctx.lineTo(12, 21);
      ctx.quadraticCurveTo(8, 21, 5, 21);
      ctx.fill();

      // X eyes
      this._drawXEye(ctx, 8, 17, 1.8);
      this._drawXEye(ctx, 14, 17, 1.5);

      // Black nose
      ctx.fillStyle = '#111';
      ctx.beginPath();
      ctx.arc(5, 20, 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Limp legs with claws
      ctx.fillStyle = '#2A2A2A';
      ctx.fillRect(18, 26, 4, 6);
      ctx.fillRect(24, 27, 4, 5);
      ctx.fillRect(30, 26, 4, 6);
      ctx.fillRect(35, 27, 4, 5);

      // Short tail
      ctx.fillStyle = '#444';
      ctx.beginPath();
      ctx.ellipse(40, 18, 3, 2.5, 0.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });
  }
}
