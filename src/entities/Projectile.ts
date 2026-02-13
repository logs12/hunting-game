import Phaser from 'phaser';
import { GAME, WEAPONS } from '../constants';
import type { WeaponConfig } from '../types';

const TEXTURE_MAP: Record<string, string> = {
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

// Speeds based on real muzzle velocities (scaled to game px/s)
// slingshot~70m/s, 9mm~375, .357~440, 12ga~400, PPSh~490, 7.62×54R~860
// .30-30~700, .308~850, 7.62×39~715, 12.7mm~850, 7.62×51~853
const SPEED_MAP: Record<string, number> = {
  slingshot: 700, pistol: 1400, revolver: 1500, shotgun: 1200, doublebarrel: 1100,
  smg: 1600, rifle: 2200, crossbow: 900, lever_rifle: 1900, machinegun: 2000,
  hunting_rifle: 2200, auto_shotgun: 1200, sniper: 2400, flamethrower: 600,
  grenade_launcher: 560, assault_rifle: 1900, heavy_mg: 2100, rocket: 700,
  laser_rifle: 5000, minigun: 2000, rpg: 600, railgun: 5000,
  plasma_cannon: 1400, gauss_rifle: 4400, tesla_cannon: 1800,
};

// Thin straight tracer configs — short history, thin lines
const TRAIL_CONFIG: Record<string, { len: number; color: number; width?: number; core?: number }> = {
  slingshot: { len: 0, color: 0 },
  flamethrower: { len: 0, color: 0 },
  pistol: { len: 4, color: 0xffcc44, width: 1, core: 0xffffee },
  revolver: { len: 5, color: 0xffaa22, width: 1.2, core: 0xffffee },
  shotgun: { len: 3, color: 0xffcc44, width: 0.8, core: 0xffffee },
  doublebarrel: { len: 3, color: 0xffcc44, width: 0.8, core: 0xffffee },
  smg: { len: 4, color: 0xffcc44, width: 1, core: 0xffffee },
  rifle: { len: 5, color: 0xffcc44, width: 1.2, core: 0xffffff },
  crossbow: { len: 6, color: 0x998866, width: 1 },
  lever_rifle: { len: 5, color: 0xffcc44, width: 1, core: 0xffffee },
  machinegun: { len: 4, color: 0xffcc44, width: 1, core: 0xffffee },
  hunting_rifle: { len: 5, color: 0xffcc44, width: 1.2, core: 0xffffff },
  auto_shotgun: { len: 3, color: 0xffcc44, width: 0.8, core: 0xffffee },
  sniper: { len: 6, color: 0xffdd44, width: 1.5, core: 0xffffff },
  grenade_launcher: { len: 3, color: 0x888888, width: 1 },
  assault_rifle: { len: 4, color: 0xffcc44, width: 1, core: 0xffffee },
  heavy_mg: { len: 5, color: 0xffcc44, width: 1.2, core: 0xffffff },
  rocket: { len: 5, color: 0xff6600, width: 1.5, core: 0xffaa00 },
  laser_rifle: { len: 6, color: 0xff2255, width: 1.2, core: 0xff88aa },
  minigun: { len: 4, color: 0xffcc44, width: 1, core: 0xffffee },
  rpg: { len: 5, color: 0xff6600, width: 1.5, core: 0xffaa00 },
  railgun: { len: 7, color: 0x4466ff, width: 1.5, core: 0xaaccff },
  plasma_cannon: { len: 5, color: 0x8844ff, width: 1.2, core: 0xcc88ff },
  gauss_rifle: { len: 7, color: 0x4466ff, width: 1.5, core: 0xaaccff },
  tesla_cannon: { len: 5, color: 0x22aaff, width: 1.2, core: 0x88ddff },
};

export class Projectile extends Phaser.Physics.Arcade.Sprite {
  declare body: Phaser.Physics.Arcade.Body;
  weaponKey: string;
  damage: number;
  aoe: number;
  piercing: boolean;
  maxRange: number;
  gravity: number;
  startX: number;
  _finalAngle: number;
  _speed: number;
  _trailLen: number;
  _trailColor: number;
  _trailWidth: number;
  _trailCore: number;
  _prevPos: Array<{ x: number; y: number }>;
  _trail: Phaser.GameObjects.Graphics | null;

  constructor(scene: Phaser.Scene, x: number, y: number, targetX: number, targetY: number, weaponKey: string) {
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

    // Trail setup — tracer style
    const tc = TRAIL_CONFIG[weaponKey] || { len: 14, color: 0xffcc44, width: 2.5, core: 0xffffcc };
    this._trailLen = tc.len;
    this._trailColor = tc.color;
    this._trailWidth = tc.width || 2.5;
    this._trailCore = tc.core || 0;
    this._prevPos = [];
    this._trail = null;
    if (this._trailLen > 0) {
      this._trail = scene.add.graphics().setDepth(7);
      // Hide sprite — thin tracer line is the visual
      this.setAlpha(0);
    }
  }

  activatePhysics(): void {
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

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);

    // Trail rendering — thin straight tracer line
    if (this._trail && this._trailLen > 0) {
      this._prevPos.push({ x: this.x, y: this.y });
      if (this._prevPos.length > this._trailLen) {
        this._prevPos.shift();
      }
      this._trail.clear();
      const pts = this._prevPos;
      if (pts.length > 1) {
        const tail = pts[0];
        const head = pts[pts.length - 1];

        // Faint outer glow
        this._trail.lineStyle(this._trailWidth + 1, this._trailColor, 0.15);
        this._trail.beginPath();
        this._trail.moveTo(tail.x, tail.y);
        this._trail.lineTo(head.x, head.y);
        this._trail.strokePath();

        // Bright core line
        const coreColor = this._trailCore || this._trailColor;
        this._trail.lineStyle(Math.max(0.5, this._trailWidth * 0.5), coreColor, 0.8);
        this._trail.beginPath();
        this._trail.moveTo(tail.x, tail.y);
        this._trail.lineTo(head.x, head.y);
        this._trail.strokePath();
      }
    }

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

  destroy(fromScene?: boolean): void {
    if (this._trail) {
      this._trail.destroy();
      this._trail = null;
    }
    super.destroy(fromScene);
  }
}
