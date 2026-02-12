import Phaser from 'phaser';
import { HunterSprite } from '../sprites/HunterSprite.js';
import { AnimalSprites } from '../sprites/AnimalSprites.js';
import { WeaponSprites } from '../sprites/WeaponSprites.js';
import { EffectSprites } from '../sprites/EffectSprites.js';
import { GAME, ANIMALS } from '../constants.js';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create() {
    // Loading text
    const text = this.add.text(GAME.WIDTH / 2, GAME.HEIGHT / 2, 'Loading...', {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffffff',
    });
    text.setOrigin(0.5);

    // Only generate sprites and animations on first boot
    if (!this.textures.exists('hunter_idle_0')) {
      new HunterSprite(this).generate();
      new WeaponSprites(this).generate();
      new EffectSprites(this).generate();
      new AnimalSprites(this).generate();

      // Register walk animations for all animals
      const frameRates = {
        rabbit: 10, fox: 9, deer: 7, boar: 10, wolf: 11,
        bear: 5, eagle: 6, snake: 8, moose: 5, pheasant: 10,
      };
      for (const key of Object.keys(ANIMALS)) {
        this.anims.create({
          key: `${key}_walk`,
          frames: [
            { key: `${key}_walk_0` },
            { key: `${key}_walk_1` },
            { key: `${key}_walk_2` },
            { key: `${key}_walk_1` },
          ],
          frameRate: frameRates[key] || 8,
          repeat: -1,
        });
      }

      // Register hunter animations
      this.anims.create({
        key: 'hunter_idle',
        frames: [{ key: 'hunter_idle_0' }, { key: 'hunter_idle_1' }],
        frameRate: 2,
        repeat: -1,
      });
      this.anims.create({
        key: 'hunter_walking',
        frames: [
          { key: 'hunter_walk_0' }, { key: 'hunter_walk_1' },
          { key: 'hunter_walk_2' }, { key: 'hunter_walk_1' },
        ],
        frameRate: 8,
        repeat: -1,
      });
      this.anims.create({
        key: 'hunter_shooting',
        frames: [
          { key: 'hunter_shoot_0' }, { key: 'hunter_shoot_1' },
          { key: 'hunter_shoot_2' },
        ],
        frameRate: 12,
        repeat: 0,
      });
    }

    // Always regenerate background (dimensions may change on orientation switch)
    if (this.textures.exists('background')) {
      this.textures.remove('background');
    }
    this._generateBackground();

    // Proceed to menu
    this.time.delayedCall(200, () => {
      this.scene.start('Menu');
    });
  }

  _generateBackground() {
    const W = GAME.WIDTH;
    const H = GAME.HEIGHT;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    const gRatio = GAME.GROUND_TOP / H;

    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, GAME.GROUND_TOP);
    skyGrad.addColorStop(0, '#4a90d9');
    skyGrad.addColorStop(1, '#87CEEB');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, GAME.GROUND_TOP);

    // Clouds (proportional positions)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    this._drawCloud(ctx, W * 0.14, 40, 30);
    this._drawCloud(ctx, W * 0.50, 60, 25);
    this._drawCloud(ctx, W * 0.78, 30, 28);
    this._drawCloud(ctx, W * 0.33, 90, 20);

    // Mountains (far) — proportional X positions
    ctx.fillStyle = '#6b8e7b';
    ctx.beginPath();
    ctx.moveTo(0, H * (gRatio * 0.85));
    ctx.lineTo(W * 0.17, H * (gRatio * 0.5));
    ctx.lineTo(W * 0.33, H * (gRatio * 0.78));
    ctx.lineTo(W * 0.56, H * (gRatio * 0.4));
    ctx.lineTo(W * 0.78, H * (gRatio * 0.7));
    ctx.lineTo(W * 0.94, H * (gRatio * 0.45));
    ctx.lineTo(W, H * (gRatio * 0.72));
    ctx.lineTo(W, GAME.GROUND_TOP);
    ctx.lineTo(0, GAME.GROUND_TOP);
    ctx.fill();

    // Hills (near) — proportional X positions
    ctx.fillStyle = '#5a9e3e';
    ctx.beginPath();
    ctx.moveTo(0, H * (gRatio * 0.95));
    ctx.quadraticCurveTo(W * 0.25, H * (gRatio * 0.82), W * 0.50, H * (gRatio * 0.95));
    ctx.quadraticCurveTo(W * 0.75, H * (gRatio * 0.87), W, H * (gRatio * 0.92));
    ctx.lineTo(W, GAME.GROUND_TOP);
    ctx.lineTo(0, GAME.GROUND_TOP);
    ctx.fill();

    // Ground
    const groundGrad = ctx.createLinearGradient(0, GAME.GROUND_TOP, 0, H);
    groundGrad.addColorStop(0, '#4a7a2e');
    groundGrad.addColorStop(1, '#3a6a1e');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, GAME.GROUND_TOP, W, H - GAME.GROUND_TOP);

    // Grass tufts
    ctx.strokeStyle = '#5a9a3e';
    ctx.lineWidth = 2;
    for (let i = 0; i < 40; i++) {
      const gx = Math.random() * W;
      const gy = GAME.GROUND_TOP + Math.random() * (GAME.GROUND_BOTTOM - GAME.GROUND_TOP);
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.lineTo(gx - 3, gy - 8);
      ctx.moveTo(gx, gy);
      ctx.lineTo(gx + 3, gy - 7);
      ctx.stroke();
    }

    this.textures.addCanvas('background', canvas);
  }

  _drawCloud(ctx, x, y, size) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.arc(x + size * 0.8, y - size * 0.2, size * 0.7, 0, Math.PI * 2);
    ctx.arc(x + size * 1.4, y, size * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }
}
