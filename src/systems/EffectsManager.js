export class EffectsManager {
  constructor(scene) {
    this.scene = scene;

    // Переиспользуемый спрайт вспышки
    this._flash = scene.add.sprite(0, 0, 'muzzle_flash');
    this._flash.setDepth(15);
    this._flash.setVisible(false);
  }

  muzzleFlash(x, y) {
    this._flash.setPosition(x, y);
    this._flash.setVisible(true);
    this._flash.setAlpha(1);
    this._flash.setScale(1);

    // Скрываем по таймеру — надёжнее чем tween onComplete
    this.scene.time.delayedCall(100, () => {
      this._flash.setVisible(false);
    });
  }

  bloodSplatter(x, y) {
    for (let i = 0; i < 6; i++) {
      const p = this.scene.add.sprite(x, y, 'blood');
      p.setDepth(7);
      const dur = 300 + Math.random() * 200;

      // Анимация движения (если tweens работают — красиво, если нет — всё равно уберётся)
      const angle = Math.random() * Math.PI * 2;
      const dist = 20 + Math.random() * 30;
      this.scene.tweens.add({
        targets: p,
        x: x + Math.cos(angle) * dist,
        y: y + Math.sin(angle) * dist,
        alpha: 0,
        scaleX: 0.5,
        scaleY: 0.5,
        duration: dur,
      });

      // Гарантированное удаление по таймеру
      this.scene.time.delayedCall(dur + 50, () => {
        if (p.active) p.destroy();
      });
    }
  }

  explosion(x, y) {
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

  floatingText(x, y, text, color = '#ffdd00') {
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

  waveAnnouncement(waveNum) {
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

  weaponUnlockNotify(weaponName) {
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

  hitSpark(x, y) {
    for (let i = 0; i < 3; i++) {
      const s = this.scene.add.sprite(x, y, 'spark');
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

  destroy() {
    if (this._flash && this._flash.active) this._flash.destroy();
  }
}
