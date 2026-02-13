import Phaser from 'phaser';
import { initTelegram } from './telegram';
import { GAME, applyLayout } from './constants';
import { BootScene } from './scenes/BootScene';
import { MenuScene } from './scenes/MenuScene';
import { GameScene } from './scenes/GameScene';
import { GameOverScene } from './scenes/GameOverScene';
import { PauseScene } from './scenes/PauseScene';

initTelegram();

// Detect initial orientation and apply layout
const landscapeQuery = window.matchMedia('(orientation: landscape)');
applyLayout(landscapeQuery.matches ? 'landscape' : 'portrait');

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.CANVAS,
  width: GAME.WIDTH,
  height: GAME.HEIGHT,
  parent: document.body,
  backgroundColor: '#87CEEB',
  pixelArt: false,
  antialias: true,
  roundPixels: false,
  scale: {
    mode: Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  render: {
    pixelArt: false,
    antialias: true,
    roundPixels: false,
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

// Diagnostic: check rendering settings after boot
game.events.once('ready', () => {
  const canvas = game.canvas;
  const ctx = (canvas as HTMLCanvasElement).getContext('2d');
  console.log('[DIAG] Canvas size:', canvas.width, 'x', canvas.height);
  console.log('[DIAG] Canvas CSS size:', canvas.style.width, canvas.style.height);
  console.log('[DIAG] Device pixel ratio:', window.devicePixelRatio);
  console.log('[DIAG] imageSmoothingEnabled:', ctx?.imageSmoothingEnabled);
  console.log('[DIAG] pixelArt:', game.config.pixelArt);
  console.log('[DIAG] roundPixels:', game.config.roundPixels);
  console.log('[DIAG] antialias:', game.config.antialias);
  console.log('[DIAG] GROUND_TOP:', GAME.GROUND_TOP, 'GROUND_BOTTOM:', GAME.GROUND_BOTTOM);
  console.log('[DIAG] Canvas image-rendering:', window.getComputedStyle(canvas).imageRendering);
});

// Listen for orientation changes
landscapeQuery.addEventListener('change', (e: MediaQueryListEvent) => {
  applyLayout(e.matches ? 'landscape' : 'portrait');
  game.scale.resize(GAME.WIDTH, GAME.HEIGHT);
  // Restart from Boot to regenerate background at new dimensions
  game.scene.getScenes(true).forEach(s => s.scene.stop());
  game.scene.start('Boot');
});
