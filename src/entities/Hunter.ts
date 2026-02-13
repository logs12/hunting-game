import Phaser from 'phaser';
import { GAME, WEAPONS } from '../constants';
import type { WeaponConfig } from '../types';

export class Hunter {
  scene: Phaser.Scene;
  sprite: Phaser.GameObjects.Sprite;
  shooting: boolean;
  currentWeapon: string;
  targetY: number;
  targetX: number;
  lerpSpeed: number;
  state: string;
  aimAngle: number;
  weaponSprite: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.sprite = scene.add.sprite(24, GAME.GROUND_BOTTOM - 16, 'hunter_idle_0');
    this.sprite.setOrigin(0.5, 0.5);
    this.sprite.setDepth(10);
    this.shooting = false;
    this.currentWeapon = 'slingshot';
    this.targetY = this.sprite.y;
    this.targetX = this.sprite.x;
    this.lerpSpeed = 12;
    this.state = 'idle';
    this.aimAngle = 0;

    // Weapon sprite — separate object, changes with weapon switch
    this.weaponSprite = scene.add.sprite(0, 0, 'weapon_slingshot');
    this.weaponSprite.setOrigin(0, 0.5);
    this.weaponSprite.setDepth(11);
    this._updateWeaponPos();

    // Start idle animation
    this.sprite.play('hunter_idle');
  }

  setWeapon(key: string): void {
    this.currentWeapon = key;
    this.weaponSprite.setTexture('weapon_' + key);
  }

  setTargetY(y: number): void {
    this.targetY = Math.max(GAME.GROUND_TOP, Math.min(GAME.GROUND_BOTTOM, y));
  }

  setTargetX(x: number): void {
    this.targetX = Math.max(15, Math.min(GAME.WIDTH / 2, x));
  }

  setTargetPos(x: number, y: number): void {
    this.setTargetX(x);
    this.setTargetY(y);
  }

  moveBy(dy: number): void {
    this.targetY = Math.max(GAME.GROUND_TOP, Math.min(GAME.GROUND_BOTTOM, this.targetY + dy));
  }

  moveByX(dx: number): void {
    this.targetX = Math.max(20, Math.min(GAME.WIDTH / 2, this.targetX + dx));
  }

  update(delta: number): void {
    const t = 1 - Math.exp(-this.lerpSpeed * delta / 1000);
    const oldX = this.sprite.x;
    const oldY = this.sprite.y;
    this.sprite.x = Phaser.Math.Linear(this.sprite.x, this.targetX, t);
    this.sprite.y = Phaser.Math.Linear(this.sprite.y, this.targetY, t);
    this._updateWeaponPos();

    // State machine — only update if not shooting
    if (!this.shooting) {
      const moving = Math.abs(this.sprite.y - oldY) > 0.5 || Math.abs(this.sprite.x - oldX) > 0.5;
      if (moving && this.state !== 'walking') {
        this.state = 'walking';
        this.sprite.play('hunter_walking');
      } else if (!moving && this.state !== 'idle') {
        this.state = 'idle';
        this.sprite.play('hunter_idle');
      }
    }
  }

  shoot(duration?: number): void {
    this.shooting = true;
    this.state = 'shooting';
    const dur = duration || 250;

    if (this.currentWeapon === 'slingshot') {
      // Slingshot: no recoil — pull-back tween on weapon sprite only
      const origX = this.weaponSprite.x;
      this.scene.tweens.add({
        targets: this.weaponSprite,
        x: origX - 6,
        duration: dur * 0.4,
        yoyo: true,
        ease: 'Quad.easeOut',
      });
    } else if (this.currentWeapon === 'crossbow') {
      // Crossbow: slight recoil, shorter
      this.sprite.play('hunter_shooting');
      this._updateWeaponPos();
    } else {
      // All guns: full recoil animation
      this.sprite.play('hunter_shooting');
      this._updateWeaponPos();
    }

    this.scene.time.delayedCall(dur, () => {
      if (this.sprite.active) {
        this.shooting = false;
        this.state = 'idle';
        this.sprite.play('hunter_idle');
        this._updateWeaponPos();
      }
    });
  }

  setAimAngle(_targetX: number, _targetY: number): void {
    // Weapon always aims horizontally — no angle change
    this.aimAngle = 0;
    this.weaponSprite.setRotation(0);
  }

  getMuzzlePosition(): { x: number; y: number } {
    const cfg = WEAPONS[this.currentWeapon];
    const len = this.weaponSprite.width;
    const angle = this.aimAngle || 0;
    const baseX = this.weaponSprite.x;
    const baseY = this.weaponSprite.y + (cfg.barrelOffsetY || 0);
    return {
      x: baseX + Math.cos(angle) * len,
      y: baseY + Math.sin(angle) * len,
    };
  }

  _updateWeaponPos(): void {
    if (this.shooting) {
      this.weaponSprite.x = this.sprite.x + 8;
      this.weaponSprite.y = this.sprite.y - 6;
    } else {
      this.weaponSprite.x = this.sprite.x + 6;
      this.weaponSprite.y = this.sprite.y - 1;
    }
  }

  destroy(): void {
    this.sprite.destroy();
    this.weaponSprite.destroy();
  }
}
