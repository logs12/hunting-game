import Phaser from 'phaser';
import { HunterSprite } from '../sprites/HunterSprite.js';
import { AnimalSprites } from '../sprites/AnimalSprites.js';
import { WeaponSprites } from '../sprites/WeaponSprites.js';
import { EffectSprites } from '../sprites/EffectSprites.js';
import { GAME } from '../constants.js';

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

    // Generate all textures programmatically
    new HunterSprite(this).generate();
    new WeaponSprites(this).generate();
    new EffectSprites(this).generate();
    // AnimalSprites depends on base textures existing first
    new AnimalSprites(this).generate();

    // Generate background texture
    this._generateBackground();

    // Proceed to menu
    this.time.delayedCall(200, () => {
      this.scene.start('Menu');
    });
  }

  _generateBackground() {
    const canvas = document.createElement('canvas');
    canvas.width = GAME.WIDTH;
    canvas.height = GAME.HEIGHT;
    const ctx = canvas.getContext('2d');

    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, GAME.HEIGHT * 0.7);
    skyGrad.addColorStop(0, '#4a90d9');
    skyGrad.addColorStop(1, '#87CEEB');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, GAME.WIDTH, GAME.HEIGHT * 0.7);

    // Clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    this._drawCloud(ctx, 50, 60, 40);
    this._drawCloud(ctx, 180, 90, 30);
    this._drawCloud(ctx, 280, 40, 35);
    this._drawCloud(ctx, 120, 140, 25);

    // Mountains (far)
    ctx.fillStyle = '#6b8e7b';
    ctx.beginPath();
    ctx.moveTo(0, GAME.HEIGHT * 0.55);
    ctx.lineTo(60, GAME.HEIGHT * 0.35);
    ctx.lineTo(120, GAME.HEIGHT * 0.5);
    ctx.lineTo(200, GAME.HEIGHT * 0.3);
    ctx.lineTo(280, GAME.HEIGHT * 0.45);
    ctx.lineTo(340, GAME.HEIGHT * 0.32);
    ctx.lineTo(GAME.WIDTH, GAME.HEIGHT * 0.48);
    ctx.lineTo(GAME.WIDTH, GAME.HEIGHT * 0.7);
    ctx.lineTo(0, GAME.HEIGHT * 0.7);
    ctx.fill();

    // Hills (near)
    ctx.fillStyle = '#5a9e3e';
    ctx.beginPath();
    ctx.moveTo(0, GAME.HEIGHT * 0.65);
    ctx.quadraticCurveTo(90, GAME.HEIGHT * 0.55, 180, GAME.HEIGHT * 0.65);
    ctx.quadraticCurveTo(270, GAME.HEIGHT * 0.58, GAME.WIDTH, GAME.HEIGHT * 0.63);
    ctx.lineTo(GAME.WIDTH, GAME.HEIGHT * 0.7);
    ctx.lineTo(0, GAME.HEIGHT * 0.7);
    ctx.fill();

    // Ground
    const groundGrad = ctx.createLinearGradient(0, GAME.HEIGHT * 0.7, 0, GAME.HEIGHT);
    groundGrad.addColorStop(0, '#4a7a2e');
    groundGrad.addColorStop(1, '#3a6a1e');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, GAME.HEIGHT * 0.7, GAME.WIDTH, GAME.HEIGHT * 0.3);

    // Grass tufts
    ctx.strokeStyle = '#5a9a3e';
    ctx.lineWidth = 2;
    for (let i = 0; i < 30; i++) {
      const gx = Math.random() * GAME.WIDTH;
      const gy = GAME.HEIGHT * 0.7 + Math.random() * (GAME.HEIGHT * 0.25);
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
