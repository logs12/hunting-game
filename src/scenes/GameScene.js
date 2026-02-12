import Phaser from 'phaser';
import { GAME, WEAPONS } from '../constants.js';
import { Hunter } from '../entities/Hunter.js';
import { WeaponSystem } from '../systems/WeaponSystem.js';
import { WaveManager } from '../systems/WaveManager.js';
import { ScoreManager } from '../systems/ScoreManager.js';
import { EffectsManager } from '../systems/EffectsManager.js';
import { HUD } from '../ui/HUD.js';
import { TouchControls } from '../ui/TouchControls.js';
import { haptic, onVisibilityChange, enableClosingConfirmation } from '../telegram.js';

export class GameScene extends Phaser.Scene {
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

    // Systems
    this.hunter = new Hunter(this);
    this.weaponSystem = new WeaponSystem(this);
    this.waveManager = new WaveManager(this);
    this.scoreManager = new ScoreManager();
    this.effects = new EffectsManager(this);
    this.hud = new HUD(this);

    // Линия прицела
    this.aimLine = this.add.graphics();
    this.aimLine.setDepth(9);
    this.aimLine.setAlpha(0);

    // Set initial weapon display
    this.hud.updateUnlocked(this.weaponSystem.unlockedWeapons);
    this.hud.updateWeapon(this.weaponSystem.currentWeapon, this.weaponSystem.unlockedWeapons.length);

    // Wave callbacks
    this.waveManager.onWaveStart = (wave) => {
      try {
        this.hud.updateWave(wave);
        this.effects.waveAnnouncement(wave);
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
      this.cameras.main.flash(200, 255, 0, 0, false, null, this);
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
      (projectile, animal) => this._onHit(projectile, animal),
      null,
      this
    );

    // Пауза/возобновление при сворачивании Telegram
    enableClosingConfirmation();
    onVisibilityChange(
      () => { this.scene.pause(); },
      () => { this.scene.resume(); }
    );

    // Управление — создаём ПОСЛЕ критической инициализации
    this.controls = new TouchControls(this, {
      onMoveTo: (y) => this.hunter.moveTo(y),
      onMoveBy: (dy) => this.hunter.moveBy(dy),
      onFire: () => this._handleFire(),
      onSwitchWeapon: () => this._handleWeaponSwitch(),
    });
  }

  update(time, delta) {
    if (!this.gameActive) return;

    this.waveManager.update();

    this.firing = false;
    this.controls.update(time, delta);
    this._updateAimLine();

    // Если волна кончилась и все животные ушли — запускаем следующую
    if (!this.waveManager.waveActive && !this.wavePauseActive && this.waveManager.getAliveCount() === 0) {
      this._scheduleNextWave();
    }
  }

  _handleFire() {
    if (!this.gameActive) return;

    this.firing = true;
    const time = this.time.now;
    if (!this.weaponSystem.canFire(time)) return;

    const muzzle = this.hunter.getMuzzlePosition();
    const projectiles = this.weaponSystem.fire(muzzle.x, muzzle.y, GAME.WIDTH + 100, muzzle.y, time);

    if (projectiles.length > 0) {
      const cfg = WEAPONS[this.weaponSystem.currentWeapon];
      const shootDur = cfg.burstCount ? cfg.burstCount * cfg.burstDelay + 100 : 150;
      this.hunter.shoot(shootDur);
      this.effects.muzzleFlash(muzzle.x + 6, muzzle.y);
    }
  }

  _handleWeaponSwitch() {
    const newWeapon = this.weaponSystem.switchWeapon();
    this.hud.updateUnlocked(this.weaponSystem.unlockedWeapons);
    this.hud.updateWeapon(newWeapon, this.weaponSystem.unlockedWeapons.length);
    this.hunter.setWeapon(newWeapon);
    haptic('weapon_switch');
  }

  _updateAimLine() {
    if (this.firing) {
      const muzzle = this.hunter.getMuzzlePosition();
      this.aimLine.clear();
      this.aimLine.lineStyle(1, 0xff0000, 0.3);
      this.aimLine.lineBetween(muzzle.x, muzzle.y, GAME.WIDTH, muzzle.y);
      this.aimLine.setAlpha(1);
    } else {
      this.aimLine.setAlpha(0);
    }
  }

  _onHit(projectile, animal) {
    if (!animal.alive) return;

    const isRocket = projectile.weaponKey === 'rocket';
    const x = projectile.x;
    const y = projectile.y;

    projectile.destroy();

    if (isRocket) {
      this.effects.explosion(x, y);
      haptic('explosion');

      const aoeRadius = projectile.aoe;
      this.waveManager.animals.getChildren().forEach((a) => {
        if (a.active && a.alive) {
          const dist = Phaser.Math.Distance.Between(x, y, a.x, a.y);
          if (dist <= aoeRadius) {
            const killed = a.takeDamage(projectile.damage);
            if (killed) this._onKill(a);
          }
        }
      });
    } else {
      this.effects.hitSpark(x, y);
      this.effects.bloodSplatter(x, y);
      haptic('hit');

      const killed = animal.takeDamage(projectile.damage);
      if (killed) this._onKill(animal);
    }
  }

  _onKill(animal) {
    const time = this.time.now;
    const earned = this.scoreManager.addKill(animal.points, time);

    this.effects.floatingText(animal.x, animal.y - 20, `+${earned}`);
    this.effects.bloodSplatter(animal.x, animal.y);
    haptic('kill');

    const newWeapon = this.weaponSystem.checkUnlocks(this.scoreManager.score);
    if (newWeapon) {
      const cfg = WEAPONS[newWeapon];
      this.effects.weaponUnlockNotify(cfg.name);
      this.hud.updateUnlocked(this.weaponSystem.unlockedWeapons);
      this.hud.updateWeapon(this.weaponSystem.currentWeapon, this.weaponSystem.unlockedWeapons.length);
      haptic('weapon_unlock');
    }
  }

  _scheduleNextWave() {
    if (this.wavePauseActive) return;
    this.wavePauseActive = true;

    this.time.delayedCall(GAME.WAVE_PAUSE, () => {
      if (this.gameActive) {
        this.wavePauseActive = false;
        this.waveManager.startNextWave();
      }
    });
  }

  _gameOver() {
    this.gameActive = false;
    haptic('game_over');
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

  shutdown() {
    this.weaponSystem.destroy();
    this.waveManager.destroy();
    this.hunter.destroy();
    this.hud.destroy();
    this.effects.destroy();
    this.controls.destroy();
    this.aimLine.destroy();
  }
}
