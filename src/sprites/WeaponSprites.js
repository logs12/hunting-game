import { SpriteFactory } from './SpriteFactory.js';

export class WeaponSprites extends SpriteFactory {
  generate() {
    // --- Projectile textures ---

    // Bullet (pistol, rifle, machinegun)
    this.createTexture('bullet', 10, 4, (ctx) => {
      const grad = ctx.createLinearGradient(0, 0, 10, 0);
      grad.addColorStop(0, '#cc9900');
      grad.addColorStop(0.5, '#ffee55');
      grad.addColorStop(1, '#ffcc00');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(5, 2, 5, 2, 0, 0, Math.PI * 2);
      ctx.fill();
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.beginPath();
      ctx.ellipse(6, 1, 3, 1, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // Pellet (shotgun)
    this.createTexture('pellet', 5, 5, (ctx) => {
      ctx.fillStyle = '#ffaa00';
      ctx.beginPath();
      ctx.arc(2.5, 2.5, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.beginPath();
      ctx.arc(2, 1.5, 1, 0, Math.PI * 2);
      ctx.fill();
    });

    // Rocket projectile
    this.createTexture('rocket_proj', 16, 8, (ctx) => {
      // Body
      const grad = ctx.createLinearGradient(0, 0, 0, 8);
      grad.addColorStop(0, '#aa5500');
      grad.addColorStop(0.5, '#884400');
      grad.addColorStop(1, '#663300');
      ctx.fillStyle = grad;
      ctx.fillRect(2, 1, 11, 6);
      // Nose cone
      ctx.fillStyle = '#ff4400';
      ctx.beginPath();
      ctx.moveTo(13, 0);
      ctx.lineTo(16, 4);
      ctx.lineTo(13, 8);
      ctx.fill();
      // Fins
      ctx.fillStyle = '#666';
      ctx.fillRect(0, 0, 3, 2);
      ctx.fillRect(0, 6, 3, 2);
      // Exhaust glow
      ctx.fillStyle = '#ff8800';
      ctx.fillRect(0, 2, 2, 4);
      ctx.fillStyle = '#ffcc44';
      ctx.fillRect(0, 3, 1, 2);
      // Ring detail
      ctx.strokeStyle = '#aa6633';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(6, 1);
      ctx.lineTo(6, 7);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(10, 1);
      ctx.lineTo(10, 7);
      ctx.stroke();
    });

    // --- Weapon held sprites (displayed on hunter) ---

    // Pistol — 24x14, metallic with wooden grip
    this.createTexture('weapon_pistol', 24, 14, (ctx) => {
      // Slide (top barrel)
      const slideGrad = ctx.createLinearGradient(0, 0, 0, 6);
      slideGrad.addColorStop(0, '#777');
      slideGrad.addColorStop(0.5, '#555');
      slideGrad.addColorStop(1, '#444');
      ctx.fillStyle = slideGrad;
      ctx.fillRect(0, 2, 18, 5);
      // Barrel extension
      ctx.fillStyle = '#444';
      ctx.fillRect(18, 3, 6, 3);
      // Barrel hole
      ctx.fillStyle = '#222';
      ctx.fillRect(23, 4, 1, 1);
      // Slide serrations
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 0.5;
      for (let i = 2; i < 10; i += 2) {
        ctx.beginPath();
        ctx.moveTo(i, 2);
        ctx.lineTo(i, 4);
        ctx.stroke();
      }
      // Grip (wood)
      const gripGrad = ctx.createLinearGradient(2, 7, 2, 14);
      gripGrad.addColorStop(0, '#8B6914');
      gripGrad.addColorStop(0.5, '#6B4914');
      gripGrad.addColorStop(1, '#5B3914');
      ctx.fillStyle = gripGrad;
      ctx.fillRect(2, 7, 7, 7);
      // Grip texture lines
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 0.5;
      for (let i = 8; i < 14; i += 2) {
        ctx.beginPath();
        ctx.moveTo(3, i);
        ctx.lineTo(8, i);
        ctx.stroke();
      }
      // Trigger guard
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(9, 7);
      ctx.quadraticCurveTo(14, 12, 9, 13);
      ctx.stroke();
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(10, 8, 1, 3);
      // Highlight on top
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fillRect(1, 2, 16, 1);
    });

    // Shotgun — 34x14, wood stock + dual barrel
    this.createTexture('weapon_shotgun', 34, 14, (ctx) => {
      // Stock (wood)
      const stockGrad = ctx.createLinearGradient(0, 0, 0, 10);
      stockGrad.addColorStop(0, '#8B6226');
      stockGrad.addColorStop(0.5, '#6B4226');
      stockGrad.addColorStop(1, '#5B3216');
      ctx.fillStyle = stockGrad;
      ctx.fillRect(0, 3, 10, 8);
      // Stock wood grain
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(1, 5);
      ctx.quadraticCurveTo(5, 4, 9, 6);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(1, 8);
      ctx.quadraticCurveTo(5, 9, 9, 8);
      ctx.stroke();
      // Receiver
      const recvGrad = ctx.createLinearGradient(0, 0, 0, 8);
      recvGrad.addColorStop(0, '#666');
      recvGrad.addColorStop(1, '#444');
      ctx.fillStyle = recvGrad;
      ctx.fillRect(10, 3, 6, 8);
      // Upper barrel
      ctx.fillStyle = '#555';
      ctx.fillRect(16, 3, 18, 3);
      // Lower barrel
      ctx.fillStyle = '#4a4a4a';
      ctx.fillRect(16, 7, 18, 3);
      // Barrel ends
      ctx.fillStyle = '#333';
      ctx.fillRect(33, 3, 1, 3);
      ctx.fillRect(33, 7, 1, 3);
      // Pump grip
      const pumpGrad = ctx.createLinearGradient(0, 0, 0, 6);
      pumpGrad.addColorStop(0, '#7B5226');
      pumpGrad.addColorStop(1, '#5B3216');
      ctx.fillStyle = pumpGrad;
      ctx.fillRect(20, 10, 8, 4);
      // Pump grooves
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      for (let i = 21; i < 28; i += 2) {
        ctx.beginPath();
        ctx.moveTo(i, 10);
        ctx.lineTo(i, 14);
        ctx.stroke();
      }
      // Barrel highlight
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.fillRect(16, 3, 17, 1);
      ctx.fillRect(16, 7, 17, 1);
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(12, 10, 1, 2);
    });

    // Rifle — 40x12, long barrel with scope
    this.createTexture('weapon_rifle', 40, 12, (ctx) => {
      // Stock (wood)
      const stockGrad = ctx.createLinearGradient(0, 0, 0, 8);
      stockGrad.addColorStop(0, '#8B6226');
      stockGrad.addColorStop(0.5, '#6B4226');
      stockGrad.addColorStop(1, '#5B3216');
      ctx.fillStyle = stockGrad;
      ctx.fillRect(0, 3, 12, 6);
      // Stock cheek rest curve
      ctx.fillStyle = '#7B5226';
      ctx.beginPath();
      ctx.moveTo(0, 3);
      ctx.quadraticCurveTo(2, 1, 6, 3);
      ctx.fill();
      // Stock grain
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(1, 5);
      ctx.quadraticCurveTo(6, 4, 11, 6);
      ctx.stroke();
      // Receiver
      const recvGrad = ctx.createLinearGradient(0, 0, 0, 6);
      recvGrad.addColorStop(0, '#666');
      recvGrad.addColorStop(1, '#444');
      ctx.fillStyle = recvGrad;
      ctx.fillRect(12, 3, 8, 6);
      // Magazine
      ctx.fillStyle = '#444';
      ctx.fillRect(14, 9, 5, 3);
      // Barrel
      const barrelGrad = ctx.createLinearGradient(0, 0, 0, 3);
      barrelGrad.addColorStop(0, '#666');
      barrelGrad.addColorStop(1, '#444');
      ctx.fillStyle = barrelGrad;
      ctx.fillRect(20, 4, 20, 3);
      // Barrel end
      ctx.fillStyle = '#333';
      ctx.fillRect(39, 4, 1, 3);
      // Scope mount
      ctx.fillStyle = '#555';
      ctx.fillRect(16, 2, 10, 2);
      // Scope body
      ctx.fillStyle = '#333';
      ctx.fillRect(17, 0, 8, 3);
      // Scope lenses
      ctx.fillStyle = '#226';
      ctx.beginPath();
      ctx.arc(17, 1.5, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(25, 1.5, 1.5, 0, Math.PI * 2);
      ctx.fill();
      // Scope highlight
      ctx.fillStyle = 'rgba(100,150,255,0.3)';
      ctx.beginPath();
      ctx.arc(25, 1, 0.8, 0, Math.PI * 2);
      ctx.fill();
      // Barrel highlight
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.fillRect(20, 4, 19, 1);
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(15, 8, 1, 2);
    });

    // Machinegun — 38x16, thick barrel with ammo belt
    this.createTexture('weapon_machinegun', 38, 16, (ctx) => {
      // Stock
      const stockGrad = ctx.createLinearGradient(0, 0, 0, 8);
      stockGrad.addColorStop(0, '#666');
      stockGrad.addColorStop(1, '#444');
      ctx.fillStyle = stockGrad;
      ctx.fillRect(0, 3, 8, 6);
      // Receiver body
      const bodyGrad = ctx.createLinearGradient(0, 0, 0, 8);
      bodyGrad.addColorStop(0, '#666');
      bodyGrad.addColorStop(0.5, '#555');
      bodyGrad.addColorStop(1, '#444');
      ctx.fillStyle = bodyGrad;
      ctx.fillRect(8, 2, 14, 8);
      // Barrel (thick)
      ctx.fillStyle = '#555';
      ctx.fillRect(22, 3, 16, 4);
      // Barrel jacket / cooling holes
      ctx.fillStyle = '#333';
      for (let i = 24; i < 36; i += 3) {
        ctx.beginPath();
        ctx.arc(i, 5, 1, 0, Math.PI * 2);
        ctx.fill();
      }
      // Barrel end / muzzle brake
      ctx.fillStyle = '#444';
      ctx.fillRect(36, 2, 2, 6);
      ctx.fillStyle = '#333';
      ctx.fillRect(37, 3, 1, 1);
      ctx.fillRect(37, 6, 1, 1);
      // Ammo box
      ctx.fillStyle = '#556B2F';
      ctx.fillRect(10, 10, 10, 6);
      ctx.strokeStyle = '#444';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(10, 10, 10, 6);
      // Ammo belt from box to receiver
      ctx.fillStyle = '#cc9900';
      ctx.fillRect(14, 8, 2, 3);
      ctx.fillRect(16, 8, 2, 2);
      // Bullet tips in belt
      ctx.fillStyle = '#ddaa00';
      ctx.fillRect(14, 8, 1, 2);
      ctx.fillRect(16, 8, 1, 1);
      // Foregrip
      ctx.fillStyle = '#555';
      ctx.fillRect(22, 7, 4, 5);
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      for (let i = 8; i < 12; i += 2) {
        ctx.beginPath();
        ctx.moveTo(22, i);
        ctx.lineTo(26, i);
        ctx.stroke();
      }
      // Carry handle
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(12, 2);
      ctx.quadraticCurveTo(16, 0, 20, 2);
      ctx.stroke();
      // Barrel highlight
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(22, 3, 15, 1);
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(12, 9, 1, 2);
    });

    // Rocket launcher — 42x16, tube with exhaust vents
    this.createTexture('weapon_rocket', 42, 16, (ctx) => {
      // Main tube body
      const tubeGrad = ctx.createLinearGradient(0, 2, 0, 14);
      tubeGrad.addColorStop(0, '#6B8E3F');
      tubeGrad.addColorStop(0.3, '#556B2F');
      tubeGrad.addColorStop(0.7, '#4A5B25');
      tubeGrad.addColorStop(1, '#3A4B1A');
      ctx.fillStyle = tubeGrad;
      ctx.beginPath();
      ctx.roundRect(4, 2, 34, 12, 2);
      ctx.fill();
      // Rear exhaust end (wider)
      ctx.fillStyle = '#444';
      ctx.fillRect(0, 1, 5, 14);
      ctx.fillStyle = '#333';
      ctx.fillRect(0, 3, 2, 10);
      // Exhaust vent holes
      ctx.fillStyle = '#222';
      ctx.fillRect(1, 4, 1, 2);
      ctx.fillRect(1, 8, 1, 2);
      ctx.fillRect(1, 12, 1, 2);
      // Front sight ring
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(39, 8, 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#4a5a2a';
      ctx.beginPath();
      ctx.arc(39, 8, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(39, 8, 2, 0, Math.PI * 2);
      ctx.fill();
      // Grip
      ctx.fillStyle = '#444';
      ctx.fillRect(14, 13, 6, 3);
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 0.5;
      for (let i = 15; i < 20; i += 2) {
        ctx.beginPath();
        ctx.moveTo(i, 13);
        ctx.lineTo(i, 16);
        ctx.stroke();
      }
      // Trigger
      ctx.fillStyle = '#333';
      ctx.fillRect(17, 12, 1, 2);
      // Body band details
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(10, 2);
      ctx.lineTo(10, 14);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(25, 2);
      ctx.lineTo(25, 14);
      ctx.stroke();
      // Sight on top
      ctx.fillStyle = '#555';
      ctx.fillRect(18, 0, 8, 3);
      ctx.fillStyle = '#333';
      ctx.fillRect(19, 1, 6, 1);
      // Body highlight
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(5, 3, 30, 2);
    });
  }
}
