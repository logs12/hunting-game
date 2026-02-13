import Phaser from 'phaser';
import { HunterSprite } from '../sprites/HunterSprite';
import { AnimalSprites } from '../sprites/AnimalSprites';
import { AnimalSpritesT1 } from '../sprites/AnimalSpritesT1';
import { AnimalSpritesT2 } from '../sprites/AnimalSpritesT2';
import { AnimalSpritesT3 } from '../sprites/AnimalSpritesT3';
import { AnimalSpritesT4 } from '../sprites/AnimalSpritesT4';
import { AnimalSpritesT5 } from '../sprites/AnimalSpritesT5';
import { WeaponSprites } from '../sprites/WeaponSprites';
import { EffectSprites } from '../sprites/EffectSprites';
import { GAME, ANIMALS } from '../constants';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create() {
    const text = this.add.text(GAME.WIDTH / 2, GAME.HEIGHT / 2, 'Loading...', {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffffff',
    });
    text.setOrigin(0.5);

    if (!this.textures.exists('hunter_idle_0')) {
      new HunterSprite(this).generate();
      new WeaponSprites(this).generate();
      new EffectSprites(this).generate();
      new AnimalSprites(this).generate();
      new AnimalSpritesT1(this).generate();
      new AnimalSpritesT2(this).generate();
      new AnimalSpritesT3(this).generate();
      new AnimalSpritesT4(this).generate();
      new AnimalSpritesT5(this).generate();

      // Register walk animations for all animals
      const frameRates: Record<string, number> = {
        rabbit: 10, fox: 9, deer: 7, boar: 10, wolf: 11,
        bear: 5, eagle: 6, snake: 8, moose: 5, pheasant: 10,
        // Tier 1
        sparrow: 12, mouse: 14, frog: 6,
        // Tier 2
        duck: 8, crow: 10, hare: 12, raccoon: 8, turkey: 6, badger: 7,
        // Tier 3
        lynx: 10, hawk: 8, coyote: 11, goose: 7, porcupine: 5,
        wolverine: 9, owl: 7, ram: 7,
        // Tier 4
        tiger: 8, bison: 5, condor: 6, panther: 10, elk: 5,
        vulture: 6, alligator: 6,
        // Tier 5
        rhino: 7, hippo: 4, gorilla: 6, golden_eagle: 7,
        mammoth: 4, dragon: 6,
      };
      for (const key of Object.keys(ANIMALS)) {
        this.anims.create({
          key: `${key}_walk`,
          frames: [
            { key: `${key}_walk_0` },
            { key: `${key}_walk_1` },
            { key: `${key}_walk_2` },
            { key: `${key}_walk_3` },
            { key: `${key}_walk_4` },
            { key: `${key}_walk_3` },
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

    if (this.textures.exists('background')) {
      this.textures.remove('background');
    }
    this._generateBackground();

    this.time.delayedCall(200, () => {
      this.scene.start('Menu');
    });
  }

  _generateBackground(): void {
    const W = GAME.WIDTH;
    const H = GAME.HEIGHT;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;

    const gRatio = GAME.GROUND_TOP / H;

    const skyGrad = ctx.createLinearGradient(0, 0, 0, GAME.GROUND_TOP);
    skyGrad.addColorStop(0, '#4a90d9');
    skyGrad.addColorStop(1, '#87CEEB');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, GAME.GROUND_TOP);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    this._drawCloud(ctx, W * 0.14, 40, 30);
    this._drawCloud(ctx, W * 0.50, 60, 25);
    this._drawCloud(ctx, W * 0.78, 30, 28);
    this._drawCloud(ctx, W * 0.33, 90, 20);

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

    ctx.fillStyle = '#5a9e3e';
    ctx.beginPath();
    ctx.moveTo(0, H * (gRatio * 0.95));
    ctx.quadraticCurveTo(W * 0.25, H * (gRatio * 0.82), W * 0.50, H * (gRatio * 0.95));
    ctx.quadraticCurveTo(W * 0.75, H * (gRatio * 0.87), W, H * (gRatio * 0.92));
    ctx.lineTo(W, GAME.GROUND_TOP);
    ctx.lineTo(0, GAME.GROUND_TOP);
    ctx.fill();

    const groundGrad = ctx.createLinearGradient(0, GAME.GROUND_TOP, 0, H);
    groundGrad.addColorStop(0, '#4a7a2e');
    groundGrad.addColorStop(1, '#3a6a1e');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, GAME.GROUND_TOP, W, H - GAME.GROUND_TOP);

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

  _drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.arc(x + size * 0.8, y - size * 0.2, size * 0.7, 0, Math.PI * 2);
    ctx.arc(x + size * 1.4, y, size * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }
}
