import Phaser from 'phaser';
import { GAME } from '../constants';
import { disableClosingConfirmation } from '../telegram';
import type { GameOverData } from '../types';

export class GameOverScene extends Phaser.Scene {
  finalScore!: number;
  finalWave!: number;
  highScore!: number;
  isNewRecord!: boolean;

  constructor() {
    super('GameOver');
  }

  init(data: GameOverData): void {
    this.finalScore = data.score || 0;
    this.finalWave = data.wave || 1;
    this.highScore = data.highScore || 0;
    this.isNewRecord = data.isNewRecord || false;
  }

  create() {
    disableClosingConfirmation();

    const W = GAME.WIDTH;
    const H = GAME.HEIGHT;
    const fs = (size: number): string => `${Math.min(size, Math.floor(H * size / 640))}px`;

    // Background
    this.add.image(W / 2, H / 2, 'background').setDepth(0);

    // Dark overlay
    this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.6);

    // Game Over title
    const title = this.add.text(W / 2, H * 0.15, 'GAME OVER', {
      fontSize: fs(48),
      fontFamily: 'Arial',
      color: '#ff3333',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 6,
    });
    title.setOrigin(0.5);

    // Score
    const scoreText = this.add.text(W / 2, H * 0.30, `Score: ${this.finalScore}`, {
      fontSize: fs(32),
      fontFamily: 'Arial',
      color: '#ffffff',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4,
    });
    scoreText.setOrigin(0.5);

    // Wave reached
    const waveText = this.add.text(W / 2, H * 0.40, `Wave: ${this.finalWave}`, {
      fontSize: fs(24),
      fontFamily: 'Arial',
      color: '#aaddff',
      stroke: '#000000',
      strokeThickness: 3,
    });
    waveText.setOrigin(0.5);

    // New record
    if (this.isNewRecord) {
      const record = this.add.text(W / 2, H * 0.50, 'NEW RECORD!', {
        fontSize: fs(28),
        fontFamily: 'Arial',
        color: '#ffdd00',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 4,
      });
      record.setOrigin(0.5);

      this.tweens.add({
        targets: record,
        scaleX: 1.2,
        scaleY: 1.2,
        duration: 500,
        yoyo: true,
        repeat: -1,
      });
    } else {
      const best = this.add.text(W / 2, H * 0.50, `Best: ${this.highScore}`, {
        fontSize: fs(20),
        fontFamily: 'Arial',
        color: '#888888',
        stroke: '#000000',
        strokeThickness: 3,
      });
      best.setOrigin(0.5);
    }

    // Retry button
    const btnBg = this.add.rectangle(W / 2, H * 0.67, 200, 60, 0xdd4444, 1);
    btnBg.setStrokeStyle(3, 0xaa2222);
    btnBg.setInteractive({ useHandCursor: true });

    const btnText = this.add.text(W / 2, H * 0.67, 'RETRY', {
      fontSize: fs(28),
      fontFamily: 'Arial',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    btnText.setOrigin(0.5);

    this.tweens.add({
      targets: [btnBg, btnText],
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    btnBg.on('pointerdown', () => {
      this.scene.start('Game');
    });

    // Menu button
    const menuBg = this.add.rectangle(W / 2, H * 0.81, 200, 50, 0x555555, 1);
    menuBg.setStrokeStyle(2, 0x333333);
    menuBg.setInteractive({ useHandCursor: true });

    const menuText = this.add.text(W / 2, H * 0.81, 'MENU', {
      fontSize: fs(22),
      fontFamily: 'Arial',
      color: '#ffffff',
    });
    menuText.setOrigin(0.5);

    menuBg.on('pointerdown', () => {
      this.scene.start('Menu');
    });
  }
}
