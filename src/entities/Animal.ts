import Phaser from 'phaser';
import { GAME, ANIMALS, DIFFICULTY } from '../constants';
import type { AnimalConfig } from '../types';

export class Animal extends Phaser.Physics.Arcade.Sprite {
  declare body: Phaser.Physics.Arcade.Body;
  animalType: string;
  config: AnimalConfig;
  hp: number;
  maxHp: number;
  points: number;
  baseSpeed: number;
  waveNum: number;
  alive: boolean;
  hurtTimer: number;
  _timers: Phaser.Time.TimerEvent[];
  speedMultiplier: number;
  maxSpeedMult: number;
  accelRate: number;
  dying: boolean;
  _lastTrailX: number | undefined;
  _bloodPoolStamped: boolean;

  constructor(scene: Phaser.Scene, type: string, waveNum: number) {
    const config = ANIMALS[type];
    const y = Phaser.Math.Between(GAME.GROUND_TOP, GAME.GROUND_BOTTOM);

    super(scene, GAME.WIDTH + 30, y, `${type}_walk_0`);

    scene.add.existing(this);

    this.animalType = type;
    this.config = config;
    // HP: multiplicative scaling via DIFFICULTY
    const hpMult = DIFFICULTY.hpScale(waveNum);
    this.hp = Math.ceil(config.hp * hpMult);
    this.maxHp = this.hp;
    this.points = config.points;
    // Speed: multiplicative scaling via DIFFICULTY
    const speedMult = DIFFICULTY.speedScale(waveNum);
    this.baseSpeed = Math.round(config.speed * speedMult);
    this.waveNum = waveNum;
    this.alive = true;
    this.hurtTimer = 0;
    this._timers = [];
    // Gradual acceleration
    this.speedMultiplier = 0.7;
    this.maxSpeedMult = 1.3;
    this.accelRate = 0.075;
    this.dying = false;
    this._lastTrailX = undefined;
    this._bloodPoolStamped = false;

    this.setDepth(5);
  }

  activatePhysics(): void {
    this.setVelocityX(-this.baseSpeed * this.speedMultiplier);
    this.body.setAllowGravity(false);

    if (this.config.flying) {
      this.y = Phaser.Math.Between(GAME.FLYING_MIN_Y, GAME.FLYING_MAX_Y);
    }

    this.play(`${this.animalType}_walk`);
    this._initBehavior(this.scene);
  }

  _addTimer(timer: Phaser.Time.TimerEvent): Phaser.Time.TimerEvent {
    this._timers.push(timer);
    return timer;
  }

  _timedEvent(scene: Phaser.Scene, delay: number, cb: () => void): Phaser.Time.TimerEvent {
    return this._addTimer(scene.time.addEvent({ delay, callback: cb, loop: true }));
  }

  _sineMove(scene: Phaser.Scene, delay: number, phase: number, ampY: number, ampX: number): void {
    let p = phase;
    this._timedEvent(scene, delay, () => {
      if (!this.alive || !this.active) return;
      p += 0.1;
      this.setVelocityY(Math.sin(p) * ampY);
      if (ampX) this.setVelocityX(-this.baseSpeed * (1 + Math.sin(p * 0.5) * ampX));
    });
  }

  _zigzag(scene: Phaser.Scene, delay: number, ampY: number, durMs: number): void {
    this._timedEvent(scene, delay, () => {
      if (!this.alive || !this.active) return;
      const dir = Math.random() > 0.5 ? 1 : -1;
      this.setVelocityY(dir * ampY);
      scene.time.delayedCall(durMs, () => {
        if (this.alive && this.active) this.setVelocityY(0);
      });
    });
  }

  _chargeBurst(scene: Phaser.Scene, delay: number, mult: number, durMs: number): void {
    this._timedEvent(scene, delay, () => {
      if (!this.alive || !this.active) return;
      this.setVelocityX(-this.baseSpeed * mult);
      scene.time.delayedCall(durMs, () => {
        if (this.alive && this.active) this.setVelocityX(-this.baseSpeed);
      });
    });
  }

  _pauseMove(scene: Phaser.Scene, delay: number, pauseMs: number): void {
    this._timedEvent(scene, delay, () => {
      if (!this.alive || !this.active) return;
      this.setVelocityX(0);
      scene.time.delayedCall(pauseMs, () => {
        if (this.alive && this.active) this.setVelocityX(-this.baseSpeed);
      });
    });
  }

  _initBehavior(scene: Phaser.Scene): void {
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

  isHeadshot(hitX: number, hitY: number): boolean {
    const config = ANIMALS[this.animalType];
    const hz = config.headZone || { xFrac: 0.25, yFrac: 0.35 };
    const bounds = this.getBounds();

    // Head is at the FRONT of the animal (animals move left, so front = left side)
    const headLeft = bounds.left;
    const headRight = bounds.left + bounds.width * hz.xFrac;
    const headTop = bounds.top;
    const headBottom = bounds.top + bounds.height * hz.yFrac;

    return hitX >= headLeft && hitX <= headRight && hitY >= headTop && hitY <= headBottom;
  }

  takeDamage(amount: number, isHeadshot: boolean = false): boolean {
    if (!this.alive) return false;

    const actualDamage = isHeadshot ? amount * 2 : amount;
    this.hp -= actualDamage;
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
      this.die(isHeadshot);
      return true;
    }
    return false;
  }

  die(_headshot: boolean = false): void {
    this.alive = false;
    this.dying = true;
    this._bloodPoolStamped = false;
    this.anims.stop();
    this.clearTint();
    this._cleanTimers();

    // Slide horizontally with inertia; flying animals fall to ground
    const hVel = this.body.velocity.x * 0.6;
    if (this.config.flying) {
      this.body.setVelocity(hVel, 150);
      this.body.setAllowGravity(false);
    } else {
      this.body.setVelocity(hVel, 0);
      this.body.setAllowGravity(false);
    }

    // Switch to death sprite
    this.setTexture(`${this.animalType}_dead_0`);
    this.setDepth(4);

    // Tumbling rotation
    const rotSpeed = Phaser.Math.Between(90, 200);
    const rotDir = Math.random() > 0.5 ? 1 : -1;
    this.scene.tweens.add({
      targets: this,
      angle: rotDir * rotSpeed,
      duration: 800,
      ease: 'Quad.easeOut',
    });

    // After 15s, fade out carcass
    this.scene.time.delayedCall(15000, () => {
      this.scene.tweens.add({
        targets: this,
        alpha: 0,
        duration: 2000,
        ease: 'Power1',
      });
      this.scene.time.delayedCall(2100, () => {
        if (this.active) this.destroy();
      });
    });
  }

  escaped(): void {
    this._cleanTimers();
    this.destroy();
  }

  _cleanTimers(): void {
    this._timers.forEach(t => t.destroy());
    this._timers = [];
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);

    // Dying body — horizontal slide with friction, stamp blood pool when stopped
    if (this.dying) {
      // Flying carcass falls to ground
      if (this.y >= GAME.GROUND_BOTTOM) {
        this.y = GAME.GROUND_BOTTOM;
        this.body.setVelocityY(0);
      }

      // Horizontal friction
      this.body.velocity.x *= 0.93;
      const stopped = Math.abs(this.body.velocity.x) < 2 && this.body.velocity.y === 0;
      if (stopped) {
        this.body.setVelocity(0, 0);
      }

      // Blood trail while sliding — only on ground (dense, visible smear)
      if (Math.abs(this.body.velocity.x) > 3 && this.y >= GAME.GROUND_TOP) {
        if (this._lastTrailX === undefined || Math.abs(this.x - this._lastTrailX) > 4) {
          const effects = (this.scene as any).effects;
          const trailY = Math.max(GAME.GROUND_TOP, this.y + 5);
          // Main smear
          effects?.stampBlood?.(this.x, trailY, 'blood', 0.7 + Math.random() * 0.4, 0.4 + Math.random() * 0.2, 0.7);
          // Secondary drip offset
          if (Math.random() > 0.4) {
            const dy = (Math.random() - 0.5) * 6;
            effects?.stampBlood?.(this.x + 2, Math.max(GAME.GROUND_TOP, trailY + dy), 'blood', 0.3 + Math.random() * 0.3, 0.3, 0.5);
          }
          this._lastTrailX = this.x;
        }
      }

      // Stamp blood pool once corpse has fully stopped (on ground, no movement)
      if (!this._bloodPoolStamped && stopped) {
        this._bloodPoolStamped = true;
        const effects = (this.scene as any).effects;
        const poolY = Math.max(GAME.GROUND_TOP, this.y + 8);
        effects?.stampBlood?.(this.x, poolY, 'blood_pool', 1 + Math.random() * 0.4, 1, 0.8);
      }

      return; // Skip alive-only logic
    }

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
