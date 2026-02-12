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

    // Rifle bullet — elongated brass with dark tip
    this.createTexture('rifle_bullet', 16, 3, (ctx) => {
      // Trail line
      ctx.fillStyle = 'rgba(200,180,100,0.3)';
      ctx.fillRect(0, 1, 6, 1);
      // Brass body
      const grad = ctx.createLinearGradient(4, 0, 16, 0);
      grad.addColorStop(0, '#cc9933');
      grad.addColorStop(0.6, '#ffdd66');
      grad.addColorStop(1, '#aa7722');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(10, 1.5, 6, 1.5, 0, 0, Math.PI * 2);
      ctx.fill();
      // Dark tip
      ctx.fillStyle = '#665533';
      ctx.beginPath();
      ctx.ellipse(15, 1.5, 1.5, 1.2, 0, 0, Math.PI * 2);
      ctx.fill();
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fillRect(7, 0, 5, 1);
    });

    // Machinegun tracer bullet — orange-yellow with glow
    this.createTexture('mg_bullet', 10, 4, (ctx) => {
      // Tracer glow
      ctx.fillStyle = 'rgba(255,150,0,0.3)';
      ctx.beginPath();
      ctx.ellipse(5, 2, 5, 2, 0, 0, Math.PI * 2);
      ctx.fill();
      // Core
      const grad = ctx.createLinearGradient(0, 0, 10, 0);
      grad.addColorStop(0, '#ff8800');
      grad.addColorStop(0.5, '#ffcc00');
      grad.addColorStop(1, '#ffaa00');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(5, 2, 4, 1.5, 0, 0, Math.PI * 2);
      ctx.fill();
      // Bright center
      ctx.fillStyle = 'rgba(255,255,200,0.6)';
      ctx.beginPath();
      ctx.ellipse(6, 1.5, 2, 0.8, 0, 0, Math.PI * 2);
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

    // Pistol — 36x20
    this.createTexture('weapon_pistol', 36, 20, (ctx) => {
      // Slide
      const slideGrad = ctx.createLinearGradient(0, 0, 0, 8);
      slideGrad.addColorStop(0, '#777');
      slideGrad.addColorStop(0.5, '#555');
      slideGrad.addColorStop(1, '#444');
      ctx.fillStyle = slideGrad;
      ctx.fillRect(0, 3, 26, 7);
      // Barrel extension
      ctx.fillStyle = '#444';
      ctx.fillRect(26, 4, 10, 5);
      // Barrel hole
      ctx.fillStyle = '#222';
      ctx.beginPath();
      ctx.arc(35, 6.5, 1.5, 0, Math.PI * 2);
      ctx.fill();
      // Slide serrations
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 0.7;
      for (let i = 3; i < 14; i += 2.5) {
        ctx.beginPath();
        ctx.moveTo(i, 3); ctx.lineTo(i, 6);
        ctx.stroke();
      }
      // Grip (wood)
      const gripGrad = ctx.createLinearGradient(3, 10, 3, 20);
      gripGrad.addColorStop(0, '#8B6914');
      gripGrad.addColorStop(0.5, '#6B4914');
      gripGrad.addColorStop(1, '#5B3914');
      ctx.fillStyle = gripGrad;
      ctx.fillRect(3, 10, 10, 10);
      // Grip texture
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 0.5;
      for (let i = 12; i < 20; i += 2) {
        ctx.beginPath();
        ctx.moveTo(4, i); ctx.lineTo(12, i);
        ctx.stroke();
      }
      // Trigger guard
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(13, 10);
      ctx.quadraticCurveTo(20, 17, 13, 19);
      ctx.stroke();
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(15, 12, 2, 4);
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fillRect(1, 3, 24, 1);
    });

    // Shotgun — 50x20
    this.createTexture('weapon_shotgun', 50, 20, (ctx) => {
      // Stock
      const stockGrad = ctx.createLinearGradient(0, 0, 0, 14);
      stockGrad.addColorStop(0, '#8B6226');
      stockGrad.addColorStop(0.5, '#6B4226');
      stockGrad.addColorStop(1, '#5B3216');
      ctx.fillStyle = stockGrad;
      ctx.fillRect(0, 4, 14, 12);
      // Wood grain
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(1, 7); ctx.quadraticCurveTo(7, 6, 13, 9);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(1, 12); ctx.quadraticCurveTo(7, 13, 13, 11);
      ctx.stroke();
      // Receiver
      const recvGrad = ctx.createLinearGradient(0, 0, 0, 12);
      recvGrad.addColorStop(0, '#666');
      recvGrad.addColorStop(1, '#444');
      ctx.fillStyle = recvGrad;
      ctx.fillRect(14, 4, 10, 12);
      // Upper barrel
      ctx.fillStyle = '#555';
      ctx.fillRect(24, 4, 26, 5);
      // Lower barrel
      ctx.fillStyle = '#4a4a4a';
      ctx.fillRect(24, 10, 26, 5);
      // Barrel ends
      ctx.fillStyle = '#333';
      ctx.fillRect(49, 4, 1, 5);
      ctx.fillRect(49, 10, 1, 5);
      // Pump grip
      const pumpGrad = ctx.createLinearGradient(0, 0, 0, 6);
      pumpGrad.addColorStop(0, '#7B5226');
      pumpGrad.addColorStop(1, '#5B3216');
      ctx.fillStyle = pumpGrad;
      ctx.fillRect(30, 14, 12, 6);
      // Pump grooves
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      for (let i = 31; i < 42; i += 2.5) {
        ctx.beginPath();
        ctx.moveTo(i, 14); ctx.lineTo(i, 20);
        ctx.stroke();
      }
      // Barrel highlight
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.fillRect(24, 4, 25, 1);
      ctx.fillRect(24, 10, 25, 1);
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(18, 15, 2, 3);
    });

    // Rifle — 60x18
    this.createTexture('weapon_rifle', 60, 18, (ctx) => {
      // Stock
      const stockGrad = ctx.createLinearGradient(0, 0, 0, 12);
      stockGrad.addColorStop(0, '#8B6226');
      stockGrad.addColorStop(0.5, '#6B4226');
      stockGrad.addColorStop(1, '#5B3216');
      ctx.fillStyle = stockGrad;
      ctx.fillRect(0, 5, 18, 9);
      // Cheek rest
      ctx.fillStyle = '#7B5226';
      ctx.beginPath();
      ctx.moveTo(0, 5); ctx.quadraticCurveTo(3, 2, 9, 5);
      ctx.fill();
      // Wood grain
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(1, 8); ctx.quadraticCurveTo(9, 7, 17, 10);
      ctx.stroke();
      // Receiver
      const recvGrad = ctx.createLinearGradient(0, 0, 0, 9);
      recvGrad.addColorStop(0, '#666');
      recvGrad.addColorStop(1, '#444');
      ctx.fillStyle = recvGrad;
      ctx.fillRect(18, 5, 12, 9);
      // Magazine
      ctx.fillStyle = '#444';
      ctx.fillRect(22, 14, 7, 4);
      // Barrel
      const barrelGrad = ctx.createLinearGradient(0, 0, 0, 5);
      barrelGrad.addColorStop(0, '#666');
      barrelGrad.addColorStop(1, '#444');
      ctx.fillStyle = barrelGrad;
      ctx.fillRect(30, 6, 30, 5);
      // Barrel end
      ctx.fillStyle = '#333';
      ctx.fillRect(59, 6, 1, 5);
      // Scope mount
      ctx.fillStyle = '#555';
      ctx.fillRect(24, 3, 14, 3);
      // Scope body
      ctx.fillStyle = '#333';
      ctx.fillRect(26, 0, 12, 4);
      // Scope lenses
      ctx.fillStyle = '#226';
      ctx.beginPath();
      ctx.arc(26, 2, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(38, 2, 2, 0, Math.PI * 2);
      ctx.fill();
      // Scope highlight
      ctx.fillStyle = 'rgba(100,150,255,0.3)';
      ctx.beginPath();
      ctx.arc(38, 1.5, 1, 0, Math.PI * 2);
      ctx.fill();
      // Barrel highlight
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.fillRect(30, 6, 28, 1);
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(23, 13, 2, 3);
    });

    // Machinegun — 56x24
    this.createTexture('weapon_machinegun', 56, 24, (ctx) => {
      // Stock
      const stockGrad = ctx.createLinearGradient(0, 0, 0, 12);
      stockGrad.addColorStop(0, '#666');
      stockGrad.addColorStop(1, '#444');
      ctx.fillStyle = stockGrad;
      ctx.fillRect(0, 4, 12, 10);
      // Receiver
      const bodyGrad = ctx.createLinearGradient(0, 0, 0, 12);
      bodyGrad.addColorStop(0, '#666');
      bodyGrad.addColorStop(0.5, '#555');
      bodyGrad.addColorStop(1, '#444');
      ctx.fillStyle = bodyGrad;
      ctx.fillRect(12, 3, 20, 12);
      // Barrel
      ctx.fillStyle = '#555';
      ctx.fillRect(32, 4, 24, 6);
      // Cooling holes
      ctx.fillStyle = '#333';
      for (let i = 36; i < 54; i += 4) {
        ctx.beginPath();
        ctx.arc(i, 7, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      // Muzzle brake
      ctx.fillStyle = '#444';
      ctx.fillRect(54, 3, 2, 8);
      ctx.fillStyle = '#333';
      ctx.fillRect(55, 4, 1, 2);
      ctx.fillRect(55, 8, 1, 2);
      // Ammo box
      ctx.fillStyle = '#556B2F';
      ctx.fillRect(14, 15, 14, 9);
      ctx.strokeStyle = '#444';
      ctx.lineWidth = 0.7;
      ctx.strokeRect(14, 15, 14, 9);
      // Ammo belt
      ctx.fillStyle = '#cc9900';
      ctx.fillRect(20, 12, 3, 4);
      ctx.fillRect(23, 12, 3, 3);
      ctx.fillStyle = '#ddaa00';
      ctx.fillRect(20, 12, 2, 3);
      ctx.fillRect(23, 12, 2, 2);
      // Foregrip
      ctx.fillStyle = '#555';
      ctx.fillRect(32, 10, 6, 8);
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      for (let i = 12; i < 18; i += 2) {
        ctx.beginPath();
        ctx.moveTo(32, i); ctx.lineTo(38, i);
        ctx.stroke();
      }
      // Carry handle
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(18, 3); ctx.quadraticCurveTo(24, 0, 30, 3);
      ctx.stroke();
      // Barrel highlight
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(32, 4, 22, 1);
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(18, 14, 2, 3);
    });

    // Rocket launcher — 62x24
    this.createTexture('weapon_rocket', 62, 24, (ctx) => {
      // Main tube
      const tubeGrad = ctx.createLinearGradient(0, 3, 0, 21);
      tubeGrad.addColorStop(0, '#6B8E3F');
      tubeGrad.addColorStop(0.3, '#556B2F');
      tubeGrad.addColorStop(0.7, '#4A5B25');
      tubeGrad.addColorStop(1, '#3A4B1A');
      ctx.fillStyle = tubeGrad;
      ctx.beginPath();
      ctx.roundRect(6, 3, 50, 18, 3);
      ctx.fill();
      // Rear exhaust
      ctx.fillStyle = '#444';
      ctx.fillRect(0, 2, 7, 20);
      ctx.fillStyle = '#333';
      ctx.fillRect(0, 4, 3, 16);
      // Exhaust vents
      ctx.fillStyle = '#222';
      ctx.fillRect(1, 6, 2, 3);
      ctx.fillRect(1, 12, 2, 3);
      ctx.fillRect(1, 18, 2, 3);
      // Front ring
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(58, 12, 7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#4a5a2a';
      ctx.beginPath();
      ctx.arc(58, 12, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(58, 12, 3, 0, Math.PI * 2);
      ctx.fill();
      // Grip
      ctx.fillStyle = '#444';
      ctx.fillRect(20, 20, 10, 4);
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 0.5;
      for (let i = 22; i < 30; i += 2.5) {
        ctx.beginPath();
        ctx.moveTo(i, 20); ctx.lineTo(i, 24);
        ctx.stroke();
      }
      // Trigger
      ctx.fillStyle = '#333';
      ctx.fillRect(25, 19, 2, 3);
      // Band details
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(15, 3); ctx.lineTo(15, 21);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(38, 3); ctx.lineTo(38, 21);
      ctx.stroke();
      // Sight
      ctx.fillStyle = '#555';
      ctx.fillRect(26, 0, 12, 4);
      ctx.fillStyle = '#333';
      ctx.fillRect(28, 1, 8, 2);
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(7, 4, 46, 3);
    });
  }
}
