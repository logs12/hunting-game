import { SpriteFactory } from './SpriteFactory.js';
import { ANIMALS } from '../constants.js';

const ANIMAL_SCALE = 0.62;

export class AnimalSprites extends SpriteFactory {
  _ct(key, w, h, drawFn) {
    this.createTexture(key, w, h, drawFn, ANIMAL_SCALE);
  }

  generate() {
    this._generateRabbitFrames();
    this._generateFoxFrames();
    this._generateDeerFrames();
    this._generateBoarFrames();
    this._generateWolfFrames();
    this._generateBearFrames();
    this._generateEagleFrames();
    this._generateSnakeFrames();
    this._generateMooseFrames();
    this._generatePheasantFrames();
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

  // Quadruped leg helper: draws 4 legs with offsets for animation frames
  // legOffsets = [{x, y}, ...] for each of 4 legs (front-left, front-right, back-left, back-right)
  _drawQuadLegs(ctx, positions, color, shinColor, pawColor, legW, legH, shinH, pawH) {
    positions.forEach(({ x, y, sx, sy }) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, legW, legH);
      ctx.fillStyle = shinColor || color;
      ctx.fillRect(sx || x + 1, sy || (y + legH), (legW - 1) || legW, shinH);
      if (pawColor) {
        ctx.fillStyle = pawColor;
        ctx.fillRect(x, (sy || (y + legH)) + shinH, legW, pawH || 3);
      }
    });
  }

  // ===================== RABBIT (48x48, 3 frames) =====================

  _drawRabbitBody(ctx) {
    const bg = ctx.createRadialGradient(24, 30, 2, 24, 30, 14);
    bg.addColorStop(0, '#d4d4d4');
    bg.addColorStop(1, '#a8a8a8');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(24, 30, 14, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#e0e0e0';
    ctx.beginPath();
    ctx.ellipse(24, 34, 10, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    this._drawFur(ctx, 14, 22, 20, 14, 10, 'rgba(140,140,140,0.3)');

    const hg = ctx.createRadialGradient(14, 18, 2, 14, 18, 10);
    hg.addColorStop(0, '#d4d4d4');
    hg.addColorStop(1, '#b8b8b8');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.arc(14, 18, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#c8c8c8';
    ctx.beginPath();
    ctx.arc(10, 22, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#c4c4c4';
    ctx.beginPath();
    ctx.ellipse(9, 5, 4, 10, -0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(19, 4, 4, 11, 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffaaaa';
    ctx.beginPath();
    ctx.ellipse(9, 5, 2, 7, -0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(19, 4, 2, 8, 0.15, 0, Math.PI * 2);
    ctx.fill();

    this._drawEye(ctx, 9, 16, 2.5);

    ctx.fillStyle = '#ff9999';
    ctx.beginPath();
    ctx.ellipse(5, 20, 2, 1.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(100,100,100,0.4)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(5, 21); ctx.lineTo(0, 19);
    ctx.moveTo(5, 22); ctx.lineTo(0, 24);
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(40, 26, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  _generateRabbitFrames() {
    // Frame 0: legs centered
    // Frame 1: compressed (hop down)
    // Frame 2: stretched (hop up)
    const legSets = [
      // Frame 0: normal stance
      [{ front: 38, back: 36 }, 0],
      // Frame 1: legs tucked, body lower
      [{ front: 40, back: 38 }, 2],
      // Frame 2: legs extended, body higher
      [{ front: 36, back: 34 }, -2],
    ];

    legSets.forEach(([legs, bodyOff], i) => {
      this._ct(`rabbit_walk_${i}`, 48, 48, (ctx) => {
        ctx.save();
        ctx.translate(0, bodyOff);
        this._drawRabbitBody(ctx);
        ctx.restore();

        // Front legs
        ctx.fillStyle = '#b0b0b0';
        ctx.fillRect(13, legs.front, 5, 5);
        ctx.fillStyle = '#a0a0a0';
        ctx.fillRect(13, legs.front + 4, 4, 4);
        ctx.fillStyle = '#b0b0b0';
        ctx.fillRect(21, legs.front, 5, 5);
        ctx.fillStyle = '#a0a0a0';
        ctx.fillRect(21, legs.front + 4, 4, 4);
        // Back legs
        ctx.fillStyle = '#b0b0b0';
        ctx.fillRect(30, legs.back, 6, 6);
        ctx.fillStyle = '#a0a0a0';
        ctx.fillRect(31, legs.back + 5, 5, 5);
        // Paws
        ctx.fillStyle = '#d0c0c0';
        ctx.fillRect(12, legs.front + 7, 6, 3);
        ctx.fillRect(20, legs.front + 7, 6, 3);
        ctx.fillRect(30, legs.back + 9, 7, 3);
      });
    });
  }

  // ===================== FOX (68x54, 3 frames) =====================

  _drawFoxBody(ctx) {
    const bg = ctx.createRadialGradient(38, 32, 4, 38, 32, 20);
    bg.addColorStop(0, '#ff9944');
    bg.addColorStop(1, '#dd6611');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(38, 32, 20, 13, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffeedd';
    ctx.beginPath();
    ctx.ellipse(36, 38, 14, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    this._drawFur(ctx, 22, 22, 28, 18, 12, 'rgba(180,80,0,0.25)');

    const hg = ctx.createRadialGradient(14, 22, 2, 14, 22, 13);
    hg.addColorStop(0, '#ff9944');
    hg.addColorStop(1, '#dd7722');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.ellipse(14, 22, 13, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.ellipse(4, 26, 6, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.ellipse(0, 25, 2.5, 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(1, 27); ctx.lineTo(4, 29); ctx.lineTo(7, 27);
    ctx.stroke();

    ctx.fillStyle = '#ee7722';
    ctx.beginPath();
    ctx.moveTo(6, 11); ctx.lineTo(10, 11); ctx.lineTo(4, 0);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(16, 11); ctx.lineTo(22, 11); ctx.lineTo(20, 0);
    ctx.fill();
    ctx.fillStyle = '#ffccaa';
    ctx.beginPath();
    ctx.moveTo(7, 11); ctx.lineTo(9, 11); ctx.lineTo(5, 3);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(17, 11); ctx.lineTo(21, 11); ctx.lineTo(19, 3);
    ctx.fill();
    this._drawEye(ctx, 10, 20, 2.5, '#bb8800');

    ctx.fillStyle = '#ee7722';
    ctx.beginPath();
    ctx.moveTo(56, 28);
    ctx.quadraticCurveTo(68, 16, 64, 30);
    ctx.quadraticCurveTo(68, 40, 56, 36);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(65, 24, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffeedd';
    ctx.beginPath();
    ctx.ellipse(22, 30, 4, 6, -0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  _generateFoxFrames() {
    // leg Y offsets for 3 frames: [frontL, frontR, backL, backR]
    const frames = [
      [[42, 0], [42, 0], [42, 0], [42, 0]],      // centered
      [[40, -2], [44, 2], [44, 2], [40, -2]],     // left forward
      [[44, 2], [40, -2], [40, -2], [44, 2]],     // right forward
    ];

    frames.forEach((legs, i) => {
      this._ct(`fox_walk_${i}`, 68, 54, (ctx) => {
        // Legs first (behind body)
        ctx.fillStyle = '#cc5500';
        legs.forEach(([ly], idx) => {
          const lx = [22, 30, 40, 48][idx];
          ctx.fillRect(lx, ly, 5, 6);
        });
        ctx.fillStyle = '#aa4400';
        legs.forEach(([ly], idx) => {
          const lx = [21, 29, 39, 47][idx];
          ctx.fillRect(lx, ly + 6, 6, 2);
        });
        this._drawFoxBody(ctx);
      });
    });
  }

  // ===================== DEER (80x80, 3 frames) =====================

  _drawDeerBody(ctx) {
    const bg = ctx.createRadialGradient(46, 48, 4, 46, 48, 24);
    bg.addColorStop(0, '#cc9955');
    bg.addColorStop(1, '#996633');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(46, 48, 24, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ddb877';
    ctx.beginPath();
    ctx.ellipse(46, 56, 18, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    [[38, 42], [50, 44], [42, 50], [54, 48], [36, 54]].forEach(([sx, sy]) => {
      ctx.fillStyle = '#ddbb88';
      ctx.beginPath();
      ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });
    this._drawFur(ctx, 26, 36, 36, 22, 14, 'rgba(120,70,30,0.2)');

    const ng = ctx.createLinearGradient(20, 24, 34, 24);
    ng.addColorStop(0, '#bb8844');
    ng.addColorStop(1, '#aa7733');
    ctx.fillStyle = ng;
    ctx.fillRect(20, 24, 14, 26);

    const hg = ctx.createRadialGradient(16, 22, 2, 16, 22, 12);
    hg.addColorStop(0, '#cc9955');
    hg.addColorStop(1, '#aa7744');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.ellipse(16, 22, 12, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ddb877';
    ctx.beginPath();
    ctx.ellipse(6, 26, 6, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.ellipse(2, 25, 2.5, 1.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#9B7924';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(10, 12); ctx.lineTo(4, 0); ctx.stroke();
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(7, 6); ctx.lineTo(0, 4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(5, 3); ctx.lineTo(2, 8); ctx.stroke();
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(22, 12); ctx.lineTo(28, 0); ctx.stroke();
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(25, 6); ctx.lineTo(32, 4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(27, 3); ctx.lineTo(30, 8); ctx.stroke();

    this._drawEye(ctx, 11, 20, 3, '#553311');

    ctx.fillStyle = '#aa7744';
    ctx.beginPath();
    ctx.ellipse(24, 14, 4, 7, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ddb877';
    ctx.beginPath();
    ctx.ellipse(24, 14, 2, 5, 0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#aa7744';
    ctx.beginPath();
    ctx.ellipse(70, 42, 3, 5, 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  _generateDeerFrames() {
    const frames = [
      [[62, 0], [62, 0], [60, 0], [62, 0]],
      [[60, -2], [64, 2], [62, 2], [58, -2]],
      [[64, 2], [60, -2], [58, -2], [64, 2]],
    ];

    frames.forEach((legs, i) => {
      this._ct(`deer_walk_${i}`, 80, 80, (ctx) => {
        const legColor = '#886633';
        const hoofColor = '#333';
        const xPositions = [30, 38, 52, 60];

        legs.forEach(([ly], idx) => {
          const lx = xPositions[idx];
          ctx.fillStyle = legColor;
          ctx.fillRect(lx, ly, 6, 8);
          ctx.fillRect(lx + 1, ly + 7, 5, 9);
          ctx.fillStyle = hoofColor;
          ctx.fillRect(lx, ly + 15, 6, 4);
        });

        this._drawDeerBody(ctx);
      });
    });
  }

  // ===================== BOAR (74x60, 3 frames) =====================

  _drawBoarBody(ctx) {
    const bg = ctx.createRadialGradient(44, 34, 4, 44, 34, 24);
    bg.addColorStop(0, '#776655');
    bg.addColorStop(1, '#554433');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(44, 34, 24, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#887766';
    ctx.beginPath();
    ctx.ellipse(42, 42, 18, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#443322';
    ctx.beginPath();
    ctx.moveTo(24, 18); ctx.lineTo(62, 18); ctx.lineTo(60, 24); ctx.lineTo(26, 24);
    ctx.fill();
    ctx.strokeStyle = '#332211';
    ctx.lineWidth = 1;
    for (let bx = 26; bx < 60; bx += 3) {
      ctx.beginPath(); ctx.moveTo(bx, 24); ctx.lineTo(bx - 1, 16); ctx.stroke();
    }
    this._drawFur(ctx, 26, 26, 32, 16, 10, 'rgba(60,40,20,0.25)');

    const hg = ctx.createRadialGradient(16, 30, 2, 16, 30, 15);
    hg.addColorStop(0, '#665544');
    hg.addColorStop(1, '#554433');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.ellipse(16, 30, 15, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#998877';
    ctx.beginPath();
    ctx.ellipse(4, 34, 7, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#333';
    ctx.beginPath(); ctx.ellipse(1, 32, 1.5, 1, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(1, 36, 1.5, 1, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffffdd';
    ctx.beginPath();
    ctx.moveTo(6, 38); ctx.quadraticCurveTo(0, 44, 3, 46);
    ctx.lineTo(5, 45); ctx.quadraticCurveTo(3, 42, 8, 38);
    ctx.fill();

    ctx.fillStyle = '#ff3300';
    ctx.beginPath(); ctx.ellipse(12, 26, 3, 2.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(12, 26, 1.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ff6644';
    ctx.beginPath(); ctx.arc(11, 25, 0.6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#554433';
    ctx.beginPath(); ctx.moveTo(12, 16); ctx.lineTo(6, 10); ctx.lineTo(18, 14); ctx.fill();

    ctx.strokeStyle = '#554433';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(68, 28); ctx.quadraticCurveTo(74, 22, 72, 28); ctx.stroke();
  }

  _generateBoarFrames() {
    const frames = [
      [[46, 46, 46, 46]],
      [[44, 48, 48, 44]],
      [[48, 44, 44, 48]],
    ];

    frames.forEach(([legYs], i) => {
      this._ct(`boar_walk_${i}`, 74, 60, (ctx) => {
        const xPositions = [28, 38, 50, 58];
        legYs.forEach((ly, idx) => {
          ctx.fillStyle = '#443322';
          ctx.fillRect(xPositions[idx], ly, 7, 8);
          ctx.fillStyle = '#222';
          ctx.fillRect(xPositions[idx], ly + 7, 7, 3);
        });
        this._drawBoarBody(ctx);
      });
    });
  }

  // ===================== WOLF (74x58, 3 frames) =====================

  _drawWolfBody(ctx) {
    const bg = ctx.createRadialGradient(44, 34, 4, 44, 34, 22);
    bg.addColorStop(0, '#99aabb');
    bg.addColorStop(1, '#667788');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(44, 34, 22, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#bbccdd';
    ctx.beginPath();
    ctx.ellipse(36, 40, 14, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    this._drawFur(ctx, 26, 24, 32, 18, 14, 'rgba(80,90,100,0.2)');

    const hg = ctx.createRadialGradient(16, 22, 2, 16, 22, 14);
    hg.addColorStop(0, '#aabbcc');
    hg.addColorStop(1, '#778899');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.ellipse(16, 22, 14, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#bbccdd';
    ctx.beginPath();
    ctx.moveTo(2, 22); ctx.lineTo(0, 24); ctx.lineTo(0, 28);
    ctx.lineTo(4, 30); ctx.lineTo(12, 28); ctx.lineTo(12, 22);
    ctx.fill();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.ellipse(1, 25, 2.5, 2, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#333'; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(2, 27); ctx.lineTo(8, 30); ctx.lineTo(12, 28); ctx.stroke();

    ctx.fillStyle = '#667788';
    ctx.beginPath(); ctx.moveTo(8, 10); ctx.lineTo(4, 0); ctx.lineTo(14, 8); ctx.fill();
    ctx.beginPath(); ctx.moveTo(18, 10); ctx.lineTo(22, 0); ctx.lineTo(24, 8); ctx.fill();
    ctx.fillStyle = '#aabbcc';
    ctx.beginPath(); ctx.moveTo(9, 10); ctx.lineTo(6, 3); ctx.lineTo(12, 9); ctx.fill();
    ctx.beginPath(); ctx.moveTo(19, 10); ctx.lineTo(21, 3); ctx.lineTo(23, 9); ctx.fill();
    this._drawEye(ctx, 11, 20, 2.5, '#ddaa00');

    ctx.fillStyle = '#778899';
    ctx.beginPath();
    ctx.moveTo(64, 28); ctx.quadraticCurveTo(74, 16, 72, 30);
    ctx.quadraticCurveTo(74, 38, 64, 36);
    ctx.fill();
    ctx.fillStyle = '#667788';
    ctx.beginPath(); ctx.arc(71, 24, 4, 0, Math.PI * 2); ctx.fill();
  }

  _generateWolfFrames() {
    const frames = [
      [44, 44, 44, 44],
      [42, 46, 46, 42],
      [46, 42, 42, 46],
    ];

    frames.forEach((legYs, i) => {
      this._ct(`wolf_walk_${i}`, 74, 58, (ctx) => {
        const xPositions = [28, 36, 50, 58];
        legYs.forEach((ly, idx) => {
          ctx.fillStyle = '#667788';
          ctx.fillRect(xPositions[idx], ly, 5, 7);
          ctx.fillStyle = '#556677';
          ctx.fillRect(xPositions[idx] + 1, ly + 6, 4, 6);
          ctx.fillStyle = '#556677';
          ctx.fillRect(xPositions[idx] - 1, ly + 11, 6, 3);
        });
        this._drawWolfBody(ctx);
      });
    });
  }

  // ===================== BEAR (100x94, 3 frames) =====================

  _drawBearBody(ctx) {
    const bg = ctx.createRadialGradient(58, 50, 6, 58, 50, 34);
    bg.addColorStop(0, '#8B5A3A');
    bg.addColorStop(1, '#5B2A1A');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(58, 50, 34, 26, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#6B3A2A';
    ctx.beginPath();
    ctx.ellipse(40, 30, 12, 10, 0, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#7B5A3A';
    ctx.beginPath(); ctx.moveTo(32, 40); ctx.lineTo(40, 56); ctx.lineTo(48, 40); ctx.fill();
    this._drawFur(ctx, 30, 32, 50, 30, 20, 'rgba(60,25,10,0.2)');

    const hg = ctx.createRadialGradient(20, 32, 3, 20, 32, 20);
    hg.addColorStop(0, '#8B5A3A');
    hg.addColorStop(1, '#6B3A2A');
    ctx.fillStyle = hg;
    ctx.beginPath(); ctx.arc(20, 32, 20, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#7B4A3A';
    ctx.beginPath(); ctx.arc(6, 16, 8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(34, 16, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#AA7766';
    ctx.beginPath(); ctx.arc(6, 16, 5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(34, 16, 5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#BB9977';
    ctx.beginPath(); ctx.ellipse(8, 38, 10, 7, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.ellipse(3, 36, 5, 3.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath(); ctx.ellipse(2, 35, 2, 1.5, -0.3, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#444'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(5, 40); ctx.lineTo(8, 44); ctx.lineTo(12, 40); ctx.stroke();
    this._drawEye(ctx, 12, 30, 2.5, '#553311');
    this._drawEye(ctx, 26, 30, 2.5, '#553311');
  }

  _generateBearFrames() {
    const frames = [
      [70, 70, 68, 70],
      [68, 72, 70, 66],
      [72, 68, 66, 72],
    ];

    frames.forEach((legYs, i) => {
      this._ct(`bear_walk_${i}`, 100, 94, (ctx) => {
        const xPositions = [30, 46, 66, 80];
        legYs.forEach((ly, idx) => {
          const legGrad = ctx.createLinearGradient(0, ly, 0, ly + 22);
          legGrad.addColorStop(0, '#5B2A1A');
          legGrad.addColorStop(1, '#4B1A0A');
          ctx.fillStyle = legGrad;
          ctx.fillRect(xPositions[idx], ly, 12, 10);
          ctx.fillRect(xPositions[idx] + 1, ly + 9, 10, 13);
          ctx.fillStyle = '#333';
          for (let c = 0; c < 3; c++) {
            ctx.fillRect(xPositions[idx] + 1 + c * 3, ly + 20, 2, 4);
          }
        });
        this._drawBearBody(ctx);
      });
    });
  }

  // ===================== EAGLE (60x34, 3 frames) =====================

  _drawEagleBody(ctx) {
    const bg = ctx.createRadialGradient(28, 18, 2, 28, 18, 14);
    bg.addColorStop(0, '#7B5033');
    bg.addColorStop(1, '#4A3020');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(28, 18, 14, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    const hg = ctx.createRadialGradient(12, 14, 1, 12, 14, 9);
    hg.addColorStop(0, '#FFFFFF');
    hg.addColorStop(1, '#E8E8D8');
    ctx.fillStyle = hg;
    ctx.beginPath(); ctx.arc(12, 14, 9, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#DAA520';
    ctx.beginPath();
    ctx.moveTo(3, 14); ctx.lineTo(0, 16); ctx.lineTo(2, 18); ctx.lineTo(5, 16);
    ctx.fill();
    this._drawEye(ctx, 9, 13, 2, '#ddaa00');

    // Tail
    ctx.fillStyle = '#4A3020';
    ctx.beginPath();
    ctx.moveTo(42, 16); ctx.lineTo(60, 12); ctx.lineTo(60, 22); ctx.lineTo(42, 20);
    ctx.fill();
    ctx.fillStyle = '#E8E8D8';
    ctx.beginPath();
    ctx.moveTo(56, 13); ctx.lineTo(60, 12); ctx.lineTo(60, 22); ctx.lineTo(56, 21);
    ctx.fill();

    // Talons
    ctx.fillStyle = '#DAA520';
    ctx.fillRect(22, 26, 3, 5);
    ctx.fillRect(28, 26, 3, 5);
    ctx.strokeStyle = '#333'; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(22, 31); ctx.lineTo(21, 34);
    ctx.moveTo(24, 31); ctx.lineTo(24, 34);
    ctx.moveTo(28, 31); ctx.lineTo(27, 34);
    ctx.moveTo(30, 31); ctx.lineTo(30, 34);
    ctx.stroke();
  }

  _generateEagleFrames() {
    // Wing positions: 0=level, 1=up, 2=down
    const wingAngles = [
      { upY: 4, downY: 28 },   // level
      { upY: -2, downY: 22 },  // wings up
      { upY: 8, downY: 34 },   // wings down
    ];

    wingAngles.forEach(({ upY, downY }, i) => {
      this._ct(`eagle_walk_${i}`, 60, 38, (ctx) => {
        // Upper wing
        ctx.fillStyle = '#5A3828';
        ctx.beginPath();
        ctx.moveTo(20, 16);
        ctx.quadraticCurveTo(34, upY, 50, upY + 2);
        ctx.lineTo(44, 16);
        ctx.fill();
        // Lower wing
        ctx.beginPath();
        ctx.moveTo(20, 20);
        ctx.quadraticCurveTo(34, downY, 50, downY - 2);
        ctx.lineTo(44, 20);
        ctx.fill();
        // Feather lines
        ctx.strokeStyle = '#3A2010';
        ctx.lineWidth = 0.8;
        for (let f = 0; f < 5; f++) {
          ctx.beginPath();
          ctx.moveTo(24 + f * 5, upY + 4 + f);
          ctx.lineTo(40 + f * 2, upY + 2 + f);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(24 + f * 5, downY - 4 - f);
          ctx.lineTo(40 + f * 2, downY - 2 - f);
          ctx.stroke();
        }

        ctx.save();
        ctx.translate(0, 2); // Slight offset so body centered
        this._drawEagleBody(ctx);
        ctx.restore();
      });
    });
  }

  // ===================== SNAKE (54x16, 3 frames) =====================

  _generateSnakeFrames() {
    // 3 frames with different body wave phase
    [0, 1, 2].forEach(i => {
      const phaseOff = i * 0.7;
      this._ct(`snake_walk_${i}`, 54, 16, (ctx) => {
        const bodyW = 3.5;
        const wave = (x) => 8 + Math.sin((x * 0.35) + phaseOff) * 3;

        ctx.fillStyle = '#228B22';
        ctx.beginPath();
        ctx.moveTo(6, wave(6) - bodyW);
        for (let x = 6; x <= 48; x++) ctx.lineTo(x, wave(x) - bodyW);
        for (let x = 48; x >= 6; x--) ctx.lineTo(x, wave(x) + bodyW);
        ctx.fill();

        ctx.fillStyle = '#90EE90';
        ctx.beginPath();
        ctx.moveTo(6, wave(6) + 0.5);
        for (let x = 6; x <= 48; x++) ctx.lineTo(x, wave(x) + 0.5);
        for (let x = 48; x >= 6; x--) ctx.lineTo(x, wave(x) + bodyW);
        ctx.fill();

        ctx.fillStyle = '#006400';
        for (let d = 0; d < 8; d++) {
          const sx = 8 + d * 5;
          const sy = wave(sx) - 1;
          ctx.beginPath();
          ctx.moveTo(sx, sy - 2); ctx.lineTo(sx + 2, sy);
          ctx.lineTo(sx, sy + 2); ctx.lineTo(sx - 2, sy);
          ctx.fill();
        }

        ctx.fillStyle = 'rgba(0,80,0,0.15)';
        ctx.beginPath();
        ctx.moveTo(6, wave(6) - bodyW);
        for (let x = 6; x <= 48; x++) ctx.lineTo(x, wave(x) - bodyW);
        for (let x = 48; x >= 6; x--) ctx.lineTo(x, wave(x) - 0.5);
        ctx.fill();

        // Head
        const hy = wave(6);
        const hg = ctx.createRadialGradient(4, hy, 1, 4, hy, 5);
        hg.addColorStop(0, '#2EA02E');
        hg.addColorStop(1, '#1E7B1E');
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.moveTo(0, hy); ctx.lineTo(4, hy - 5);
        ctx.lineTo(9, hy - 3); ctx.lineTo(9, hy + 3);
        ctx.lineTo(4, hy + 5);
        ctx.fill();

        ctx.fillStyle = '#FFD700';
        ctx.beginPath(); ctx.ellipse(3, hy - 2, 2, 1.5, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#111';
        ctx.fillRect(2.5, hy - 3, 1, 3);

        ctx.strokeStyle = '#FF0000'; ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, hy); ctx.lineTo(-3, hy - 2);
        ctx.moveTo(0, hy); ctx.lineTo(-3, hy + 2);
        ctx.stroke();

        ctx.fillStyle = '#228B22';
        ctx.beginPath();
        const ty = wave(48);
        ctx.moveTo(48, ty - 2); ctx.lineTo(54, ty); ctx.lineTo(48, ty + 2);
        ctx.fill();
      });
    });
  }

  // ===================== MOOSE (94x88, 3 frames) =====================

  _drawMooseBody(ctx) {
    const bg = ctx.createRadialGradient(54, 46, 6, 54, 46, 28);
    bg.addColorStop(0, '#8B5A3A');
    bg.addColorStop(1, '#5B3216');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(54, 46, 28, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#6B4226';
    ctx.beginPath();
    ctx.ellipse(36, 30, 10, 8, 0, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#7B5A3A';
    ctx.beginPath();
    ctx.ellipse(52, 56, 22, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    this._drawFur(ctx, 30, 32, 44, 22, 16, 'rgba(60,30,10,0.2)');

    ctx.fillStyle = '#6B4226';
    ctx.fillRect(18, 22, 16, 28);

    const hg = ctx.createRadialGradient(16, 22, 2, 16, 22, 14);
    hg.addColorStop(0, '#8B5A3A');
    hg.addColorStop(1, '#6B4226');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.ellipse(16, 22, 14, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#8B6844';
    ctx.beginPath();
    ctx.ellipse(4, 28, 8, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.ellipse(0, 27, 3, 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#6B4226';
    ctx.beginPath(); ctx.moveTo(8, 32); ctx.quadraticCurveTo(4, 42, 12, 38); ctx.fill();

    // Antlers
    ctx.fillStyle = '#9B8365';
    ctx.strokeStyle = '#9B8365'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(10, 10); ctx.lineTo(2, 0); ctx.stroke();
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(6, 5); ctx.lineTo(0, 8); ctx.stroke();
    ctx.fillStyle = '#9B8365';
    ctx.beginPath(); ctx.ellipse(2, 3, 6, 4, -0.3, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#8B7355'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-2, 1); ctx.lineTo(-4, -2);
    ctx.moveTo(1, 0); ctx.lineTo(0, -3);
    ctx.moveTo(4, 0); ctx.lineTo(5, -2);
    ctx.stroke();
    ctx.strokeStyle = '#9B8365'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(22, 10); ctx.lineTo(30, 0); ctx.stroke();
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(26, 5); ctx.lineTo(32, 8); ctx.stroke();
    ctx.fillStyle = '#9B8365';
    ctx.beginPath(); ctx.ellipse(30, 3, 6, 4, 0.3, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#8B7355'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(28, 0); ctx.lineTo(27, -3);
    ctx.moveTo(31, 0); ctx.lineTo(32, -3);
    ctx.moveTo(34, 1); ctx.lineTo(36, -2);
    ctx.stroke();

    this._drawEye(ctx, 12, 20, 2.5, '#442211');

    ctx.fillStyle = '#7B5236';
    ctx.beginPath(); ctx.ellipse(26, 14, 4, 8, 0.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#9B7356';
    ctx.beginPath(); ctx.ellipse(26, 14, 2, 6, 0.5, 0, Math.PI * 2); ctx.fill();
  }

  _generateMooseFrames() {
    const frames = [
      [62, 62, 60, 62],
      [60, 64, 62, 58],
      [64, 60, 58, 64],
    ];

    frames.forEach((legYs, i) => {
      this._ct(`moose_walk_${i}`, 94, 88, (ctx) => {
        const xPositions = [32, 42, 62, 72];
        const legColor = '#5B3216';
        const shinColor = '#4B2206';
        const hoofColor = '#222';

        legYs.forEach((ly, idx) => {
          const w = idx < 2 ? 7 : 8;
          ctx.fillStyle = legColor;
          ctx.fillRect(xPositions[idx], ly, w, 10);
          ctx.fillStyle = shinColor;
          ctx.fillRect(xPositions[idx] + 1, ly + 9, w - 1, 13);
          ctx.fillStyle = hoofColor;
          ctx.fillRect(xPositions[idx], ly + 21, w, 5);
        });

        this._drawMooseBody(ctx);
      });
    });
  }

  // ===================== PHEASANT (50x30, 3 frames) =====================

  _drawPheasantBody(ctx) {
    const bg = ctx.createRadialGradient(22, 16, 2, 22, 16, 14);
    bg.addColorStop(0, '#DDA05F');
    bg.addColorStop(1, '#BB7530');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(22, 16, 14, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    const breastGrad = ctx.createRadialGradient(16, 18, 1, 16, 18, 7);
    breastGrad.addColorStop(0, '#CC2200');
    breastGrad.addColorStop(1, '#880000');
    ctx.fillStyle = breastGrad;
    ctx.beginPath();
    ctx.ellipse(16, 18, 7, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    const wingGrad = ctx.createRadialGradient(26, 14, 1, 26, 14, 10);
    wingGrad.addColorStop(0, '#B8862A');
    wingGrad.addColorStop(1, '#8B6914');
    ctx.fillStyle = wingGrad;
    ctx.beginPath();
    ctx.ellipse(26, 14, 10, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#6B4914'; ctx.lineWidth = 0.7;
    for (let f = 0; f < 6; f++) {
      ctx.beginPath(); ctx.moveTo(18 + f * 3, 9); ctx.lineTo(20 + f * 3, 20); ctx.stroke();
    }

    const headGrad = ctx.createRadialGradient(8, 10, 1, 8, 10, 7);
    headGrad.addColorStop(0, '#009922');
    headGrad.addColorStop(1, '#006622');
    ctx.fillStyle = headGrad;
    ctx.beginPath(); ctx.arc(8, 10, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(0,200,100,0.15)';
    ctx.beginPath(); ctx.arc(6, 8, 5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#FF2200';
    ctx.beginPath(); ctx.ellipse(5, 14, 3.5, 3, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#DAA520';
    ctx.beginPath(); ctx.moveTo(1, 10); ctx.lineTo(0, 12); ctx.lineTo(3, 11); ctx.fill();
    this._drawEye(ctx, 6, 9, 1.5, '#FFD700');

    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(8, 10, 7.5, 1.2, 2.0); ctx.stroke();

    // Tail
    ctx.fillStyle = '#9B7924';
    ctx.beginPath();
    ctx.moveTo(36, 12); ctx.lineTo(50, 8); ctx.lineTo(50, 18); ctx.lineTo(36, 18);
    ctx.fill();
    ctx.strokeStyle = '#CD853F'; ctx.lineWidth = 0.7;
    for (let t = 0; t < 4; t++) {
      ctx.beginPath(); ctx.moveTo(37, 12 + t * 2); ctx.lineTo(49, 9 + t * 2); ctx.stroke();
    }
  }

  _generatePheasantFrames() {
    // Wing flap for flying pheasant: 0=level, 1=up, 2=down
    // Also animate legs for when on ground
    [0, 1, 2].forEach(i => {
      this._ct(`pheasant_walk_${i}`, 50, 34, (ctx) => {
        // Legs with different positions
        const legOff = [0, -2, 2][i];
        ctx.fillStyle = '#9B7924';
        ctx.fillRect(16, 22 + legOff, 3, 6);
        ctx.fillRect(22, 22 - legOff, 3, 6);
        ctx.strokeStyle = '#8B6914'; ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(16, 28 + legOff); ctx.lineTo(14, 30 + legOff);
        ctx.moveTo(17, 28 + legOff); ctx.lineTo(17, 30 + legOff);
        ctx.moveTo(18, 28 + legOff); ctx.lineTo(20, 30 + legOff);
        ctx.moveTo(22, 28 - legOff); ctx.lineTo(20, 30 - legOff);
        ctx.moveTo(23, 28 - legOff); ctx.lineTo(23, 30 - legOff);
        ctx.moveTo(24, 28 - legOff); ctx.lineTo(26, 30 - legOff);
        ctx.stroke();

        this._drawPheasantBody(ctx);
      });
    });
  }
}
