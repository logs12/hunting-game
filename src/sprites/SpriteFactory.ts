export class SpriteFactory {
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  createTexture(key: string, width: number, height: number, drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number) => void, scale?: number): void {
    const s = scale || 1;
    const targetW = Math.round(width * s);
    const targetH = Math.round(height * s);

    if (s !== 1) {
      // Two-step approach: draw at 1x (integer pixels), then downscale with nearest-neighbor.
      // This avoids anti-aliased shapes at fractional positions from ctx.scale().
      const srcCanvas = document.createElement('canvas');
      srcCanvas.width = width;
      srcCanvas.height = height;
      const srcCtx = srcCanvas.getContext('2d')!;
      srcCtx.imageSmoothingEnabled = false;
      drawFn(srcCtx, width, height);

      const dstCanvas = document.createElement('canvas');
      dstCanvas.width = targetW;
      dstCanvas.height = targetH;
      const dstCtx = dstCanvas.getContext('2d')!;
      dstCtx.imageSmoothingEnabled = true;
      dstCtx.imageSmoothingQuality = 'high';
      dstCtx.drawImage(srcCanvas, 0, 0, targetW, targetH);

      if (key === 'hunter_idle_0' || key === 'fox_walk_0') {
        console.log(`[DIAG] Texture '${key}': src ${width}x${height} → dst ${targetW}x${targetH}, scale=${s}`);
      }

      this.scene.textures.addCanvas(key, dstCanvas);
    } else {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.imageSmoothingEnabled = false;
      drawFn(ctx, width, height);
      this.scene.textures.addCanvas(key, canvas);
    }
  }

  hexToRgb(hex: number): string {
    const r = (hex >> 16) & 0xff;
    const g = (hex >> 8) & 0xff;
    const b = hex & 0xff;
    return `rgb(${r},${g},${b})`;
  }

  hexToRgba(hex: number, a: number): string {
    const r = (hex >> 16) & 0xff;
    const g = (hex >> 8) & 0xff;
    const b = hex & 0xff;
    return `rgba(${r},${g},${b},${a})`;
  }
}
