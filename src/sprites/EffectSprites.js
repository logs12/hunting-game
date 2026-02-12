import { SpriteFactory } from './SpriteFactory.js';

export class EffectSprites extends SpriteFactory {
  generate() {
    // Muzzle flash
    this.createTexture('muzzle_flash', 20, 16, (ctx) => {
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(10, 8, 10, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffff00';
      ctx.beginPath();
      ctx.ellipse(8, 8, 7, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffaa00';
      ctx.beginPath();
      ctx.ellipse(6, 8, 4, 3, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // Blood particle
    this.createTexture('blood', 6, 6, (ctx) => {
      ctx.fillStyle = '#cc0000';
      ctx.beginPath();
      ctx.arc(3, 3, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Explosion
    this.createTexture('explosion', 48, 48, (ctx) => {
      // Outer
      const grad = ctx.createRadialGradient(24, 24, 4, 24, 24, 24);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.3, '#ffff00');
      grad.addColorStop(0.6, '#ff6600');
      grad.addColorStop(1, 'rgba(255, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 48, 48);
    });

    // Hit spark
    this.createTexture('spark', 4, 4, (ctx) => {
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(2, 2, 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // Blood pool under carcasses
    this.createTexture('blood_pool', 32, 10, (ctx) => {
      const grad = ctx.createRadialGradient(16, 5, 2, 16, 5, 14);
      grad.addColorStop(0, '#880000');
      grad.addColorStop(0.6, '#aa0000');
      grad.addColorStop(1, 'rgba(100,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(16, 5, 15, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // Simple white particle for generic effects
    this.createTexture('particle', 3, 3, (ctx) => {
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, 3, 3);
    });
  }
}
