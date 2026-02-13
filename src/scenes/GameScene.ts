import Phaser from 'phaser';
import { GAME, WEAPONS, WEAPON_ORDER, ANIMALS } from '../constants';
import { Hunter } from '../entities/Hunter';
import { Animal } from '../entities/Animal';
import { Projectile } from '../entities/Projectile';
import { WeaponSystem } from '../systems/WeaponSystem';
import { WaveManager } from '../systems/WaveManager';
import { ScoreManager } from '../systems/ScoreManager';
import { EffectsManager } from '../systems/EffectsManager';
import { HUD } from '../ui/HUD';
import { TouchControls } from '../ui/TouchControls';
import { SoundManager } from '../systems/SoundManager';
import { haptic, onVisibilityChange, enableClosingConfirmation } from '../telegram';

export class GameScene extends Phaser.Scene {
  gameActive!: boolean;
  wavePauseActive!: boolean;
  firing!: boolean;
  aimTarget!: { x: number; y: number };
  hunter!: Hunter;
  weaponSystem!: WeaponSystem;
  waveManager!: WaveManager;
  scoreManager!: ScoreManager;
  effects!: EffectsManager;
  soundManager!: SoundManager;
  hud!: HUD;
  controls!: TouchControls;
  crosshair!: Phaser.GameObjects.Sprite;
  keyP?: Phaser.Input.Keyboard.Key;
  keyEsc?: Phaser.Input.Keyboard.Key;

  constructor() {
    super('Game');
  }

  create() {
    // Background
    this.add.image(GAME.WIDTH / 2, GAME.HEIGHT / 2, 'background').setDepth(0);

    // State — инициализируем ДО всего остального
    this.gameActive = true;
    this.wavePauseActive = true;
    this.firing = false;

    // Aim target — fixed distance ahead of hunter (no free aiming)
    this.aimTarget = { x: GAME.WIDTH, y: GAME.HEIGHT / 2 };

    // Systems
    this.hunter = new Hunter(this);
    this.weaponSystem = new WeaponSystem(this);
    this.waveManager = new WaveManager(this);
    this.scoreManager = new ScoreManager();
    this.effects = new EffectsManager(this);
    this.soundManager = new SoundManager();
    this.hud = new HUD(this, {
      onPause: () => this._togglePause(),
      onToggleMute: () => {
        const muted = this.soundManager.toggleMute();
        this.hud.updateMuteButton(muted);
      },
      onReload: () => this.weaponSystem.reload(),
    });


    // Ammo callbacks
    this.weaponSystem.onAmmoChange = (current, max) => {
      this.hud.updateAmmo(current, max);
    };
    this.weaponSystem.onReloadStart = (reloadTime) => {
      this.hud.showReloading(true, reloadTime);
      this.soundManager.playReload();
    };
    this.weaponSystem.onReloadEnd = () => {
      this.hud.showReloading(false);
    };

    // Set initial weapon display
    this.hud.updateShopStrip(this.scoreManager.score, this.weaponSystem.currentWeapon, this.weaponSystem.unlockedWeapons);
    this.hud.updateWeapon(this.weaponSystem.currentWeapon);
    this.weaponSystem._initAmmo(this.weaponSystem.currentWeapon);

    // Wave callbacks
    this.waveManager.onWaveStart = (wave) => {
      try {
        this.hud.updateWave(wave);
        this.effects.waveAnnouncement(wave);
        this.soundManager.playWaveStart();
      } catch (e) {
        console.error('onWaveStart error:', e);
      }
    };

    this.waveManager.onWaveEnd = () => {
      // update() сам запустит следующую волну когда все животные уйдут
    };

    this.waveManager.onAnimalEscaped = (animal) => {
      const lives = this.scoreManager.loseLife();
      this.hud.updateLives(lives);
      haptic('life_lost');
      this.soundManager.playLifeLost();
      this.cameras.main.flash(200, 255, 0, 0, false, undefined, this);
      if (this.scoreManager.isGameOver()) {
        this._gameOver();
      }
    };

    // Score callbacks
    this.scoreManager.onScoreChange = (score, earned) => {
      this.hud.updateScore(score);
    };

    this.scoreManager.onComboChange = (multiplier) => {
      this.hud.updateCombo(multiplier);
    };

    // Запуск первой волны — РЕГИСТРИРУЕМ ДО создания controls
    this.time.delayedCall(1000, () => {
      this.wavePauseActive = false;
      this.waveManager.startNextWave();
    });

    // Collisions: projectiles vs animals
    this.physics.add.overlap(
      this.weaponSystem.projectiles,
      this.waveManager.animals,
      (projectile, animal) => this._onHit(projectile as Phaser.GameObjects.GameObject, animal as Phaser.GameObjects.GameObject),
      undefined,
      this
    );

    // Пауза/возобновление при сворачивании Telegram
    enableClosingConfirmation();
    onVisibilityChange(
      () => { this.scene.pause(); },
      () => { this.scene.resume(); }
    );

    // Init sound on first user interaction
    this.input.once('pointerdown', () => this.soundManager.init());

    // Управление — создаём ПОСЛЕ критической инициализации
    this.controls = new TouchControls(this, {
      onMoveTo: (y) => this.hunter.setTargetY(y),
      onMoveBy: (dy) => this.hunter.moveBy(dy),
      onMoveToXY: (x, y) => this.hunter.setTargetPos(x, y),
      onMoveByX: (dx) => this.hunter.moveByX(dx),
      onFire: () => this._handleFire(),
      onSwitchWeapon: () => this._handleWeaponSwitch(),
      onReload: () => this.weaponSystem.reload(),
      onWeaponTap: (key) => this._handleWeaponTap(key),
    });

    // Crosshair
    this.crosshair = this.add.sprite(GAME.WIDTH, GAME.HEIGHT / 2, 'crosshair').setDepth(20).setAlpha(0.7);

    // Keyboard pause (P / ESC)
    const kb = this.input.keyboard;
    if (kb) {
      this.keyP = kb.addKey('P');
      this.keyEsc = kb.addKey('ESC');
      this.keyP.on('down', () => this._togglePause());
      this.keyEsc.on('down', () => this._togglePause());
    }
  }

  update(time: number, delta: number): void {
    if (!this.gameActive) return;

    this.waveManager.update();
    this.hunter.update(delta);

    // Update aim — crosshair fixed ahead of hunter, weapon always horizontal
    const muzzle = this.hunter.getMuzzlePosition();
    this.aimTarget.x = muzzle.x + 100;
    this.aimTarget.y = muzzle.y;
    this.crosshair.setPosition(this.aimTarget.x, this.aimTarget.y);

    // Update crosshair ammo text
    const wCfg = WEAPONS[this.weaponSystem.currentWeapon];
    const curAmmo = this.weaponSystem.ammo[this.weaponSystem.currentWeapon] ?? wCfg.magSize;
    this.hud.updateCrosshairAmmo(
      this.aimTarget.x, this.aimTarget.y,
      curAmmo, wCfg.magSize,
      this.weaponSystem.reloading,
      this.weaponSystem.getReloadProgress()
    );

    // Update money text above hunter
    this.hud.updateMoneyPosition(this.hunter.sprite.x, this.hunter.sprite.y, this.scoreManager.score);

    this.firing = false;
    this.controls.update(time, delta);

    // Если волна кончилась и все животные ушли — запускаем следующую
    if (!this.waveManager.waveActive && !this.wavePauseActive && this.waveManager.getAliveCount() === 0) {
      this._scheduleNextWave();
    }
  }

  _handleFire(): void {
    if (!this.gameActive) return;

    this.firing = true;
    const time = this.time.now;
    if (!this.weaponSystem.canFire(time)) return;

    const cfg = WEAPONS[this.weaponSystem.currentWeapon];
    const shootDur = cfg.burstCount ? cfg.burstCount * (cfg.burstDelay ?? 0) + 100 : 150;
    this.hunter.shoot(shootDur);

    const muzzle = this.hunter.getMuzzlePosition();
    // Fire horizontally from current muzzle — use muzzle.y as target to keep bullet straight
    const projectiles = this.weaponSystem.fire(muzzle.x, muzzle.y, muzzle.x + 200, muzzle.y, time);

    if (projectiles.length > 0) {
      const wk = this.weaponSystem.currentWeapon;
      if (wk !== 'slingshot') {
        this.effects.muzzleFlash(muzzle.x, muzzle.y, wk);
      }
      this.soundManager.playShot(wk);
    }
  }

  _handleWeaponSwitch(): void {
    const newWeapon = this.weaponSystem.switchWeapon();
    this.hud.updateShopStrip(this.scoreManager.score, newWeapon, this.weaponSystem.unlockedWeapons);
    this.hud.updateWeapon(newWeapon);
    this.hunter.setWeapon(newWeapon);
    haptic('weapon_switch');
    this.soundManager.playWeaponSwitch();
  }

  _handleWeaponTap(key: string): void {
    if (!this.gameActive) return;

    if (this.weaponSystem.unlockedWeapons.includes(key)) {
      // Already owned — select it
      if (this.weaponSystem.selectWeapon(key)) {
        this.hud.updateShopStrip(this.scoreManager.score, key, this.weaponSystem.unlockedWeapons);
        this.hud.updateWeapon(key);
        this.hunter.setWeapon(key);
        haptic('weapon_switch');
        this.soundManager.playWeaponSwitch();
      }
    } else {
      // Try to buy
      if (this.weaponSystem.buyWeapon(key, this.scoreManager)) {
        this.effects.weaponUnlockNotify(WEAPONS[key].name);
        this.hud.updateShopStrip(this.scoreManager.score, this.weaponSystem.currentWeapon, this.weaponSystem.unlockedWeapons);
        this.hud.updateWeapon(this.weaponSystem.currentWeapon);
        this.hunter.setWeapon(this.weaponSystem.currentWeapon);
        haptic('weapon_unlock');
      }
    }
  }

  _onHit(projectileObj: Phaser.GameObjects.GameObject, animalObj: Phaser.GameObjects.GameObject): void {
    const projectile = projectileObj as Projectile;
    const animal = animalObj as Animal;

    if (!animal.alive) return;

    const x = projectile.x;
    const y = projectile.y;
    const hasAoE = projectile.aoe > 0;

    // Piercing projectiles don't get destroyed
    if (!projectile.piercing) {
      projectile.destroy();
    }

    if (hasAoE) {
      this.effects.explosion(x, y);
      haptic('explosion');
      this.soundManager.playExplosion();

      const aoeRadius = projectile.aoe;
      (this.waveManager.animals.getChildren() as Animal[]).forEach((a) => {
        if (a.active && a.alive) {
          const dist = Phaser.Math.Distance.Between(x, y, a.x, a.y);
          if (dist <= aoeRadius) {
            const killed = a.takeDamage(projectile.damage);
            if (killed) this._onKill(a);
          }
        }
      });
    } else {
      const headshot = animal.isHeadshot(x, y);
      // Clamp blood/effect Y to ground area
      const effectY = Math.max(GAME.GROUND_TOP, y);
      this.effects.hitSpark(x, effectY);
      this.effects.bloodSplatter(x, effectY);
      if (headshot) this.effects.headshotEffect(x, effectY);
      haptic('hit');
      this.soundManager.playHit();

      const killed = animal.takeDamage(projectile.damage, headshot);
      if (killed) this._onKill(animal, headshot);
    }
  }

  _onKill(animal: Animal, headshot: boolean = false): void {
    const basePoints = animal.points;
    const bonus = headshot ? Math.floor(basePoints * 2.0) : 0;
    const time = this.time.now;
    const earned = this.scoreManager.addKill(basePoints + bonus, time);

    // Clamp all blood/effect Y to ground area — never show blood in sky
    const effectY = Math.max(GAME.GROUND_TOP, animal.y);
    this.effects.floatingText(animal.x, animal.y - 20, `+${earned}${headshot ? ' HS!' : ''}`);
    this.effects.bloodSplatter(animal.x, effectY);

    // Headshot: head detachment + body gib explosion
    if (headshot) {
      const config = ANIMALS[animal.animalType];
      this.effects.headDetach(animal.x, effectY, config.color);
      this.effects.gibs(animal.x, effectY, config.color);
    }

    haptic('kill');
    this.soundManager.playKill();
    this.soundManager.playAnimalDeath(animal.animalType);

    this.hud.updateShopStrip(this.scoreManager.score, this.weaponSystem.currentWeapon, this.weaponSystem.unlockedWeapons);
  }

  _scheduleNextWave(): void {
    if (this.wavePauseActive) return;
    this.wavePauseActive = true;

    this.time.delayedCall(GAME.WAVE_PAUSE, () => {
      if (this.gameActive) {
        this.wavePauseActive = false;
        this.waveManager.startNextWave();
      }
    });
  }

  _togglePause(): void {
    if (!this.gameActive) return;
    this.scene.pause();
    this.scene.launch('Pause');
  }

  _gameOver(): void {
    this.gameActive = false;
    haptic('game_over');
    this.soundManager.playGameOver();
    const isNew = this.scoreManager.saveHighScore();

    this.time.delayedCall(500, () => {
      this.scene.start('GameOver', {
        score: this.scoreManager.score,
        wave: this.waveManager.currentWave,
        highScore: this.scoreManager.highScore,
        isNewRecord: isNew,
      });
    });
  }

  shutdown(): void {
    this.weaponSystem.destroy();
    this.waveManager.destroy();
    this.hunter.destroy();
    this.hud.destroy();
    this.effects.destroy();
    this.controls.destroy();
    if (this.crosshair) this.crosshair.destroy();
  }
}
