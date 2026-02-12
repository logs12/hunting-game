import { SpriteFactory } from './SpriteFactory.js';

export class HunterSprite extends SpriteFactory {
  generate() {
    this.createTexture('hunter', 48, 64, (ctx) => {
      // Boots with laces
      ctx.fillStyle = '#4a3728';
      ctx.fillRect(10, 54, 12, 10);
      ctx.fillRect(26, 54, 12, 10);
      // Boot soles
      ctx.fillStyle = '#3a2718';
      ctx.fillRect(10, 62, 12, 2);
      ctx.fillRect(26, 62, 12, 2);
      // Boot laces
      ctx.strokeStyle = '#6a5748';
      ctx.lineWidth = 0.5;
      for (let y = 55; y < 61; y += 2) {
        ctx.beginPath();
        ctx.moveTo(13, y);
        ctx.lineTo(19, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(29, y);
        ctx.lineTo(35, y);
        ctx.stroke();
      }

      // Legs (pants) with knee patches
      ctx.fillStyle = '#556b2f';
      ctx.fillRect(14, 38, 8, 18);
      ctx.fillRect(26, 38, 8, 18);
      // Knee patches
      ctx.fillStyle = '#4a5e28';
      ctx.fillRect(15, 44, 6, 5);
      ctx.fillRect(27, 44, 6, 5);

      // Belt
      ctx.fillStyle = '#4a3728';
      ctx.fillRect(10, 36, 28, 3);
      // Belt buckle
      ctx.fillStyle = '#cc9933';
      ctx.fillRect(22, 36, 4, 3);
      ctx.fillStyle = '#aa7722';
      ctx.fillRect(23, 37, 2, 1);

      // Body (jacket) with gradient
      const jacketGrad = ctx.createLinearGradient(10, 16, 38, 36);
      jacketGrad.addColorStop(0, '#7b9e33');
      jacketGrad.addColorStop(0.5, '#6b8e23');
      jacketGrad.addColorStop(1, '#5b7e18');
      ctx.fillStyle = jacketGrad;
      ctx.fillRect(10, 16, 28, 20);

      // Jacket collar
      ctx.fillStyle = '#5b7e18';
      ctx.fillRect(14, 14, 20, 3);

      // Jacket pockets
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 0.5;
      // Left pocket
      ctx.strokeRect(12, 24, 8, 6);
      ctx.beginPath();
      ctx.moveTo(12, 24);
      ctx.lineTo(20, 24);
      ctx.stroke();
      // Right pocket
      ctx.strokeRect(28, 24, 8, 6);
      ctx.beginPath();
      ctx.moveTo(28, 24);
      ctx.lineTo(36, 24);
      ctx.stroke();

      // Pocket flaps
      ctx.fillStyle = '#608020';
      ctx.fillRect(12, 23, 8, 2);
      ctx.fillRect(28, 23, 8, 2);

      // Ammo belt across chest
      ctx.fillStyle = '#6a5535';
      ctx.beginPath();
      ctx.moveTo(10, 18);
      ctx.lineTo(38, 30);
      ctx.lineTo(38, 33);
      ctx.lineTo(10, 21);
      ctx.fill();
      // Ammo belt bullets
      ctx.fillStyle = '#cc9933';
      for (let i = 0; i < 7; i++) {
        const bx = 12 + i * 3.5;
        const by = 18.5 + i * 1.7;
        ctx.fillRect(bx, by, 1.5, 2.5);
      }

      // Arms
      ctx.fillStyle = '#6b8e23';
      ctx.fillRect(4, 18, 8, 14);
      ctx.fillRect(36, 18, 8, 14);
      // Arm cuffs
      ctx.fillStyle = '#5b7e18';
      ctx.fillRect(4, 30, 8, 2);
      ctx.fillRect(36, 30, 8, 2);

      // Hands (skin)
      ctx.fillStyle = '#e8b88a';
      ctx.fillRect(4, 32, 8, 6);
      ctx.fillRect(36, 32, 8, 6);
      // Finger lines
      ctx.strokeStyle = 'rgba(0,0,0,0.1)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(7, 34);
      ctx.lineTo(7, 37);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(39, 34);
      ctx.lineTo(39, 37);
      ctx.stroke();

      // Neck
      ctx.fillStyle = '#d8a87a';
      ctx.fillRect(19, 12, 10, 5);

      // Head
      ctx.fillStyle = '#e8b88a';
      ctx.beginPath();
      ctx.arc(24, 8, 10, 0, Math.PI * 2);
      ctx.fill();

      // Ear
      ctx.fillStyle = '#d8a87a';
      ctx.beginPath();
      ctx.arc(34, 9, 3, 0, Math.PI * 2);
      ctx.fill();

      // Hat with brim shadow
      ctx.fillStyle = '#556b2f';
      ctx.fillRect(12, -1, 24, 7);
      // Hat brim
      ctx.fillStyle = '#4a5e28';
      ctx.fillRect(10, 5, 28, 3);
      // Hat band
      ctx.fillStyle = '#4a3728';
      ctx.fillRect(12, 4, 24, 2);
      // Brim shadow on face
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(14, 7, 20, 2);

      // Eye
      ctx.fillStyle = '#fff';
      ctx.fillRect(27, 7, 4, 3);
      ctx.fillStyle = '#334';
      ctx.fillRect(29, 7, 2, 3);
      // Eyebrow
      ctx.fillStyle = '#443';
      ctx.fillRect(27, 6, 5, 1);

      // Nose
      ctx.fillStyle = '#d8a87a';
      ctx.fillRect(31, 10, 2, 3);

      // Mouth
      ctx.fillStyle = '#c87a5a';
      ctx.fillRect(28, 14, 4, 1);
    });

    this.createTexture('hunter_shoot', 48, 64, (ctx) => {
      // Boots with laces
      ctx.fillStyle = '#4a3728';
      ctx.fillRect(10, 54, 12, 10);
      ctx.fillRect(26, 54, 12, 10);
      // Boot soles
      ctx.fillStyle = '#3a2718';
      ctx.fillRect(10, 62, 12, 2);
      ctx.fillRect(26, 62, 12, 2);
      // Boot laces
      ctx.strokeStyle = '#6a5748';
      ctx.lineWidth = 0.5;
      for (let y = 55; y < 61; y += 2) {
        ctx.beginPath();
        ctx.moveTo(13, y);
        ctx.lineTo(19, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(29, y);
        ctx.lineTo(35, y);
        ctx.stroke();
      }

      // Legs — slightly spread stance
      ctx.fillStyle = '#556b2f';
      ctx.fillRect(12, 38, 8, 18);
      ctx.fillRect(28, 38, 8, 18);
      // Knee patches
      ctx.fillStyle = '#4a5e28';
      ctx.fillRect(13, 44, 6, 5);
      ctx.fillRect(29, 44, 6, 5);

      // Belt
      ctx.fillStyle = '#4a3728';
      ctx.fillRect(10, 36, 28, 3);
      ctx.fillStyle = '#cc9933';
      ctx.fillRect(22, 36, 4, 3);
      ctx.fillStyle = '#aa7722';
      ctx.fillRect(23, 37, 2, 1);

      // Body (jacket) — leaning forward slightly
      const jacketGrad = ctx.createLinearGradient(10, 16, 38, 36);
      jacketGrad.addColorStop(0, '#7b9e33');
      jacketGrad.addColorStop(0.5, '#6b8e23');
      jacketGrad.addColorStop(1, '#5b7e18');
      ctx.fillStyle = jacketGrad;
      ctx.fillRect(10, 16, 28, 20);

      // Jacket collar
      ctx.fillStyle = '#5b7e18';
      ctx.fillRect(14, 14, 20, 3);

      // Jacket pockets
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(12, 24, 8, 6);
      ctx.strokeRect(28, 24, 8, 6);
      ctx.fillStyle = '#608020';
      ctx.fillRect(12, 23, 8, 2);
      ctx.fillRect(28, 23, 8, 2);

      // Ammo belt across chest
      ctx.fillStyle = '#6a5535';
      ctx.beginPath();
      ctx.moveTo(10, 18);
      ctx.lineTo(38, 30);
      ctx.lineTo(38, 33);
      ctx.lineTo(10, 21);
      ctx.fill();
      ctx.fillStyle = '#cc9933';
      for (let i = 0; i < 7; i++) {
        const bx = 12 + i * 3.5;
        const by = 18.5 + i * 1.7;
        ctx.fillRect(bx, by, 1.5, 2.5);
      }

      // Left arm (supporting weapon)
      ctx.fillStyle = '#6b8e23';
      ctx.fillRect(4, 18, 8, 12);
      // Left hand forward
      ctx.fillStyle = '#e8b88a';
      ctx.fillRect(4, 28, 8, 5);

      // Right arm — extended forward for shooting
      ctx.fillStyle = '#6b8e23';
      ctx.fillRect(36, 14, 10, 12);
      // Arm cuff
      ctx.fillStyle = '#5b7e18';
      ctx.fillRect(36, 24, 10, 2);
      // Right hand (gripping weapon)
      ctx.fillStyle = '#e8b88a';
      ctx.fillRect(44, 18, 4, 6);

      // Neck
      ctx.fillStyle = '#d8a87a';
      ctx.fillRect(19, 12, 10, 5);

      // Head — slightly tilted forward (aiming)
      ctx.fillStyle = '#e8b88a';
      ctx.beginPath();
      ctx.arc(24, 8, 10, 0, Math.PI * 2);
      ctx.fill();

      // Ear
      ctx.fillStyle = '#d8a87a';
      ctx.beginPath();
      ctx.arc(34, 9, 3, 0, Math.PI * 2);
      ctx.fill();

      // Hat
      ctx.fillStyle = '#556b2f';
      ctx.fillRect(12, -1, 24, 7);
      ctx.fillStyle = '#4a5e28';
      ctx.fillRect(10, 5, 28, 3);
      ctx.fillStyle = '#4a3728';
      ctx.fillRect(12, 4, 24, 2);
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(14, 7, 20, 2);

      // Eye — squinting (aiming)
      ctx.fillStyle = '#fff';
      ctx.fillRect(27, 7, 4, 2);
      ctx.fillStyle = '#334';
      ctx.fillRect(29, 7, 2, 2);
      ctx.fillStyle = '#443';
      ctx.fillRect(27, 6, 5, 1);

      // Nose
      ctx.fillStyle = '#d8a87a';
      ctx.fillRect(31, 10, 2, 3);

      // Mouth — determined expression
      ctx.fillStyle = '#c87a5a';
      ctx.fillRect(28, 14, 5, 1);
    });
  }
}
