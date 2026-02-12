import Phaser from 'phaser';
import { GAME } from '../constants.js';
import { disableClosingConfirmation } from '../telegram.js';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  init(data) {
    this.finalScore = data.score || 0;
    this.finalWave = data.wave || 1;
    this.highScore = data.highScore || 0;
    this.isNewRecord = data.isNewRecord || false;
  }

  create() {
    // На экране Game Over можно закрыть без подтверждения
    disableClosingConfirmation();

    // Background
    this.add.image(GAME.WIDTH / 2, GAME.HEIGHT / 2, 'background').setDepth(0);

    // Dark overlay
    this.add.rectangle(GAME.WIDTH / 2, GAME.HEIGHT / 2, GAME.WIDTH, GAME.HEIGHT, 0x000000, 0.6);

    // Game Over title
    const title = this.add.text(GAME.WIDTH / 2, 120, 'GAME OVER', {
      fontSize: '48px',
      fontFamily: 'Arial',
      color: '#ff3333',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 6,
    });
    title.setOrigin(0.5);

    // Score
    const scoreText = this.add.text(GAME.WIDTH / 2, 220, `Score: ${this.finalScore}`, {
      fontSize: '32px',
      fontFamily: 'Arial',
      color: '#ffffff',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4,
    });
    scoreText.setOrigin(0.5);

    // Wave reached
    const waveText = this.add.text(GAME.WIDTH / 2, 270, `Wave: ${this.finalWave}`, {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#aaddff',
      stroke: '#000000',
      strokeThickness: 3,
    });
    waveText.setOrigin(0.5);

    // New record
    if (this.isNewRecord) {
      const record = this.add.text(GAME.WIDTH / 2, 320, 'NEW RECORD!', {
        fontSize: '28px',
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
      const best = this.add.text(GAME.WIDTH / 2, 320, `Best: ${this.highScore}`, {
        fontSize: '20px',
        fontFamily: 'Arial',
        color: '#888888',
        stroke: '#000000',
        strokeThickness: 3,
      });
      best.setOrigin(0.5);
    }

    // Retry button
    const btnBg = this.add.rectangle(GAME.WIDTH / 2, 430, 200, 60, 0xdd4444, 1);
    btnBg.setStrokeStyle(3, 0xaa2222);
    btnBg.setInteractive({ useHandCursor: true });

    const btnText = this.add.text(GAME.WIDTH / 2, 430, 'RETRY', {
      fontSize: '28px',
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
    const menuBg = this.add.rectangle(GAME.WIDTH / 2, 520, 200, 50, 0x555555, 1);
    menuBg.setStrokeStyle(2, 0x333333);
    menuBg.setInteractive({ useHandCursor: true });

    const menuText = this.add.text(GAME.WIDTH / 2, 520, 'MENU', {
      fontSize: '22px',
      fontFamily: 'Arial',
      color: '#ffffff',
    });
    menuText.setOrigin(0.5);

    menuBg.on('pointerdown', () => {
      this.scene.start('Menu');
    });
  }
}
