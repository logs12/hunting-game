import Phaser from 'phaser';
import { GAME } from '../constants.js';
import { AnimalTypes } from '../entities/AnimalTypes.js';

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

      // Spawn rate decreases with wave progression
      const baseDelay = Math.max(600, 2000 - this.currentWave * 100);

      this.spawnTimer = this.scene.time.addEvent({
        delay: baseDelay,
        callback: () => this._spawnAnimal(),
        loop: true,
      });

      // Spawn first animal immediately
      this._spawnAnimal();

      // Wave duration
      this.waveTimer = this.scene.time.delayedCall(GAME.WAVE_DURATION, () => {
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
      const animal = AnimalTypes.spawn(this.scene, this.currentWave);
      this.animals.add(animal);
      animal.activatePhysics();
    } catch (e) {
      this.lastError = 'spawn: ' + e.message;
      console.error('Spawn error:', e);
    }
  }

  endWave() {
    this.waveActive = false;
    if (this.spawnTimer) this.spawnTimer.destroy();
    if (this.waveTimer) this.waveTimer.destroy();

    if (this.onWaveEnd) this.onWaveEnd(this.currentWave);
  }

  update() {
    // Check animals reaching the left edge
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
