import { SpriteFactory } from './SpriteFactory.js';

export class HunterSprite extends SpriteFactory {
  generate() {
    this._generateIdleFrames();
    this._generateWalkFrames();
    this._generateShootFrames();
  }

  // --- Shared drawing helpers ---

  _drawBoot(ctx, x) {
    ctx.fillStyle = '#4a3728';
    ctx.fillRect(x, 92, 16, 16);
    ctx.fillStyle = '#3a2718';
    ctx.fillRect(x, 106, 16, 2);
    ctx.strokeStyle = '#6a5748';
    ctx.lineWidth = 0.8;
    for (let y = 94; y < 104; y += 3) {
      ctx.beginPath();
      ctx.moveTo(x + 3, y);
      ctx.lineTo(x + 13, y);
      ctx.stroke();
    }
  }

  _drawBoots(ctx, leftX, rightX) {
    this._drawBoot(ctx, leftX);
    this._drawBoot(ctx, rightX);
  }

  _drawLeg(ctx, x) {
    ctx.fillStyle = '#556b2f';
    ctx.fillRect(x, 64, 12, 30);
    ctx.fillStyle = '#4a5e28';
    ctx.fillRect(x + 1, 74, 10, 8);
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(x + 6, 64);
    ctx.lineTo(x + 6, 92);
    ctx.stroke();
  }

  _drawLegs(ctx, leftX, rightX) {
    this._drawLeg(ctx, leftX);
    this._drawLeg(ctx, rightX);
  }

  _drawBelt(ctx) {
    ctx.fillStyle = '#4a3728';
    ctx.fillRect(16, 60, 48, 5);
    // Buckle
    ctx.fillStyle = '#cc9933';
    ctx.fillRect(36, 60, 7, 5);
    ctx.fillStyle = '#aa7722';
    ctx.fillRect(38, 61, 3, 3);
    // Holster (right hip)
    ctx.fillStyle = '#5a4738';
    ctx.fillRect(52, 62, 8, 12);
    ctx.strokeStyle = '#4a3728';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(52, 62, 8, 12);
    ctx.fillStyle = '#4a3728';
    ctx.fillRect(52, 62, 8, 3);
    ctx.fillStyle = '#cc9933';
    ctx.beginPath();
    ctx.arc(56, 64, 1, 0, Math.PI * 2);
    ctx.fill();
  }

  _drawJacket(ctx, expand = 0) {
    const x = 16 - expand;
    const w = 48 + expand * 2;
    const jg = ctx.createLinearGradient(x, 28, x + w, 60);
    jg.addColorStop(0, '#7b9e33');
    jg.addColorStop(0.5, '#6b8e23');
    jg.addColorStop(1, '#5b7e18');
    ctx.fillStyle = jg;
    ctx.fillRect(x, 28, w, 32);

    // Collar
    ctx.fillStyle = '#5b7e18';
    ctx.fillRect(24 - expand, 24, 32 + expand * 2, 5);

    // Center button line
    ctx.fillStyle = '#4a7018';
    ctx.fillRect(38, 30, 2, 28);

    // Buttons
    ctx.fillStyle = '#887744';
    for (let by = 34; by < 58; by += 8) {
      ctx.beginPath();
      ctx.arc(39, by, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Pockets
    ctx.strokeStyle = 'rgba(0,0,0,0.15)';
    ctx.lineWidth = 0.8;
    ctx.strokeRect(x + 4, 40, 14, 10);
    ctx.strokeRect(x + w - 18, 40, 14, 10);
    ctx.fillStyle = '#608020';
    ctx.fillRect(x + 4, 38, 14, 3);
    ctx.fillRect(x + w - 18, 38, 14, 3);

    // Ammo belt across chest
    ctx.fillStyle = '#6a5535';
    ctx.beginPath();
    ctx.moveTo(x, 30);
    ctx.lineTo(x + w, 50);
    ctx.lineTo(x + w, 54);
    ctx.lineTo(x, 34);
    ctx.fill();
    ctx.fillStyle = '#cc9933';
    for (let i = 0; i < 10; i++) {
      const bx = x + 3 + i * (w / 10.5);
      const by = 30.5 + i * 2;
      ctx.fillRect(bx, by, 2, 3.5);
    }
    ctx.fillStyle = '#aa8833';
    for (let i = 0; i < 10; i++) {
      const bx = x + 3 + i * (w / 10.5);
      const by = 30.5 + i * 2;
      ctx.fillRect(bx, by, 2, 1);
    }
  }

  _drawHead(ctx, squint = false) {
    // Neck
    ctx.fillStyle = '#d8a87a';
    ctx.fillRect(32, 20, 16, 10);

    // Head
    ctx.fillStyle = '#e8b88a';
    ctx.beginPath();
    ctx.arc(40, 14, 16, 0, Math.PI * 2);
    ctx.fill();

    // Ear (right side visible)
    ctx.fillStyle = '#d8a87a';
    ctx.beginPath();
    ctx.arc(56, 16, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#c89a6a';
    ctx.beginPath();
    ctx.arc(56, 16, 2, 0, Math.PI * 2);
    ctx.fill();

    // Hat
    ctx.fillStyle = '#556b2f';
    ctx.fillRect(20, -2, 40, 12);
    ctx.fillStyle = '#4a5e28';
    ctx.fillRect(16, 8, 48, 5);
    ctx.fillStyle = '#4a3728';
    ctx.fillRect(20, 6, 40, 3);
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(24, 12, 32, 3);

    // Stubble
    ctx.fillStyle = 'rgba(80,60,40,0.3)';
    const stubblePoints = [
      [44, 24], [46, 25], [48, 24], [50, 23],
      [45, 26], [47, 27], [49, 26], [43, 25],
      [46, 23], [50, 25], [44, 28], [48, 28],
    ];
    stubblePoints.forEach(([sx, sy]) => {
      ctx.fillRect(sx, sy, 1, 1);
    });

    // Eyes
    if (squint) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(44, 12, 7, 3);
      ctx.fillStyle = '#334';
      ctx.fillRect(47, 12, 3, 3);
      ctx.strokeStyle = '#443';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(33, 14); ctx.lineTo(40, 14);
      ctx.stroke();
    } else {
      ctx.fillStyle = '#fff';
      ctx.fillRect(44, 12, 7, 5);
      ctx.fillStyle = '#4466aa';
      ctx.fillRect(47, 12, 3, 5);
      ctx.fillStyle = '#223';
      ctx.fillRect(48, 13, 2, 3);
      ctx.fillStyle = '#fff';
      ctx.fillRect(49, 12, 1, 1);
      ctx.fillStyle = '#fff';
      ctx.fillRect(34, 12, 5, 5);
      ctx.fillStyle = '#4466aa';
      ctx.fillRect(35, 12, 3, 5);
      ctx.fillStyle = '#223';
      ctx.fillRect(36, 13, 2, 3);
      ctx.fillStyle = '#fff';
      ctx.fillRect(37, 12, 1, 1);
    }

    // Eyebrows
    ctx.fillStyle = '#443';
    ctx.fillRect(44, 10, 8, 2);
    ctx.fillRect(33, 10, 6, 2);

    // Nose
    ctx.fillStyle = '#d8a87a';
    ctx.beginPath();
    ctx.moveTo(51, 16);
    ctx.lineTo(54, 21);
    ctx.lineTo(50, 21);
    ctx.fill();
    ctx.fillStyle = '#c89a6a';
    ctx.fillRect(51, 19, 2, 2);

    // Mouth
    ctx.fillStyle = '#c87a5a';
    ctx.fillRect(46, 23, 6, 2);
  }

  _drawCigar(ctx) {
    ctx.fillStyle = '#8B6914';
    ctx.fillRect(52, 22, 12, 3);
    ctx.fillStyle = '#cc3333';
    ctx.fillRect(56, 22, 3, 3);
    ctx.fillStyle = '#999';
    ctx.fillRect(63, 22, 2, 3);
    ctx.fillStyle = '#ff6600';
    ctx.fillRect(64, 23, 1, 1);
  }

  _drawSmoke(ctx, large = false) {
    ctx.strokeStyle = 'rgba(200,200,200,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(64, 22);
    ctx.quadraticCurveTo(66, 18, 64, 14);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(200,200,200,0.2)';
    ctx.beginPath();
    ctx.moveTo(65, 21);
    ctx.quadraticCurveTo(68, 16, 66, 10);
    ctx.stroke();

    if (large) {
      ctx.strokeStyle = 'rgba(200,200,200,0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(63, 20);
      ctx.quadraticCurveTo(69, 12, 63, 4);
      ctx.stroke();
      ctx.fillStyle = 'rgba(200,200,200,0.1)';
      ctx.beginPath();
      ctx.arc(65, 6, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  _drawArmsIdle(ctx) {
    ctx.fillStyle = '#6b8e23';
    ctx.fillRect(6, 30, 12, 22);
    ctx.fillRect(62, 30, 12, 22);
    ctx.fillStyle = '#5b7e18';
    ctx.fillRect(6, 50, 12, 3);
    ctx.fillRect(62, 50, 12, 3);
    ctx.fillStyle = '#e8b88a';
    ctx.fillRect(6, 53, 12, 8);
    ctx.fillRect(62, 53, 12, 8);
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(10, 56); ctx.lineTo(10, 60);
    ctx.moveTo(13, 56); ctx.lineTo(13, 60);
    ctx.moveTo(66, 56); ctx.lineTo(66, 60);
    ctx.moveTo(69, 56); ctx.lineTo(69, 60);
    ctx.stroke();
  }

  _drawArmsWalk(ctx, phase) {
    // phase 0: left arm forward (lower), right arm back (higher)
    // phase 1: centered (same as idle)
    // phase 2: right arm forward, left arm back
    const leftOff = phase === 0 ? 4 : phase === 2 ? -4 : 0;
    const rightOff = phase === 0 ? -4 : phase === 2 ? 4 : 0;

    // Left arm
    ctx.fillStyle = '#6b8e23';
    ctx.fillRect(6, 30 + leftOff, 12, 22);
    ctx.fillStyle = '#5b7e18';
    ctx.fillRect(6, 50 + leftOff, 12, 3);
    ctx.fillStyle = '#e8b88a';
    ctx.fillRect(6, 53 + leftOff, 12, 8);

    // Right arm
    ctx.fillStyle = '#6b8e23';
    ctx.fillRect(62, 30 + rightOff, 12, 22);
    ctx.fillStyle = '#5b7e18';
    ctx.fillRect(62, 50 + rightOff, 12, 3);
    ctx.fillStyle = '#e8b88a';
    ctx.fillRect(62, 53 + rightOff, 12, 8);
  }

  _drawArmsShooting(ctx, phase) {
    if (phase === 0) {
      // Raising — arms halfway to shooting pose
      ctx.fillStyle = '#6b8e23';
      ctx.fillRect(6, 30, 12, 20);
      ctx.fillStyle = '#e8b88a';
      ctx.fillRect(6, 48, 12, 7);
      ctx.fillStyle = '#6b8e23';
      ctx.fillRect(62, 27, 13, 18);
      ctx.fillStyle = '#5b7e18';
      ctx.fillRect(62, 43, 13, 3);
      ctx.fillStyle = '#e8b88a';
      ctx.fillRect(73, 32, 6, 10);
    } else if (phase === 1) {
      // Full recoil — arms fully extended
      ctx.fillStyle = '#6b8e23';
      ctx.fillRect(6, 30, 12, 18);
      ctx.fillStyle = '#e8b88a';
      ctx.fillRect(6, 46, 12, 7);
      ctx.fillStyle = '#6b8e23';
      ctx.fillRect(62, 24, 14, 18);
      ctx.fillStyle = '#5b7e18';
      ctx.fillRect(62, 40, 14, 3);
      ctx.fillStyle = '#e8b88a';
      ctx.fillRect(74, 30, 6, 10);
    } else {
      // Recovering — arms lowering
      ctx.fillStyle = '#6b8e23';
      ctx.fillRect(6, 30, 12, 20);
      ctx.fillStyle = '#e8b88a';
      ctx.fillRect(6, 48, 12, 7);
      ctx.fillStyle = '#6b8e23';
      ctx.fillRect(62, 28, 13, 20);
      ctx.fillStyle = '#5b7e18';
      ctx.fillRect(62, 46, 13, 3);
      ctx.fillStyle = '#e8b88a';
      ctx.fillRect(73, 34, 6, 10);
    }
  }

  // --- Frame generators ---

  _generateIdleFrames() {
    // Frame 0: normal standing, small smoke
    this.createTexture('hunter_idle_0', 80, 108, (ctx) => {
      this._drawBoots(ctx, 18, 44);
      this._drawLegs(ctx, 22, 44);
      this._drawBelt(ctx);
      this._drawJacket(ctx, 0);
      this._drawArmsIdle(ctx);
      this._drawHead(ctx, false);
      this._drawCigar(ctx);
      this._drawSmoke(ctx, false);
    });

    // Frame 1: breathing (slightly expanded chest), larger smoke puff
    this.createTexture('hunter_idle_1', 80, 108, (ctx) => {
      this._drawBoots(ctx, 18, 44);
      this._drawLegs(ctx, 22, 44);
      this._drawBelt(ctx);
      this._drawJacket(ctx, 1);
      this._drawArmsIdle(ctx);
      this._drawHead(ctx, false);
      this._drawCigar(ctx);
      this._drawSmoke(ctx, true);
    });
  }

  _generateWalkFrames() {
    // Frame 0: left leg forward, right back, arms swinging
    this.createTexture('hunter_walk_0', 80, 108, (ctx) => {
      this._drawBoots(ctx, 14, 48);
      this._drawLegs(ctx, 18, 48);
      this._drawBelt(ctx);
      this._drawJacket(ctx, 0);
      this._drawArmsWalk(ctx, 0);
      this._drawHead(ctx, false);
      this._drawCigar(ctx);
      this._drawSmoke(ctx, false);
    });

    // Frame 1: legs centered
    this.createTexture('hunter_walk_1', 80, 108, (ctx) => {
      this._drawBoots(ctx, 18, 44);
      this._drawLegs(ctx, 22, 44);
      this._drawBelt(ctx);
      this._drawJacket(ctx, 0);
      this._drawArmsWalk(ctx, 1);
      this._drawHead(ctx, false);
      this._drawCigar(ctx);
      this._drawSmoke(ctx, false);
    });

    // Frame 2: right leg forward, left back
    this.createTexture('hunter_walk_2', 80, 108, (ctx) => {
      this._drawBoots(ctx, 22, 40);
      this._drawLegs(ctx, 26, 40);
      this._drawBelt(ctx);
      this._drawJacket(ctx, 0);
      this._drawArmsWalk(ctx, 2);
      this._drawHead(ctx, false);
      this._drawCigar(ctx);
      this._drawSmoke(ctx, false);
    });
  }

  _generateShootFrames() {
    // Frame 0: arms raising to aim
    this.createTexture('hunter_shoot_0', 80, 108, (ctx) => {
      this._drawBoots(ctx, 16, 46);
      this._drawLegs(ctx, 20, 46);
      this._drawBelt(ctx);
      this._drawJacket(ctx, 0);
      this._drawArmsShooting(ctx, 0);
      this._drawHead(ctx, false);
      this._drawCigar(ctx);
      this._drawSmoke(ctx, false);
    });

    // Frame 1: recoil — fully extended, squinting
    this.createTexture('hunter_shoot_1', 80, 108, (ctx) => {
      this._drawBoots(ctx, 16, 46);
      this._drawLegs(ctx, 20, 46);
      this._drawBelt(ctx);
      this._drawJacket(ctx, 0);
      this._drawArmsShooting(ctx, 1);
      this._drawHead(ctx, true);
      this._drawCigar(ctx);
      this._drawSmoke(ctx, false);
    });

    // Frame 2: recovering from recoil
    this.createTexture('hunter_shoot_2', 80, 108, (ctx) => {
      this._drawBoots(ctx, 17, 45);
      this._drawLegs(ctx, 21, 45);
      this._drawBelt(ctx);
      this._drawJacket(ctx, 0);
      this._drawArmsShooting(ctx, 2);
      this._drawHead(ctx, false);
      this._drawCigar(ctx);
      this._drawSmoke(ctx, false);
    });
  }
}
