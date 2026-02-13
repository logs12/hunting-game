import Phaser from 'phaser';
import { GAME } from '../constants';
import type { TouchControlCallbacks } from '../types';

const MOVE_SPEED = 300;
const SHOP_HEIGHT = 65;
const DRAG_THRESHOLD = 5;
const ZONE_SPLIT_X = 144;

interface PointerState {
  zone: 'move' | 'fire' | 'shop';
  startX: number;
  startY: number;
  hunterStartY: number;
}

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
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | null;
  keyW: Phaser.Input.Keyboard.Key | null;
  keyS: Phaser.Input.Keyboard.Key | null;
  keyA: Phaser.Input.Keyboard.Key | null;
  keyD: Phaser.Input.Keyboard.Key | null;
  keySpace: Phaser.Input.Keyboard.Key | null;
  keyQ: Phaser.Input.Keyboard.Key | null;
  keyR: Phaser.Input.Keyboard.Key | null;

  // Per-pointer tracking
  _pointers: Map<number, PointerState>;

  // Shop drag tracking
  _shopDragStartX: number;
  _shopDragging: boolean;
  _shopScrollStart: number;

  // Virtual joystick indicator
  _joystickBg: Phaser.GameObjects.Arc;
  _joystickThumb: Phaser.GameObjects.Arc;

  // Zone hint
  _zoneHintShown: boolean;

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

    this._pointers = new Map();
    this._shopDragStartX = 0;
    this._shopDragging = false;
    this._shopScrollStart = 0;
    this._zoneHintShown = false;

    // Virtual joystick indicator (hidden by default)
    this._joystickBg = scene.add.circle(0, 0, 30, 0xffffff, 0.15);
    this._joystickBg.setDepth(24);
    this._joystickBg.setVisible(false);

    this._joystickThumb = scene.add.circle(0, 0, 12, 0xffffff, 0.3);
    this._joystickThumb.setDepth(24);
    this._joystickThumb.setVisible(false);

    // --- Touch/Mouse ---
    scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const id = pointer.id;

      // Shop zone
      if (pointer.y > GAME.HEIGHT - SHOP_HEIGHT) {
        this._pointers.set(id, {
          zone: 'shop',
          startX: pointer.x,
          startY: pointer.y,
          hunterStartY: 0,
        });
        this._shopDragging = false;
        this._shopDragStartX = pointer.x;
        const hud = (scene as any).hud;
        this._shopScrollStart = hud?.scrollOffset ?? 0;
        return;
      }

      // Show zone hint on first touch
      if (!this._zoneHintShown) {
        this._zoneHintShown = true;
        this._showZoneHint();
      }

      // Movement zone (left)
      if (pointer.x < ZONE_SPLIT_X) {
        const hunter = (scene as any).hunter;
        const hunterY = hunter?.sprite?.y ?? GAME.HEIGHT / 2;
        this._pointers.set(id, {
          zone: 'move',
          startX: pointer.x,
          startY: pointer.y,
          hunterStartY: hunterY,
        });
        // Show joystick at touch point
        this._joystickBg.setPosition(pointer.x, pointer.y);
        this._joystickBg.setVisible(true);
        this._joystickThumb.setPosition(pointer.x, pointer.y);
        this._joystickThumb.setVisible(true);
        return;
      }

      // Fire zone (right)
      const hunter = (scene as any).hunter;
      const hunterY = hunter?.sprite?.y ?? GAME.HEIGHT / 2;
      this._pointers.set(id, {
        zone: 'fire',
        startX: pointer.x,
        startY: pointer.y,
        hunterStartY: hunterY,
      });
      this.onFire();
    });

    scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      const id = pointer.id;
      const state = this._pointers.get(id);
      if (!state) return;

      if (state.zone === 'shop') {
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
        return;
      }

      if (state.zone === 'move') {
        const deltaY = pointer.y - state.startY;
        const targetY = state.hunterStartY + deltaY;
        this.onMoveTo(targetY);
        // Update joystick thumb position
        this._joystickThumb.setPosition(pointer.x, pointer.y);
        return;
      }

      if (state.zone === 'fire') {
        // Hybrid: drag in fire zone also moves hunter
        const deltaY = pointer.y - state.startY;
        if (Math.abs(deltaY) > DRAG_THRESHOLD) {
          const targetY = state.hunterStartY + deltaY;
          this.onMoveTo(targetY);
        }
      }
    });

    scene.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      const id = pointer.id;
      const state = this._pointers.get(id);

      if (state?.zone === 'shop') {
        if (!this._shopDragging && this.onWeaponTap) {
          const hud = (scene as any).hud;
          if (hud?.getWeaponAtX) {
            const key = hud.getWeaponAtX(pointer.x);
            if (key) this.onWeaponTap(key);
          }
        }
      }

      if (state?.zone === 'move') {
        this._joystickBg.setVisible(false);
        this._joystickThumb.setVisible(false);
      }

      this._pointers.delete(id);
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

  _showZoneHint(): void {
    const hint = this.scene.add.rectangle(ZONE_SPLIT_X, GAME.HEIGHT / 2, 2, GAME.HEIGHT - SHOP_HEIGHT, 0xffffff, 0.08);
    hint.setOrigin(0.5);
    hint.setDepth(24);
    this.scene.time.delayedCall(3000, () => {
      this.scene.tweens.add({
        targets: hint,
        alpha: 0,
        duration: 500,
        onComplete: () => hint.destroy(),
      });
    });
  }

  update(time: number, delta: number): void {
    const dt = delta / 1000;

    // Continuous fire for active fire-zone pointers
    for (const [, state] of this._pointers) {
      if (state.zone === 'fire') {
        this.onFire();
      }
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
    this._joystickBg.destroy();
    this._joystickThumb.destroy();
    this._pointers.clear();
  }
}
