import { SpriteFactory } from './SpriteFactory';

// Side-profile hunter facing right, smaller than before
const HUNTER_SCALE = 0.40;
const W = 48;
const H = 96;

export class HunterSprite extends SpriteFactory {
  _ct(key: string, w: number, h: number, drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number) => void): void {
    this.createTexture(key, w, h, drawFn, HUNTER_SCALE);
  }

  generate(): void {
    this._generateIdleFrames();
    this._generateWalkFrames();
    this._generateShootFrames();
  }

  // --- Shared drawing helpers (side profile facing right) ---

  _drawBoot(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    // Boot from side: sole + upper
    ctx.fillStyle = '#4a3728';
    ctx.fillRect(x, y, 14, 12);
    // Sole (darker, extends forward)
    ctx.fillStyle = '#3a2718';
    ctx.fillRect(x - 1, y + 10, 16, 3);
    // Boot toe cap
    ctx.fillStyle = '#5a4738';
    ctx.fillRect(x + 10, y + 2, 4, 8);
    // Lace detail
    ctx.strokeStyle = '#6a5748';
    ctx.lineWidth = 0.5;
    for (let ly = y + 2; ly < y + 9; ly += 2.5) {
      ctx.beginPath();
      ctx.moveTo(x + 4, ly);
      ctx.lineTo(x + 9, ly);
      ctx.stroke();
    }
  }

  _drawLeg(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    // Khaki/olive trouser leg from side
    const lg = ctx.createLinearGradient(x, y, x + 10, y);
    lg.addColorStop(0, '#4a5e28');
    lg.addColorStop(0.5, '#556b2f');
    lg.addColorStop(1, '#4a5e28');
    ctx.fillStyle = lg;
    ctx.fillRect(x, y, 10, 26);
    // Knee crease
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(x + 2, y + 12);
    ctx.lineTo(x + 8, y + 13);
    ctx.stroke();
  }

  _drawTorso(ctx: CanvasRenderingContext2D, expand: number = 0): void {
    // Side-view torso: jacket narrower from side
    const x = 14 - expand;
    const w = 20 + expand * 2;
    const jg = ctx.createLinearGradient(x, 24, x + w, 24);
    jg.addColorStop(0, '#5b7e18');
    jg.addColorStop(0.5, '#6b8e23');
    jg.addColorStop(1, '#5b7e18');
    ctx.fillStyle = jg;
    ctx.fillRect(x, 24, w, 30);

    // Collar
    ctx.fillStyle = '#5b7e18';
    ctx.fillRect(x + 2, 20, w - 4, 5);

    // Side pocket
    ctx.strokeStyle = 'rgba(0,0,0,0.15)';
    ctx.lineWidth = 0.7;
    ctx.strokeRect(x + 3, 38, 10, 8);
    ctx.fillStyle = '#608020';
    ctx.fillRect(x + 3, 36, 10, 3);

    // Ammo belt across chest (diagonal)
    ctx.fillStyle = '#6a5535';
    ctx.beginPath();
    ctx.moveTo(x, 26);
    ctx.lineTo(x + w, 42);
    ctx.lineTo(x + w, 45);
    ctx.lineTo(x, 29);
    ctx.fill();
    // Ammo cartridges on belt
    ctx.fillStyle = '#cc9933';
    for (let i = 0; i < 6; i++) {
      const bx = x + 2 + i * (w / 6.5);
      const by = 26.5 + i * 2.5;
      ctx.fillRect(bx, by, 1.5, 3);
    }
    ctx.fillStyle = '#aa8833';
    for (let i = 0; i < 6; i++) {
      const bx = x + 2 + i * (w / 6.5);
      const by = 26.5 + i * 2.5;
      ctx.fillRect(bx, by, 1.5, 1);
    }

    // Button line (side seam)
    ctx.fillStyle = '#4a7018';
    ctx.fillRect(x + w / 2, 26, 1.5, 26);
  }

  _drawBelt(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#4a3728';
    ctx.fillRect(12, 53, 24, 4);
    // Buckle
    ctx.fillStyle = '#cc9933';
    ctx.fillRect(22, 53, 5, 4);
    ctx.fillStyle = '#aa7722';
    ctx.fillRect(23, 54, 3, 2);
    // Holster on hip
    ctx.fillStyle = '#5a4738';
    ctx.fillRect(28, 55, 6, 10);
    ctx.fillStyle = '#4a3728';
    ctx.fillRect(28, 55, 6, 2);
  }

  _drawHead(ctx: CanvasRenderingContext2D, squint: boolean = false): void {
    // Neck (side view)
    ctx.fillStyle = '#d8a87a';
    ctx.fillRect(18, 14, 10, 8);

    // Head — oval from side, slightly elongated front-back
    ctx.fillStyle = '#e8b88a';
    ctx.beginPath();
    ctx.ellipse(24, 10, 10, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ear (visible on the side)
    ctx.fillStyle = '#d8a87a';
    ctx.beginPath();
    ctx.ellipse(14, 10, 3, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#c89a6a';
    ctx.beginPath();
    ctx.ellipse(14, 10, 1.5, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hat (side view — brim extends forward)
    ctx.fillStyle = '#556b2f';
    ctx.fillRect(14, -4, 20, 10);
    // Hat brim
    ctx.fillStyle = '#4a5e28';
    ctx.fillRect(12, 5, 26, 4);
    // Hat band
    ctx.fillStyle = '#4a3728';
    ctx.fillRect(14, 3, 20, 3);
    // Hat shadow on face
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    ctx.fillRect(16, 8, 16, 3);

    // Stubble on jaw
    ctx.fillStyle = 'rgba(80,60,40,0.25)';
    const stubble = [[28, 16], [30, 15], [32, 14], [29, 18], [31, 17], [33, 16]];
    stubble.forEach(([sx, sy]) => {
      ctx.fillRect(sx, sy, 1, 1);
    });

    // Eye (side view — one eye visible)
    if (squint) {
      ctx.strokeStyle = '#334';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(27, 8);
      ctx.lineTo(32, 8);
      ctx.stroke();
    } else {
      ctx.fillStyle = '#fff';
      ctx.fillRect(27, 6, 5, 4);
      ctx.fillStyle = '#4466aa';
      ctx.fillRect(29, 6, 3, 4);
      ctx.fillStyle = '#223';
      ctx.fillRect(30, 7, 2, 2);
      // Eye highlight
      ctx.fillStyle = '#fff';
      ctx.fillRect(31, 6, 1, 1);
    }

    // Eyebrow
    ctx.fillStyle = '#443';
    ctx.fillRect(27, 4, 6, 2);

    // Nose (profile — protruding right)
    ctx.fillStyle = '#d8a87a';
    ctx.beginPath();
    ctx.moveTo(34, 8);
    ctx.lineTo(38, 12);
    ctx.lineTo(34, 14);
    ctx.fill();
    ctx.fillStyle = '#c89a6a';
    ctx.fillRect(35, 12, 2, 1);

    // Mouth (side)
    ctx.fillStyle = '#c87a5a';
    ctx.fillRect(32, 16, 4, 1.5);
  }

  _drawCigar(ctx: CanvasRenderingContext2D): void {
    // Cigar sticking out from mouth to the right
    ctx.fillStyle = '#8B6914';
    ctx.fillRect(36, 15, 10, 2.5);
    // Ember
    ctx.fillStyle = '#cc3333';
    ctx.fillRect(40, 15, 2.5, 2.5);
    // Ash
    ctx.fillStyle = '#999';
    ctx.fillRect(45, 15, 2, 2.5);
    ctx.fillStyle = '#ff6600';
    ctx.fillRect(46, 16, 1, 1);
  }

  _drawSmoke(ctx: CanvasRenderingContext2D, large: boolean = false): void {
    ctx.strokeStyle = 'rgba(200,200,200,0.3)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(46, 15);
    ctx.quadraticCurveTo(47, 10, 44, 5);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(200,200,200,0.2)';
    ctx.beginPath();
    ctx.moveTo(47, 14);
    ctx.quadraticCurveTo(49, 8, 46, 2);
    ctx.stroke();

    if (large) {
      ctx.strokeStyle = 'rgba(200,200,200,0.15)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(45, 12);
      ctx.quadraticCurveTo(50, 4, 44, -3);
      ctx.stroke();
      ctx.fillStyle = 'rgba(200,200,200,0.1)';
      ctx.beginPath();
      ctx.arc(46, -1, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Back arm (behind body)
  _drawBackArm(ctx: CanvasRenderingContext2D, yOff: number = 0): void {
    // Sleeve
    ctx.fillStyle = '#5b7e18';
    ctx.fillRect(12, 26 + yOff, 8, 16);
    // Cuff
    ctx.fillStyle = '#4a7018';
    ctx.fillRect(12, 40 + yOff, 8, 2);
    // Hand
    ctx.fillStyle = '#d8a87a';
    ctx.fillRect(12, 42 + yOff, 8, 6);
    // Fingers
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.lineWidth = 0.4;
    ctx.beginPath();
    ctx.moveTo(14, 44 + yOff); ctx.lineTo(14, 47 + yOff);
    ctx.moveTo(16, 44 + yOff); ctx.lineTo(16, 47 + yOff);
    ctx.stroke();
  }

  // Front arm (in front of body, holding weapon area)
  _drawFrontArm(ctx: CanvasRenderingContext2D, yOff: number = 0, extended: number = 0): void {
    // extended: 0=normal, 1=reaching forward, 2=slightly forward
    const xOff = extended * 4;
    // Sleeve
    ctx.fillStyle = '#6b8e23';
    ctx.fillRect(26 + xOff, 26 + yOff, 8, 16);
    // Cuff
    ctx.fillStyle = '#5b7e18';
    ctx.fillRect(26 + xOff, 40 + yOff, 8, 2);
    // Hand
    ctx.fillStyle = '#e8b88a';
    ctx.fillRect(28 + xOff, 42 + yOff, 8, 6);
    // Fingers
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.lineWidth = 0.4;
    ctx.beginPath();
    ctx.moveTo(30 + xOff, 44 + yOff); ctx.lineTo(30 + xOff, 47 + yOff);
    ctx.moveTo(32 + xOff, 44 + yOff); ctx.lineTo(32 + xOff, 47 + yOff);
    ctx.stroke();
  }

  // Shooting arms — one arm supports weapon, one grips trigger area
  _drawShootingArms(ctx: CanvasRenderingContext2D, phase: number): void {
    if (phase === 0) {
      // Raising — arm halfway up
      // Back arm (support hand)
      ctx.fillStyle = '#5b7e18';
      ctx.fillRect(14, 24, 8, 14);
      ctx.fillStyle = '#d8a87a';
      ctx.fillRect(14, 36, 8, 5);
      // Front arm (trigger hand) — rising
      ctx.fillStyle = '#6b8e23';
      ctx.fillRect(28, 22, 10, 14);
      ctx.fillStyle = '#5b7e18';
      ctx.fillRect(28, 34, 10, 2);
      ctx.fillStyle = '#e8b88a';
      ctx.fillRect(36, 26, 6, 8);
    } else if (phase === 1) {
      // Full recoil — arms extended forward and up
      // Back arm (supporting barrel)
      ctx.fillStyle = '#5b7e18';
      ctx.fillRect(16, 22, 8, 12);
      ctx.fillStyle = '#d8a87a';
      ctx.fillRect(16, 32, 8, 5);
      // Front arm (trigger hand) — fully extended
      ctx.fillStyle = '#6b8e23';
      ctx.fillRect(30, 20, 12, 12);
      ctx.fillStyle = '#5b7e18';
      ctx.fillRect(30, 30, 12, 2);
      ctx.fillStyle = '#e8b88a';
      ctx.fillRect(40, 22, 6, 8);
    } else {
      // Recovering
      ctx.fillStyle = '#5b7e18';
      ctx.fillRect(14, 24, 8, 14);
      ctx.fillStyle = '#d8a87a';
      ctx.fillRect(14, 36, 8, 5);
      ctx.fillStyle = '#6b8e23';
      ctx.fillRect(28, 23, 10, 14);
      ctx.fillStyle = '#5b7e18';
      ctx.fillRect(28, 35, 10, 2);
      ctx.fillStyle = '#e8b88a';
      ctx.fillRect(36, 28, 6, 8);
    }
  }

  // --- Frame generators ---

  _generateIdleFrames(): void {
    // Frame 0: standing side profile, small smoke
    this._ct('hunter_idle_0', W, H, (ctx) => {
      this._drawBackArm(ctx, 0);
      this._drawBoot(ctx, 16, 80);
      this._drawLeg(ctx, 17, 56);
      this._drawBelt(ctx);
      this._drawTorso(ctx, 0);
      this._drawFrontArm(ctx, 0, 0);
      this._drawHead(ctx, false);
      this._drawCigar(ctx);
      this._drawSmoke(ctx, false);
    });

    // Frame 1: breathing, larger smoke
    this._ct('hunter_idle_1', W, H, (ctx) => {
      this._drawBackArm(ctx, 0);
      this._drawBoot(ctx, 16, 80);
      this._drawLeg(ctx, 17, 56);
      this._drawBelt(ctx);
      this._drawTorso(ctx, 1);
      this._drawFrontArm(ctx, 0, 0);
      this._drawHead(ctx, false);
      this._drawCigar(ctx);
      this._drawSmoke(ctx, true);
    });
  }

  _generateWalkFrames(): void {
    // Frame 0: left leg forward
    this._ct('hunter_walk_0', W, H, (ctx) => {
      this._drawBackArm(ctx, -3);
      this._drawBoot(ctx, 12, 82);
      this._drawLeg(ctx, 13, 56);
      // Back leg (behind)
      ctx.fillStyle = '#4a5e28';
      ctx.fillRect(22, 58, 9, 24);
      this._drawBoot(ctx, 21, 78);
      this._drawBelt(ctx);
      this._drawTorso(ctx, 0);
      this._drawFrontArm(ctx, 3, 0);
      this._drawHead(ctx, false);
      this._drawCigar(ctx);
      this._drawSmoke(ctx, false);
    });

    // Frame 1: legs centered
    this._ct('hunter_walk_1', W, H, (ctx) => {
      this._drawBackArm(ctx, 0);
      this._drawBoot(ctx, 16, 80);
      this._drawLeg(ctx, 17, 56);
      this._drawBelt(ctx);
      this._drawTorso(ctx, 0);
      this._drawFrontArm(ctx, 0, 0);
      this._drawHead(ctx, false);
      this._drawCigar(ctx);
      this._drawSmoke(ctx, false);
    });

    // Frame 2: right leg forward
    this._ct('hunter_walk_2', W, H, (ctx) => {
      this._drawBackArm(ctx, 3);
      // Back leg (behind)
      ctx.fillStyle = '#4a5e28';
      ctx.fillRect(13, 58, 9, 24);
      this._drawBoot(ctx, 12, 78);
      this._drawBoot(ctx, 20, 82);
      this._drawLeg(ctx, 21, 56);
      this._drawBelt(ctx);
      this._drawTorso(ctx, 0);
      this._drawFrontArm(ctx, -3, 0);
      this._drawHead(ctx, false);
      this._drawCigar(ctx);
      this._drawSmoke(ctx, false);
    });
  }

  _generateShootFrames(): void {
    // Frame 0: arms raising
    this._ct('hunter_shoot_0', W, H, (ctx) => {
      this._drawBoot(ctx, 14, 80);
      // Back leg slightly behind
      ctx.fillStyle = '#4a5e28';
      ctx.fillRect(20, 58, 9, 24);
      this._drawBoot(ctx, 19, 80);
      this._drawLeg(ctx, 15, 56);
      this._drawBelt(ctx);
      this._drawTorso(ctx, 0);
      this._drawShootingArms(ctx, 0);
      this._drawHead(ctx, false);
      this._drawCigar(ctx);
      this._drawSmoke(ctx, false);
    });

    // Frame 1: full recoil, squinting
    this._ct('hunter_shoot_1', W, H, (ctx) => {
      this._drawBoot(ctx, 14, 80);
      ctx.fillStyle = '#4a5e28';
      ctx.fillRect(20, 58, 9, 24);
      this._drawBoot(ctx, 19, 80);
      this._drawLeg(ctx, 15, 56);
      this._drawBelt(ctx);
      this._drawTorso(ctx, 0);
      this._drawShootingArms(ctx, 1);
      this._drawHead(ctx, true);
      this._drawCigar(ctx);
      this._drawSmoke(ctx, false);
    });

    // Frame 2: recovering
    this._ct('hunter_shoot_2', W, H, (ctx) => {
      this._drawBoot(ctx, 15, 80);
      ctx.fillStyle = '#4a5e28';
      ctx.fillRect(20, 58, 9, 24);
      this._drawBoot(ctx, 19, 80);
      this._drawLeg(ctx, 16, 56);
      this._drawBelt(ctx);
      this._drawTorso(ctx, 0);
      this._drawShootingArms(ctx, 2);
      this._drawHead(ctx, false);
      this._drawCigar(ctx);
      this._drawSmoke(ctx, false);
    });
  }
}
