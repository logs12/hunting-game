import Phaser from 'phaser';
import { GAME, WEAPONS } from '../constants.js';

export class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, targetX, targetY, weaponKey) {
    const config = WEAPONS[weaponKey];
    const textureKey = weaponKey === 'rocket' ? 'rocket_proj'
      : weaponKey === 'shotgun' ? 'pellet'
      : 'bullet';

    super(scene, x, y, textureKey);

    scene.add.existing(this);
    // НЕ вызываем scene.physics.add.existing — группа сама создаст body

    this.weaponKey = weaponKey;
    this.damage = config.damage;
    this.aoe = config.aoe;
    this.setDepth(8);

    // Calculate direction to target (сохраняем для activatePhysics)
    const angle = Phaser.Math.Angle.Between(x, y, targetX, targetY);
    const spread = config.spread ? Phaser.Math.DegToRad(Phaser.Math.Between(-config.spread, config.spread)) : 0;
    this._finalAngle = angle + spread;
    this._speed = weaponKey === 'rocket' ? 350 : 600;
  }

  // Вызывается ПОСЛЕ group.add() — когда body уже создан группой
  activatePhysics() {
    this.body.setAllowGravity(false);
    this.setVelocity(
      Math.cos(this._finalAngle) * this._speed,
      Math.sin(this._finalAngle) * this._speed
    );
    this.setRotation(this._finalAngle);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    // Remove if off screen
    if (this.x < -20 || this.x > GAME.WIDTH + 20 ||
        this.y < -20 || this.y > GAME.HEIGHT + 20) {
      this.destroy();
    }
  }
}
