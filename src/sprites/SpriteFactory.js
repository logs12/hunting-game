export class SpriteFactory {
  constructor(scene) {
    this.scene = scene;
  }

  createTexture(key, width, height, drawFn, scale) {
    const s = scale || 1;
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(width * s);
    canvas.height = Math.round(height * s);
    const ctx = canvas.getContext('2d');
    if (s !== 1) ctx.scale(s, s);
    drawFn(ctx, width, height);
    this.scene.textures.addCanvas(key, canvas);
  }

  hexToRgb(hex) {
    const r = (hex >> 16) & 0xff;
    const g = (hex >> 8) & 0xff;
    const b = hex & 0xff;
    return `rgb(${r},${g},${b})`;
  }

  hexToRgba(hex, a) {
    const r = (hex >> 16) & 0xff;
    const g = (hex >> 8) & 0xff;
    const b = hex & 0xff;
    return `rgba(${r},${g},${b},${a})`;
  }
}
