import Phaser from 'phaser';
import { GAME } from '../constants.js';
import { getUserName } from '../telegram.js';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  create() {
    const W = GAME.WIDTH;
    const H = GAME.HEIGHT;
    const fs = (size) => `${Math.min(size, Math.floor(H * size / 640))}px`;

    // Background
    this.add.image(W / 2, H / 2, 'background');

    // Dim overlay
    this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.4);

    // Title
    const title = this.add.text(W / 2, H * 0.15, 'HUNTING\nGAME', {
      fontSize: fs(52),
      fontFamily: 'Arial',
      color: '#ffffff',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 6,
      align: 'center',
    });
    title.setOrigin(0.5);

    // Greeting
    const name = getUserName();
    const greeting = this.add.text(W / 2, H * 0.34, `Welcome, ${name}!`, {
      fontSize: fs(20),
      fontFamily: 'Arial',
      color: '#ffdd00',
      stroke: '#000000',
      strokeThickness: 3,
    });
    greeting.setOrigin(0.5);

    // Hunter preview
    const hunter = this.add.sprite(W / 2, H * 0.50, 'hunter_idle_0');
    hunter.setScale(H > 400 ? 2.5 : 1.7);

    // High score
    const highScore = parseInt(localStorage.getItem('huntingGameHighScore') || '0', 10);
    if (highScore > 0) {
      const hs = this.add.text(W / 2, H * 0.64, `Best: ${highScore}`, {
        fontSize: fs(18),
        fontFamily: 'Arial',
        color: '#aaddff',
        stroke: '#000000',
        strokeThickness: 3,
      });
      hs.setOrigin(0.5);
    }

    // Play button
    const btnBg = this.add.rectangle(W / 2, H * 0.75, 200, 60, 0x44aa44, 1);
    btnBg.setStrokeStyle(3, 0x228822);
    btnBg.setInteractive({ useHandCursor: true });

    const btnText = this.add.text(W / 2, H * 0.75, 'PLAY', {
      fontSize: fs(32),
      fontFamily: 'Arial',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    btnText.setOrigin(0.5);

    // Pulse animation on button
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

    // Instructions
    const instr = this.add.text(W / 2, H * 0.90, 'Tap to shoot!\nDon\'t let animals escape!', {
      fontSize: fs(14),
      fontFamily: 'Arial',
      color: '#cccccc',
      stroke: '#000000',
      strokeThickness: 2,
      align: 'center',
    });
    instr.setOrigin(0.5);
  }
}
