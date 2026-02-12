import { GAME } from '../constants.js';

export class Hunter {
  constructor(scene) {
    this.scene = scene;
    this.sprite = scene.add.sprite(40, GAME.GROUND_BOTTOM - 30, 'hunter');
    this.sprite.setOrigin(0.5, 0.5);
    this.sprite.setDepth(10);
    this.shooting = false;

    // Weapon sprite — отдельный объект, меняется при смене оружия
    this.weaponSprite = scene.add.sprite(0, 0, 'weapon_pistol');
    this.weaponSprite.setOrigin(0, 0.5);
    this.weaponSprite.setDepth(11);
    this._updateWeaponPos();
  }

  setWeapon(key) {
    this.weaponSprite.setTexture('weapon_' + key);
  }

  moveTo(y) {
    this.sprite.y = Math.max(GAME.GROUND_TOP, Math.min(GAME.GROUND_BOTTOM, y));
    this._updateWeaponPos();
  }

  moveBy(dy) {
    this.sprite.y = Math.max(GAME.GROUND_TOP, Math.min(GAME.GROUND_BOTTOM, this.sprite.y + dy));
    this._updateWeaponPos();
  }

  shoot(duration) {
    this.shooting = true;
    this.sprite.setTexture('hunter_shoot');
    this._updateWeaponPos();
    const dur = duration || 150;
    this.scene.time.delayedCall(dur, () => {
      if (this.sprite.active) {
        this.sprite.setTexture('hunter');
        this.shooting = false;
        this._updateWeaponPos();
      }
    });
  }

  getMuzzlePosition() {
    return {
      x: this.weaponSprite.x + this.weaponSprite.width,
      y: this.weaponSprite.y,
    };
  }

  _updateWeaponPos() {
    if (this.shooting) {
      // Рука вытянута при выстреле
      this.weaponSprite.x = this.sprite.x + 22;
      this.weaponSprite.y = this.sprite.y - 10;
    } else {
      // Обычная поза
      this.weaponSprite.x = this.sprite.x + 16;
      this.weaponSprite.y = this.sprite.y;
    }
  }

  destroy() {
    this.sprite.destroy();
    this.weaponSprite.destroy();
  }
}
