import Phaser from 'phaser';
import { GAME, ANIMALS } from '../constants.js';

export class Animal extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, type, waveNum) {
    const config = ANIMALS[type];
    const y = Phaser.Math.Between(GAME.GROUND_TOP, GAME.GROUND_BOTTOM);

    super(scene, GAME.WIDTH + 30, y, `${type}_walk_0`);

    scene.add.existing(this);
    // НЕ вызываем scene.physics.add.existing — группа сама создаст body

    this.animalType = type;
    this.config = config;
    this.hp = config.hp + Math.floor(waveNum / 3);
    this.maxHp = this.hp;
    this.points = config.points;
    this.baseSpeed = config.speed + waveNum * 3;
    this.waveNum = waveNum;
    this.alive = true;
    this.hurtTimer = 0;

    this.setDepth(5);
    this.setFlipX(true);
  }

  // Вызывается ПОСЛЕ group.add() — когда body уже создан группой
  activatePhysics() {
    this.setVelocityX(-this.baseSpeed);
    this.body.setAllowGravity(false);

    // Flying animals start in sky zone
    if (this.config.flying) {
      this.y = Phaser.Math.Between(GAME.FLYING_MIN_Y, GAME.FLYING_MAX_Y);
    }

    // Start walk animation
    this.play(`${this.animalType}_walk`);

    this._initBehavior(this.scene);
  }

  _initBehavior(scene) {
    switch (this.animalType) {
      case 'rabbit':
        // Jump up and down
        this._jumpTimer = scene.time.addEvent({
          delay: 600,
          callback: () => {
            if (this.alive && this.active) {
              this.setVelocityY(this.body.velocity.y < 0 ? 80 : -80);
            }
          },
          loop: true,
        });
        break;

      case 'boar':
        // Periodic charge bursts
        this._chargeTimer = scene.time.addEvent({
          delay: 1500,
          callback: () => {
            if (this.alive && this.active) {
              this.setVelocityX(-this.baseSpeed * 2);
              scene.time.delayedCall(400, () => {
                if (this.alive && this.active) {
                  this.setVelocityX(-this.baseSpeed);
                }
              });
            }
          },
          loop: true,
        });
        break;

      case 'wolf':
        // Zigzag movement
        this._zigTimer = scene.time.addEvent({
          delay: 400,
          callback: () => {
            if (this.alive && this.active) {
              const dir = Math.random() > 0.5 ? 1 : -1;
              this.setVelocityY(dir * 100);
              scene.time.delayedCall(200, () => {
                if (this.alive && this.active) {
                  this.setVelocityY(0);
                }
              });
            }
          },
          loop: true,
        });
        break;

      case 'eagle':
        // Sine wave soaring
        this._eaglePhase = Math.random() * Math.PI * 2;
        this._soarTimer = scene.time.addEvent({
          delay: 50,
          callback: () => {
            if (this.alive && this.active) {
              this._eaglePhase += 0.1;
              this.setVelocityY(Math.sin(this._eaglePhase) * 60);
            }
          },
          loop: true,
        });
        break;

      case 'snake':
        // Stays at bottom, sinusoidal speed changes
        this.y = GAME.GROUND_BOTTOM;
        this._snakePhase = 0;
        this._snakeTimer = scene.time.addEvent({
          delay: 50,
          callback: () => {
            if (this.alive && this.active) {
              this._snakePhase += 0.15;
              this.setVelocityY(Math.sin(this._snakePhase) * 30);
              this.setVelocityX(-this.baseSpeed * (1 + Math.sin(this._snakePhase * 0.5) * 0.3));
            }
          },
          loop: true,
        });
        break;

      case 'moose':
        // Periodic grazing stops
        this._grazeTimer = scene.time.addEvent({
          delay: 2000,
          callback: () => {
            if (this.alive && this.active) {
              this.setVelocityX(0);
              scene.time.delayedCall(1000, () => {
                if (this.alive && this.active) {
                  this.setVelocityX(-this.baseSpeed);
                }
              });
            }
          },
          loop: true,
        });
        break;

      case 'pheasant':
        // Sudden vertical darts
        this._dartTimer = scene.time.addEvent({
          delay: 500,
          callback: () => {
            if (this.alive && this.active) {
              const dir = Math.random() > 0.5 ? 1 : -1;
              this.setVelocityY(dir * 150);
              scene.time.delayedCall(150, () => {
                if (this.alive && this.active) {
                  this.setVelocityY(0);
                }
              });
            }
          },
          loop: true,
        });
        break;
    }
  }

  takeDamage(amount) {
    if (!this.alive) return false;

    this.hp -= amount;
    this.hurtTimer = 150;
    this.setTint(0xff4444);
    this.anims.pause();

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
    this.anims.stop();
    this.clearTint();
    this._cleanTimers();

    // Death animation - fall and fade
    this.scene.tweens.add({
      targets: this,
      angle: 90,
      alpha: 0,
      y: this.y + 20,
      duration: 400,
      ease: 'Power2',
    });

    // Гарантированное удаление по таймеру (не полагаемся на tween onComplete)
    this.scene.time.delayedCall(450, () => {
      if (this.active) this.destroy();
    });
  }

  escaped() {
    this._cleanTimers();
    this.destroy();
  }

  _cleanTimers() {
    if (this._jumpTimer) this._jumpTimer.destroy();
    if (this._chargeTimer) this._chargeTimer.destroy();
    if (this._zigTimer) this._zigTimer.destroy();
    if (this._soarTimer) this._soarTimer.destroy();
    if (this._snakeTimer) this._snakeTimer.destroy();
    if (this._grazeTimer) this._grazeTimer.destroy();
    if (this._dartTimer) this._dartTimer.destroy();
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    // Flying animals can go above GROUND_TOP
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
