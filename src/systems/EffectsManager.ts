import { GAME, ANIMALS } from '../constants';

export class EffectsManager {
  scene: Phaser.Scene;
  _flash: Phaser.GameObjects.Sprite;
  bloodField: Phaser.GameObjects.RenderTexture;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    // Persistent blood field — RenderTexture covers ONLY ground area.
    // Positioned at (0, GROUND_TOP) so nothing can render above the grass line.
    // All draw coordinates use local space: localY = screenY - GROUND_TOP.
    this.bloodField = scene.add.renderTexture(0, GAME.GROUND_TOP, GAME.WIDTH, GAME.HEIGHT - GAME.GROUND_TOP).setOrigin(0, 0).setDepth(2);
    console.log('[DIAG] bloodField pos:', this.bloodField.x, this.bloodField.y,
      'size:', this.bloodField.width, this.bloodField.height,
      'origin:', this.bloodField.originX, this.bloodField.originY);

    // Переиспользуемый спрайт вспышки
    this._flash = scene.add.sprite(0, 0, 'muzzle_flash');
    this._flash.setDepth(15);
    this._flash.setVisible(false);
  }

  muzzleFlash(x: number, y: number, weaponKey: string): void {
    // Scale flash based on weapon type
    const bigFlash = ['rocket', 'rpg', 'grenade_launcher', 'flamethrower'];
    const medFlash = ['shotgun', 'doublebarrel', 'auto_shotgun', 'heavy_mg', 'minigun', 'assault_rifle', 'sniper'];
    let scale = 0.35;
    if (bigFlash.includes(weaponKey)) scale = 0.6;
    else if (medFlash.includes(weaponKey)) scale = 0.45;

    this._flash.setPosition(x, y);
    this._flash.setVisible(true);
    this._flash.setAlpha(1);
    this._flash.setScale(scale);

    this.scene.time.delayedCall(80, () => {
      this._flash.setVisible(false);
    });
  }

  _stampCount = 0;
  stampBlood(x: number, y: number, key: string = 'blood', scaleX = 1, scaleY = 1, alpha = 0.8): void {
    // Clamp Y to ground area, then convert to bloodField local space
    const clampedY = Math.max(GAME.GROUND_TOP, Math.min(y, GAME.GROUND_BOTTOM));
    const localY = clampedY - GAME.GROUND_TOP;
    // Log first 20 stamps for debugging
    if (this._stampCount < 20) {
      console.log(`[DIAG] stampBlood #${this._stampCount}: input y=${y.toFixed(0)}, clamped=${clampedY.toFixed(0)}, localY=${localY.toFixed(0)}, key=${key}`);
      this._stampCount++;
    }
    const stamp = this.scene.make.sprite({ x: 0, y: 0, key, add: false });
    stamp.setOrigin(0.5, 0);  // Top-aligned so nothing draws above the stamp point
    stamp.setScale(scaleX, scaleY).setAlpha(alpha);
    this.bloodField.draw(stamp, x, localY);
    stamp.destroy();
  }

  bloodSplatter(x: number, y: number): void {
    // Clamp starting position — no blood above ground
    const safeY = Math.max(GAME.GROUND_TOP, y);
    for (let i = 0; i < 6; i++) {
      const p = this.scene.add.sprite(x, safeY, 'blood');
      p.setDepth(7);
      const dur = 300 + Math.random() * 200;

      // Blood flies downward/horizontal, never upward
      // Angle range: PI*0.1 to PI*0.9 (mostly down + sideways)
      const angle = Math.PI * 0.1 + Math.random() * Math.PI * 0.8;
      const dist = 20 + Math.random() * 30;
      const endX = x + Math.cos(angle) * dist * (Math.random() > 0.5 ? 1 : -1);
      const endY = Math.max(GAME.GROUND_TOP, Math.min(safeY + Math.sin(angle) * dist, GAME.GROUND_BOTTOM));
      this.scene.tweens.add({
        targets: p,
        x: endX,
        y: endY,
        alpha: 0,
        scaleX: 0.5,
        scaleY: 0.5,
        duration: dur,
      });

      // Stamp blood at splatter end position
      this.stampBlood(endX, endY, 'blood', 0.4 + Math.random() * 0.3, 0.4 + Math.random() * 0.3, 0.6);

      // Гарантированное удаление по таймеру
      this.scene.time.delayedCall(dur + 50, () => {
        if (p.active) p.destroy();
      });
    }
  }

  explosion(x: number, y: number): void {
    const exp = this.scene.add.sprite(x, y, 'explosion');
    exp.setDepth(15);
    exp.setScale(0.5);

    this.scene.tweens.add({
      targets: exp,
      scaleX: 2,
      scaleY: 2,
      alpha: 0,
      duration: 400,
      ease: 'Power2',
    });
    this.scene.time.delayedCall(450, () => {
      if (exp.active) exp.destroy();
    });

    this.scene.cameras.main.shake(200, 0.01);

    for (let i = 0; i < 10; i++) {
      const s = this.scene.add.sprite(x, y, 'spark');
      s.setDepth(16);
      const angle = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * 50;
      const dur = 300 + Math.random() * 200;

      this.scene.tweens.add({
        targets: s,
        x: x + Math.cos(angle) * dist,
        y: y + Math.sin(angle) * dist,
        alpha: 0,
        duration: dur,
      });
      this.scene.time.delayedCall(dur + 50, () => {
        if (s.active) s.destroy();
      });
    }
  }

  floatingText(x: number, y: number, text: string, color: string = '#ffdd00'): void {
    const txt = this.scene.add.text(x, y, text, {
      fontSize: '18px',
      fontFamily: 'Arial',
      color: color,
      fontStyle: 'bold',
      stroke: '#000',
      strokeThickness: 3,
    });
    txt.setOrigin(0.5);
    txt.setDepth(20);

    this.scene.tweens.add({
      targets: txt,
      y: y - 50,
      alpha: 0,
      duration: 800,
      ease: 'Power2',
    });
    this.scene.time.delayedCall(850, () => {
      if (txt.active) txt.destroy();
    });
  }

  waveAnnouncement(waveNum: number): void {
    const txt = this.scene.add.text(
      this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY - 40,
      `WAVE ${waveNum}`,
      {
        fontSize: '48px',
        fontFamily: 'Arial',
        color: '#ffffff',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 6,
      }
    );
    txt.setOrigin(0.5);
    txt.setDepth(30);
    txt.setScale(0);

    this.scene.tweens.add({
      targets: txt,
      scaleX: 1,
      scaleY: 1,
      duration: 300,
      ease: 'Back.easeOut',
    });

    // Через 1.5с начинаем исчезать, через 2с удаляем
    this.scene.time.delayedCall(1500, () => {
      this.scene.tweens.add({
        targets: txt,
        alpha: 0,
        y: txt.y - 30,
        duration: 400,
      });
    });
    this.scene.time.delayedCall(2000, () => {
      if (txt.active) txt.destroy();
    });
  }

  weaponUnlockNotify(weaponName: string): void {
    const txt = this.scene.add.text(
      this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY + 20,
      `NEW: ${weaponName}!`,
      {
        fontSize: '28px',
        fontFamily: 'Arial',
        color: '#00ff00',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 4,
      }
    );
    txt.setOrigin(0.5);
    txt.setDepth(30);

    this.scene.tweens.add({
      targets: txt,
      y: txt.y - 40,
      alpha: 0,
      duration: 2000,
      ease: 'Power1',
    });
    this.scene.time.delayedCall(2050, () => {
      if (txt.active) txt.destroy();
    });
  }

  headshotEffect(x: number, y: number): void {
    // Clamp — no blood effects above ground
    const safeY = Math.max(GAME.GROUND_TOP, y);
    const text = this.scene.add.text(x, safeY - 10, 'HEADSHOT!', {
      fontFamily: 'monospace',
      fontSize: '11px',
      color: '#ff3333',
      fontStyle: 'bold',
      stroke: '#000',
      strokeThickness: 2,
    }).setOrigin(0.5).setDepth(15);

    this.scene.tweens.add({
      targets: text,
      y: safeY - 40,
      alpha: 0,
      duration: 800,
    });
    this.scene.time.delayedCall(900, () => {
      if (text.active) text.destroy();
    });

    // Extra blood particles for headshot — spray outward/downward
    for (let i = 0; i < 8; i++) {
      const p = this.scene.add.sprite(x, safeY, 'blood');
      p.setDepth(7);
      // Mostly sideways and downward, slight upward allowed
      const angle = Math.PI * -0.2 + Math.random() * Math.PI * 1.4;
      const dist = 20 + Math.random() * 35;
      const dur = 300 + Math.random() * 200;
      const endX = x + Math.cos(angle) * dist * (Math.random() > 0.5 ? 1 : -1);
      const endY = Math.max(GAME.GROUND_TOP, Math.min(safeY + Math.sin(angle) * dist, GAME.GROUND_BOTTOM));
      this.scene.tweens.add({
        targets: p,
        x: endX,
        y: endY,
        alpha: 0,
        scaleX: 0.4,
        scaleY: 0.4,
        duration: dur,
      });
      this.stampBlood(endX, endY, 'blood', 0.3 + Math.random() * 0.3, 0.3 + Math.random() * 0.3, 0.5);
      this.scene.time.delayedCall(dur + 50, () => {
        if (p.active) p.destroy();
      });
    }
  }

  headDetach(x: number, y: number, animalColor: number): void {
    // Clamp starting position to ground area
    const safeY = Math.max(GAME.GROUND_TOP, y);
    const head = this.scene.add.sprite(x, safeY, 'head_chunk');
    head.setDepth(8);
    head.setTint(animalColor);

    // Arc trajectory: toss upward then fall to ground
    const dirX = (Math.random() > 0.5 ? 1 : -1) * (30 + Math.random() * 40);
    const landX = x + dirX;
    const landY = GAME.GROUND_BOTTOM;
    const duration = 600 + Math.random() * 200;

    // Horizontal linear motion
    this.scene.tweens.add({
      targets: head,
      x: landX,
      duration,
      ease: 'Linear',
    });

    // Vertical parabolic arc (up then down)
    this.scene.tweens.add({
      targets: head,
      y: Math.max(GAME.GROUND_TOP, safeY - 40 - Math.random() * 20),
      duration: duration * 0.4,
      ease: 'Sine.easeOut',
      onComplete: () => {
        this.scene.tweens.add({
          targets: head,
          y: landY,
          duration: duration * 0.6,
          ease: 'Sine.easeIn',
        });
      },
    });

    // Spin rotation
    this.scene.tweens.add({
      targets: head,
      angle: 360 * (Math.random() > 0.5 ? 1 : -1),
      duration,
      ease: 'Linear',
    });

    // On landing: stamp blood and head permanently onto bloodField, then remove sprite
    this.scene.time.delayedCall(duration + 50, () => {
      if (!head.active) return;
      this.stampBlood(head.x, landY, 'blood', 0.6, 0.4, 0.7);
      // Stamp the head chunk permanently (convert to bloodField local space)
      const localLandY = landY - GAME.GROUND_TOP;
      const stamp = this.scene.make.sprite({ x: 0, y: 0, key: 'head_chunk', add: false });
      stamp.setTint(animalColor);
      stamp.setAngle(head.angle);
      this.bloodField.draw(stamp, head.x, localLandY);
      stamp.destroy();
      head.destroy();
    });
  }

  /** Gib explosion on headshot kill — body chunks scatter, fall, stay permanently */
  gibs(x: number, y: number, animalColor: number): void {
    // Clamp — gibs start at ground level minimum
    const safeY = Math.max(GAME.GROUND_TOP, y);
    const count = 4 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      const chunk = this.scene.add.sprite(x, safeY, 'body_chunk');
      chunk.setDepth(8);
      chunk.setTint(animalColor);
      chunk.setScale(0.6 + Math.random() * 0.6);

      // Scatter: mostly sideways and downward
      const dirX = (Math.random() - 0.5) * 2 * (40 + Math.random() * 50);
      const landX = x + dirX;
      const landY = GAME.GROUND_BOTTOM - Math.random() * 5;
      const duration = 400 + Math.random() * 400;

      // Horizontal
      this.scene.tweens.add({
        targets: chunk,
        x: landX,
        duration,
        ease: 'Linear',
      });

      // Vertical arc: slight up then fall
      const peakY = Math.max(GAME.GROUND_TOP, safeY - 10 - Math.random() * 25);
      this.scene.tweens.add({
        targets: chunk,
        y: peakY,
        duration: duration * 0.35,
        ease: 'Sine.easeOut',
        onComplete: () => {
          this.scene.tweens.add({
            targets: chunk,
            y: landY,
            duration: duration * 0.65,
            ease: 'Sine.easeIn',
          });
        },
      });

      // Spin
      this.scene.tweens.add({
        targets: chunk,
        angle: (Math.random() - 0.5) * 720,
        duration,
        ease: 'Linear',
      });

      // On landing: stamp chunk and blood permanently, remove sprite
      this.scene.time.delayedCall(duration + 50, () => {
        if (!chunk.active) return;
        // Stamp blood at landing
        this.stampBlood(chunk.x, landY, 'blood', 0.3 + Math.random() * 0.3, 0.3 + Math.random() * 0.2, 0.6);
        // Stamp the body chunk permanently (convert to bloodField local space)
        const localLY = landY - GAME.GROUND_TOP;
        const stamp = this.scene.make.sprite({ x: 0, y: 0, key: 'body_chunk', add: false });
        stamp.setTint(animalColor);
        stamp.setScale(chunk.scaleX, chunk.scaleY);
        stamp.setAngle(chunk.angle);
        this.bloodField.draw(stamp, chunk.x, localLY);
        stamp.destroy();
        chunk.destroy();
      });
    }

    // Blood splatters at the explosion point (the carcass will stamp its own pool where it stops)
    for (let i = 0; i < 5; i++) {
      const dx = (Math.random() - 0.5) * 40;
      const dy = Math.random() * 20;
      this.stampBlood(x + dx, Math.max(GAME.GROUND_TOP, Math.min(safeY + dy, GAME.GROUND_BOTTOM)), 'blood', 0.5 + Math.random() * 0.4, 0.4 + Math.random() * 0.3, 0.7);
    }
  }

  hitSpark(x: number, y: number): void {
    const safeY = Math.max(GAME.GROUND_TOP, y);
    for (let i = 0; i < 3; i++) {
      const s = this.scene.add.sprite(x, safeY, 'spark');
      s.setDepth(9);
      const angle = Math.random() * Math.PI * 2;

      this.scene.tweens.add({
        targets: s,
        x: x + Math.cos(angle) * 15,
        y: y + Math.sin(angle) * 15,
        alpha: 0,
        duration: 150,
      });
      this.scene.time.delayedCall(200, () => {
        if (s.active) s.destroy();
      });
    }
  }

  destroy(): void {
    if (this._flash && this._flash.active) this._flash.destroy();
    if (this.bloodField && this.bloodField.active) this.bloodField.destroy();
  }
}
