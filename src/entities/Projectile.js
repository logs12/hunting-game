import Phaser from 'phaser';
import { GAME, WEAPONS } from '../constants.js';

const TEXTURE_MAP = {
  slingshot: 'pebble',
  pistol: 'bullet',
  revolver: 'bullet',
  shotgun: 'pellet',
  doublebarrel: 'pellet',
  smg: 'mg_bullet',
  rifle: 'rifle_bullet',
  crossbow: 'bolt',
  lever_rifle: 'rifle_bullet',
  machinegun: 'mg_bullet',
  hunting_rifle: 'rifle_bullet',
  auto_shotgun: 'pellet',
  sniper: 'sniper_bullet',
  flamethrower: 'flame',
  grenade_launcher: 'grenade',
  assault_rifle: 'mg_bullet',
  heavy_mg: 'heavy_bullet',
  rocket: 'rocket_proj',
  laser_rifle: 'laser_beam',
  minigun: 'mg_bullet',
  rpg: 'rpg_proj',
  railgun: 'rail_slug',
  plasma_cannon: 'plasma_ball',
  gauss_rifle: 'gauss_slug',
  tesla_cannon: 'tesla_bolt',
};

const SPEED_MAP = {
  slingshot: 500, pistol: 800, revolver: 850, shotgun: 700, doublebarrel: 650,
  smg: 850, rifle: 1000, crossbow: 900, lever_rifle: 950, machinegun: 900,
  hunting_rifle: 1100, auto_shotgun: 700, sniper: 1400, flamethrower: 400,
  grenade_launcher: 350, assault_rifle: 950, heavy_mg: 900, rocket: 400,
  laser_rifle: 2000, minigun: 900, rpg: 350, railgun: 2500,
  plasma_cannon: 600, gauss_rifle: 2000, tesla_cannon: 800,
};

export class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, targetX, targetY, weaponKey) {
    const config = WEAPONS[weaponKey];
    const textureKey = TEXTURE_MAP[weaponKey] || 'bullet';

    super(scene, x, y, textureKey);

    scene.add.existing(this);

    this.weaponKey = weaponKey;
    this.damage = config.damage;
    this.aoe = config.aoe;
    this.piercing = config.piercing || false;
    this.maxRange = config.maxRange || 0;
    this.gravity = config.gravity || 0;
    this.startX = x;
    this.setDepth(8);

    const angle = Phaser.Math.Angle.Between(x, y, targetX, targetY);
    const spread = config.spread ? Phaser.Math.DegToRad(Phaser.Math.Between(-config.spread, config.spread)) : 0;
    this._finalAngle = angle + spread;
    this._speed = SPEED_MAP[weaponKey] || 800;
  }

  activatePhysics() {
    this.body.setAllowGravity(false);
    this.setVelocity(
      Math.cos(this._finalAngle) * this._speed,
      Math.sin(this._finalAngle) * this._speed
    );
    this.setRotation(this._finalAngle);

    // Apply gravity for grenades
    if (this.gravity) {
      this.body.setAllowGravity(true);
      this.body.setGravityY(this.gravity);
    }
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    // Remove if off screen
    if (this.x < -20 || this.x > GAME.WIDTH + 20 ||
        this.y < -20 || this.y > GAME.HEIGHT + 20) {
      this.destroy();
      return;
    }

    // Max range check (flamethrower)
    if (this.maxRange && Math.abs(this.x - this.startX) > this.maxRange) {
      this.destroy();
    }
  }
}
