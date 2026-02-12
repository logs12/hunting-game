import Phaser from 'phaser';
import { initTelegram } from './telegram.js';
import { GAME } from './constants.js';
import { BootScene } from './scenes/BootScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { GameScene } from './scenes/GameScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';

initTelegram();

const config = {
  type: Phaser.CANVAS,
  width: GAME.WIDTH,
  height: GAME.HEIGHT,
  parent: document.body,
  backgroundColor: '#87CEEB',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  scene: [BootScene, MenuScene, GameScene, GameOverScene],
  input: {
    keyboard: true,
    activePointers: 3,
  },
};

const game = new Phaser.Game(config);
