import Phaser from 'phaser';
import { GAME, DIFFICULTY, ANIMALS } from '../constants.js';
import { AnimalTypes } from '../entities/AnimalTypes.js';
import { Animal } from '../entities/Animal.js';

export class WaveManager {
  constructor(scene) {
    this.scene = scene;
    this.currentWave = 0;
    this.waveActive = false;
    this.waveTimer = null;
    this.spawnTimer = null;
    this.animals = scene.physics.add.group();
    this.onWaveStart = null;
    this.onWaveEnd = null;
    this.onAnimalEscaped = null;
    this.lastError = null;
  }

  startNextWave() {
    try {
      this.currentWave++;
      this.waveActive = true;

      if (this.onWaveStart) this.onWaveStart(this.currentWave);

      const baseDelay = DIFFICULTY.spawnDelay(this.currentWave);

      this.spawnTimer = this.scene.time.addEvent({
        delay: baseDelay,
        callback: () => this._spawnAnimal(),
        loop: true,
      });

      this._spawnAnimal();

      // Wave duration grows over time
      const duration = GAME.WAVE_DURATION + Math.floor(this.currentWave / 3) * 2000;
      this.waveTimer = this.scene.time.delayedCall(duration, () => {
        this.endWave();
      });
    } catch (e) {
      this.lastError = 'startWave: ' + e.message;
      console.error('startNextWave error:', e);
    }
  }

  _spawnAnimal() {
    if (!this.waveActive) return;

    try {
      // Group spawning from wave 3+
      if (this.currentWave >= 3 && Math.random() < DIFFICULTY.groupChance(this.currentWave)) {
        this._spawnGroup();
      } else {
        this._spawnSingle();
      }
    } catch (e) {
      this.lastError = 'spawn: ' + e.message;
      console.error('Spawn error:', e);
    }
  }

  _spawnSingle() {
    const animal = AnimalTypes.spawn(this.scene, this.currentWave);
    this.animals.add(animal);
    animal.activatePhysics();
  }

  _spawnGroup() {
    const type = AnimalTypes.getWeightedRandom(this.currentWave);
    const config = ANIMALS[type];
    const size = DIFFICULTY.groupSize(this.currentWave);
    const formation = config.formation || 'spread';

    for (let i = 0; i < size; i++) {
      this.scene.time.delayedCall(i * 200, () => {
        if (!this.waveActive) return;
        try {
          const animal = new Animal(this.scene, type, this.currentWave);

          // Apply formation offsets
          if (formation === 'v' && i > 0) {
            // V-formation: progressive Y offset
            const side = i % 2 === 0 ? 1 : -1;
            const row = Math.ceil(i / 2);
            animal.y += side * row * 25;
            animal.x += row * 30;
          } else if (formation === 'pack') {
            // Pack: tight cluster with random offsets
            animal.y += Phaser.Math.Between(-20, 20);
            animal.x += Phaser.Math.Between(0, 40);
          } else if (formation === 'stampede') {
            // Stampede: line formation
            animal.x += i * 40;
          } else {
            // Default spread
            animal.y += Phaser.Math.Between(-30, 30);
            animal.x += i * 25;
          }

          this.animals.add(animal);
          animal.activatePhysics();
        } catch (e) {
          console.error('Group spawn error:', e);
        }
      });
    }
  }

  endWave() {
    this.waveActive = false;
    if (this.spawnTimer) this.spawnTimer.destroy();
    if (this.waveTimer) this.waveTimer.destroy();

    if (this.onWaveEnd) this.onWaveEnd(this.currentWave);
  }

  update() {
    this.animals.getChildren().forEach((animal) => {
      if (animal.active && animal.alive && animal.x < -10) {
        if (this.onAnimalEscaped) this.onAnimalEscaped(animal);
        animal.escaped();
      }
    });
  }

  getAliveCount() {
    return this.animals.getChildren().filter((a) => a.active && a.alive).length;
  }

  isWaveCleared() {
    return !this.waveActive && this.getAliveCount() === 0;
  }

  destroy() {
    if (this.spawnTimer) this.spawnTimer.destroy();
    if (this.waveTimer) this.waveTimer.destroy();
    this.animals.clear(true, true);
  }
}
