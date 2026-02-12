import { WEAPONS, WEAPON_ORDER } from '../constants.js';
import { Projectile } from '../entities/Projectile.js';
import { haptic } from '../telegram.js';

export class WeaponSystem {
  constructor(scene) {
    this.scene = scene;
    this.currentWeapon = 'slingshot';
    this.unlockedWeapons = ['slingshot', 'pistol'];
    this.lastFireTime = 0;
    this.projectiles = scene.physics.add.group();
  }

  checkUnlocks(score) {
    let newUnlock = null;
    for (const key of WEAPON_ORDER) {
      const cfg = WEAPONS[key];
      if (cfg.unlock <= score && !this.unlockedWeapons.includes(key)) {
        this.unlockedWeapons.push(key);
        newUnlock = key;
      }
    }
    return newUnlock;
  }

  switchWeapon() {
    const idx = this.unlockedWeapons.indexOf(this.currentWeapon);
    const next = (idx + 1) % this.unlockedWeapons.length;
    this.currentWeapon = this.unlockedWeapons[next];
    return this.currentWeapon;
  }

  canFire(time) {
    const cfg = WEAPONS[this.currentWeapon];
    return time - this.lastFireTime >= cfg.cooldown;
  }

  fire(fromX, fromY, targetX, targetY, time) {
    if (!this.canFire(time)) return [];

    this.lastFireTime = time;
    const cfg = WEAPONS[this.currentWeapon];
    const projectilesList = [];

    // Первый залп
    this._fireOnce(fromX, fromY, targetX, targetY, cfg, projectilesList);
    haptic('shoot');

    // Burst fire — дополнительные выстрелы по таймеру
    if (cfg.burstCount && cfg.burstCount > 1) {
      for (let b = 1; b < cfg.burstCount; b++) {
        this.scene.time.delayedCall(b * cfg.burstDelay, () => {
          this._fireOnce(fromX, fromY, targetX, targetY, cfg, []);
          haptic('shoot');
        });
      }
    }

    return projectilesList;
  }

  _fireOnce(fromX, fromY, targetX, targetY, cfg, list) {
    for (let i = 0; i < cfg.projectiles; i++) {
      const proj = new Projectile(
        this.scene, fromX, fromY, targetX, targetY, this.currentWeapon
      );
      this.projectiles.add(proj);
      proj.activatePhysics();
      list.push(proj);
    }
  }

  getCurrentConfig() {
    return { key: this.currentWeapon, ...WEAPONS[this.currentWeapon] };
  }

  destroy() {
    this.projectiles.clear(true, true);
  }
}
