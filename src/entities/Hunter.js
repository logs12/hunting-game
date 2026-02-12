import Phaser from 'phaser';
import { GAME, WEAPONS } from '../constants.js';

export class Hunter {
  constructor(scene) {
    this.scene = scene;
    this.sprite = scene.add.sprite(30, GAME.GROUND_BOTTOM - 22, 'hunter_idle_0');
    this.sprite.setOrigin(0.5, 0.5);
    this.sprite.setDepth(10);
    this.shooting = false;
    this.currentWeapon = 'slingshot';
    this.targetY = this.sprite.y;
    this.lerpSpeed = 12;
    this.state = 'idle';

    // Weapon sprite — separate object, changes with weapon switch
    this.weaponSprite = scene.add.sprite(0, 0, 'weapon_slingshot');
    this.weaponSprite.setOrigin(0, 0.5);
    this.weaponSprite.setDepth(11);
    this._updateWeaponPos();

    // Start idle animation
    this.sprite.play('hunter_idle');
  }

  setWeapon(key) {
    this.currentWeapon = key;
    this.weaponSprite.setTexture('weapon_' + key);
  }

  setTargetY(y) {
    this.targetY = Math.max(GAME.GROUND_TOP, Math.min(GAME.GROUND_BOTTOM, y));
  }

  moveBy(dy) {
    this.targetY = Math.max(GAME.GROUND_TOP, Math.min(GAME.GROUND_BOTTOM, this.targetY + dy));
  }

  update(delta) {
    const t = 1 - Math.exp(-this.lerpSpeed * delta / 1000);
    const oldY = this.sprite.y;
    this.sprite.y = Phaser.Math.Linear(this.sprite.y, this.targetY, t);
    this._updateWeaponPos();

    // State machine — only update if not shooting
    if (!this.shooting) {
      const moving = Math.abs(this.sprite.y - oldY) > 0.5;
      if (moving && this.state !== 'walking') {
        this.state = 'walking';
        this.sprite.play('hunter_walking');
      } else if (!moving && this.state !== 'idle') {
        this.state = 'idle';
        this.sprite.play('hunter_idle');
      }
    }
  }

  shoot(duration) {
    this.shooting = true;
    this.state = 'shooting';
    this.sprite.play('hunter_shooting');
    this._updateWeaponPos();
    const dur = duration || 250;
    this.scene.time.delayedCall(dur, () => {
      if (this.sprite.active) {
        this.shooting = false;
        this.state = 'idle';
        this.sprite.play('hunter_idle');
        this._updateWeaponPos();
      }
    });
  }

  getMuzzlePosition() {
    const cfg = WEAPONS[this.currentWeapon];
    return {
      x: this.weaponSprite.x + this.weaponSprite.width,
      y: this.weaponSprite.y + (cfg.barrelOffsetY || 0),
    };
  }

  _updateWeaponPos() {
    if (this.shooting) {
      this.weaponSprite.x = this.sprite.x + 16;
      this.weaponSprite.y = this.sprite.y - 7;
    } else {
      this.weaponSprite.x = this.sprite.x + 12;
      this.weaponSprite.y = this.sprite.y;
    }
  }

  destroy() {
    this.sprite.destroy();
    this.weaponSprite.destroy();
  }
}
