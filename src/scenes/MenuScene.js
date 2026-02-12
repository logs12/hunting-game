import Phaser from 'phaser';
import { GAME } from '../constants.js';
import { getUserName } from '../telegram.js';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  create() {
    // Background
    this.add.image(GAME.WIDTH / 2, GAME.HEIGHT / 2, 'background');

    // Dim overlay
    this.add.rectangle(GAME.WIDTH / 2, GAME.HEIGHT / 2, GAME.WIDTH, GAME.HEIGHT, 0x000000, 0.4);

    // Title
    const title = this.add.text(GAME.WIDTH / 2, 120, 'HUNTING\nGAME', {
      fontSize: '52px',
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
    const greeting = this.add.text(GAME.WIDTH / 2, 220, `Welcome, ${name}!`, {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#ffdd00',
      stroke: '#000000',
      strokeThickness: 3,
    });
    greeting.setOrigin(0.5);

    // Hunter preview
    const hunter = this.add.sprite(GAME.WIDTH / 2, 320, 'hunter');
    hunter.setScale(2);

    // High score
    const highScore = parseInt(localStorage.getItem('huntingGameHighScore') || '0', 10);
    if (highScore > 0) {
      const hs = this.add.text(GAME.WIDTH / 2, 400, `Best: ${highScore}`, {
        fontSize: '18px',
        fontFamily: 'Arial',
        color: '#aaddff',
        stroke: '#000000',
        strokeThickness: 3,
      });
      hs.setOrigin(0.5);
    }

    // Play button
    const btnBg = this.add.rectangle(GAME.WIDTH / 2, 480, 200, 60, 0x44aa44, 1);
    btnBg.setStrokeStyle(3, 0x228822);
    btnBg.setInteractive({ useHandCursor: true });

    const btnText = this.add.text(GAME.WIDTH / 2, 480, 'PLAY', {
      fontSize: '32px',
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
    const instr = this.add.text(GAME.WIDTH / 2, 560, 'Tap to shoot!\nDon\'t let animals escape!', {
      fontSize: '14px',
      fontFamily: 'Arial',
      color: '#cccccc',
      stroke: '#000000',
      strokeThickness: 2,
      align: 'center',
    });
    instr.setOrigin(0.5);
  }
}
