import { SpriteFactory } from './SpriteFactory.js';

const ANIMAL_SCALE = 0.62;

export class AnimalSpritesT1 extends SpriteFactory {
  _ct(key, w, h, drawFn) {
    this.createTexture(key, w, h, drawFn, ANIMAL_SCALE);
  }

  generate() {
    this._generateSparrowFrames();
    this._generateMouseFrames();
    this._generateFrogFrames();
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

  // ===================== SPARROW (30x24, 3 frames, flying) =====================

  _drawSparrowBody(ctx) {
    // Body - brown with lighter breast
    const bg = ctx.createRadialGradient(14, 13, 2, 14, 13, 9);
    bg.addColorStop(0, '#C4956A');
    bg.addColorStop(1, '#8B6340');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(14, 13, 9, 6, 0, 0, Math.PI * 2);
    ctx.fill();

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

    // Eye - tiny
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

  _generateSparrowFrames() {
    // Wing positions: 0=level, 1=up, 2=down
    const wingData = [
      { upY: 6, downY: 18 },   // level
      { upY: 1, downY: 14 },   // wings up
      { upY: 10, downY: 22 },  // wings down
    ];

    wingData.forEach(({ upY, downY }, i) => {
      this._ct(`sparrow_walk_${i}`, 30, 24, (ctx) => {
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

        // Wing feather details
        ctx.strokeStyle = '#5A3A18';
        ctx.lineWidth = 0.4;
        for (let f = 0; f < 3; f++) {
          ctx.beginPath();
          ctx.moveTo(12 + f * 4, upY + 3 + f * 0.5);
          ctx.lineTo(20 + f * 2, upY + 1 + f * 0.5);
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
  }

  // ===================== MOUSE (28x18, 3 frames, ground) =====================

  _drawMouseBody(ctx) {
    // Body - round grey
    const bg = ctx.createRadialGradient(14, 10, 2, 14, 10, 8);
    bg.addColorStop(0, '#BBBBC0');
    bg.addColorStop(1, '#8A8A90');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(14, 10, 8, 5, 0, 0, Math.PI * 2);
    ctx.fill();

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
    ctx.ellipse(6, 8, 5, 4, -0.1, 0, 0, Math.PI * 2);
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

    // Eye - tiny dark
    this._drawEye(ctx, 4, 7, 1, '#111');

    // Long thin tail
    ctx.strokeStyle = '#CC9999';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(22, 9);
    ctx.quadraticCurveTo(25, 6, 28, 3);
    ctx.stroke();
  }

  _generateMouseFrames() {
    // Leg scramble positions
    const legSets = [
      { fl: 14, fr: 14, bl: 14, br: 14 },  // Frame 0: normal stance
      { fl: 13, fr: 15, bl: 15, br: 13 },   // Frame 1: left forward
      { fl: 15, fr: 13, bl: 13, br: 15 },   // Frame 2: right forward
    ];

    legSets.forEach((legs, i) => {
      this._ct(`mouse_walk_${i}`, 28, 18, (ctx) => {
        // Legs - tiny
        ctx.fillStyle = '#CCAAAA';
        // Front legs
        ctx.fillRect(7, legs.fl, 2, 3);
        ctx.fillRect(10, legs.fr, 2, 3);
        // Back legs
        ctx.fillRect(16, legs.bl, 2, 3);
        ctx.fillRect(19, legs.br, 2, 3);

        // Tiny paws
        ctx.fillStyle = '#DDBBBB';
        ctx.fillRect(7, legs.fl + 2, 2, 1);
        ctx.fillRect(10, legs.fr + 2, 2, 1);
        ctx.fillRect(16, legs.bl + 2, 2, 1);
        ctx.fillRect(19, legs.br + 2, 2, 1);

        this._drawMouseBody(ctx);
      });
    });
  }

  // ===================== FROG (30x26, 3 frames, ground) =====================

  _drawFrogBody(ctx, bodyOffY) {
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
    // Left eye (closer to viewer, facing left)
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

  _generateFrogFrames() {
    // Hop cycle: frame 0 = crouched, frame 1 = mid-leap, frame 2 = landing

    // Frame 0: Crouched - back legs tucked, body low
    this._ct('frog_walk_0', 30, 26, (ctx) => {
      const bodyOff = 2;

      // Back legs - tucked (bent, Z-shape)
      ctx.fillStyle = '#338822';
      // Upper thigh
      ctx.beginPath();
      ctx.ellipse(22, 16 + bodyOff, 4, 3, 0.5, 0, Math.PI * 2);
      ctx.fill();
      // Lower leg (folded back)
      ctx.fillStyle = '#44AA33';
      ctx.beginPath();
      ctx.ellipse(20, 19 + bodyOff, 3, 2.5, -0.3, 0, Math.PI * 2);
      ctx.fill();
      // Webbed foot
      ctx.fillStyle = '#55BB44';
      ctx.beginPath();
      ctx.moveTo(18, 22 + bodyOff);
      ctx.lineTo(16, 24 + bodyOff);
      ctx.lineTo(19, 23 + bodyOff);
      ctx.lineTo(21, 24 + bodyOff);
      ctx.lineTo(20, 22 + bodyOff);
      ctx.fill();

      // Front legs - short, planted
      ctx.fillStyle = '#44AA33';
      ctx.fillRect(6, 18 + bodyOff, 2, 4);
      ctx.fillRect(10, 18 + bodyOff, 2, 4);
      // Front feet
      ctx.fillStyle = '#55BB44';
      ctx.beginPath();
      ctx.moveTo(5, 22 + bodyOff);
      ctx.lineTo(4, 24 + bodyOff);
      ctx.lineTo(8, 23 + bodyOff);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(9, 22 + bodyOff);
      ctx.lineTo(9, 24 + bodyOff);
      ctx.lineTo(13, 23 + bodyOff);
      ctx.fill();

      this._drawFrogBody(ctx, bodyOff);
    });

    // Frame 1: Mid-leap - back legs extended, body up and forward
    this._ct('frog_walk_1', 30, 26, (ctx) => {
      const bodyOff = -2;

      // Back legs - fully extended
      ctx.fillStyle = '#338822';
      // Upper leg stretched back
      ctx.beginPath();
      ctx.ellipse(24, 14 + bodyOff, 5, 2.5, 0.3, 0, Math.PI * 2);
      ctx.fill();
      // Lower leg extended
      ctx.fillStyle = '#44AA33';
      ctx.beginPath();
      ctx.ellipse(28, 16 + bodyOff, 4, 2, 0.5, 0, Math.PI * 2);
      ctx.fill();
      // Webbed foot spread
      ctx.fillStyle = '#55BB44';
      ctx.beginPath();
      ctx.moveTo(28, 18 + bodyOff);
      ctx.lineTo(27, 20 + bodyOff);
      ctx.lineTo(30, 18 + bodyOff);
      ctx.lineTo(30, 20 + bodyOff);
      ctx.fill();

      // Front legs - reaching forward
      ctx.fillStyle = '#44AA33';
      ctx.save();
      ctx.translate(5, 16 + bodyOff);
      ctx.rotate(-0.4);
      ctx.fillRect(0, 0, 2, 5);
      ctx.restore();
      ctx.save();
      ctx.translate(9, 15 + bodyOff);
      ctx.rotate(-0.4);
      ctx.fillRect(0, 0, 2, 5);
      ctx.restore();
      // Front feet
      ctx.fillStyle = '#55BB44';
      ctx.beginPath();
      ctx.moveTo(3, 20 + bodyOff);
      ctx.lineTo(2, 22 + bodyOff);
      ctx.lineTo(6, 20 + bodyOff);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(7, 19 + bodyOff);
      ctx.lineTo(7, 21 + bodyOff);
      ctx.lineTo(11, 19 + bodyOff);
      ctx.fill();

      this._drawFrogBody(ctx, bodyOff);
    });

    // Frame 2: Landing - front legs absorbing, back legs coming forward
    this._ct('frog_walk_2', 30, 26, (ctx) => {
      const bodyOff = 1;

      // Back legs - coming forward, partially bent
      ctx.fillStyle = '#338822';
      ctx.beginPath();
      ctx.ellipse(20, 15 + bodyOff, 4, 3, 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#44AA33';
      ctx.beginPath();
      ctx.ellipse(22, 19 + bodyOff, 3, 2.5, 0.2, 0, Math.PI * 2);
      ctx.fill();
      // Webbed foot
      ctx.fillStyle = '#55BB44';
      ctx.beginPath();
      ctx.moveTo(20, 21 + bodyOff);
      ctx.lineTo(18, 23 + bodyOff);
      ctx.lineTo(21, 22 + bodyOff);
      ctx.lineTo(23, 24 + bodyOff);
      ctx.lineTo(23, 21 + bodyOff);
      ctx.fill();

      // Front legs - splayed, absorbing landing
      ctx.fillStyle = '#44AA33';
      ctx.fillRect(5, 17 + bodyOff, 2, 5);
      ctx.fillRect(10, 17 + bodyOff, 2, 5);
      // Splayed front feet
      ctx.fillStyle = '#55BB44';
      ctx.beginPath();
      ctx.moveTo(3, 22 + bodyOff);
      ctx.lineTo(2, 24 + bodyOff);
      ctx.lineTo(5, 23 + bodyOff);
      ctx.lineTo(7, 24 + bodyOff);
      ctx.lineTo(7, 22 + bodyOff);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(9, 22 + bodyOff);
      ctx.lineTo(8, 24 + bodyOff);
      ctx.lineTo(11, 23 + bodyOff);
      ctx.lineTo(13, 24 + bodyOff);
      ctx.lineTo(12, 22 + bodyOff);
      ctx.fill();

      this._drawFrogBody(ctx, bodyOff);
    });
  }
}
