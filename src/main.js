import Phaser from 'phaser';
import { initTelegram } from './telegram.js';
import { GAME, applyLayout } from './constants.js';
import { BootScene } from './scenes/BootScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { GameScene } from './scenes/GameScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';
import { PauseScene } from './scenes/PauseScene.js';

initTelegram();

// Detect initial orientation and apply layout
const landscapeQuery = window.matchMedia('(orientation: landscape)');
applyLayout(landscapeQuery.matches ? 'landscape' : 'portrait');

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
  scene: [BootScene, MenuScene, GameScene, GameOverScene, PauseScene],
  input: {
    keyboard: true,
    activePointers: 3,
  },
};

const game = new Phaser.Game(config);

// Listen for orientation changes
landscapeQuery.addEventListener('change', (e) => {
  applyLayout(e.matches ? 'landscape' : 'portrait');
  game.scale.resize(GAME.WIDTH, GAME.HEIGHT);
  // Restart from Boot to regenerate background at new dimensions
  game.scene.getScenes(true).forEach(s => s.scene.stop());
  game.scene.start('Boot');
});
