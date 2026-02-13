import Phaser from 'phaser';
import { GAME } from '../constants';
import type { TouchControlCallbacks } from '../types';

const MOVE_SPEED = 300;
const SHOP_HEIGHT = 65;
const DRAG_THRESHOLD = 5;

export class TouchControls {
  scene: Phaser.Scene;
  onMoveTo: (y: number) => void;
  onMoveBy: (dy: number) => void;
  onMoveToXY: (x: number, y: number) => void;
  onMoveByX: (dx: number) => void;
  onFire: () => void;
  onSwitchWeapon: () => void;
  onReload: () => void;
  onWeaponTap?: (key: string) => void;
  touching: boolean;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | null;
  keyW: Phaser.Input.Keyboard.Key | null;
  keyS: Phaser.Input.Keyboard.Key | null;
  keyA: Phaser.Input.Keyboard.Key | null;
  keyD: Phaser.Input.Keyboard.Key | null;
  keySpace: Phaser.Input.Keyboard.Key | null;
  keyQ: Phaser.Input.Keyboard.Key | null;
  keyR: Phaser.Input.Keyboard.Key | null;

  // Shop drag tracking
  _shopDragStartX: number;
  _shopDragging: boolean;
  _shopPointerDown: boolean;
  _shopScrollStart: number;
  _shopPointerX: number;

  constructor(scene: Phaser.Scene, { onMoveTo, onMoveBy, onMoveToXY, onMoveByX, onFire, onSwitchWeapon, onReload, onWeaponTap }: TouchControlCallbacks) {
    this.scene = scene;
    this.onMoveTo = onMoveTo;
    this.onMoveBy = onMoveBy;
    this.onMoveToXY = onMoveToXY;
    this.onMoveByX = onMoveByX;
    this.onFire = onFire;
    this.onSwitchWeapon = onSwitchWeapon;
    this.onReload = onReload;
    this.onWeaponTap = onWeaponTap;
    this.touching = false;
    this._shopDragStartX = 0;
    this._shopDragging = false;
    this._shopPointerDown = false;
    this._shopScrollStart = 0;
    this._shopPointerX = 0;

    // --- Touch/Mouse ---
    scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.y > GAME.HEIGHT - SHOP_HEIGHT) {
        // Shop zone — start drag tracking
        this._shopPointerDown = true;
        this._shopDragging = false;
        this._shopDragStartX = pointer.x;
        this._shopPointerX = pointer.x;
        // Get current scroll offset from HUD
        const hud = (scene as any).hud;
        this._shopScrollStart = hud?.scrollOffset ?? 0;
        return;
      }
      this.touching = true;
      this.onFire();
    });

    scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (!this._shopPointerDown) return;
      const deltaX = pointer.x - this._shopDragStartX;
      if (Math.abs(deltaX) > DRAG_THRESHOLD) {
        this._shopDragging = true;
      }
      if (this._shopDragging) {
        const hud = (scene as any).hud;
        if (hud?.setScrollOffset) {
          hud.setScrollOffset(this._shopScrollStart - deltaX);
        }
      }
      this._shopPointerX = pointer.x;
    });

    scene.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (this._shopPointerDown) {
        if (!this._shopDragging && this.onWeaponTap) {
          // Tap — determine which weapon was tapped
          const hud = (scene as any).hud;
          if (hud?.getWeaponAtX) {
            const key = hud.getWeaponAtX(pointer.x);
            if (key) this.onWeaponTap(key);
          }
        }
        this._shopPointerDown = false;
        this._shopDragging = false;
      }
      this.touching = false;
    });

    // --- Keyboard ---
    this.cursors = null;
    this.keyW = null;
    this.keyS = null;
    this.keyA = null;
    this.keyD = null;
    this.keySpace = null;
    this.keyQ = null;
    this.keyR = null;

    const kb = scene.input.keyboard;
    if (kb) {
      this.cursors = kb.createCursorKeys();
      this.keyW = kb.addKey('W');
      this.keyS = kb.addKey('S');
      this.keyA = kb.addKey('A');
      this.keyD = kb.addKey('D');
      this.keySpace = kb.addKey('SPACE');
      this.keyQ = kb.addKey('Q');
      this.keyR = kb.addKey('R');
    }
  }

  update(time: number, delta: number): void {
    const dt = delta / 1000;

    // Touch hold: continuous fire (for auto weapons)
    if (this.touching) {
      this.onFire();
    }

    // Keyboard
    if (this.cursors) {
      if (this.cursors.up.isDown || this.keyW!.isDown) {
        this.onMoveBy(-MOVE_SPEED * dt);
      }
      if (this.cursors.down.isDown || this.keyS!.isDown) {
        this.onMoveBy(MOVE_SPEED * dt);
      }
      if (this.cursors.left.isDown || this.keyA!.isDown) {
        this.onMoveByX(-MOVE_SPEED * dt);
      }
      if (this.cursors.right.isDown || this.keyD!.isDown) {
        this.onMoveByX(MOVE_SPEED * dt);
      }
      if (this.keySpace!.isDown) {
        this.onFire();
      }
      if (Phaser.Input.Keyboard.JustDown(this.keyQ!)) {
        this.onSwitchWeapon();
      }
      if (Phaser.Input.Keyboard.JustDown(this.keyR!)) {
        this.onReload();
      }
    }
  }

  destroy(): void {
    // Phaser очищает keyboard при остановке сцены
  }
}
