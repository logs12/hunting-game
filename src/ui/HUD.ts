import { GAME, WEAPONS, WEAPON_ORDER } from '../constants';
import type { HUDCallbacks } from '../types';

const SHOP_HEIGHT = 65;
const SLOT_WIDTH = 48;

interface ShopSlot {
  sprite: Phaser.GameObjects.Sprite;
  priceText: Phaser.GameObjects.Text;
  key: string;
  border: Phaser.GameObjects.Rectangle;
}

export class HUD {
  scene: Phaser.Scene;
  topBar: Phaser.GameObjects.Rectangle;
  scoreText: Phaser.GameObjects.Text;
  waveText: Phaser.GameObjects.Text;
  livesText: Phaser.GameObjects.Text;
  pauseBtn: Phaser.GameObjects.Text;
  muteBtn: Phaser.GameObjects.Text;
  comboText: Phaser.GameObjects.Text;
  ammoText: Phaser.GameObjects.Text;
  reloadBar: Phaser.GameObjects.Rectangle;
  _reloadTween: Phaser.Tweens.Tween | null;
  _unlockedSet: Set<string>;
  crosshairAmmoText: Phaser.GameObjects.Text;
  moneyText: Phaser.GameObjects.Text;

  // Shop strip
  shopBg: Phaser.GameObjects.Rectangle;
  _shopSlots: ShopSlot[];
  scrollOffset: number;

  constructor(scene: Phaser.Scene, { onPause, onToggleMute }: HUDCallbacks = {}) {
    this.scene = scene;
    this._unlockedSet = new Set<string>();

    const style = {
      fontSize: '16px',
      fontFamily: 'Arial',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3,
    };

    // Top bar background
    this.topBar = scene.add.rectangle(GAME.WIDTH / 2, 20, GAME.WIDTH, 40, 0x000000, 0.5);
    this.topBar.setDepth(25);

    // Score
    this.scoreText = scene.add.text(10, 8, 'Score: 0', style);
    this.scoreText.setDepth(26);

    // Wave
    this.waveText = scene.add.text(GAME.WIDTH / 2, 8, 'Wave: 1', { ...style, fontSize: '14px' });
    this.waveText.setOrigin(0.5, 0);
    this.waveText.setDepth(26);

    // Lives
    this.livesText = scene.add.text(GAME.WIDTH - 10, 8, '', style);
    this.livesText.setOrigin(1, 0);
    this.livesText.setDepth(26);
    this.updateLives(GAME.LIVES);

    // Pause button
    this.pauseBtn = scene.add.text(GAME.WIDTH - 40, 24, '||', {
      ...style,
      fontSize: '20px',
      color: '#cccccc',
      padding: { x: 6, y: 2 },
    });
    this.pauseBtn.setOrigin(0.5);
    this.pauseBtn.setDepth(27);
    this.pauseBtn.setInteractive({ useHandCursor: true });
    this.pauseBtn.on('pointerdown', () => {
      if (onPause) onPause();
    });

    // Mute button
    this.muteBtn = scene.add.text(GAME.WIDTH - 18, 24, 'S', {
      ...style,
      fontSize: '16px',
      color: '#cccccc',
      padding: { x: 4, y: 2 },
    });
    this.muteBtn.setOrigin(0.5);
    this.muteBtn.setDepth(27);
    this.muteBtn.setInteractive({ useHandCursor: true });
    this.muteBtn.on('pointerdown', () => {
      if (onToggleMute) onToggleMute();
    });

    // Combo
    this.comboText = scene.add.text(10, 30, '', { ...style, fontSize: '14px', color: '#ffdd00' });
    this.comboText.setDepth(26);

    // Ammo counter (above shop strip)
    this.ammoText = scene.add.text(GAME.WIDTH - 10, GAME.HEIGHT - SHOP_HEIGHT - 8, '', {
      fontFamily: 'monospace',
      fontSize: '16px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3,
    });
    this.ammoText.setOrigin(1, 0.5);
    this.ammoText.setDepth(101);

    // Reload bar (above shop strip)
    this.reloadBar = scene.add.rectangle(0, GAME.HEIGHT - SHOP_HEIGHT - 2, 0, 4, 0x00ff00);
    this.reloadBar.setOrigin(0, 0.5);
    this.reloadBar.setDepth(101);
    this.reloadBar.setVisible(false);
    this._reloadTween = null;

    // Crosshair ammo text — follows crosshair position
    this.crosshairAmmoText = scene.add.text(0, 0, '', {
      fontFamily: 'monospace',
      fontSize: '11px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2,
    });
    this.crosshairAmmoText.setOrigin(0.5, 1);
    this.crosshairAmmoText.setDepth(21);

    // Money text — floats above hunter
    this.moneyText = scene.add.text(0, 0, '$0', {
      fontFamily: 'monospace',
      fontSize: '12px',
      color: '#00ff88',
      stroke: '#000000',
      strokeThickness: 3,
    });
    this.moneyText.setOrigin(0.5, 1);
    this.moneyText.setDepth(21);

    // --- Shop strip ---
    this.shopBg = scene.add.rectangle(
      GAME.WIDTH / 2, GAME.HEIGHT - SHOP_HEIGHT / 2,
      GAME.WIDTH, SHOP_HEIGHT, 0x000000, 0.6
    );
    this.shopBg.setDepth(25);

    this.scrollOffset = 0;
    this._shopSlots = [];

    const shopTopY = GAME.HEIGHT - SHOP_HEIGHT;
    const iconCenterY = shopTopY + 24;
    const priceCenterY = shopTopY + 50;

    for (let i = 0; i < WEAPON_ORDER.length; i++) {
      const key = WEAPON_ORDER[i];
      const slotX = i * SLOT_WIDTH + SLOT_WIDTH / 2;

      // Weapon sprite
      const sprite = scene.add.sprite(slotX, iconCenterY, `weapon_${key}`);
      sprite.setDepth(26);
      const origW = sprite.width;
      const origH = sprite.height;
      const maxDim = 28;
      const scaleFactor = Math.min(maxDim / origW, maxDim / origH, 1);
      sprite.setScale(scaleFactor);

      // Price text
      const cfg = WEAPONS[key];
      const priceLabel = cfg.unlock === 0 ? '' : `${cfg.unlock}`;
      const priceText = scene.add.text(slotX, priceCenterY, priceLabel, {
        fontFamily: 'monospace',
        fontSize: '8px',
        color: '#aaaaaa',
        stroke: '#000000',
        strokeThickness: 1,
      });
      priceText.setOrigin(0.5);
      priceText.setDepth(26);

      // Selection border (invisible by default)
      const border = scene.add.rectangle(slotX, iconCenterY, 34, 34);
      border.setStrokeStyle(2, 0x00ff00);
      border.setFillStyle(0x000000, 0);
      border.setDepth(27);
      border.setVisible(false);

      this._shopSlots.push({ sprite, priceText, key, border });
    }
  }

  /** Get weapon key at given screen x position, accounting for scroll */
  getWeaponAtX(screenX: number): string | null {
    const worldX = screenX + this.scrollOffset;
    const index = Math.floor(worldX / SLOT_WIDTH);
    if (index >= 0 && index < WEAPON_ORDER.length) {
      return WEAPON_ORDER[index];
    }
    return null;
  }

  /** Update scroll offset and reposition shop items */
  setScrollOffset(offset: number): void {
    const maxScroll = Math.max(0, WEAPON_ORDER.length * SLOT_WIDTH - GAME.WIDTH);
    this.scrollOffset = Math.max(0, Math.min(offset, maxScroll));
    this._repositionShopSlots();
  }

  _repositionShopSlots(): void {
    const shopTopY = GAME.HEIGHT - SHOP_HEIGHT;
    const iconCenterY = shopTopY + 24;
    const priceCenterY = shopTopY + 50;

    for (let i = 0; i < this._shopSlots.length; i++) {
      const slot = this._shopSlots[i];
      const slotX = i * SLOT_WIDTH + SLOT_WIDTH / 2 - this.scrollOffset;

      // Hide items outside viewport with margin
      const visible = slotX > -SLOT_WIDTH && slotX < GAME.WIDTH + SLOT_WIDTH;
      slot.sprite.setVisible(visible);
      slot.priceText.setVisible(visible);
      slot.border.setVisible(visible && slot.border.getData('active'));

      if (visible) {
        slot.sprite.setPosition(slotX, iconCenterY);
        slot.priceText.setPosition(slotX, priceCenterY);
        slot.border.setPosition(slotX, iconCenterY);
      }
    }
  }

  /** Refresh all weapon slot visual states */
  updateShopStrip(score: number, currentWeapon: string, unlockedWeapons: string[]): void {
    const ownedSet = new Set(unlockedWeapons);
    this._unlockedSet = ownedSet;

    for (const slot of this._shopSlots) {
      const cfg = WEAPONS[slot.key];
      const owned = ownedSet.has(slot.key);
      const affordable = !owned && score >= cfg.unlock;
      const active = slot.key === currentWeapon;

      if (active) {
        // Active weapon: full visibility, green border
        slot.sprite.setAlpha(1);
        slot.sprite.clearTint();
        slot.priceText.setColor('#00ff88');
        slot.priceText.setText(cfg.name);
        slot.border.setData('active', true);
        slot.border.setVisible(true);
      } else if (owned) {
        // Owned but not active
        slot.sprite.setAlpha(0.9);
        slot.sprite.clearTint();
        slot.priceText.setColor('#88ff88');
        slot.priceText.setText(cfg.name);
        slot.border.setData('active', false);
        slot.border.setVisible(false);
      } else if (affordable) {
        // Can afford — highlight green
        slot.sprite.setAlpha(0.7);
        slot.sprite.setTint(0x44ff44);
        slot.priceText.setColor('#44ff44');
        slot.priceText.setText(`${cfg.unlock}`);
        slot.border.setData('active', false);
        slot.border.setVisible(false);
      } else {
        // Locked
        slot.sprite.setAlpha(0.3);
        slot.sprite.setTint(0x666666);
        slot.priceText.setColor('#666666');
        slot.priceText.setText(cfg.unlock > 0 ? `${cfg.unlock}` : '');
        slot.border.setData('active', false);
        slot.border.setVisible(false);
      }
    }

    this._repositionShopSlots();
  }

  /** Auto-scroll to make a weapon visible */
  scrollToWeapon(key: string): void {
    const idx = WEAPON_ORDER.indexOf(key);
    if (idx < 0) return;
    const slotCenter = idx * SLOT_WIDTH + SLOT_WIDTH / 2;
    const viewCenter = GAME.WIDTH / 2;
    this.setScrollOffset(slotCenter - viewCenter);
  }

  updateScore(score: number): void {
    this.scoreText.setText(`Score: ${score}`);
  }

  updateWave(wave: number): void {
    this.waveText.setText(`Wave: ${wave}`);
  }

  updateLives(lives: number): void {
    let hearts = '';
    for (let i = 0; i < lives; i++) hearts += '\u2764 ';
    for (let i = lives; i < GAME.LIVES; i++) hearts += '\u2661 ';
    this.livesText.setText(hearts.trim());
  }

  updateCombo(multiplier: number): void {
    if (multiplier > 1) {
      this.comboText.setText(`x${multiplier} COMBO`);
      this.comboText.setAlpha(1);
    } else {
      this.comboText.setAlpha(0);
    }
  }

  updateWeapon(weaponKey: string): void {
    // Scroll to show the active weapon
    this.scrollToWeapon(weaponKey);
  }

  updateMuteButton(muted: boolean): void {
    this.muteBtn.setText(muted ? 'X' : 'S');
    this.muteBtn.setColor(muted ? '#ff6666' : '#cccccc');
  }

  updateAmmo(current: number, max: number): void {
    if (max === Infinity) {
      this.ammoText.setText('\u221e');
      this.ammoText.setColor('#ffffff');
    } else {
      this.ammoText.setText(`${current} / ${max}`);
      const lowThreshold = Math.ceil(max * 0.25);
      this.ammoText.setColor(current <= lowThreshold ? '#ff3333' : '#ffffff');
    }
  }

  showReloading(show: boolean, reloadTime?: number): void {
    if (show && reloadTime) {
      this.reloadBar.setVisible(true);
      this.reloadBar.width = 0;
      if (this._reloadTween) this._reloadTween.destroy();
      this._reloadTween = this.scene.tweens.add({
        targets: this.reloadBar,
        width: GAME.WIDTH,
        duration: reloadTime,
        ease: 'Linear',
      });
      this.ammoText.setText('RELOAD');
      this.ammoText.setColor('#ffdd00');
    } else {
      this.reloadBar.setVisible(false);
      if (this._reloadTween) {
        this._reloadTween.destroy();
        this._reloadTween = null;
      }
    }
  }

  updateCrosshairAmmo(x: number, y: number, current: number, max: number, reloading: boolean, reloadProgress: number): void {
    this.crosshairAmmoText.setPosition(x, y - 18);
    if (reloading) {
      const pct = Math.floor(reloadProgress * 100);
      this.crosshairAmmoText.setText(`${pct}%`);
      this.crosshairAmmoText.setColor('#ffdd00');
    } else if (max === Infinity) {
      this.crosshairAmmoText.setText('\u221e');
      this.crosshairAmmoText.setColor('#ffffff');
    } else {
      this.crosshairAmmoText.setText(`${current}/${max}`);
      const lowThreshold = Math.ceil(max * 0.25);
      this.crosshairAmmoText.setColor(current <= lowThreshold ? '#ff3333' : '#ffffff');
    }
  }

  updateMoneyPosition(x: number, y: number, score: number): void {
    this.moneyText.setPosition(x, y - 35);
    this.moneyText.setText('$' + score.toLocaleString('en-US'));
  }

  updateUnlocked(unlockedWeapons: string[]): void {
    this._unlockedSet = new Set(unlockedWeapons);
  }

  destroy(): void {
    this.topBar.destroy();
    this.scoreText.destroy();
    this.waveText.destroy();
    this.livesText.destroy();
    this.comboText.destroy();
    this.pauseBtn.destroy();
    this.muteBtn.destroy();
    this.shopBg.destroy();
    for (const slot of this._shopSlots) {
      slot.sprite.destroy();
      slot.priceText.destroy();
      slot.border.destroy();
    }
    this.ammoText.destroy();
    this.reloadBar.destroy();
    this.crosshairAmmoText.destroy();
    this.moneyText.destroy();
    if (this._reloadTween) this._reloadTween.destroy();
  }
}
