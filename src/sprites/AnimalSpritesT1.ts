import { SpriteFactory } from './SpriteFactory';

const ANIMAL_SCALE = 0.62;

export class AnimalSpritesT1 extends SpriteFactory {
  _ct(key: string, w: number, h: number, drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number) => void): void {
    this.createTexture(key, w, h, drawFn, ANIMAL_SCALE);
  }

  generate(): void {
    this._generateSparrowFrames();
    this._generateMouseFrames();
    this._generateFrogFrames();
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
    ctx.lineWidth = 1.2;
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

  // ===================== SPARROW (30x24, 5 walk + 1 dead, flying) =====================

  _drawSparrowBody(ctx: CanvasRenderingContext2D): void {
    // Body - brown with lighter breast
    const bg = ctx.createRadialGradient(14, 13, 2, 14, 13, 9);
    bg.addColorStop(0, '#C4956A');
    bg.addColorStop(1, '#8B6340');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(14, 13, 9, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Feather texture strokes on body
    ctx.strokeStyle = 'rgba(90,50,20,0.25)';
    ctx.lineWidth = 0.4;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(10 + i * 2.5, 10);
      ctx.quadraticCurveTo(11 + i * 2.5, 13, 10 + i * 2.5, 16);
      ctx.stroke();
    }

    // Lighter breast (front/bottom)
    const breast = ctx.createRadialGradient(10, 15, 1, 10, 15, 5);
    breast.addColorStop(0, '#E8D5B8');
    breast.addColorStop(1, '#C4A882');
    ctx.fillStyle = breast;
    ctx.beginPath();
    ctx.ellipse(10, 15, 5, 4, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Head - darker brown cap
    const hg = ctx.createRadialGradient(6, 9, 1, 6, 9, 5);
    hg.addColorStop(0, '#8B6340');
    hg.addColorStop(1, '#6B4320');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.arc(6, 9, 5, 0, Math.PI * 2);
    ctx.fill();

    // Brown cap on top of head
    ctx.fillStyle = '#6B4320';
    ctx.beginPath();
    ctx.arc(6, 7, 4, Math.PI, Math.PI * 2);
    ctx.fill();

    // Beak - yellow, small, pointing left
    ctx.fillStyle = '#E8B830';
    ctx.beginPath();
    ctx.moveTo(1, 10);
    ctx.lineTo(0, 9);
    ctx.lineTo(3, 9);
    ctx.lineTo(3, 11);
    ctx.fill();

    // Eye
    this._drawEye(ctx, 4, 8, 1.2, '#221100');

    // Dark patch near eye (cheek)
    ctx.fillStyle = '#443322';
    ctx.beginPath();
    ctx.ellipse(5, 11, 2, 1.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tail - small forked tail
    ctx.fillStyle = '#6B4320';
    ctx.beginPath();
    ctx.moveTo(23, 11);
    ctx.lineTo(30, 8);
    ctx.lineTo(28, 12);
    ctx.lineTo(30, 15);
    ctx.lineTo(23, 14);
    ctx.fill();

    // Tail feather lines
    ctx.strokeStyle = '#4A2A10';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(24, 12);
    ctx.lineTo(29, 9);
    ctx.moveTo(24, 13);
    ctx.lineTo(29, 14);
    ctx.stroke();
  }

  _generateSparrowFrames(): void {
    // 5-frame wing cycle:
    // 0=level, 1=halfway up, 2=fully up, 3=halfway down, 4=fully down
    const wingData = [
      { upY: 6, downY: 18 },   // Frame 0: wings level
      { upY: 3, downY: 15 },   // Frame 1: wings halfway up
      { upY: 0, downY: 12 },   // Frame 2: wings fully up
      { upY: 8, downY: 20 },   // Frame 3: wings halfway down
      { upY: 11, downY: 23 },  // Frame 4: wings fully down
    ];

    wingData.forEach(({ upY, downY }, i) => {
      this._ct(`sparrow_walk_${i}`, 30, 24, (ctx) => {
        // Shadow under the bird
        this._drawShadow(ctx, 14, 22, 8, 2);

        // Upper wing
        ctx.fillStyle = '#7B5330';
        ctx.beginPath();
        ctx.moveTo(10, 11);
        ctx.quadraticCurveTo(18, upY, 24, upY + 1);
        ctx.lineTo(22, 12);
        ctx.fill();

        // Lower wing
        ctx.beginPath();
        ctx.moveTo(10, 14);
        ctx.quadraticCurveTo(18, downY, 24, downY - 1);
        ctx.lineTo(22, 14);
        ctx.fill();

        // Wing feather details - more strokes for detail
        ctx.strokeStyle = '#5A3A18';
        ctx.lineWidth = 0.4;
        for (let f = 0; f < 4; f++) {
          ctx.beginPath();
          ctx.moveTo(11 + f * 3, 12);
          ctx.lineTo(14 + f * 3, upY + 1 + f * 0.3);
          ctx.stroke();
        }
        // Lower wing feather lines
        for (let f = 0; f < 3; f++) {
          ctx.beginPath();
          ctx.moveTo(12 + f * 3, 14);
          ctx.lineTo(15 + f * 3, downY - 1 - f * 0.3);
          ctx.stroke();
        }

        // Body on top
        this._drawSparrowBody(ctx);

        // Feet (small, tucked under body)
        ctx.strokeStyle = '#997744';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(10, 18);
        ctx.lineTo(9, 21);
        ctx.moveTo(14, 18);
        ctx.lineTo(13, 21);
        ctx.stroke();
      });
    });

    // Death frame
    this._ct('sparrow_dead_0', 30, 24, (ctx) => {
      // Shadow on ground
      this._drawShadow(ctx, 15, 20, 10, 3);

      ctx.save();
      // Rotate body onto its side — bird lying on back
      ctx.translate(15, 14);
      ctx.rotate(Math.PI * 0.55);
      ctx.translate(-15, -14);

      // Body
      const bg = ctx.createRadialGradient(14, 13, 2, 14, 13, 9);
      bg.addColorStop(0, '#C4956A');
      bg.addColorStop(1, '#8B6340');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(14, 13, 9, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Breast
      ctx.fillStyle = '#D8C5A8';
      ctx.beginPath();
      ctx.ellipse(10, 15, 5, 4, -0.2, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = '#7B5330';
      ctx.beginPath();
      ctx.arc(6, 9, 5, 0, Math.PI * 2);
      ctx.fill();

      // Beak hanging open
      ctx.fillStyle = '#E8B830';
      ctx.beginPath();
      ctx.moveTo(1, 10);
      ctx.lineTo(-1, 8);
      ctx.lineTo(3, 9);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(1, 10);
      ctx.lineTo(-1, 12);
      ctx.lineTo(3, 11);
      ctx.fill();

      // X eyes
      this._drawXEye(ctx, 4, 8, 1.5);

      // Tail limp
      ctx.fillStyle = '#6B4320';
      ctx.beginPath();
      ctx.moveTo(23, 11);
      ctx.lineTo(29, 10);
      ctx.lineTo(28, 13);
      ctx.lineTo(29, 16);
      ctx.lineTo(23, 14);
      ctx.fill();

      // Wings limp - drooping down
      ctx.fillStyle = '#7B5330';
      ctx.beginPath();
      ctx.moveTo(10, 11);
      ctx.quadraticCurveTo(16, 4, 22, 5);
      ctx.lineTo(20, 12);
      ctx.fill();

      // Limp feet sticking up
      ctx.strokeStyle = '#997744';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(10, 18);
      ctx.lineTo(8, 22);
      ctx.lineTo(6, 21);
      ctx.moveTo(14, 18);
      ctx.lineTo(12, 22);
      ctx.lineTo(10, 21);
      ctx.stroke();

      ctx.restore();
    });
  }

  // ===================== MOUSE (28x18, 5 walk + 1 dead, ground) =====================

  _drawMouseBody(ctx: CanvasRenderingContext2D): void {
    // Body - round grey
    const bg = ctx.createRadialGradient(14, 10, 2, 14, 10, 8);
    bg.addColorStop(0, '#BBBBC0');
    bg.addColorStop(1, '#8A8A90');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(14, 10, 8, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Fur texture strokes
    ctx.strokeStyle = 'rgba(100,100,105,0.3)';
    ctx.lineWidth = 0.3;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(8 + i * 2, 7);
      ctx.quadraticCurveTo(9 + i * 2, 10, 8 + i * 2, 13);
      ctx.stroke();
    }

    // Lighter belly
    ctx.fillStyle = '#D0D0D5';
    ctx.beginPath();
    ctx.ellipse(13, 13, 6, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head
    const hg = ctx.createRadialGradient(6, 8, 1, 6, 8, 5);
    hg.addColorStop(0, '#C0C0C5');
    hg.addColorStop(1, '#999A9F');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.ellipse(6, 8, 5, 4, -0.1, 0, Math.PI * 2);
    ctx.fill();

    // Snout
    ctx.fillStyle = '#AAAAAF';
    ctx.beginPath();
    ctx.ellipse(2, 9, 3, 2.5, -0.1, 0, Math.PI * 2);
    ctx.fill();

    // Pink nose
    ctx.fillStyle = '#FF9999';
    ctx.beginPath();
    ctx.arc(0, 9, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Whiskers
    ctx.strokeStyle = 'rgba(80,80,80,0.5)';
    ctx.lineWidth = 0.3;
    ctx.beginPath();
    ctx.moveTo(1, 9);
    ctx.lineTo(-3, 7);
    ctx.moveTo(1, 10);
    ctx.lineTo(-3, 10);
    ctx.moveTo(1, 10);
    ctx.lineTo(-3, 12);
    ctx.stroke();

    // Big round ears
    ctx.fillStyle = '#999A9F';
    ctx.beginPath();
    ctx.arc(4, 3, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(9, 3, 3.5, 0, Math.PI * 2);
    ctx.fill();
    // Inner ear pink
    ctx.fillStyle = '#EEBB99';
    ctx.beginPath();
    ctx.arc(4, 3, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(9, 3, 2, 0, Math.PI * 2);
    ctx.fill();

    // Eye
    this._drawEye(ctx, 4, 7, 1, '#111');

    // Long thin tail
    ctx.strokeStyle = '#CC9999';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(22, 9);
    ctx.quadraticCurveTo(25, 6, 28, 3);
    ctx.stroke();
  }

  _generateMouseFrames(): void {
    // 5-frame walk cycle:
    // 0: left legs forward, right legs back
    // 1: transition — legs passing center
    // 2: neutral stance
    // 3: right legs forward, left legs back
    // 4: transition — legs passing (opposite of frame 1)
    const legSets = [
      { fl: 12, fr: 15, bl: 15, br: 12 },   // Frame 0: left forward, right back
      { fl: 13, fr: 14, bl: 14, br: 13 },   // Frame 1: transition passing center
      { fl: 14, fr: 14, bl: 14, br: 14 },   // Frame 2: neutral stance
      { fl: 15, fr: 12, bl: 12, br: 15 },   // Frame 3: right forward, left back
      { fl: 14, fr: 13, bl: 13, br: 14 },   // Frame 4: transition (opposite)
    ];

    legSets.forEach((legs, i) => {
      this._ct(`mouse_walk_${i}`, 28, 18, (ctx) => {
        // Shadow under mouse
        this._drawShadow(ctx, 13, 17, 9, 1.5);

        // Legs
        ctx.fillStyle = '#CCAAAA';
        // Front legs
        ctx.fillRect(7, legs.fl, 2, 4);
        ctx.fillRect(10, legs.fr, 2, 4);
        // Back legs (slightly thicker)
        ctx.fillRect(16, legs.bl, 2, 4);
        ctx.fillRect(19, legs.br, 2, 4);

        // Tiny paws
        ctx.fillStyle = '#DDBBBB';
        ctx.beginPath();
        ctx.ellipse(8, legs.fl + 3.5, 1.5, 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(11, legs.fr + 3.5, 1.5, 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(17, legs.bl + 3.5, 1.5, 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(20, legs.br + 3.5, 1.5, 0.8, 0, 0, Math.PI * 2);
        ctx.fill();

        this._drawMouseBody(ctx);
      });
    });

    // Death frame
    this._ct('mouse_dead_0', 28, 18, (ctx) => {
      // Shadow
      this._drawShadow(ctx, 14, 16, 10, 2);

      ctx.save();
      // Flip on its side (back)
      ctx.translate(14, 10);
      ctx.scale(1, -1);
      ctx.translate(-14, -10);

      // Body upside down
      const bg = ctx.createRadialGradient(14, 10, 2, 14, 10, 8);
      bg.addColorStop(0, '#BBBBC0');
      bg.addColorStop(1, '#8A8A90');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(14, 10, 8, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Belly (now on top since flipped)
      ctx.fillStyle = '#D0D0D5';
      ctx.beginPath();
      ctx.ellipse(13, 13, 6, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Fur strokes
      ctx.strokeStyle = 'rgba(100,100,105,0.3)';
      ctx.lineWidth = 0.3;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(8 + i * 2.5, 7);
        ctx.lineTo(9 + i * 2.5, 13);
        ctx.stroke();
      }

      // Head
      ctx.fillStyle = '#AAAAAF';
      ctx.beginPath();
      ctx.ellipse(6, 8, 5, 4, -0.1, 0, Math.PI * 2);
      ctx.fill();

      // Snout
      ctx.fillStyle = '#AAAAAF';
      ctx.beginPath();
      ctx.ellipse(2, 9, 3, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Nose
      ctx.fillStyle = '#FF9999';
      ctx.beginPath();
      ctx.arc(0, 9, 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Ears
      ctx.fillStyle = '#999A9F';
      ctx.beginPath();
      ctx.arc(4, 3, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(9, 3, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#EEBB99';
      ctx.beginPath();
      ctx.arc(4, 3, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(9, 3, 2, 0, Math.PI * 2);
      ctx.fill();

      // Limp legs sticking up
      ctx.fillStyle = '#CCAAAA';
      ctx.save();
      ctx.translate(8, 14);
      ctx.rotate(0.3);
      ctx.fillRect(0, 0, 2, 4);
      ctx.restore();
      ctx.save();
      ctx.translate(11, 14);
      ctx.rotate(-0.2);
      ctx.fillRect(0, 0, 2, 4);
      ctx.restore();
      ctx.save();
      ctx.translate(17, 14);
      ctx.rotate(0.2);
      ctx.fillRect(0, 0, 2, 4);
      ctx.restore();
      ctx.save();
      ctx.translate(19, 14);
      ctx.rotate(-0.3);
      ctx.fillRect(0, 0, 2, 4);
      ctx.restore();

      // Tail limp
      ctx.strokeStyle = '#CC9999';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(22, 9);
      ctx.quadraticCurveTo(26, 12, 28, 14);
      ctx.stroke();

      ctx.restore();

      // X eyes (drawn after restore so they're right-side-up on top)
      this._drawXEye(ctx, 4, 5, 1.2);

      // Whiskers drooping
      ctx.strokeStyle = 'rgba(80,80,80,0.4)';
      ctx.lineWidth = 0.3;
      ctx.beginPath();
      ctx.moveTo(1, 3);
      ctx.lineTo(-2, 2);
      ctx.moveTo(1, 3);
      ctx.lineTo(-2, 4);
      ctx.moveTo(1, 4);
      ctx.lineTo(-2, 6);
      ctx.stroke();
    });
  }

  // ===================== FROG (30x26, 5 walk + 1 dead, ground) =====================

  _drawFrogBody(ctx: CanvasRenderingContext2D, bodyOffY: number): void {
    // Body - green rounded
    const bg = ctx.createRadialGradient(15, 14 + bodyOffY, 2, 15, 14 + bodyOffY, 10);
    bg.addColorStop(0, '#55BB44');
    bg.addColorStop(1, '#338822');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(15, 14 + bodyOffY, 10, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lighter belly
    ctx.fillStyle = '#99DD88';
    ctx.beginPath();
    ctx.ellipse(14, 18 + bodyOffY, 8, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Spots on back
    ctx.fillStyle = '#2A7718';
    ctx.beginPath();
    ctx.arc(13, 12 + bodyOffY, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(18, 11 + bodyOffY, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(16, 14 + bodyOffY, 1.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(20, 13 + bodyOffY, 1, 0, Math.PI * 2);
    ctx.fill();

    // Head - slightly forward
    const hg = ctx.createRadialGradient(7, 10 + bodyOffY, 1, 7, 10 + bodyOffY, 6);
    hg.addColorStop(0, '#66CC55');
    hg.addColorStop(1, '#44AA33');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.ellipse(7, 11 + bodyOffY, 6, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Wide mouth line
    ctx.strokeStyle = '#2A6618';
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.moveTo(1, 13 + bodyOffY);
    ctx.quadraticCurveTo(7, 16 + bodyOffY, 12, 13 + bodyOffY);
    ctx.stroke();

    // Bulging eyes - on top of head
    // Left eye (closer to viewer)
    ctx.fillStyle = '#EEEE44';
    ctx.beginPath();
    ctx.arc(4, 6 + bodyOffY, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.ellipse(4, 6 + bodyOffY, 1.2, 2.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(3.3, 5 + bodyOffY, 0.6, 0, Math.PI * 2);
    ctx.fill();

    // Right eye (further)
    ctx.fillStyle = '#DDDD33';
    ctx.beginPath();
    ctx.arc(10, 5 + bodyOffY, 3.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.ellipse(10, 5 + bodyOffY, 1.1, 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(9.3, 4 + bodyOffY, 0.5, 0, Math.PI * 2);
    ctx.fill();

    // Eye ridges
    ctx.fillStyle = '#44AA33';
    ctx.beginPath();
    ctx.ellipse(4, 7.5 + bodyOffY, 4, 1.5, 0, 0, Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(10, 6.5 + bodyOffY, 3.5, 1.5, 0, 0, Math.PI);
    ctx.fill();

    // Nostril dots
    ctx.fillStyle = '#2A6618';
    ctx.beginPath();
    ctx.arc(2, 10 + bodyOffY, 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(4, 9.5 + bodyOffY, 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  _drawFrogWebbedFoot(ctx: CanvasRenderingContext2D, x: number, y: number, spread: number, flipX: boolean): void {
    const sx = flipX ? -1 : 1;
    ctx.fillStyle = '#55BB44';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 2 * sx, y + 2 * spread);
    ctx.lineTo(x + 1 * sx, y + 1.5 * spread);
    ctx.lineTo(x + 3 * sx, y + 2.5 * spread);
    ctx.lineTo(x + 2 * sx, y + 0.5 * spread);
    ctx.fill();
    // Webbing lines
    ctx.strokeStyle = '#339922';
    ctx.lineWidth = 0.3;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 1 * sx, y + 1.8 * spread);
    ctx.moveTo(x, y);
    ctx.lineTo(x + 2 * sx, y + 2 * spread);
    ctx.stroke();
  }

  _generateFrogFrames(): void {
    // 5-frame hop cycle:
    // 0: crouched, back legs tucked
    // 1: pushing off — back legs extending
    // 2: mid-leap — body up, legs extended
    // 3: descending — legs tucking forward
    // 4: landing — front legs absorbing

    // Frame 0: Crouched - back legs tucked, body low
    this._ct('frog_walk_0', 30, 26, (ctx) => {
      const bodyOff = 2;

      // Shadow
      this._drawShadow(ctx, 14, 24, 10, 2);

      // Back legs - tucked tightly (bent, Z-shape)
      ctx.fillStyle = '#338822';
      ctx.beginPath();
      ctx.ellipse(22, 16 + bodyOff, 4, 3, 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#44AA33';
      ctx.beginPath();
      ctx.ellipse(20, 19 + bodyOff, 3, 2.5, -0.3, 0, Math.PI * 2);
      ctx.fill();
      this._drawFrogWebbedFoot(ctx, 18, 22 + bodyOff, 1, false);

      // Front legs - short, planted firmly
      ctx.fillStyle = '#44AA33';
      ctx.fillRect(6, 18 + bodyOff, 2, 4);
      ctx.fillRect(10, 18 + bodyOff, 2, 4);
      this._drawFrogWebbedFoot(ctx, 6, 22 + bodyOff, 0.8, false);
      this._drawFrogWebbedFoot(ctx, 10, 22 + bodyOff, 0.8, false);

      this._drawFrogBody(ctx, bodyOff);
    });

    // Frame 1: Pushing off - back legs starting to extend
    this._ct('frog_walk_1', 30, 26, (ctx) => {
      const bodyOff = 0;

      this._drawShadow(ctx, 14, 24, 9, 1.8);

      // Back legs - partially extended, pushing
      ctx.fillStyle = '#338822';
      ctx.beginPath();
      ctx.ellipse(23, 14 + bodyOff, 4.5, 2.8, 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#44AA33';
      ctx.beginPath();
      ctx.ellipse(25, 18 + bodyOff, 3.5, 2.5, 0.4, 0, Math.PI * 2);
      ctx.fill();
      this._drawFrogWebbedFoot(ctx, 24, 20 + bodyOff, 1.2, false);

      // Front legs - starting to lift
      ctx.fillStyle = '#44AA33';
      ctx.save();
      ctx.translate(6, 17 + bodyOff);
      ctx.rotate(-0.2);
      ctx.fillRect(0, 0, 2, 5);
      ctx.restore();
      ctx.save();
      ctx.translate(10, 16 + bodyOff);
      ctx.rotate(-0.2);
      ctx.fillRect(0, 0, 2, 5);
      ctx.restore();
      this._drawFrogWebbedFoot(ctx, 5, 21 + bodyOff, 0.9, false);
      this._drawFrogWebbedFoot(ctx, 9, 20 + bodyOff, 0.9, false);

      this._drawFrogBody(ctx, bodyOff);
    });

    // Frame 2: Mid-leap - body up, all legs extended
    this._ct('frog_walk_2', 30, 26, (ctx) => {
      const bodyOff = -3;

      // Smaller shadow (higher off ground)
      this._drawShadow(ctx, 14, 24, 7, 1.5);

      // Back legs - fully extended back
      ctx.fillStyle = '#338822';
      ctx.beginPath();
      ctx.ellipse(24, 13 + bodyOff, 5, 2.5, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#44AA33';
      ctx.beginPath();
      ctx.ellipse(28, 15 + bodyOff, 4, 2, 0.5, 0, Math.PI * 2);
      ctx.fill();
      this._drawFrogWebbedFoot(ctx, 28, 17 + bodyOff, 1.3, false);

      // Front legs - reaching far forward
      ctx.fillStyle = '#44AA33';
      ctx.save();
      ctx.translate(5, 15 + bodyOff);
      ctx.rotate(-0.5);
      ctx.fillRect(0, 0, 2, 6);
      ctx.restore();
      ctx.save();
      ctx.translate(9, 14 + bodyOff);
      ctx.rotate(-0.5);
      ctx.fillRect(0, 0, 2, 6);
      ctx.restore();
      this._drawFrogWebbedFoot(ctx, 2, 19 + bodyOff, 1.0, false);
      this._drawFrogWebbedFoot(ctx, 6, 18 + bodyOff, 1.0, false);

      this._drawFrogBody(ctx, bodyOff);
    });

    // Frame 3: Descending - legs tucking forward
    this._ct('frog_walk_3', 30, 26, (ctx) => {
      const bodyOff = -1;

      this._drawShadow(ctx, 14, 24, 8, 1.8);

      // Back legs - coming forward, partially bent
      ctx.fillStyle = '#338822';
      ctx.beginPath();
      ctx.ellipse(21, 14 + bodyOff, 4, 3, 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#44AA33';
      ctx.beginPath();
      ctx.ellipse(22, 18 + bodyOff, 3, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
      this._drawFrogWebbedFoot(ctx, 21, 20 + bodyOff, 1.1, false);

      // Front legs - reaching down toward ground
      ctx.fillStyle = '#44AA33';
      ctx.save();
      ctx.translate(6, 16 + bodyOff);
      ctx.rotate(-0.15);
      ctx.fillRect(0, 0, 2, 6);
      ctx.restore();
      ctx.save();
      ctx.translate(10, 16 + bodyOff);
      ctx.rotate(-0.15);
      ctx.fillRect(0, 0, 2, 6);
      ctx.restore();
      this._drawFrogWebbedFoot(ctx, 5, 22 + bodyOff, 0.9, false);
      this._drawFrogWebbedFoot(ctx, 9, 22 + bodyOff, 0.9, false);

      this._drawFrogBody(ctx, bodyOff);
    });

    // Frame 4: Landing - front legs absorbing impact, back legs forward
    this._ct('frog_walk_4', 30, 26, (ctx) => {
      const bodyOff = 1;

      this._drawShadow(ctx, 14, 24, 10, 2);

      // Back legs - forward, partially bent, coming under body
      ctx.fillStyle = '#338822';
      ctx.beginPath();
      ctx.ellipse(20, 15 + bodyOff, 4, 3, 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#44AA33';
      ctx.beginPath();
      ctx.ellipse(22, 19 + bodyOff, 3, 2.5, 0.2, 0, Math.PI * 2);
      ctx.fill();
      this._drawFrogWebbedFoot(ctx, 20, 21 + bodyOff, 1.2, false);

      // Front legs - splayed wide, absorbing landing
      ctx.fillStyle = '#44AA33';
      ctx.fillRect(5, 17 + bodyOff, 2, 5);
      ctx.fillRect(10, 17 + bodyOff, 2, 5);
      // Splayed front feet - wide spread
      this._drawFrogWebbedFoot(ctx, 4, 22 + bodyOff, 1.3, true);
      this._drawFrogWebbedFoot(ctx, 11, 22 + bodyOff, 1.3, false);

      this._drawFrogBody(ctx, bodyOff);
    });

    // Death frame
    this._ct('frog_dead_0', 30, 26, (ctx) => {
      // Shadow
      this._drawShadow(ctx, 15, 22, 11, 3);

      ctx.save();
      // Frog on its back
      ctx.translate(15, 13);
      ctx.scale(1, -1);
      ctx.translate(-15, -13);

      // Body upside-down (belly now visible on top)
      const bg = ctx.createRadialGradient(15, 14, 2, 15, 14, 10);
      bg.addColorStop(0, '#55BB44');
      bg.addColorStop(1, '#338822');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(15, 14, 10, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Belly (on top since flipped)
      ctx.fillStyle = '#AAEE99';
      ctx.beginPath();
      ctx.ellipse(14, 18, 8, 3.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Spots
      ctx.fillStyle = '#2A7718';
      ctx.beginPath();
      ctx.arc(13, 12, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(18, 11, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = '#44AA33';
      ctx.beginPath();
      ctx.ellipse(7, 11, 6, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Limp legs sticking up
      ctx.fillStyle = '#44AA33';
      // Back legs limp
      ctx.save();
      ctx.translate(22, 14);
      ctx.rotate(0.4);
      ctx.beginPath();
      ctx.ellipse(0, 0, 4, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(3, 4, 3, 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      // Front legs limp
      ctx.save();
      ctx.translate(7, 16);
      ctx.rotate(-0.3);
      ctx.fillRect(0, 0, 2, 5);
      ctx.restore();
      ctx.save();
      ctx.translate(10, 16);
      ctx.rotate(0.3);
      ctx.fillRect(0, 0, 2, 5);
      ctx.restore();

      ctx.restore();

      // Eyes with X marks (drawn after restore so right-side-up)
      // Flattened closed eye bumps
      ctx.fillStyle = '#CCCC33';
      ctx.beginPath();
      ctx.ellipse(4, 6, 3, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(10, 5, 2.8, 2.3, 0, 0, Math.PI * 2);
      ctx.fill();
      this._drawXEye(ctx, 4, 6, 1.8);
      this._drawXEye(ctx, 10, 5, 1.5);

      // Tongue sticking out
      ctx.strokeStyle = '#DD4466';
      ctx.lineWidth = 1.2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(3, 16);
      ctx.quadraticCurveTo(0, 19, -2, 21);
      ctx.stroke();
      // Tongue tip
      ctx.fillStyle = '#DD4466';
      ctx.beginPath();
      ctx.arc(-2, 21, 1, 0, Math.PI * 2);
      ctx.fill();

      // Wide mouth slightly open
      ctx.strokeStyle = '#2A6618';
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(1, 15);
      ctx.quadraticCurveTo(7, 17, 12, 15);
      ctx.stroke();
    });
  }
}
