import { SpriteFactory } from './SpriteFactory.js';
import { ANIMALS } from '../constants.js';

export class AnimalSprites extends SpriteFactory {
  generate() {
    this._generateRabbit();
    this._generateFox();
    this._generateDeer();
    this._generateBoar();
    this._generateWolf();
    this._generateBear();
    this._generateEagle();
    this._generateSnake();
    this._generateMoose();
    this._generatePheasant();

    // Hurt variants (tinted red) for each animal
    for (const key of Object.keys(ANIMALS)) {
      this._generateHurt(key);
    }
  }

  _generateRabbit() {
    this.createTexture('rabbit', 28, 28, (ctx) => {
      // Body
      ctx.fillStyle = '#bbbbbb';
      ctx.beginPath();
      ctx.ellipse(14, 18, 8, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.beginPath();
      ctx.arc(8, 12, 6, 0, Math.PI * 2);
      ctx.fill();

      // Ears
      ctx.fillStyle = '#cccccc';
      ctx.fillRect(4, 0, 3, 10);
      ctx.fillRect(9, 0, 3, 10);

      // Inner ear
      ctx.fillStyle = '#ffaaaa';
      ctx.fillRect(5, 2, 1, 6);
      ctx.fillRect(10, 2, 1, 6);

      // Eye
      ctx.fillStyle = '#000';
      ctx.fillRect(5, 11, 2, 2);

      // Tail
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(23, 16, 3, 0, Math.PI * 2);
      ctx.fill();

      // Legs
      ctx.fillStyle = '#999';
      ctx.fillRect(8, 24, 4, 4);
      ctx.fillRect(16, 24, 4, 4);
    });
  }

  _generateFox() {
    this.createTexture('fox', 40, 32, (ctx) => {
      // Body
      ctx.fillStyle = '#ee7722';
      ctx.beginPath();
      ctx.ellipse(22, 20, 12, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.beginPath();
      ctx.ellipse(8, 14, 8, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Snout
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(3, 16, 4, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Nose
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 15, 2, 2);

      // Ears
      ctx.fillStyle = '#ee7722';
      ctx.beginPath();
      ctx.moveTo(4, 6);
      ctx.lineTo(8, 6);
      ctx.lineTo(6, 0);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(10, 6);
      ctx.lineTo(14, 6);
      ctx.lineTo(12, 0);
      ctx.fill();

      // Eye
      ctx.fillStyle = '#000';
      ctx.fillRect(6, 12, 2, 2);

      // Tail
      ctx.fillStyle = '#ee7722';
      ctx.beginPath();
      ctx.moveTo(34, 18);
      ctx.quadraticCurveTo(40, 10, 38, 20);
      ctx.quadraticCurveTo(40, 26, 34, 22);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(38, 17, 3, 0, Math.PI * 2);
      ctx.fill();

      // Legs
      ctx.fillStyle = '#cc5500';
      ctx.fillRect(12, 26, 4, 6);
      ctx.fillRect(20, 26, 4, 6);
      ctx.fillRect(26, 26, 4, 6);
    });
  }

  _generateDeer() {
    this.createTexture('deer', 48, 48, (ctx) => {
      // Body
      ctx.fillStyle = '#aa7744';
      ctx.beginPath();
      ctx.ellipse(28, 30, 14, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // Neck
      ctx.fillRect(12, 16, 8, 16);

      // Head
      ctx.beginPath();
      ctx.ellipse(10, 14, 7, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Antlers
      ctx.strokeStyle = '#8B6914';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(8, 8);
      ctx.lineTo(4, 0);
      ctx.moveTo(6, 4);
      ctx.lineTo(0, 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(14, 8);
      ctx.lineTo(18, 0);
      ctx.moveTo(16, 4);
      ctx.lineTo(22, 2);
      ctx.stroke();

      // Eye
      ctx.fillStyle = '#000';
      ctx.fillRect(7, 12, 2, 2);

      // Nose
      ctx.fillStyle = '#333';
      ctx.fillRect(3, 15, 2, 2);

      // Spots
      ctx.fillStyle = '#ccaa77';
      ctx.beginPath();
      ctx.arc(24, 26, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(30, 28, 2, 0, Math.PI * 2);
      ctx.fill();

      // Legs
      ctx.fillStyle = '#886633';
      ctx.fillRect(18, 38, 4, 10);
      ctx.fillRect(24, 38, 4, 10);
      ctx.fillRect(32, 38, 4, 10);
      ctx.fillRect(38, 38, 4, 10);

      // Hooves
      ctx.fillStyle = '#333';
      ctx.fillRect(18, 46, 4, 2);
      ctx.fillRect(24, 46, 4, 2);
      ctx.fillRect(32, 46, 4, 2);
      ctx.fillRect(38, 46, 4, 2);
    });
  }

  _generateBoar() {
    this.createTexture('boar', 44, 36, (ctx) => {
      // Body
      ctx.fillStyle = '#665544';
      ctx.beginPath();
      ctx.ellipse(26, 20, 14, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = '#554433';
      ctx.beginPath();
      ctx.ellipse(10, 18, 9, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Snout
      ctx.fillStyle = '#887766';
      ctx.beginPath();
      ctx.ellipse(3, 20, 4, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Nostrils
      ctx.fillStyle = '#333';
      ctx.fillRect(1, 19, 2, 1);
      ctx.fillRect(1, 21, 2, 1);

      // Tusks
      ctx.fillStyle = '#ffffcc';
      ctx.beginPath();
      ctx.moveTo(5, 24);
      ctx.lineTo(2, 28);
      ctx.lineTo(4, 28);
      ctx.lineTo(7, 24);
      ctx.fill();

      // Eye
      ctx.fillStyle = '#ff3300';
      ctx.fillRect(7, 15, 3, 3);
      ctx.fillStyle = '#000';
      ctx.fillRect(8, 16, 1, 1);

      // Ears
      ctx.fillStyle = '#554433';
      ctx.beginPath();
      ctx.moveTo(8, 10);
      ctx.lineTo(4, 6);
      ctx.lineTo(12, 8);
      ctx.fill();

      // Bristles (mane)
      ctx.fillStyle = '#443322';
      ctx.fillRect(14, 10, 20, 4);

      // Legs
      ctx.fillStyle = '#443322';
      ctx.fillRect(16, 28, 5, 8);
      ctx.fillRect(24, 28, 5, 8);
      ctx.fillRect(32, 28, 5, 8);

      // Hooves
      ctx.fillStyle = '#222';
      ctx.fillRect(16, 34, 5, 2);
      ctx.fillRect(24, 34, 5, 2);
      ctx.fillRect(32, 34, 5, 2);
    });
  }

  _generateWolf() {
    this.createTexture('wolf', 44, 34, (ctx) => {
      // Body
      ctx.fillStyle = '#778899';
      ctx.beginPath();
      ctx.ellipse(26, 20, 13, 9, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = '#889aaa';
      ctx.beginPath();
      ctx.ellipse(10, 14, 8, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Snout
      ctx.fillStyle = '#aabbcc';
      ctx.beginPath();
      ctx.moveTo(2, 14);
      ctx.lineTo(0, 16);
      ctx.lineTo(2, 18);
      ctx.lineTo(8, 16);
      ctx.fill();

      // Nose
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 15, 2, 2);

      // Ears
      ctx.fillStyle = '#667788';
      ctx.beginPath();
      ctx.moveTo(6, 7);
      ctx.lineTo(3, 0);
      ctx.lineTo(10, 5);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(12, 7);
      ctx.lineTo(15, 0);
      ctx.lineTo(16, 6);
      ctx.fill();

      // Eye
      ctx.fillStyle = '#ffcc00';
      ctx.fillRect(7, 12, 3, 2);
      ctx.fillStyle = '#000';
      ctx.fillRect(8, 12, 1, 2);

      // Tail
      ctx.fillStyle = '#667788';
      ctx.beginPath();
      ctx.moveTo(38, 16);
      ctx.quadraticCurveTo(44, 8, 42, 18);
      ctx.quadraticCurveTo(44, 22, 38, 20);
      ctx.fill();

      // Legs
      ctx.fillStyle = '#667788';
      ctx.fillRect(16, 26, 4, 8);
      ctx.fillRect(22, 26, 4, 8);
      ctx.fillRect(30, 26, 4, 8);
      ctx.fillRect(36, 26, 4, 8);
    });
  }

  _generateBear() {
    this.createTexture('bear', 60, 56, (ctx) => {
      // Body
      ctx.fillStyle = '#6B3A2A';
      ctx.beginPath();
      ctx.ellipse(34, 32, 20, 16, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = '#7B4A3A';
      ctx.beginPath();
      ctx.arc(12, 20, 12, 0, Math.PI * 2);
      ctx.fill();

      // Ears
      ctx.beginPath();
      ctx.arc(4, 10, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(20, 10, 5, 0, Math.PI * 2);
      ctx.fill();

      // Inner ears
      ctx.fillStyle = '#996655';
      ctx.beginPath();
      ctx.arc(4, 10, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(20, 10, 3, 0, Math.PI * 2);
      ctx.fill();

      // Snout
      ctx.fillStyle = '#AA8866';
      ctx.beginPath();
      ctx.ellipse(6, 24, 6, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Nose
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.ellipse(3, 23, 3, 2, 0, 0, Math.PI * 2);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#000';
      ctx.fillRect(7, 18, 3, 3);
      ctx.fillRect(15, 18, 3, 3);

      // Mouth
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(4, 26);
      ctx.lineTo(6, 28);
      ctx.lineTo(8, 26);
      ctx.stroke();

      // Front legs
      ctx.fillStyle = '#5B2A1A';
      ctx.fillRect(18, 42, 8, 14);
      ctx.fillRect(28, 42, 8, 14);

      // Back legs
      ctx.fillRect(40, 42, 8, 14);
      ctx.fillRect(50, 42, 8, 14);

      // Claws
      ctx.fillStyle = '#333';
      ctx.fillRect(18, 54, 2, 2);
      ctx.fillRect(22, 54, 2, 2);
      ctx.fillRect(26, 54, 2, 2);
      ctx.fillRect(28, 54, 2, 2);
      ctx.fillRect(32, 54, 2, 2);
      ctx.fillRect(40, 54, 2, 2);
      ctx.fillRect(44, 54, 2, 2);
      ctx.fillRect(50, 54, 2, 2);
      ctx.fillRect(54, 54, 2, 2);
    });
  }

  _generateEagle() {
    this.createTexture('eagle', 36, 20, (ctx) => {
      // Body
      ctx.fillStyle = '#5C4033';
      ctx.beginPath();
      ctx.ellipse(18, 12, 8, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = '#F5F5DC';
      ctx.beginPath();
      ctx.arc(8, 10, 5, 0, Math.PI * 2);
      ctx.fill();

      // Beak
      ctx.fillStyle = '#DAA520';
      ctx.beginPath();
      ctx.moveTo(3, 10);
      ctx.lineTo(0, 11);
      ctx.lineTo(3, 12);
      ctx.fill();

      // Eye
      ctx.fillStyle = '#000';
      ctx.fillRect(6, 9, 2, 2);

      // Left wing (top)
      ctx.fillStyle = '#4A3020';
      ctx.beginPath();
      ctx.moveTo(14, 8);
      ctx.quadraticCurveTo(20, 0, 30, 2);
      ctx.lineTo(26, 8);
      ctx.fill();

      // Right wing (bottom)
      ctx.beginPath();
      ctx.moveTo(14, 14);
      ctx.quadraticCurveTo(20, 20, 30, 18);
      ctx.lineTo(26, 14);
      ctx.fill();

      // Wing feather details
      ctx.strokeStyle = '#3A2010';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(18 + i * 4, 4 + i);
        ctx.lineTo(26 + i * 2, 2 + i);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(18 + i * 4, 16 - i);
        ctx.lineTo(26 + i * 2, 18 - i);
        ctx.stroke();
      }

      // Tail
      ctx.fillStyle = '#4A3020';
      ctx.beginPath();
      ctx.moveTo(26, 10);
      ctx.lineTo(36, 8);
      ctx.lineTo(36, 14);
      ctx.fill();

      // Talons
      ctx.fillStyle = '#DAA520';
      ctx.fillRect(14, 16, 2, 3);
      ctx.fillRect(18, 16, 2, 3);
    });
  }

  _generateSnake() {
    this.createTexture('snake', 32, 10, (ctx) => {
      // Body - sinusoidal shape
      ctx.fillStyle = '#228B22';
      ctx.beginPath();
      ctx.moveTo(0, 5);
      for (let x = 0; x <= 28; x += 1) {
        const y = 5 + Math.sin(x * 0.5) * 2;
        ctx.lineTo(x, y - 2);
      }
      for (let x = 28; x >= 0; x -= 1) {
        const y = 5 + Math.sin(x * 0.5) * 2;
        ctx.lineTo(x, y + 2);
      }
      ctx.fill();

      // Belly (lighter)
      ctx.fillStyle = '#90EE90';
      ctx.beginPath();
      ctx.moveTo(0, 6);
      for (let x = 0; x <= 28; x += 1) {
        const y = 5 + Math.sin(x * 0.5) * 2;
        ctx.lineTo(x, y);
      }
      for (let x = 28; x >= 0; x -= 1) {
        const y = 5 + Math.sin(x * 0.5) * 2;
        ctx.lineTo(x, y + 1.5);
      }
      ctx.fill();

      // Pattern spots
      ctx.fillStyle = '#006400';
      for (let i = 0; i < 5; i++) {
        const sx = 4 + i * 5;
        const sy = 5 + Math.sin(sx * 0.5) * 2 - 1;
        ctx.beginPath();
        ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Head
      ctx.fillStyle = '#1E7B1E';
      ctx.beginPath();
      ctx.ellipse(2, 5, 3, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Eye
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(1, 4, 2, 1);
      ctx.fillStyle = '#000';
      ctx.fillRect(1, 4, 1, 1);

      // Tongue
      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.lineTo(-2, 4);
      ctx.moveTo(0, 5);
      ctx.lineTo(-2, 6);
      ctx.stroke();

      // Tail (tapers)
      ctx.fillStyle = '#228B22';
      ctx.beginPath();
      ctx.moveTo(28, 4);
      ctx.lineTo(32, 5);
      ctx.lineTo(28, 6);
      ctx.fill();
    });
  }

  _generateMoose() {
    this.createTexture('moose', 56, 52, (ctx) => {
      // Body
      ctx.fillStyle = '#6B4226';
      ctx.beginPath();
      ctx.ellipse(32, 28, 16, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Neck
      ctx.fillStyle = '#5B3620';
      ctx.fillRect(12, 14, 10, 18);

      // Head
      ctx.fillStyle = '#6B4226';
      ctx.beginPath();
      ctx.ellipse(10, 14, 8, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Snout (long, bulbous)
      ctx.fillStyle = '#7B5236';
      ctx.beginPath();
      ctx.ellipse(4, 18, 5, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Nose
      ctx.fillStyle = '#333';
      ctx.fillRect(0, 17, 3, 2);

      // Eye
      ctx.fillStyle = '#000';
      ctx.fillRect(7, 12, 3, 2);

      // Antlers (large, palmate)
      ctx.fillStyle = '#8B7355';
      // Left antler
      ctx.beginPath();
      ctx.moveTo(8, 7);
      ctx.lineTo(2, 0);
      ctx.lineTo(0, 4);
      ctx.lineTo(4, 2);
      ctx.lineTo(0, 0);
      ctx.lineTo(6, 5);
      ctx.fill();
      // Right antler
      ctx.beginPath();
      ctx.moveTo(14, 7);
      ctx.lineTo(20, 0);
      ctx.lineTo(22, 4);
      ctx.lineTo(18, 2);
      ctx.lineTo(22, 0);
      ctx.lineTo(16, 5);
      ctx.fill();
      // Antler palmate (flat part)
      ctx.beginPath();
      ctx.ellipse(1, 2, 4, 3, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(21, 2, 4, 3, 0.3, 0, Math.PI * 2);
      ctx.fill();

      // Dewlap (bell under chin)
      ctx.fillStyle = '#5B3620';
      ctx.beginPath();
      ctx.moveTo(6, 20);
      ctx.quadraticCurveTo(4, 26, 8, 24);
      ctx.fill();

      // Front legs
      ctx.fillStyle = '#5B3216';
      ctx.fillRect(18, 38, 5, 14);
      ctx.fillRect(26, 38, 5, 14);

      // Back legs
      ctx.fillRect(38, 38, 5, 14);
      ctx.fillRect(46, 38, 5, 14);

      // Hooves
      ctx.fillStyle = '#222';
      ctx.fillRect(18, 50, 5, 2);
      ctx.fillRect(26, 50, 5, 2);
      ctx.fillRect(38, 50, 5, 2);
      ctx.fillRect(46, 50, 5, 2);

      // Shoulder hump
      ctx.fillStyle = '#5B3620';
      ctx.beginPath();
      ctx.ellipse(22, 18, 6, 5, 0, Math.PI, Math.PI * 2);
      ctx.fill();
    });
  }

  _generatePheasant() {
    this.createTexture('pheasant', 30, 18, (ctx) => {
      // Body
      ctx.fillStyle = '#CD853F';
      ctx.beginPath();
      ctx.ellipse(14, 10, 8, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Breast (colorful)
      ctx.fillStyle = '#8B0000';
      ctx.beginPath();
      ctx.ellipse(10, 12, 5, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = '#006400';
      ctx.beginPath();
      ctx.arc(5, 8, 4, 0, Math.PI * 2);
      ctx.fill();

      // Red face wattle
      ctx.fillStyle = '#FF0000';
      ctx.beginPath();
      ctx.arc(4, 10, 2, 0, Math.PI * 2);
      ctx.fill();

      // Beak
      ctx.fillStyle = '#DAA520';
      ctx.beginPath();
      ctx.moveTo(1, 8);
      ctx.lineTo(0, 9);
      ctx.lineTo(2, 9);
      ctx.fill();

      // Eye
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(4, 7, 2, 1);
      ctx.fillStyle = '#000';
      ctx.fillRect(4, 7, 1, 1);

      // Wing pattern
      ctx.fillStyle = '#8B6914';
      ctx.beginPath();
      ctx.ellipse(16, 9, 6, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      // Wing feather lines
      ctx.strokeStyle = '#6B4914';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(12 + i * 2, 6);
        ctx.lineTo(14 + i * 2, 12);
        ctx.stroke();
      }

      // Tail (long, colorful)
      ctx.fillStyle = '#8B6914';
      ctx.beginPath();
      ctx.moveTo(22, 8);
      ctx.lineTo(30, 6);
      ctx.lineTo(30, 12);
      ctx.lineTo(22, 12);
      ctx.fill();
      // Tail stripes
      ctx.strokeStyle = '#CD853F';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(23, 9);
      ctx.lineTo(29, 7);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(23, 11);
      ctx.lineTo(29, 11);
      ctx.stroke();

      // Legs
      ctx.fillStyle = '#8B6914';
      ctx.fillRect(10, 14, 2, 4);
      ctx.fillRect(14, 14, 2, 4);
    });
  }

  _generateHurt(key) {
    const src = this.scene.textures.get(key).getSourceImage();
    this.createTexture(`${key}_hurt`, src.width, src.height, (ctx, w, h) => {
      ctx.drawImage(src, 0, 0);
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
      ctx.fillRect(0, 0, w, h);
    });
  }
}
