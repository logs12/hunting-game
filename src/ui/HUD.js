import { GAME, WEAPONS, WEAPON_ORDER } from '../constants.js';

export class HUD {
  constructor(scene) {
    this.scene = scene;

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

    // Combo
    this.comboText = scene.add.text(10, 30, '', { ...style, fontSize: '14px', color: '#ffdd00' });
    this.comboText.setDepth(26);

    // Weapon indicator (bottom)
    this.weaponBg = scene.add.rectangle(GAME.WIDTH / 2, GAME.HEIGHT - 25, GAME.WIDTH, 50, 0x000000, 0.5);
    this.weaponBg.setDepth(25);

    this.weaponText = scene.add.text(GAME.WIDTH / 2, GAME.HEIGHT - 30, '', {
      ...style,
      fontSize: '18px',
      color: '#00ff88',
    });
    this.weaponText.setOrigin(0.5);
    this.weaponText.setDepth(26);

    // Switch weapon hint
    this.switchHint = scene.add.text(GAME.WIDTH / 2, GAME.HEIGHT - 12, '[Q / Tap to switch]', {
      ...style,
      fontSize: '11px',
      color: '#aaaaaa',
    });
    this.switchHint.setOrigin(0.5);
    this.switchHint.setDepth(26);
  }

  updateScore(score) {
    this.scoreText.setText(`Score: ${score}`);
  }

  updateWave(wave) {
    this.waveText.setText(`Wave: ${wave}`);
  }

  updateLives(lives) {
    let hearts = '';
    for (let i = 0; i < lives; i++) hearts += '\u2764 ';
    for (let i = lives; i < GAME.LIVES; i++) hearts += '\u2661 ';
    this.livesText.setText(hearts.trim());
  }

  updateCombo(multiplier) {
    if (multiplier > 1) {
      this.comboText.setText(`x${multiplier} COMBO`);
      this.comboText.setAlpha(1);
    } else {
      this.comboText.setAlpha(0);
    }
  }

  updateWeapon(weaponKey, unlockedCount) {
    const cfg = WEAPONS[weaponKey];
    this.weaponText.setText(cfg.name);

    // Показать порог следующего оружия
    if (unlockedCount !== undefined) {
      const nextWeapon = WEAPON_ORDER.find((k) => WEAPONS[k].unlock > 0 && !this._unlockedSet?.has(k));
      if (nextWeapon) {
        this.switchHint.setText(`[Q] Next: ${WEAPONS[nextWeapon].name} (${WEAPONS[nextWeapon].unlock} pts)`);
      } else {
        this.switchHint.setText('[Q / Tap to switch]');
      }
    }
  }

  updateUnlocked(unlockedWeapons) {
    this._unlockedSet = new Set(unlockedWeapons);
  }

  destroy() {
    this.topBar.destroy();
    this.scoreText.destroy();
    this.waveText.destroy();
    this.livesText.destroy();
    this.comboText.destroy();
    this.weaponBg.destroy();
    this.weaponText.destroy();
    this.switchHint.destroy();
  }
}
