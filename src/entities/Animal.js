import Phaser from 'phaser';
import { GAME, ANIMALS } from '../constants.js';

export class Animal extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, type, waveNum) {
    const config = ANIMALS[type];
    const y = Phaser.Math.Between(GAME.GROUND_TOP, GAME.GROUND_BOTTOM);

    super(scene, GAME.WIDTH + 30, y, type);

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
    }
  }

  takeDamage(amount) {
    if (!this.alive) return false;

    this.hp -= amount;
    this.hurtTimer = 150;
    this.setTexture(`${this.animalType}_hurt`);

    this.scene.time.delayedCall(150, () => {
      if (this.active && this.alive) {
        this.setTexture(this.animalType);
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
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    // Ограничиваем зоной земли
    if (this.y < GAME.GROUND_TOP) {
      this.y = GAME.GROUND_TOP;
      this.setVelocityY(Math.abs(this.body.velocity.y));
    }
    if (this.y > GAME.GROUND_BOTTOM) {
      this.y = GAME.GROUND_BOTTOM;
      this.setVelocityY(-Math.abs(this.body.velocity.y));
    }
  }
}
