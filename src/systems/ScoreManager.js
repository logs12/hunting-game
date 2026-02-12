import { GAME } from '../constants.js';
import { cloudSaveScore, cloudLoadScore } from '../telegram.js';

export class ScoreManager {
  constructor() {
    this.score = 0;
    this.lives = GAME.LIVES;
    this.combo = 0;
    this.comboMultiplier = 1;
    this.lastKillTime = 0;
    this.highScore = parseInt(localStorage.getItem('huntingGameHighScore') || '0', 10);
    this.onScoreChange = null;
    this.onLifeLost = null;
    this.onComboChange = null;

    // Подтягиваем рекорд из Telegram CloudStorage (если есть)
    cloudLoadScore((cloudScore) => {
      if (cloudScore > this.highScore) {
        this.highScore = cloudScore;
        localStorage.setItem('huntingGameHighScore', cloudScore.toString());
      }
    });
  }

  addKill(points, time) {
    // Combo system
    if (time - this.lastKillTime < GAME.COMBO_TIMEOUT) {
      this.combo++;
      this.comboMultiplier = Math.min(this.combo, GAME.MAX_COMBO);
    } else {
      this.combo = 1;
      this.comboMultiplier = 1;
    }
    this.lastKillTime = time;

    const earned = points * this.comboMultiplier;
    this.score += earned;

    if (this.onScoreChange) this.onScoreChange(this.score, earned);
    if (this.onComboChange) this.onComboChange(this.comboMultiplier);

    return earned;
  }

  loseLife() {
    this.lives--;
    this.combo = 0;
    this.comboMultiplier = 1;
    if (this.onLifeLost) this.onLifeLost(this.lives);
    return this.lives;
  }

  isGameOver() {
    return this.lives <= 0;
  }

  saveHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('huntingGameHighScore', this.score.toString());
      cloudSaveScore(this.score);
      return true;
    }
    return false;
  }
}
