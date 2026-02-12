import Phaser from 'phaser';
import { GAME, ANIMALS } from '../constants.js';

export class Animal extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, type, waveNum) {
    const config = ANIMALS[type];
    const y = Phaser.Math.Between(GAME.GROUND_TOP, GAME.GROUND_BOTTOM);

    super(scene, GAME.WIDTH + 30, y, `${type}_walk_0`);

    scene.add.existing(this);

    this.animalType = type;
    this.config = config;
    // Enhanced HP scaling
    this.hp = config.hp + Math.floor(waveNum / 3) + (waveNum > 10 ? Math.floor((waveNum - 10) / 2) : 0);
    this.maxHp = this.hp;
    this.points = config.points;
    // Enhanced speed scaling
    const speedBonus = Math.min(config.speed, waveNum * 4 + Math.floor(waveNum / 5) * 5);
    this.baseSpeed = config.speed + speedBonus;
    this.waveNum = waveNum;
    this.alive = true;
    this.hurtTimer = 0;
    this._timers = [];
    // Gradual acceleration
    this.speedMultiplier = 0.7;
    this.maxSpeedMult = 1.3;
    this.accelRate = 0.075;

    this.setDepth(5);
  }

  activatePhysics() {
    this.setVelocityX(-this.baseSpeed * this.speedMultiplier);
    this.body.setAllowGravity(false);

    if (this.config.flying) {
      this.y = Phaser.Math.Between(GAME.FLYING_MIN_Y, GAME.FLYING_MAX_Y);
    }

    this.play(`${this.animalType}_walk`);
    this._initBehavior(this.scene);
  }

  _addTimer(timer) {
    this._timers.push(timer);
    return timer;
  }

  _timedEvent(scene, delay, cb) {
    return this._addTimer(scene.time.addEvent({ delay, callback: cb, loop: true }));
  }

  _sineMove(scene, delay, phase, ampY, ampX) {
    let p = phase;
    this._timedEvent(scene, delay, () => {
      if (!this.alive || !this.active) return;
      p += 0.1;
      this.setVelocityY(Math.sin(p) * ampY);
      if (ampX) this.setVelocityX(-this.baseSpeed * (1 + Math.sin(p * 0.5) * ampX));
    });
  }

  _zigzag(scene, delay, ampY, durMs) {
    this._timedEvent(scene, delay, () => {
      if (!this.alive || !this.active) return;
      const dir = Math.random() > 0.5 ? 1 : -1;
      this.setVelocityY(dir * ampY);
      scene.time.delayedCall(durMs, () => {
        if (this.alive && this.active) this.setVelocityY(0);
      });
    });
  }

  _chargeBurst(scene, delay, mult, durMs) {
    this._timedEvent(scene, delay, () => {
      if (!this.alive || !this.active) return;
      this.setVelocityX(-this.baseSpeed * mult);
      scene.time.delayedCall(durMs, () => {
        if (this.alive && this.active) this.setVelocityX(-this.baseSpeed);
      });
    });
  }

  _pauseMove(scene, delay, pauseMs) {
    this._timedEvent(scene, delay, () => {
      if (!this.alive || !this.active) return;
      this.setVelocityX(0);
      scene.time.delayedCall(pauseMs, () => {
        if (this.alive && this.active) this.setVelocityX(-this.baseSpeed);
      });
    });
  }

  _initBehavior(scene) {
    switch (this.animalType) {
      case 'rabbit':
        this._timedEvent(scene, 600, () => {
          if (!this.alive || !this.active) return;
          this.setVelocityY(this.body.velocity.y < 0 ? 80 : -80);
        });
        break;

      case 'sparrow':
        this._sineMove(scene, 50, Math.random() * 6, 80, 0);
        this._zigzag(scene, 300, 120, 100);
        break;

      case 'mouse':
        this.y = GAME.GROUND_BOTTOM;
        this._zigzag(scene, 200, 40, 100);
        break;

      case 'frog': {
        let jumping = false;
        this._timedEvent(scene, 800, () => {
          if (!this.alive || !this.active || jumping) return;
          jumping = true;
          this.setVelocityY(-120);
          scene.time.delayedCall(400, () => {
            if (this.alive && this.active) {
              this.setVelocityY(120);
              scene.time.delayedCall(400, () => {
                if (this.alive && this.active) this.setVelocityY(0);
                jumping = false;
              });
            } else { jumping = false; }
          });
        });
        break;
      }

      case 'fox':
        break;

      case 'deer':
        break;

      case 'boar':
        this._chargeBurst(scene, 1500, 2, 400);
        break;

      case 'wolf':
      case 'coyote':
        this._zigzag(scene, 400, 100, 200);
        break;

      case 'eagle':
        this._sineMove(scene, 50, Math.random() * 6, 60, 0);
        break;

      case 'snake':
        this.y = GAME.GROUND_BOTTOM;
        this._sineMove(scene, 50, 0, 30, 0.3);
        break;

      case 'moose':
        this._pauseMove(scene, 2000, 1000);
        break;

      case 'pheasant':
        this._zigzag(scene, 500, 150, 150);
        break;

      case 'duck':
        this._sineMove(scene, 50, Math.random() * 6, 40, 0);
        break;

      case 'crow':
        this._sineMove(scene, 50, Math.random() * 6, 70, 0);
        this._zigzag(scene, 600, 100, 150);
        break;

      case 'hare':
        this._zigzag(scene, 300, 80, 150);
        break;

      case 'raccoon':
        this._timedEvent(scene, 1200, () => {
          if (!this.alive || !this.active) return;
          this.setVelocityX(this.baseSpeed * 0.3);
          scene.time.delayedCall(300, () => {
            if (this.alive && this.active) this.setVelocityX(-this.baseSpeed);
          });
        });
        break;

      case 'turkey':
        this._pauseMove(scene, 1500, 800);
        break;

      case 'badger':
        this._timedEvent(scene, 1000, () => {
          if (!this.alive || !this.active) return;
          const fast = Math.random() > 0.5;
          this.setVelocityX(-(fast ? this.baseSpeed * 1.8 : this.baseSpeed * 0.5));
        });
        break;

      case 'lynx':
        this._timedEvent(scene, 1200, () => {
          if (!this.alive || !this.active) return;
          this.setVelocityX(-this.baseSpeed * 2.5);
          scene.time.delayedCall(300, () => {
            if (this.alive && this.active) {
              this.setVelocityX(0);
              scene.time.delayedCall(500, () => {
                if (this.alive && this.active) this.setVelocityX(-this.baseSpeed);
              });
            }
          });
        });
        break;

      case 'hawk':
        this._sineMove(scene, 50, Math.random() * 6, 90, 0);
        this._timedEvent(scene, 1000, () => {
          if (!this.alive || !this.active) return;
          this.setVelocityY(180);
          scene.time.delayedCall(300, () => {
            if (this.alive && this.active) this.setVelocityY(-180);
            scene.time.delayedCall(300, () => {
              if (this.alive && this.active) this.setVelocityY(0);
            });
          });
        });
        break;

      case 'goose':
        this._sineMove(scene, 50, Math.random() * 6, 30, 0);
        break;

      case 'porcupine':
        break;

      case 'wolverine':
        // Speeds up when hit
        break;

      case 'owl':
        this._sineMove(scene, 50, Math.random() * 6, 50, 0);
        this._zigzag(scene, 400, 90, 200);
        break;

      case 'ram':
        this._chargeBurst(scene, 2000, 2.5, 500);
        this._timedEvent(scene, 700, () => {
          if (!this.alive || !this.active) return;
          this.setVelocityY(this.body.velocity.y < 0 ? 60 : -60);
        });
        break;

      case 'tiger':
        this._timedEvent(scene, 1500, () => {
          if (!this.alive || !this.active) return;
          this.setVelocityX(-this.baseSpeed * 0.3);
          scene.time.delayedCall(800, () => {
            if (this.alive && this.active) {
              this.setVelocityX(-this.baseSpeed * 3);
              scene.time.delayedCall(400, () => {
                if (this.alive && this.active) this.setVelocityX(-this.baseSpeed);
              });
            }
          });
        });
        break;

      case 'bison':
        this._chargeBurst(scene, 2000, 2, 600);
        break;

      case 'condor':
        this._sineMove(scene, 50, Math.random() * 6, 50, 0.2);
        break;

      case 'panther':
        this._zigzag(scene, 400, 140, 200);
        break;

      case 'elk':
        this._pauseMove(scene, 2500, 1200);
        break;

      case 'vulture':
        this._sineMove(scene, 50, Math.random() * 6, 40, 0.15);
        break;

      case 'alligator':
        this.y = GAME.GROUND_BOTTOM;
        break;

      case 'rhino':
        this.setVelocityX(-this.baseSpeed * 1.5);
        break;

      case 'hippo':
        break;

      case 'gorilla':
        this._timedEvent(scene, 2000, () => {
          if (!this.alive || !this.active) return;
          this.setVelocityX(0);
          scene.time.delayedCall(800, () => {
            if (this.alive && this.active) this.setVelocityX(-this.baseSpeed * 2);
            scene.time.delayedCall(500, () => {
              if (this.alive && this.active) this.setVelocityX(-this.baseSpeed);
            });
          });
        });
        break;

      case 'golden_eagle':
        this._sineMove(scene, 50, Math.random() * 6, 80, 0);
        break;

      case 'mammoth':
        break;

      case 'dragon':
        this._sineMove(scene, 50, Math.random() * 6, 60, 0.2);
        this._zigzag(scene, 500, 120, 200);
        break;
    }
  }

  takeDamage(amount) {
    if (!this.alive) return false;

    this.hp -= amount;
    this.hurtTimer = 150;
    this.setTint(0xff4444);
    this.anims.pause();

    // Wolverine speeds up when hit
    if (this.animalType === 'wolverine' && this.hp > 0) {
      this.baseSpeed *= 1.3;
      this.setVelocityX(-this.baseSpeed);
    }

    this.scene.time.delayedCall(150, () => {
      if (this.active && this.alive) {
        this.clearTint();
        this.anims.resume();
      }
    });

    if (this.hp <= 0) {
      this.die();
      return true;
    }
    return false;
  }

  die() {
    this.alive = false;
    this.body.setVelocity(0, 0);
    this.body.setAllowGravity(false);
    this.anims.stop();
    this.clearTint();
    this._cleanTimers();

    // Blood pool under carcass
    const groundY = Math.min(this.y + 15, GAME.GROUND_BOTTOM);
    const pool = this.scene.add.sprite(this.x, groundY, 'blood_pool');
    pool.setDepth(3);
    pool.setAlpha(0);
    pool.setScale(0.3);

    // Carcass falls and rotates onto ground
    this.setDepth(4);
    this.scene.tweens.add({
      targets: this,
      angle: 90,
      y: groundY - 5,
      duration: 300,
      ease: 'Bounce.easeOut',
    });

    // Blood pool grows
    this.scene.tweens.add({
      targets: pool,
      alpha: 0.8,
      scaleX: 1.0 + Math.random() * 0.4,
      scaleY: 1.0,
      duration: 600,
      ease: 'Power1',
    });

    // After 4s, fade out over 2s
    this.scene.time.delayedCall(4000, () => {
      this.scene.tweens.add({
        targets: [this, pool],
        alpha: 0,
        duration: 2000,
        ease: 'Power1',
      });
      this.scene.time.delayedCall(2100, () => {
        if (pool.active) pool.destroy();
        if (this.active) this.destroy();
      });
    });
  }

  escaped() {
    this._cleanTimers();
    this.destroy();
  }

  _cleanTimers() {
    this._timers.forEach(t => t.destroy());
    this._timers = [];
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    // Gradual acceleration — scale current velocity each frame
    if (this.alive && this.speedMultiplier < this.maxSpeedMult) {
      const old = this.speedMultiplier;
      this.speedMultiplier = Math.min(this.maxSpeedMult, old + this.accelRate * delta / 1000);
      const ratio = this.speedMultiplier / old;
      this.body.velocity.x *= ratio;
    }

    const minY = this.config.flying ? GAME.FLYING_MIN_Y : GAME.GROUND_TOP;
    const maxY = GAME.GROUND_BOTTOM;

    if (this.y < minY) {
      this.y = minY;
      this.setVelocityY(Math.abs(this.body.velocity.y));
    }
    if (this.y > maxY) {
      this.y = maxY;
      this.setVelocityY(-Math.abs(this.body.velocity.y));
    }
  }
}
