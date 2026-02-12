import Phaser from 'phaser';
import { GAME } from '../constants.js';

export class PauseScene extends Phaser.Scene {
  constructor() {
    super('Pause');
  }

  create() {
    // Semi-transparent overlay
    this.overlay = this.add.rectangle(
      GAME.WIDTH / 2, GAME.HEIGHT / 2,
      GAME.WIDTH, GAME.HEIGHT,
      0x000000, 0.7
    );
    this.overlay.setDepth(50);

    // PAUSED text
    this.pauseText = this.add.text(GAME.WIDTH / 2, GAME.HEIGHT / 2 - 40, 'PAUSED', {
      fontSize: '48px',
      fontFamily: 'Arial',
      color: '#ffffff',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4,
    });
    this.pauseText.setOrigin(0.5);
    this.pauseText.setDepth(51);

    // Resume button
    const btnBg = this.add.rectangle(GAME.WIDTH / 2, GAME.HEIGHT / 2 + 40, 160, 48, 0x4a7a2e);
    btnBg.setDepth(51);
    btnBg.setInteractive({ useHandCursor: true });

    const btnText = this.add.text(GAME.WIDTH / 2, GAME.HEIGHT / 2 + 40, 'RESUME', {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    btnText.setOrigin(0.5);
    btnText.setDepth(52);

    btnBg.on('pointerdown', () => this._resume());

    // Keyboard resume
    const kb = this.input.keyboard;
    if (kb) {
      this.keyP = kb.addKey('P');
      this.keyEsc = kb.addKey('ESC');
      this.keyP.on('down', () => this._resume());
      this.keyEsc.on('down', () => this._resume());
    }
  }

  _resume() {
    this.scene.resume('Game');
    this.scene.stop();
  }
}
