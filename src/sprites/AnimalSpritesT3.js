import { SpriteFactory } from './SpriteFactory.js';

const ANIMAL_SCALE = 0.62;

export class AnimalSpritesT3 extends SpriteFactory {
  _ct(key, w, h, drawFn) {
    this.createTexture(key, w, h, drawFn, ANIMAL_SCALE);
  }

  generate() {
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

  // ===================== LYNX (56x44, 3 frames) =====================

  _drawLynxBody(ctx) {
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

    // Dark spots on body
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

  _generateLynxFrames() {
    const frames = [
      [32, 32, 32, 32],   // standing
      [30, 34, 34, 30],   // left forward
      [34, 30, 30, 34],   // right forward
    ];

    frames.forEach((legYs, i) => {
      this._ct(`lynx_walk_${i}`, 56, 44, (ctx) => {
        const xPositions = [18, 24, 36, 42];
        // Draw legs behind body
        legYs.forEach((ly, idx) => {
          // Upper leg
          const legGrad = ctx.createLinearGradient(0, ly, 0, ly + 8);
          legGrad.addColorStop(0, '#B8863C');
          legGrad.addColorStop(1, '#A07530');
          ctx.fillStyle = legGrad;
          ctx.fillRect(xPositions[idx], ly, 5, 6);
          // Lower leg
          ctx.fillStyle = '#A07530';
          ctx.fillRect(xPositions[idx] + 1, ly + 5, 4, 5);
          // Paw
          ctx.fillStyle = '#C0A070';
          ctx.fillRect(xPositions[idx] - 1, ly + 9, 6, 3);
        });
        this._drawLynxBody(ctx);
      });
    });
  }

  // ===================== HAWK (52x32, 3 frames) =====================

  _drawHawkBody(ctx) {
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

  _generateHawkFrames() {
    const wingAngles = [
      { upY: 5, downY: 26 },   // wings level
      { upY: -1, downY: 20 },  // wings up
      { upY: 9, downY: 32 },   // wings down
    ];

    wingAngles.forEach(({ upY, downY }, i) => {
      this._ct(`hawk_walk_${i}`, 52, 32, (ctx) => {
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

        this._drawHawkBody(ctx);
      });
    });
  }

  // ===================== COYOTE (60x46, 3 frames) =====================

  _drawCoyoteBody(ctx) {
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

  _generateCoyoteFrames() {
    // Running animation - more stride than walking
    const frames = [
      [34, 34, 34, 34],   // centered
      [30, 38, 38, 30],   // extended stride left
      [38, 30, 30, 38],   // extended stride right
    ];

    frames.forEach((legYs, i) => {
      this._ct(`coyote_walk_${i}`, 60, 46, (ctx) => {
        const xPositions = [20, 28, 38, 46];
        legYs.forEach((ly, idx) => {
          // Upper leg
          const legGrad = ctx.createLinearGradient(0, ly, 0, ly + 7);
          legGrad.addColorStop(0, '#9C8060');
          legGrad.addColorStop(1, '#887050');
          ctx.fillStyle = legGrad;
          ctx.fillRect(xPositions[idx], ly, 5, 5);
          // Lower leg - slender
          ctx.fillStyle = '#887050';
          ctx.fillRect(xPositions[idx] + 1, ly + 4, 4, 5);
          // Paw
          ctx.fillStyle = '#776040';
          ctx.fillRect(xPositions[idx] - 1, ly + 8, 6, 3);
        });
        this._drawCoyoteBody(ctx);
      });
    });
  }

  // ===================== GOOSE (48x34, 3 frames) =====================

  _drawGooseBody(ctx) {
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

  _generateGooseFrames() {
    // Wing flap animation for flying
    const wingAngles = [
      { upY: 8, downY: 28 },    // wings level
      { upY: 1, downY: 22 },    // wings up
      { upY: 12, downY: 34 },   // wings down
    ];

    wingAngles.forEach(({ upY, downY }, i) => {
      this._ct(`goose_walk_${i}`, 48, 34, (ctx) => {
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

        this._drawGooseBody(ctx);
      });
    });
  }

  // ===================== PORCUPINE (48x38, 3 frames) =====================

  _drawPorcupineBody(ctx) {
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

  _generatePorcupineFrames() {
    // Waddling animation - body sways side to side
    const waddle = [
      { bodyOffY: 0, bodyRot: 0 },
      { bodyOffY: 1, bodyRot: 0.03 },
      { bodyOffY: 1, bodyRot: -0.03 },
    ];
    const legFrames = [
      [26, 26, 26, 26],
      [24, 28, 28, 24],
      [28, 24, 24, 28],
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
  }

  // ===================== WOLVERINE (54x40, 3 frames) =====================

  _drawWolverineBody(ctx) {
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

    // Strong paw detail (visible claws when standing)
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 0.8;
  }

  _generateWolverineFrames() {
    const frames = [
      [28, 28, 28, 28],   // standing
      [26, 30, 30, 26],   // walk left
      [30, 26, 26, 30],   // walk right
    ];

    frames.forEach((legYs, i) => {
      this._ct(`wolverine_walk_${i}`, 54, 40, (ctx) => {
        const xPositions = [16, 24, 34, 42];
        legYs.forEach((ly, idx) => {
          // Thick strong legs
          const legGrad = ctx.createLinearGradient(0, ly, 0, ly + 7);
          legGrad.addColorStop(0, '#2A1808');
          legGrad.addColorStop(1, '#1A0C04');
          ctx.fillStyle = legGrad;
          ctx.fillRect(xPositions[idx], ly, 6, 5);
          // Lower leg
          ctx.fillStyle = '#1A0C04';
          ctx.fillRect(xPositions[idx], ly + 4, 6, 4);
          // Strong paw with claws
          ctx.fillStyle = '#2A1808';
          ctx.fillRect(xPositions[idx] - 1, ly + 7, 7, 3);
          // Claws
          ctx.strokeStyle = '#555';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(xPositions[idx] - 1, ly + 10);
          ctx.lineTo(xPositions[idx] - 2, ly + 12);
          ctx.moveTo(xPositions[idx] + 2, ly + 10);
          ctx.lineTo(xPositions[idx] + 2, ly + 12);
          ctx.moveTo(xPositions[idx] + 5, ly + 10);
          ctx.lineTo(xPositions[idx] + 6, ly + 12);
          ctx.stroke();
        });
        this._drawWolverineBody(ctx);
      });
    });
  }

  // ===================== OWL (40x36, 3 frames) =====================

  _drawOwlBody(ctx) {
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

  _generateOwlFrames() {
    // Wing flap animation
    const wingAngles = [
      { upY: 8, downY: 30 },    // wings level
      { upY: 1, downY: 24 },    // wings up
      { upY: 13, downY: 36 },   // wings down
    ];

    wingAngles.forEach(({ upY, downY }, i) => {
      this._ct(`owl_walk_${i}`, 40, 36, (ctx) => {
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

        this._drawOwlBody(ctx);
      });
    });
  }

  // ===================== RAM (62x52, 3 frames) =====================

  _drawRamBody(ctx, headOffY = 0) {
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

  _generateRamFrames() {
    // Walking animation with head slightly lowered
    const frames = [
      { legYs: [38, 38, 38, 38], headOff: 2 },
      { legYs: [36, 40, 40, 36], headOff: 3 },
      { legYs: [40, 36, 36, 40], headOff: 1 },
    ];

    frames.forEach(({ legYs, headOff }, i) => {
      this._ct(`ram_walk_${i}`, 62, 52, (ctx) => {
        const xPositions = [22, 30, 42, 50];
        legYs.forEach((ly, idx) => {
          // Strong sturdy legs
          const legGrad = ctx.createLinearGradient(0, ly, 0, ly + 8);
          legGrad.addColorStop(0, '#A09080');
          legGrad.addColorStop(1, '#887060');
          ctx.fillStyle = legGrad;
          ctx.fillRect(xPositions[idx], ly, 6, 6);
          // Lower leg
          ctx.fillStyle = '#887060';
          ctx.fillRect(xPositions[idx] + 1, ly + 5, 5, 5);
          // Hoof
          ctx.fillStyle = '#333';
          ctx.fillRect(xPositions[idx], ly + 9, 6, 4);
          // Hoof split
          ctx.strokeStyle = '#555';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(xPositions[idx] + 3, ly + 9);
          ctx.lineTo(xPositions[idx] + 3, ly + 13);
          ctx.stroke();
        });
        this._drawRamBody(ctx, headOff);
      });
    });
  }
}
