import { GAME } from '../constants';
import { cloudSaveScore, cloudLoadScore } from '../telegram';

export class ScoreManager {
  score: number;
  lives: number;
  combo: number;
  comboMultiplier: number;
  lastKillTime: number;
  highScore: number;
  onScoreChange: ((score: number, earned: number) => void) | null;
  onLifeLost: ((lives: number) => void) | null;
  onComboChange: ((multiplier: number) => void) | null;

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

  addKill(points: number, time: number): number {
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

  spendScore(amount: number): boolean {
    if (this.score < amount) return false;
    this.score -= amount;
    if (this.onScoreChange) this.onScoreChange(this.score, -amount);
    return true;
  }

  loseLife(): number {
    this.lives--;
    this.combo = 0;
    this.comboMultiplier = 1;
    if (this.onLifeLost) this.onLifeLost(this.lives);
    return this.lives;
  }

  isGameOver(): boolean {
    return this.lives <= 0;
  }

  saveHighScore(): boolean {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('huntingGameHighScore', this.score.toString());
      cloudSaveScore(this.score);
      return true;
    }
    return false;
  }
}
