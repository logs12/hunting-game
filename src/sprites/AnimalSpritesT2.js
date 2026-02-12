import { SpriteFactory } from './SpriteFactory.js';

const ANIMAL_SCALE = 0.62;

export class AnimalSpritesT2 extends SpriteFactory {
  _ct(key, w, h, drawFn) {
    this.createTexture(key, w, h, drawFn, ANIMAL_SCALE);
  }

  generate() {
    this._generateRaccoonFrames();
    this._generateDuckFrames();
    this._generateCrowFrames();
    this._generateHareFrames();
    this._generateTurkeyFrames();
    this._generateBadgerFrames();
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

  // ===================== RACCOON (52x40, 3 frames, ground) =====================

  _drawRaccoonBody(ctx) {
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

  _generateRaccoonFrames() {
    const frames = [
      [30, 30, 30, 30],
      [28, 32, 32, 28],
      [32, 28, 28, 32],
    ];

    frames.forEach((legYs, i) => {
      this._ct(`raccoon_walk_${i}`, 52, 40, (ctx) => {
        const xPositions = [14, 20, 30, 36];
        legYs.forEach((ly, idx) => {
          ctx.fillStyle = '#605848';
          ctx.fillRect(xPositions[idx], ly, 4, 5);
          ctx.fillStyle = '#504840';
          ctx.fillRect(xPositions[idx], ly + 4, 4, 4);
          // Dark paws
          ctx.fillStyle = '#222';
          ctx.fillRect(xPositions[idx] - 1, ly + 7, 5, 2);
        });
        this._drawRaccoonBody(ctx);
      });
    });
  }

  // ===================== DUCK (44x30, 3 frames, flying) =====================

  _drawDuckBody(ctx) {
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

  _generateDuckFrames() {
    // Wing flap positions
    const wingData = [
      { upY: 6, downY: 24 },   // level
      { upY: 0, downY: 18 },   // wings up
      { upY: 10, downY: 30 },  // wings down
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
  }

  // ===================== CROW (40x28, 3 frames, flying) =====================

  _drawCrowBody(ctx) {
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

  _generateCrowFrames() {
    const wingData = [
      { upY: 4, downY: 22 },   // level
      { upY: -2, downY: 16 },  // wings up
      { upY: 8, downY: 28 },   // wings down
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
  }

  // ===================== HARE (50x40, 3 frames, ground) =====================

  _drawHareBody(ctx) {
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

  _generateHareFrames() {
    // Running animation: extended stride
    const legSets = [
      { fl: 28, fr: 28, bl: 26, br: 26, bodyOff: 0 },   // neutral stance
      { fl: 26, fr: 30, bl: 30, br: 24, bodyOff: -2 },   // stride out
      { fl: 30, fr: 26, bl: 24, br: 30, bodyOff: 1 },    // stride back
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
  }

  // ===================== TURKEY (56x48, 3 frames, ground) =====================

  _drawTurkeyBody(ctx) {
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

    // Eye
    this._drawEye(ctx, 8, 9, 1.5, '#442200');
  }

  _generateTurkeyFrames() {
    const frames = [
      [38, 38, 38, 38],
      [36, 40, 40, 36],
      [40, 36, 36, 40],
    ];

    frames.forEach((legYs, i) => {
      this._ct(`turkey_walk_${i}`, 56, 48, (ctx) => {
        const xPositions = [18, 24, 32, 38];
        legYs.forEach((ly, idx) => {
          // Thick legs
          ctx.fillStyle = '#886655';
          ctx.fillRect(xPositions[idx], ly, 4, 4);
          // Scaly lower leg
          ctx.fillStyle = '#998866';
          ctx.fillRect(xPositions[idx], ly + 3, 4, 4);
          // Feet with toes
          ctx.strokeStyle = '#886655';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(xPositions[idx], ly + 7);
          ctx.lineTo(xPositions[idx] - 2, ly + 9);
          ctx.moveTo(xPositions[idx] + 2, ly + 7);
          ctx.lineTo(xPositions[idx] + 2, ly + 9);
          ctx.moveTo(xPositions[idx] + 4, ly + 7);
          ctx.lineTo(xPositions[idx] + 6, ly + 9);
          ctx.stroke();
        });
        this._drawTurkeyBody(ctx);
      });
    });
  }

  // ===================== BADGER (50x36, 3 frames, ground) =====================

  _drawBadgerBody(ctx) {
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

  _generateBadgerFrames() {
    const frames = [
      [26, 26, 26, 26],
      [24, 28, 28, 24],
      [28, 24, 24, 28],
    ];

    frames.forEach((legYs, i) => {
      this._ct(`badger_walk_${i}`, 50, 36, (ctx) => {
        const xPositions = [12, 18, 30, 36];
        legYs.forEach((ly, idx) => {
          // Short stocky legs
          ctx.fillStyle = '#2A2A2A';
          ctx.fillRect(xPositions[idx], ly, 5, 5);
          ctx.fillStyle = '#222222';
          ctx.fillRect(xPositions[idx], ly + 4, 5, 3);
          // Big clawed paws
          ctx.fillStyle = '#1A1A1A';
          ctx.fillRect(xPositions[idx] - 1, ly + 6, 6, 3);
          // Claws
          ctx.strokeStyle = '#999';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(xPositions[idx] - 1, ly + 8);
          ctx.lineTo(xPositions[idx] - 2, ly + 10);
          ctx.moveTo(xPositions[idx] + 1, ly + 8);
          ctx.lineTo(xPositions[idx] + 1, ly + 10);
          ctx.moveTo(xPositions[idx] + 3, ly + 8);
          ctx.lineTo(xPositions[idx] + 4, ly + 10);
          ctx.stroke();
        });
        this._drawBadgerBody(ctx);
      });
    });
  }
}
