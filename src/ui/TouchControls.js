import Phaser from 'phaser';
import { GAME } from '../constants.js';

const MOVE_SPEED = 300;

export class TouchControls {
  constructor(scene, { onMoveTo, onMoveBy, onFire, onSwitchWeapon }) {
    this.scene = scene;
    this.onMoveTo = onMoveTo;
    this.onMoveBy = onMoveBy;
    this.onFire = onFire;
    this.onSwitchWeapon = onSwitchWeapon;
    this.touching = false;
    this.lastPointerY = GAME.GROUND_BOTTOM;

    // --- Touch/Mouse ---
    scene.input.on('pointerdown', (pointer) => {
      if (pointer.y > GAME.HEIGHT - 50) {
        this.onSwitchWeapon();
        return;
      }
      this.touching = true;
      this.lastPointerY = pointer.y;
    });

    scene.input.on('pointermove', (pointer) => {
      if (this.touching && pointer.isDown) {
        this.lastPointerY = pointer.y;
      }
    });

    scene.input.on('pointerup', () => {
      this.touching = false;
    });

    // --- Keyboard (с защитой от null) ---
    this.cursors = null;
    this.keyW = null;
    this.keyS = null;
    this.keySpace = null;
    this.keyQ = null;

    const kb = scene.input.keyboard;
    if (kb) {
      this.cursors = kb.createCursorKeys();
      this.keyW = kb.addKey('W');
      this.keyS = kb.addKey('S');
      this.keySpace = kb.addKey('SPACE');
      this.keyQ = kb.addKey('Q');
    }
  }

  update(time, delta) {
    const dt = delta / 1000;

    // Touch: двигаем к позиции пальца + стреляем
    if (this.touching) {
      this.onMoveTo(this.lastPointerY);
      this.onFire();
    }

    // Keyboard
    if (this.cursors) {
      if (this.cursors.up.isDown || this.keyW.isDown) {
        this.onMoveBy(-MOVE_SPEED * dt);
      }
      if (this.cursors.down.isDown || this.keyS.isDown) {
        this.onMoveBy(MOVE_SPEED * dt);
      }
      if (this.keySpace.isDown) {
        this.onFire();
      }
      if (Phaser.Input.Keyboard.JustDown(this.keyQ)) {
        this.onSwitchWeapon();
      }
    }
  }

  destroy() {
    // Phaser очищает keyboard при остановке сцены
  }
}
