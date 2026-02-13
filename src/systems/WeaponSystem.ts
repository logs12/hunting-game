import { WEAPONS, WEAPON_ORDER } from '../constants';
import { Projectile } from '../entities/Projectile';
import { haptic } from '../telegram';
import { ScoreManager } from './ScoreManager';
import type { WeaponConfig } from '../types';

export class WeaponSystem {
  scene: Phaser.Scene;
  currentWeapon: string;
  unlockedWeapons: string[];
  lastFireTime: number;
  projectiles: Phaser.Physics.Arcade.Group;
  ammo: Record<string, number>;
  reloading: boolean;
  reloadTimer: Phaser.Time.TimerEvent | null;
  _reloadStartTime: number;
  _reloadDuration: number;
  onAmmoChange: ((current: number, max: number) => void) | null;
  onReloadStart: ((reloadTime: number) => void) | null;
  onReloadEnd: (() => void) | null;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.currentWeapon = 'slingshot';
    this.unlockedWeapons = ['slingshot', 'pistol'];
    this.lastFireTime = 0;
    this.projectiles = scene.physics.add.group();

    // Ammo system
    this.ammo = {};
    this.reloading = false;
    this.reloadTimer = null;
    this._reloadStartTime = 0;
    this._reloadDuration = 0;
    this.onAmmoChange = null;
    this.onReloadStart = null;
    this.onReloadEnd = null;
  }

  buyWeapon(key: string, scoreManager: ScoreManager): boolean {
    if (this.unlockedWeapons.includes(key)) return false;
    const cfg = WEAPONS[key];
    if (!cfg) return false;
    if (!scoreManager.spendScore(cfg.unlock)) return false;
    this.unlockedWeapons.push(key);
    this.selectWeapon(key);
    return true;
  }

  selectWeapon(key: string): boolean {
    if (!this.unlockedWeapons.includes(key)) return false;
    if (key === this.currentWeapon) return false;
    this.cancelReload();
    this.currentWeapon = key;
    this._initAmmo(key);
    return true;
  }

  _initAmmo(weaponKey: string): void {
    const cfg = WEAPONS[weaponKey];
    if (this.ammo[weaponKey] === undefined) {
      this.ammo[weaponKey] = cfg.magSize;
    }
    if (this.onAmmoChange) {
      this.onAmmoChange(this.ammo[weaponKey], cfg.magSize);
    }
  }

  reload(): void {
    const cfg = WEAPONS[this.currentWeapon];
    if (cfg.magSize === Infinity) return;
    if (this.reloading) return;
    if (this.ammo[this.currentWeapon] >= cfg.magSize) return;

    this.reloading = true;
    this._reloadStartTime = this.scene.time.now;
    this._reloadDuration = cfg.reloadTime;
    if (this.onReloadStart) this.onReloadStart(cfg.reloadTime);

    this.reloadTimer = this.scene.time.delayedCall(cfg.reloadTime, () => {
      this.ammo[this.currentWeapon] = cfg.magSize;
      this.reloading = false;
      this.reloadTimer = null;
      if (this.onReloadEnd) this.onReloadEnd();
      if (this.onAmmoChange) this.onAmmoChange(this.ammo[this.currentWeapon], cfg.magSize);
    });
  }

  cancelReload(): void {
    if (this.reloadTimer) {
      this.reloadTimer.destroy();
      this.reloadTimer = null;
    }
    this.reloading = false;
  }

  switchWeapon(): string {
    this.cancelReload();
    // Cycle through weapons in WEAPON_ORDER (logical progression), not unlock order
    const ordered = WEAPON_ORDER.filter(w => this.unlockedWeapons.includes(w));
    const idx = ordered.indexOf(this.currentWeapon);
    const next = (idx + 1) % ordered.length;
    this.currentWeapon = ordered[next];
    this._initAmmo(this.currentWeapon);
    return this.currentWeapon;
  }

  canFire(time: number): boolean {
    const cfg = WEAPONS[this.currentWeapon];
    return time - this.lastFireTime >= cfg.cooldown;
  }

  fire(fromX: number, fromY: number, targetX: number, targetY: number, time: number): Projectile[] {
    if (!this.canFire(time)) return [];
    if (this.reloading) return [];

    const cfg = WEAPONS[this.currentWeapon];

    // Check ammo
    if (cfg.magSize !== Infinity) {
      if (this.ammo[this.currentWeapon] === undefined) {
        this.ammo[this.currentWeapon] = cfg.magSize;
      }
      if (this.ammo[this.currentWeapon] <= 0) {
        this.reload();
        return [];
      }
    }

    this.lastFireTime = time;
    const projectilesList: Projectile[] = [];

    // Первый залп
    this._fireOnce(fromX, fromY, targetX, targetY, cfg, projectilesList);
    haptic('shoot');

    // Decrement ammo
    if (cfg.magSize !== Infinity) {
      this.ammo[this.currentWeapon] -= 1;
      if (this.onAmmoChange) this.onAmmoChange(this.ammo[this.currentWeapon], cfg.magSize);
    }

    // Burst fire — дополнительные выстрелы по таймеру
    if (cfg.burstCount && cfg.burstCount > 1) {
      for (let b = 1; b < cfg.burstCount; b++) {
        this.scene.time.delayedCall(b * (cfg.burstDelay ?? 0), () => {
          if (this.reloading) return;
          if (cfg.magSize !== Infinity && this.ammo[this.currentWeapon] <= 0) return;
          this._fireOnce(fromX, fromY, targetX, targetY, cfg, []);
          haptic('shoot');
          if (cfg.magSize !== Infinity) {
            this.ammo[this.currentWeapon] -= 1;
            if (this.onAmmoChange) this.onAmmoChange(this.ammo[this.currentWeapon], cfg.magSize);
            if (this.ammo[this.currentWeapon] <= 0) this.reload();
          }
        });
      }
    }

    // Auto-reload when empty (after non-burst)
    if (cfg.magSize !== Infinity && this.ammo[this.currentWeapon] <= 0 && (!cfg.burstCount || cfg.burstCount <= 1)) {
      this.reload();
    }

    return projectilesList;
  }

  _fireOnce(fromX: number, fromY: number, targetX: number, targetY: number, cfg: WeaponConfig, list: Projectile[]): void {
    for (let i = 0; i < cfg.projectiles; i++) {
      const proj = new Projectile(
        this.scene, fromX, fromY, targetX, targetY, this.currentWeapon
      );
      this.projectiles.add(proj);
      proj.activatePhysics();
      list.push(proj);
    }
  }

  getReloadProgress(): number {
    if (!this.reloading || this._reloadDuration <= 0) return 0;
    const elapsed = this.scene.time.now - this._reloadStartTime;
    return Math.min(1, elapsed / this._reloadDuration);
  }

  getCurrentConfig(): WeaponConfig & { key: string } {
    return { key: this.currentWeapon, ...WEAPONS[this.currentWeapon] };
  }

  destroy(): void {
    this.cancelReload();
    this.projectiles.clear(true, true);
  }
}
