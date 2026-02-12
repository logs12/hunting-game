import { SpriteFactory } from './SpriteFactory.js';

const WEAPON_SCALE = 0.625;

export class WeaponSprites extends SpriteFactory {
  _ctw(key, w, h, drawFn) {
    this.createTexture(key, w, h, drawFn, WEAPON_SCALE);
  }

  generate() {
    // --- Projectile textures ---

    // Bullet (pistol)
    this.createTexture('bullet', 6, 3, (ctx) => {
      const grad = ctx.createLinearGradient(0, 0, 6, 0);
      grad.addColorStop(0, '#cc9900');
      grad.addColorStop(0.5, '#ffee55');
      grad.addColorStop(1, '#ffcc00');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(3, 1.5, 3, 1.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.beginPath();
      ctx.ellipse(4, 1, 2, 0.7, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // Pellet (shotgun)
    this.createTexture('pellet', 4, 4, (ctx) => {
      ctx.fillStyle = '#ffaa00';
      ctx.beginPath();
      ctx.arc(2, 2, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.beginPath();
      ctx.arc(1.5, 1, 0.8, 0, Math.PI * 2);
      ctx.fill();
    });

    // Rifle bullet — elongated brass with dark tip
    this.createTexture('rifle_bullet', 10, 2, (ctx) => {
      const grad = ctx.createLinearGradient(2, 0, 10, 0);
      grad.addColorStop(0, '#cc9933');
      grad.addColorStop(0.6, '#ffdd66');
      grad.addColorStop(1, '#aa7722');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(5, 1, 5, 1, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#665533';
      ctx.beginPath();
      ctx.ellipse(9, 1, 1, 0.8, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // Machinegun tracer bullet — orange-yellow with glow
    this.createTexture('mg_bullet', 7, 3, (ctx) => {
      ctx.fillStyle = 'rgba(255,150,0,0.3)';
      ctx.beginPath();
      ctx.ellipse(3.5, 1.5, 3.5, 1.5, 0, 0, Math.PI * 2);
      ctx.fill();
      const grad = ctx.createLinearGradient(0, 0, 7, 0);
      grad.addColorStop(0, '#ff8800');
      grad.addColorStop(0.5, '#ffcc00');
      grad.addColorStop(1, '#ffaa00');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(3.5, 1.5, 3, 1.2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,200,0.6)';
      ctx.beginPath();
      ctx.ellipse(4.5, 1, 1.5, 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // Rocket projectile
    this.createTexture('rocket_proj', 12, 6, (ctx) => {
      const grad = ctx.createLinearGradient(0, 0, 0, 6);
      grad.addColorStop(0, '#aa5500');
      grad.addColorStop(0.5, '#884400');
      grad.addColorStop(1, '#663300');
      ctx.fillStyle = grad;
      ctx.fillRect(2, 1, 8, 4);
      ctx.fillStyle = '#ff4400';
      ctx.beginPath();
      ctx.moveTo(10, 0); ctx.lineTo(12, 3); ctx.lineTo(10, 6);
      ctx.fill();
      ctx.fillStyle = '#666';
      ctx.fillRect(0, 0, 2, 1.5);
      ctx.fillRect(0, 4.5, 2, 1.5);
      ctx.fillStyle = '#ff8800';
      ctx.fillRect(0, 1.5, 1.5, 3);
      ctx.fillStyle = '#ffcc44';
      ctx.fillRect(0, 2, 1, 2);
    });

    // --- Weapon held sprites (displayed on hunter) ---

    // Pistol — 36x20
    this._ctw('weapon_pistol', 36, 20, (ctx) => {
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
    this._ctw('weapon_shotgun', 50, 20, (ctx) => {
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
    this._ctw('weapon_rifle', 60, 18, (ctx) => {
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
    this._ctw('weapon_machinegun', 56, 24, (ctx) => {
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
    this._ctw('weapon_rocket', 62, 24, (ctx) => {
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

    // =====================================================
    // --- NEW Projectile textures ---
    // =====================================================

    // Pebble — small grey/brown round stone
    this.createTexture('pebble', 4, 4, (ctx) => {
      const grad = ctx.createRadialGradient(1.5, 1.5, 0, 2, 2, 2.2);
      grad.addColorStop(0, '#b8a89a');
      grad.addColorStop(0.5, '#8a7a6a');
      grad.addColorStop(1, '#6a5a4a');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(2, 2, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.beginPath();
      ctx.arc(1.4, 1.2, 0.8, 0, Math.PI * 2);
      ctx.fill();
    });

    // Bolt — crossbow bolt, dark shaft with pointed tip
    this.createTexture('bolt', 12, 3, (ctx) => {
      // Shaft
      const shaftGrad = ctx.createLinearGradient(0, 0, 12, 0);
      shaftGrad.addColorStop(0, '#5a4030');
      shaftGrad.addColorStop(0.5, '#7a5a40');
      shaftGrad.addColorStop(1, '#4a3020');
      ctx.fillStyle = shaftGrad;
      ctx.fillRect(0, 0.8, 10, 1.4);
      // Tip (pointed)
      ctx.fillStyle = '#888';
      ctx.beginPath();
      ctx.moveTo(9, 0.5);
      ctx.lineTo(12, 1.5);
      ctx.lineTo(9, 2.5);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.beginPath();
      ctx.moveTo(9.5, 0.8);
      ctx.lineTo(11.5, 1.5);
      ctx.lineTo(9.5, 1.5);
      ctx.closePath();
      ctx.fill();
      // Fletching
      ctx.fillStyle = '#aa3333';
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(2.5, 0.8); ctx.lineTo(0, 0.8);
      ctx.fill();
      ctx.fillStyle = '#aa3333';
      ctx.beginPath();
      ctx.moveTo(0, 3); ctx.lineTo(2.5, 2.2); ctx.lineTo(0, 2.2);
      ctx.fill();
    });

    // Sniper bullet — very long thin brass bullet with dark tip
    this.createTexture('sniper_bullet', 14, 2, (ctx) => {
      const grad = ctx.createLinearGradient(0, 0, 14, 0);
      grad.addColorStop(0, '#cc9933');
      grad.addColorStop(0.4, '#ffdd66');
      grad.addColorStop(0.7, '#ddbb44');
      grad.addColorStop(1, '#554422');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(7, 1, 7, 1, 0, 0, Math.PI * 2);
      ctx.fill();
      // Dark tip
      ctx.fillStyle = '#443322';
      ctx.beginPath();
      ctx.ellipse(12.5, 1, 1.8, 0.8, 0, 0, Math.PI * 2);
      ctx.fill();
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.beginPath();
      ctx.ellipse(6, 0.5, 4, 0.3, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // Flame — orange/yellow flame particle, glowing
    this.createTexture('flame', 8, 8, (ctx) => {
      // Outer glow
      const outerGrad = ctx.createRadialGradient(4, 4, 0, 4, 4, 4.5);
      outerGrad.addColorStop(0, 'rgba(255,200,50,0.6)');
      outerGrad.addColorStop(0.5, 'rgba(255,100,0,0.4)');
      outerGrad.addColorStop(1, 'rgba(255,50,0,0)');
      ctx.fillStyle = outerGrad;
      ctx.beginPath();
      ctx.arc(4, 4, 4, 0, Math.PI * 2);
      ctx.fill();
      // Core flame shape
      ctx.fillStyle = '#ff6600';
      ctx.beginPath();
      ctx.moveTo(1, 6);
      ctx.quadraticCurveTo(2, 2, 4, 0.5);
      ctx.quadraticCurveTo(6, 2, 7, 6);
      ctx.quadraticCurveTo(4, 5, 1, 6);
      ctx.fill();
      // Inner bright core
      const coreGrad = ctx.createRadialGradient(4, 4, 0, 4, 4, 2.5);
      coreGrad.addColorStop(0, '#ffffcc');
      coreGrad.addColorStop(0.5, '#ffdd44');
      coreGrad.addColorStop(1, 'rgba(255,150,0,0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(4, 4, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Grenade — dark green round grenade with highlights
    this.createTexture('grenade', 10, 10, (ctx) => {
      // Body
      const bodyGrad = ctx.createRadialGradient(4.5, 4.5, 0.5, 5, 5, 5);
      bodyGrad.addColorStop(0, '#5a7a3a');
      bodyGrad.addColorStop(0.5, '#3a5a2a');
      bodyGrad.addColorStop(1, '#2a4a1a');
      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.arc(5, 5, 4.5, 0, Math.PI * 2);
      ctx.fill();
      // Cross-hatch pattern
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 0.5;
      for (let i = 1.5; i < 9; i += 2) {
        ctx.beginPath();
        ctx.moveTo(i, 1); ctx.lineTo(i, 9);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(1, i); ctx.lineTo(9, i);
        ctx.stroke();
      }
      // Top spoon/lever
      ctx.fillStyle = '#777';
      ctx.fillRect(4, 0, 2, 2);
      ctx.fillStyle = '#888';
      ctx.fillRect(4.5, 0, 3, 1);
      // Pin ring
      ctx.strokeStyle = '#aaa';
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.arc(3.5, 0.8, 1, 0, Math.PI * 2);
      ctx.stroke();
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.beginPath();
      ctx.arc(3.5, 3.5, 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // Heavy bullet — thick brass bullet, like mg_bullet but fatter
    this.createTexture('heavy_bullet', 8, 4, (ctx) => {
      // Outer glow
      ctx.fillStyle = 'rgba(255,150,0,0.25)';
      ctx.beginPath();
      ctx.ellipse(4, 2, 4, 2, 0, 0, Math.PI * 2);
      ctx.fill();
      // Bullet body
      const grad = ctx.createLinearGradient(0, 0, 8, 0);
      grad.addColorStop(0, '#cc9900');
      grad.addColorStop(0.4, '#ffee55');
      grad.addColorStop(0.7, '#ddbb33');
      grad.addColorStop(1, '#aa7722');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(4, 2, 3.5, 1.8, 0, 0, Math.PI * 2);
      ctx.fill();
      // Dark tip
      ctx.fillStyle = '#665533';
      ctx.beginPath();
      ctx.ellipse(7, 2, 1.2, 1.2, 0, 0, Math.PI * 2);
      ctx.fill();
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.beginPath();
      ctx.ellipse(4, 1, 2.5, 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // Laser beam — bright red/pink laser line with glow
    this.createTexture('laser_beam', 16, 2, (ctx) => {
      // Outer glow
      ctx.fillStyle = 'rgba(255,0,50,0.2)';
      ctx.beginPath();
      ctx.ellipse(8, 1, 8, 1, 0, 0, Math.PI * 2);
      ctx.fill();
      // Mid glow
      ctx.fillStyle = 'rgba(255,50,100,0.4)';
      ctx.fillRect(0, 0.2, 16, 1.6);
      // Core beam
      const grad = ctx.createLinearGradient(0, 0, 16, 0);
      grad.addColorStop(0, '#ff4488');
      grad.addColorStop(0.3, '#ff2255');
      grad.addColorStop(0.7, '#ff2255');
      grad.addColorStop(1, '#ff6699');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0.4, 16, 1.2);
      // Bright center line
      ctx.fillStyle = 'rgba(255,200,220,0.8)';
      ctx.fillRect(0, 0.7, 16, 0.6);
    });

    // RPG projectile — like rocket_proj but larger with more detail
    this.createTexture('rpg_proj', 14, 8, (ctx) => {
      // Body
      const grad = ctx.createLinearGradient(0, 0, 0, 8);
      grad.addColorStop(0, '#7a6a3a');
      grad.addColorStop(0.5, '#5a4a2a');
      grad.addColorStop(1, '#4a3a1a');
      ctx.fillStyle = grad;
      ctx.fillRect(2, 1, 10, 6);
      // Warhead
      ctx.fillStyle = '#555';
      ctx.beginPath();
      ctx.moveTo(12, 0);
      ctx.lineTo(14, 4);
      ctx.lineTo(12, 8);
      ctx.lineTo(12, 0);
      ctx.fill();
      ctx.fillStyle = '#dd4400';
      ctx.beginPath();
      ctx.moveTo(12.5, 1);
      ctx.lineTo(13.5, 4);
      ctx.lineTo(12.5, 7);
      ctx.closePath();
      ctx.fill();
      // Fins
      ctx.fillStyle = '#666';
      ctx.fillRect(0, 0, 2.5, 2);
      ctx.fillRect(0, 6, 2.5, 2);
      // Engine exhaust
      ctx.fillStyle = '#ff8800';
      ctx.fillRect(0, 2.5, 2, 3);
      ctx.fillStyle = '#ffcc44';
      ctx.fillRect(0, 3, 1.5, 2);
      // Band detail
      ctx.strokeStyle = 'rgba(0,0,0,0.25)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(6, 1); ctx.lineTo(6, 7);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(9, 1); ctx.lineTo(9, 7);
      ctx.stroke();
      // Body highlight
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.fillRect(3, 1.5, 8, 1.5);
    });

    // Rail slug — blue/electric metallic elongated projectile with glow
    this.createTexture('rail_slug', 18, 3, (ctx) => {
      // Outer electric glow
      ctx.fillStyle = 'rgba(50,100,255,0.2)';
      ctx.beginPath();
      ctx.ellipse(9, 1.5, 9, 1.5, 0, 0, Math.PI * 2);
      ctx.fill();
      // Body
      const grad = ctx.createLinearGradient(0, 0, 18, 0);
      grad.addColorStop(0, '#6688cc');
      grad.addColorStop(0.3, '#aaccff');
      grad.addColorStop(0.6, '#88aaee');
      grad.addColorStop(1, '#4466aa');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(9, 1.5, 9, 1.3, 0, 0, Math.PI * 2);
      ctx.fill();
      // Electric shimmer
      ctx.fillStyle = 'rgba(150,200,255,0.5)';
      ctx.beginPath();
      ctx.ellipse(9, 1, 6, 0.4, 0, 0, Math.PI * 2);
      ctx.fill();
      // Bright tip
      ctx.fillStyle = '#ddeeff';
      ctx.beginPath();
      ctx.ellipse(16.5, 1.5, 1.5, 1, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // Plasma ball — glowing blue/purple energy ball
    this.createTexture('plasma_ball', 10, 10, (ctx) => {
      // Outer glow
      const outerGrad = ctx.createRadialGradient(5, 5, 1, 5, 5, 5);
      outerGrad.addColorStop(0, 'rgba(150,100,255,0.6)');
      outerGrad.addColorStop(0.4, 'rgba(100,50,255,0.3)');
      outerGrad.addColorStop(1, 'rgba(50,0,200,0)');
      ctx.fillStyle = outerGrad;
      ctx.beginPath();
      ctx.arc(5, 5, 5, 0, Math.PI * 2);
      ctx.fill();
      // Mid layer
      const midGrad = ctx.createRadialGradient(5, 5, 0, 5, 5, 3.5);
      midGrad.addColorStop(0, '#ccbbff');
      midGrad.addColorStop(0.5, '#8866ff');
      midGrad.addColorStop(1, 'rgba(80,40,200,0.2)');
      ctx.fillStyle = midGrad;
      ctx.beginPath();
      ctx.arc(5, 5, 3.5, 0, Math.PI * 2);
      ctx.fill();
      // Core
      const coreGrad = ctx.createRadialGradient(5, 5, 0, 5, 5, 1.5);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.5, '#ddccff');
      coreGrad.addColorStop(1, '#aa88ff');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(5, 5, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Gauss slug — bright white/blue elongated projectile
    this.createTexture('gauss_slug', 16, 3, (ctx) => {
      // Outer glow
      ctx.fillStyle = 'rgba(100,150,255,0.2)';
      ctx.beginPath();
      ctx.ellipse(8, 1.5, 8, 1.5, 0, 0, Math.PI * 2);
      ctx.fill();
      // Body
      const grad = ctx.createLinearGradient(0, 0, 16, 0);
      grad.addColorStop(0, '#aaccff');
      grad.addColorStop(0.3, '#ddeeff');
      grad.addColorStop(0.6, '#ffffff');
      grad.addColorStop(1, '#88bbff');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(8, 1.5, 8, 1.2, 0, 0, Math.PI * 2);
      ctx.fill();
      // Bright core line
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.beginPath();
      ctx.ellipse(8, 1.5, 6, 0.4, 0, 0, Math.PI * 2);
      ctx.fill();
      // Trailing energy
      ctx.fillStyle = 'rgba(100,180,255,0.4)';
      ctx.beginPath();
      ctx.ellipse(3, 1.5, 3, 1, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // Tesla bolt — electric blue jagged bolt shape
    this.createTexture('tesla_bolt', 12, 6, (ctx) => {
      // Glow aura
      ctx.fillStyle = 'rgba(50,150,255,0.15)';
      ctx.beginPath();
      ctx.ellipse(6, 3, 6, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      // Lightning bolt shape
      ctx.strokeStyle = '#66bbff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 3);
      ctx.lineTo(3, 1);
      ctx.lineTo(5, 3.5);
      ctx.lineTo(7, 0.5);
      ctx.lineTo(9, 3);
      ctx.lineTo(12, 2);
      ctx.stroke();
      // Bright inner bolt
      ctx.strokeStyle = '#aaddff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 3);
      ctx.lineTo(3, 1);
      ctx.lineTo(5, 3.5);
      ctx.lineTo(7, 0.5);
      ctx.lineTo(9, 3);
      ctx.lineTo(12, 2);
      ctx.stroke();
      // Branch sparks
      ctx.strokeStyle = 'rgba(100,200,255,0.5)';
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(3, 1); ctx.lineTo(2, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(7, 0.5); ctx.lineTo(7.5, 5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(9, 3); ctx.lineTo(10, 5.5);
      ctx.stroke();
      // Core glow dots
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(5, 3.5, 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(9, 3, 0.8, 0, Math.PI * 2);
      ctx.fill();
    });

    // =====================================================
    // --- NEW Held weapon sprites ---
    // =====================================================

    // Slingshot — 24x20 Y-shaped wooden slingshot with rubber band
    this._ctw('weapon_slingshot', 24, 20, (ctx) => {
      // Handle (vertical wood)
      const handleGrad = ctx.createLinearGradient(9, 8, 15, 8);
      handleGrad.addColorStop(0, '#8B6226');
      handleGrad.addColorStop(0.5, '#6B4226');
      handleGrad.addColorStop(1, '#5B3216');
      ctx.fillStyle = handleGrad;
      ctx.fillRect(10, 8, 5, 12);
      // Wood grain on handle
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(11, 9); ctx.lineTo(11, 19);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(13, 10); ctx.lineTo(13, 18);
      ctx.stroke();
      // Upper fork - top arm
      ctx.fillStyle = '#7B5226';
      ctx.save();
      ctx.translate(12, 8);
      ctx.rotate(-0.5);
      ctx.fillRect(0, -2, 12, 4);
      ctx.restore();
      // Upper fork - bottom arm
      ctx.fillStyle = '#7B5226';
      ctx.save();
      ctx.translate(12, 10);
      ctx.rotate(0.5);
      ctx.fillRect(0, -2, 12, 4);
      ctx.restore();
      // Rubber band - top
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(22, 2);
      ctx.quadraticCurveTo(6, 5, 3, 10);
      ctx.stroke();
      // Rubber band - bottom
      ctx.beginPath();
      ctx.moveTo(22, 16);
      ctx.quadraticCurveTo(6, 14, 3, 10);
      ctx.stroke();
      // Pouch
      ctx.fillStyle = '#654321';
      ctx.beginPath();
      ctx.ellipse(3, 10, 2, 3, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // Revolver — 38x22 classic revolver with cylinder, wood grip
    this._ctw('weapon_revolver', 38, 22, (ctx) => {
      // Frame
      const frameGrad = ctx.createLinearGradient(0, 0, 0, 10);
      frameGrad.addColorStop(0, '#888');
      frameGrad.addColorStop(0.5, '#666');
      frameGrad.addColorStop(1, '#555');
      ctx.fillStyle = frameGrad;
      ctx.fillRect(4, 3, 22, 8);
      // Barrel
      ctx.fillStyle = '#555';
      ctx.fillRect(26, 4, 12, 5);
      // Barrel highlight
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.fillRect(26, 4, 11, 1);
      // Barrel end
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(37, 6.5, 1.5, 0, Math.PI * 2);
      ctx.fill();
      // Cylinder
      const cylGrad = ctx.createLinearGradient(0, 0, 0, 10);
      cylGrad.addColorStop(0, '#777');
      cylGrad.addColorStop(0.5, '#555');
      cylGrad.addColorStop(1, '#666');
      ctx.fillStyle = cylGrad;
      ctx.fillRect(16, 2, 10, 10);
      // Cylinder flutes
      ctx.strokeStyle = 'rgba(0,0,0,0.25)';
      ctx.lineWidth = 0.6;
      for (let i = 18; i < 26; i += 2) {
        ctx.beginPath();
        ctx.moveTo(i, 2); ctx.lineTo(i, 12);
        ctx.stroke();
      }
      // Hammer
      ctx.fillStyle = '#666';
      ctx.fillRect(6, 1, 4, 3);
      ctx.fillStyle = '#777';
      ctx.fillRect(7, 0, 2, 2);
      // Grip (wood)
      const gripGrad = ctx.createLinearGradient(4, 11, 4, 22);
      gripGrad.addColorStop(0, '#8B6914');
      gripGrad.addColorStop(0.5, '#6B4914');
      gripGrad.addColorStop(1, '#5B3914');
      ctx.fillStyle = gripGrad;
      ctx.beginPath();
      ctx.moveTo(4, 11);
      ctx.lineTo(14, 11);
      ctx.lineTo(12, 22);
      ctx.lineTo(4, 22);
      ctx.closePath();
      ctx.fill();
      // Grip texture
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 0.5;
      for (let i = 13; i < 22; i += 2) {
        ctx.beginPath();
        ctx.moveTo(5, i); ctx.lineTo(12, i);
        ctx.stroke();
      }
      // Trigger guard
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(14, 11);
      ctx.quadraticCurveTo(22, 18, 14, 20);
      ctx.stroke();
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(17, 12, 2, 4);
    });

    // Double barrel shotgun — 52x20
    this._ctw('weapon_doublebarrel', 52, 20, (ctx) => {
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
      ctx.moveTo(1, 7); ctx.quadraticCurveTo(7, 6, 13, 8);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(1, 12); ctx.quadraticCurveTo(7, 13, 13, 11);
      ctx.stroke();
      // Receiver/break action
      const recvGrad = ctx.createLinearGradient(0, 0, 0, 12);
      recvGrad.addColorStop(0, '#777');
      recvGrad.addColorStop(1, '#555');
      ctx.fillStyle = recvGrad;
      ctx.fillRect(14, 4, 8, 12);
      // Hinge pin
      ctx.fillStyle = '#888';
      ctx.beginPath();
      ctx.arc(18, 10, 1.5, 0, Math.PI * 2);
      ctx.fill();
      // Top barrel
      ctx.fillStyle = '#555';
      ctx.fillRect(22, 4, 30, 5);
      // Bottom barrel
      ctx.fillStyle = '#4a4a4a';
      ctx.fillRect(22, 10, 30, 5);
      // Barrel separation line
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(22, 9.5); ctx.lineTo(52, 9.5);
      ctx.stroke();
      // Barrel ends
      ctx.fillStyle = '#333';
      ctx.fillRect(51, 4, 1, 5);
      ctx.fillRect(51, 10, 1, 5);
      // Front bead sight
      ctx.fillStyle = '#ccc';
      ctx.beginPath();
      ctx.arc(50, 3, 1, 0, Math.PI * 2);
      ctx.fill();
      // Forend wood
      const forendGrad = ctx.createLinearGradient(0, 0, 0, 6);
      forendGrad.addColorStop(0, '#7B5226');
      forendGrad.addColorStop(1, '#5B3216');
      ctx.fillStyle = forendGrad;
      ctx.fillRect(26, 15, 12, 5);
      // Barrel highlights
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.fillRect(22, 4, 28, 1);
      ctx.fillRect(22, 10, 28, 1);
      // Trigger guard
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(15, 15);
      ctx.quadraticCurveTo(20, 19, 15, 20);
      ctx.stroke();
      // Triggers (double)
      ctx.fillStyle = '#444';
      ctx.fillRect(16, 14, 1.5, 3);
      ctx.fillRect(18, 14, 1.5, 3);
    });

    // SMG — 44x22 compact SMG with drum magazine, short barrel
    this._ctw('weapon_smg', 44, 22, (ctx) => {
      // Stock (wire folding)
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.lineTo(4, 5);
      ctx.lineTo(4, 14);
      ctx.lineTo(0, 14);
      ctx.stroke();
      // Receiver
      const bodyGrad = ctx.createLinearGradient(0, 0, 0, 10);
      bodyGrad.addColorStop(0, '#666');
      bodyGrad.addColorStop(0.5, '#555');
      bodyGrad.addColorStop(1, '#444');
      ctx.fillStyle = bodyGrad;
      ctx.fillRect(4, 3, 22, 10);
      // Barrel shroud with holes
      ctx.fillStyle = '#555';
      ctx.fillRect(26, 4, 14, 7);
      // Cooling holes
      ctx.fillStyle = '#333';
      for (let i = 28; i < 39; i += 3) {
        ctx.beginPath();
        ctx.arc(i, 7.5, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      // Barrel extension
      ctx.fillStyle = '#4a4a4a';
      ctx.fillRect(40, 5, 4, 5);
      // Barrel end
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(43, 7.5, 1.5, 0, Math.PI * 2);
      ctx.fill();
      // Drum magazine
      ctx.fillStyle = '#4a4a4a';
      const drumGrad = ctx.createRadialGradient(16, 17, 1, 16, 17, 6);
      drumGrad.addColorStop(0, '#555');
      drumGrad.addColorStop(0.5, '#444');
      drumGrad.addColorStop(1, '#333');
      ctx.fillStyle = drumGrad;
      ctx.beginPath();
      ctx.arc(16, 17, 5, 0, Math.PI * 2);
      ctx.fill();
      // Drum detail
      ctx.strokeStyle = 'rgba(0,0,0,0.25)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(16, 17, 3, 0, Math.PI * 2);
      ctx.stroke();
      // Charging handle
      ctx.fillStyle = '#666';
      ctx.fillRect(8, 2, 6, 2);
      // Front sight
      ctx.fillStyle = '#666';
      ctx.fillRect(38, 2, 2, 3);
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(5, 3, 20, 1);
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(16, 12, 2, 3);
    });

    // Crossbow — 50x28
    this._ctw('weapon_crossbow', 50, 28, (ctx) => {
      // Stock
      const stockGrad = ctx.createLinearGradient(0, 0, 0, 10);
      stockGrad.addColorStop(0, '#8B6226');
      stockGrad.addColorStop(0.5, '#6B4226');
      stockGrad.addColorStop(1, '#5B3216');
      ctx.fillStyle = stockGrad;
      ctx.fillRect(0, 11, 16, 8);
      // Wood grain
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(1, 13); ctx.quadraticCurveTo(8, 12, 15, 14);
      ctx.stroke();
      // Tiller/rail (bolt groove)
      ctx.fillStyle = '#555';
      ctx.fillRect(16, 12, 30, 6);
      // Bolt groove channel
      ctx.fillStyle = '#444';
      ctx.fillRect(16, 14, 30, 2);
      // Bow arms (prod) - top
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(40, 14);
      ctx.quadraticCurveTo(50, 3, 46, 0);
      ctx.stroke();
      // Bow arms (prod) - bottom
      ctx.beginPath();
      ctx.moveTo(40, 16);
      ctx.quadraticCurveTo(50, 27, 46, 28);
      ctx.stroke();
      // Bowstring - top
      ctx.strokeStyle = '#aaa';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(46, 0);
      ctx.lineTo(36, 14);
      ctx.stroke();
      // Bowstring - bottom
      ctx.beginPath();
      ctx.moveTo(46, 28);
      ctx.lineTo(36, 16);
      ctx.stroke();
      // Stirrup (front)
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(42, 10);
      ctx.lineTo(42, 20);
      ctx.stroke();
      // Trigger mechanism
      ctx.fillStyle = '#666';
      ctx.fillRect(18, 18, 6, 4);
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(20, 21, 2, 4);
      // Loaded bolt
      ctx.fillStyle = '#5a4030';
      ctx.fillRect(18, 14.3, 18, 1.4);
      ctx.fillStyle = '#888';
      ctx.beginPath();
      ctx.moveTo(35, 13.8);
      ctx.lineTo(37, 15);
      ctx.lineTo(35, 16.2);
      ctx.closePath();
      ctx.fill();
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(16, 12, 28, 1);
    });

    // Lever-action rifle — 54x18
    this._ctw('weapon_lever_rifle', 54, 18, (ctx) => {
      // Stock
      const stockGrad = ctx.createLinearGradient(0, 0, 0, 12);
      stockGrad.addColorStop(0, '#8B6226');
      stockGrad.addColorStop(0.5, '#6B4226');
      stockGrad.addColorStop(1, '#5B3216');
      ctx.fillStyle = stockGrad;
      ctx.fillRect(0, 4, 16, 10);
      // Cheek rest curve
      ctx.fillStyle = '#7B5226';
      ctx.beginPath();
      ctx.moveTo(0, 4);
      ctx.quadraticCurveTo(3, 1, 8, 4);
      ctx.fill();
      // Wood grain
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(1, 7); ctx.quadraticCurveTo(8, 6, 15, 8);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(1, 11); ctx.quadraticCurveTo(8, 12, 15, 10);
      ctx.stroke();
      // Receiver
      const recvGrad = ctx.createLinearGradient(0, 0, 0, 10);
      recvGrad.addColorStop(0, '#666');
      recvGrad.addColorStop(1, '#444');
      ctx.fillStyle = recvGrad;
      ctx.fillRect(16, 4, 12, 10);
      // Barrel
      ctx.fillStyle = '#555';
      ctx.fillRect(28, 5, 26, 5);
      // Barrel end
      ctx.fillStyle = '#333';
      ctx.fillRect(53, 5, 1, 5);
      // Magazine tube under barrel
      ctx.fillStyle = '#4a4a4a';
      ctx.fillRect(28, 10, 22, 3);
      // Lever loop (distinctive feature)
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(18, 14);
      ctx.quadraticCurveTo(26, 18, 28, 14);
      ctx.quadraticCurveTo(28, 10, 24, 10);
      ctx.stroke();
      // Fill lever loop inside
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(18, 14);
      ctx.quadraticCurveTo(23, 17, 27, 14);
      ctx.stroke();
      // Front sight
      ctx.fillStyle = '#666';
      ctx.fillRect(50, 3, 2, 3);
      // Rear sight
      ctx.fillStyle = '#666';
      ctx.fillRect(20, 2, 4, 3);
      // Barrel highlight
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.fillRect(28, 5, 24, 1);
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(21, 13, 2, 3);
    });

    // Hunting rifle — 62x18 with scope, wood stock
    this._ctw('weapon_hunting_rifle', 62, 18, (ctx) => {
      // Stock (elegant wood)
      const stockGrad = ctx.createLinearGradient(0, 0, 0, 12);
      stockGrad.addColorStop(0, '#9B7236');
      stockGrad.addColorStop(0.3, '#7B5226');
      stockGrad.addColorStop(0.7, '#6B4226');
      stockGrad.addColorStop(1, '#5B3216');
      ctx.fillStyle = stockGrad;
      ctx.fillRect(0, 5, 20, 9);
      // Monte Carlo cheek rest
      ctx.fillStyle = '#8B6226';
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.quadraticCurveTo(4, 1, 12, 3);
      ctx.lineTo(12, 5);
      ctx.fill();
      // Wood grain
      ctx.strokeStyle = 'rgba(0,0,0,0.12)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(1, 8); ctx.quadraticCurveTo(10, 7, 19, 9);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(1, 12); ctx.quadraticCurveTo(10, 13, 19, 11);
      ctx.stroke();
      // Checkering on grip area
      ctx.strokeStyle = 'rgba(0,0,0,0.1)';
      ctx.lineWidth = 0.4;
      for (let i = 12; i < 20; i += 1.5) {
        ctx.beginPath();
        ctx.moveTo(i, 10); ctx.lineTo(i + 2, 14);
        ctx.stroke();
      }
      // Receiver
      const recvGrad = ctx.createLinearGradient(0, 0, 0, 9);
      recvGrad.addColorStop(0, '#555');
      recvGrad.addColorStop(1, '#444');
      ctx.fillStyle = recvGrad;
      ctx.fillRect(20, 5, 10, 9);
      // Bolt handle
      ctx.fillStyle = '#666';
      ctx.fillRect(24, 3, 3, 3);
      ctx.beginPath();
      ctx.arc(27, 4, 1.5, 0, Math.PI * 2);
      ctx.fill();
      // Barrel — long and slender
      const barrelGrad = ctx.createLinearGradient(0, 0, 0, 4);
      barrelGrad.addColorStop(0, '#666');
      barrelGrad.addColorStop(1, '#444');
      ctx.fillStyle = barrelGrad;
      ctx.fillRect(30, 6, 32, 4);
      // Barrel end
      ctx.fillStyle = '#333';
      ctx.fillRect(61, 6, 1, 4);
      // Scope mount
      ctx.fillStyle = '#555';
      ctx.fillRect(26, 3, 16, 3);
      // Scope body
      ctx.fillStyle = '#333';
      ctx.fillRect(28, 0, 14, 4);
      // Scope lenses
      ctx.fillStyle = '#226';
      ctx.beginPath();
      ctx.arc(28, 2, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(42, 2, 2, 0, Math.PI * 2);
      ctx.fill();
      // Lens glint
      ctx.fillStyle = 'rgba(100,150,255,0.35)';
      ctx.beginPath();
      ctx.arc(42, 1.5, 1, 0, Math.PI * 2);
      ctx.fill();
      // Scope turret
      ctx.fillStyle = '#444';
      ctx.fillRect(34, 0, 3, 2);
      // Barrel highlight
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.fillRect(30, 6, 30, 1);
      // Trigger guard
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(22, 14);
      ctx.quadraticCurveTo(28, 18, 22, 18);
      ctx.stroke();
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(24, 13, 2, 3);
    });

    // Auto shotgun — 52x22 semi-auto, box magazine
    this._ctw('weapon_auto_shotgun', 52, 22, (ctx) => {
      // Stock (polymer)
      const stockGrad = ctx.createLinearGradient(0, 0, 0, 12);
      stockGrad.addColorStop(0, '#555');
      stockGrad.addColorStop(0.5, '#444');
      stockGrad.addColorStop(1, '#333');
      ctx.fillStyle = stockGrad;
      ctx.fillRect(0, 4, 14, 12);
      // Stock texture
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 0.5;
      for (let i = 2; i < 14; i += 2.5) {
        ctx.beginPath();
        ctx.moveTo(i, 5); ctx.lineTo(i, 15);
        ctx.stroke();
      }
      // Receiver
      const recvGrad = ctx.createLinearGradient(0, 0, 0, 12);
      recvGrad.addColorStop(0, '#666');
      recvGrad.addColorStop(1, '#444');
      ctx.fillStyle = recvGrad;
      ctx.fillRect(14, 4, 12, 12);
      // Charging handle
      ctx.fillStyle = '#777';
      ctx.fillRect(18, 3, 5, 2);
      // Barrel
      ctx.fillStyle = '#555';
      ctx.fillRect(26, 4, 26, 6);
      // Barrel end
      ctx.fillStyle = '#333';
      ctx.fillRect(51, 4, 1, 6);
      // Gas tube above barrel
      ctx.fillStyle = '#4a4a4a';
      ctx.fillRect(26, 2, 20, 3);
      // Box magazine
      ctx.fillStyle = '#444';
      ctx.fillRect(16, 16, 10, 6);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 0.7;
      ctx.strokeRect(16, 16, 10, 6);
      // Magazine ridges
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      for (let i = 18; i < 26; i += 2.5) {
        ctx.beginPath();
        ctx.moveTo(i, 16); ctx.lineTo(i, 22);
        ctx.stroke();
      }
      // Barrel highlight
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.fillRect(26, 4, 24, 1);
      // Front sight
      ctx.fillStyle = '#666';
      ctx.fillRect(48, 1, 2, 4);
      // Trigger guard
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(16, 15);
      ctx.quadraticCurveTo(22, 18, 16, 18);
      ctx.stroke();
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(19, 14, 2, 3);
    });

    // Sniper rifle — 68x18 long sniper with large scope, bipod hints
    this._ctw('weapon_sniper', 68, 18, (ctx) => {
      // Stock (thumbhole)
      const stockGrad = ctx.createLinearGradient(0, 0, 0, 12);
      stockGrad.addColorStop(0, '#555');
      stockGrad.addColorStop(0.5, '#444');
      stockGrad.addColorStop(1, '#333');
      ctx.fillStyle = stockGrad;
      ctx.fillRect(0, 4, 18, 10);
      // Thumbhole cutout
      ctx.fillStyle = '#222';
      ctx.beginPath();
      ctx.ellipse(12, 11, 3, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
      // Cheek rest
      ctx.fillStyle = '#4a4a4a';
      ctx.beginPath();
      ctx.moveTo(0, 4);
      ctx.quadraticCurveTo(4, 1, 10, 4);
      ctx.fill();
      // Receiver
      const recvGrad = ctx.createLinearGradient(0, 0, 0, 9);
      recvGrad.addColorStop(0, '#666');
      recvGrad.addColorStop(1, '#444');
      ctx.fillStyle = recvGrad;
      ctx.fillRect(18, 4, 12, 10);
      // Magazine
      ctx.fillStyle = '#444';
      ctx.fillRect(22, 14, 8, 4);
      // Bolt handle
      ctx.fillStyle = '#666';
      ctx.fillRect(22, 2, 4, 3);
      ctx.beginPath();
      ctx.arc(26, 3, 1.5, 0, Math.PI * 2);
      ctx.fill();
      // Long barrel
      const barrelGrad = ctx.createLinearGradient(0, 0, 0, 4);
      barrelGrad.addColorStop(0, '#666');
      barrelGrad.addColorStop(1, '#444');
      ctx.fillStyle = barrelGrad;
      ctx.fillRect(30, 5, 34, 4);
      // Fluted barrel detail
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 0.5;
      for (let i = 35; i < 60; i += 3) {
        ctx.beginPath();
        ctx.moveTo(i, 5); ctx.lineTo(i, 9);
        ctx.stroke();
      }
      // Muzzle brake
      ctx.fillStyle = '#555';
      ctx.fillRect(64, 4, 4, 6);
      ctx.fillStyle = '#333';
      ctx.fillRect(65, 5, 1, 1.5);
      ctx.fillRect(65, 7.5, 1, 1.5);
      // Scope mount rail
      ctx.fillStyle = '#555';
      ctx.fillRect(22, 2, 22, 3);
      // Large scope body
      ctx.fillStyle = '#333';
      ctx.fillRect(24, -1, 20, 5);
      // Scope objective lens (large)
      ctx.fillStyle = '#226';
      ctx.beginPath();
      ctx.arc(44, 1.5, 3, 0, Math.PI * 2);
      ctx.fill();
      // Scope eyepiece
      ctx.fillStyle = '#226';
      ctx.beginPath();
      ctx.arc(24, 1.5, 2.5, 0, Math.PI * 2);
      ctx.fill();
      // Scope lens glint
      ctx.fillStyle = 'rgba(100,150,255,0.35)';
      ctx.beginPath();
      ctx.arc(44, 1, 1.5, 0, Math.PI * 2);
      ctx.fill();
      // Scope turrets
      ctx.fillStyle = '#444';
      ctx.fillRect(32, -2, 3, 2);
      ctx.fillRect(36, -2, 3, 2);
      // Bipod hints (folded)
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(48, 9);
      ctx.lineTo(50, 14);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(52, 9);
      ctx.lineTo(54, 14);
      ctx.stroke();
      // Barrel highlight
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(30, 5, 32, 1);
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(24, 13, 2, 3);
    });

    // Flamethrower — 58x26 boxy fuel tank on back, nozzle in front
    this._ctw('weapon_flamethrower', 58, 26, (ctx) => {
      // Fuel tank (rear, large boxy)
      const tankGrad = ctx.createLinearGradient(0, 0, 0, 18);
      tankGrad.addColorStop(0, '#6B8E3F');
      tankGrad.addColorStop(0.5, '#556B2F');
      tankGrad.addColorStop(1, '#3A4B1A');
      ctx.fillStyle = tankGrad;
      ctx.beginPath();
      ctx.roundRect(0, 2, 18, 20, 2);
      ctx.fill();
      // Tank straps
      ctx.strokeStyle = '#444';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(3, 2); ctx.lineTo(3, 22);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(15, 2); ctx.lineTo(15, 22);
      ctx.stroke();
      // Tank label/marking
      ctx.fillStyle = 'rgba(200,0,0,0.3)';
      ctx.fillRect(6, 8, 6, 6);
      // Connecting hose
      ctx.strokeStyle = '#444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(18, 10);
      ctx.quadraticCurveTo(22, 6, 26, 8);
      ctx.stroke();
      // Main body/igniter housing
      const bodyGrad = ctx.createLinearGradient(0, 0, 0, 14);
      bodyGrad.addColorStop(0, '#666');
      bodyGrad.addColorStop(1, '#444');
      ctx.fillStyle = bodyGrad;
      ctx.fillRect(24, 5, 14, 12);
      // Grip
      ctx.fillStyle = '#555';
      ctx.fillRect(26, 17, 8, 8);
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 0.5;
      for (let i = 19; i < 25; i += 2) {
        ctx.beginPath();
        ctx.moveTo(27, i); ctx.lineTo(33, i);
        ctx.stroke();
      }
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(30, 16, 2, 3);
      // Nozzle tube
      ctx.fillStyle = '#555';
      ctx.fillRect(38, 7, 16, 6);
      // Nozzle tip (wider)
      const nozGrad = ctx.createLinearGradient(54, 0, 58, 0);
      nozGrad.addColorStop(0, '#555');
      nozGrad.addColorStop(1, '#666');
      ctx.fillStyle = nozGrad;
      ctx.fillRect(54, 5, 4, 10);
      // Nozzle opening
      ctx.fillStyle = '#333';
      ctx.fillRect(57, 6, 1, 8);
      // Pilot light
      ctx.fillStyle = '#ff8800';
      ctx.beginPath();
      ctx.arc(57, 6, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffcc44';
      ctx.beginPath();
      ctx.arc(57, 6, 0.8, 0, Math.PI * 2);
      ctx.fill();
      // Pressure gauge
      ctx.strokeStyle = '#888';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(30, 8, 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#aa0000';
      ctx.beginPath();
      ctx.moveTo(30, 8);
      ctx.lineTo(31, 7);
      ctx.stroke();
      // Highlights
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(1, 3, 16, 2);
      ctx.fillRect(38, 7, 14, 1);
    });

    // Grenade launcher — 48x24 tubular launcher, thick barrel
    this._ctw('weapon_grenade_launcher', 48, 24, (ctx) => {
      // Stock (polymer)
      const stockGrad = ctx.createLinearGradient(0, 0, 0, 12);
      stockGrad.addColorStop(0, '#555');
      stockGrad.addColorStop(0.5, '#444');
      stockGrad.addColorStop(1, '#333');
      ctx.fillStyle = stockGrad;
      ctx.fillRect(0, 5, 12, 12);
      // Receiver
      const recvGrad = ctx.createLinearGradient(0, 0, 0, 12);
      recvGrad.addColorStop(0, '#666');
      recvGrad.addColorStop(1, '#444');
      ctx.fillStyle = recvGrad;
      ctx.fillRect(12, 4, 10, 14);
      // Thick barrel (oversized for grenades)
      const barrelGrad = ctx.createLinearGradient(0, 0, 0, 12);
      barrelGrad.addColorStop(0, '#666');
      barrelGrad.addColorStop(0.5, '#555');
      barrelGrad.addColorStop(1, '#4a4a4a');
      ctx.fillStyle = barrelGrad;
      ctx.fillRect(22, 3, 24, 12);
      // Barrel ridges
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 0.8;
      for (let i = 26; i < 44; i += 4) {
        ctx.beginPath();
        ctx.moveTo(i, 3); ctx.lineTo(i, 15);
        ctx.stroke();
      }
      // Barrel end (wide bore)
      ctx.fillStyle = '#444';
      ctx.fillRect(46, 2, 2, 14);
      ctx.fillStyle = '#222';
      ctx.beginPath();
      ctx.arc(47, 9, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(47, 9, 3, 0, Math.PI * 2);
      ctx.fill();
      // Foregrip
      ctx.fillStyle = '#555';
      ctx.fillRect(28, 15, 8, 7);
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 0.5;
      for (let i = 17; i < 22; i += 2) {
        ctx.beginPath();
        ctx.moveTo(29, i); ctx.lineTo(35, i);
        ctx.stroke();
      }
      // Simple sight
      ctx.fillStyle = '#666';
      ctx.fillRect(22, 0, 3, 4);
      ctx.fillStyle = '#777';
      ctx.fillRect(22.5, 0, 2, 2);
      // Trigger guard
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(14, 17);
      ctx.quadraticCurveTo(20, 22, 14, 22);
      ctx.stroke();
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(17, 16, 2, 3);
      // Barrel highlight
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(22, 3, 22, 1.5);
    });

    // Assault rifle — 54x20 modern assault rifle with magazine, rail
    this._ctw('weapon_assault_rifle', 54, 20, (ctx) => {
      // Stock (telescoping)
      const stockGrad = ctx.createLinearGradient(0, 0, 0, 10);
      stockGrad.addColorStop(0, '#555');
      stockGrad.addColorStop(1, '#333');
      ctx.fillStyle = stockGrad;
      ctx.fillRect(0, 4, 12, 10);
      // Buffer tube
      ctx.fillStyle = '#4a4a4a';
      ctx.fillRect(10, 6, 6, 5);
      // Upper receiver
      const upperGrad = ctx.createLinearGradient(0, 0, 0, 7);
      upperGrad.addColorStop(0, '#666');
      upperGrad.addColorStop(1, '#444');
      ctx.fillStyle = upperGrad;
      ctx.fillRect(16, 4, 16, 7);
      // Lower receiver
      ctx.fillStyle = '#555';
      ctx.fillRect(16, 11, 14, 5);
      // Picatinny rail on top
      ctx.fillStyle = '#555';
      ctx.fillRect(16, 2, 22, 3);
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 0.5;
      for (let i = 17; i < 37; i += 1.5) {
        ctx.beginPath();
        ctx.moveTo(i, 2); ctx.lineTo(i, 5);
        ctx.stroke();
      }
      // Barrel with handguard
      ctx.fillStyle = '#555';
      ctx.fillRect(32, 4, 18, 7);
      // Handguard vents
      ctx.fillStyle = '#333';
      for (let i = 34; i < 48; i += 3.5) {
        ctx.fillRect(i, 6, 1.5, 3);
      }
      // Barrel extension
      ctx.fillStyle = '#4a4a4a';
      ctx.fillRect(50, 5, 4, 5);
      // Barrel end / muzzle
      ctx.fillStyle = '#333';
      ctx.fillRect(53, 5, 1, 5);
      // Flash hider
      ctx.fillStyle = '#555';
      ctx.fillRect(52, 4, 2, 7);
      // Curved magazine
      ctx.fillStyle = '#444';
      ctx.beginPath();
      ctx.moveTo(22, 16);
      ctx.lineTo(30, 16);
      ctx.lineTo(28, 20);
      ctx.lineTo(20, 20);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 0.7;
      ctx.stroke();
      // Charging handle
      ctx.fillStyle = '#666';
      ctx.fillRect(16, 3, 4, 2);
      // Ejection port
      ctx.fillStyle = '#333';
      ctx.fillRect(22, 5, 4, 3);
      // Foregrip
      ctx.fillStyle = '#555';
      ctx.fillRect(38, 11, 6, 6);
      // Front sight
      ctx.fillStyle = '#666';
      ctx.fillRect(48, 1, 2, 4);
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(24, 14, 2, 3);
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(16, 4, 16, 1);
    });

    // Heavy MG — 60x26 heavy MG, belt-fed, big barrel
    this._ctw('weapon_heavy_mg', 60, 26, (ctx) => {
      // Receiver (boxy, large)
      const bodyGrad = ctx.createLinearGradient(0, 0, 0, 14);
      bodyGrad.addColorStop(0, '#666');
      bodyGrad.addColorStop(0.5, '#555');
      bodyGrad.addColorStop(1, '#444');
      ctx.fillStyle = bodyGrad;
      ctx.fillRect(8, 3, 24, 14);
      // Stock (skeletal)
      ctx.fillStyle = '#555';
      ctx.fillRect(0, 5, 10, 4);
      ctx.fillRect(0, 12, 10, 4);
      ctx.fillStyle = '#4a4a4a';
      ctx.fillRect(0, 9, 10, 3);
      // Carry handle
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(14, 3);
      ctx.quadraticCurveTo(20, -1, 26, 3);
      ctx.stroke();
      // Heavy barrel
      ctx.fillStyle = '#555';
      ctx.fillRect(32, 4, 24, 8);
      // Barrel jacket/perforations
      ctx.fillStyle = '#333';
      for (let i = 36; i < 54; i += 3.5) {
        ctx.beginPath();
        ctx.arc(i, 8, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      // Muzzle brake
      ctx.fillStyle = '#555';
      ctx.fillRect(56, 3, 4, 10);
      ctx.fillStyle = '#333';
      ctx.fillRect(57, 4, 1, 2);
      ctx.fillRect(57, 8, 1, 2);
      ctx.fillRect(57, 10, 1, 2);
      // Ammo box
      ctx.fillStyle = '#556B2F';
      ctx.fillRect(10, 17, 16, 9);
      ctx.strokeStyle = '#444';
      ctx.lineWidth = 0.8;
      ctx.strokeRect(10, 17, 16, 9);
      // Ammo belt feed
      ctx.fillStyle = '#cc9900';
      ctx.fillRect(18, 14, 4, 4);
      ctx.fillRect(22, 13, 4, 3);
      ctx.fillStyle = '#ddaa00';
      ctx.fillRect(18, 14, 3, 3);
      ctx.fillRect(22, 13, 3, 2);
      // Feed cover
      ctx.fillStyle = '#666';
      ctx.fillRect(16, 3, 12, 2);
      // Tripod hints (front legs)
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(40, 12);
      ctx.lineTo(36, 24);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(44, 12);
      ctx.lineTo(48, 24);
      ctx.stroke();
      // Bipod feet
      ctx.fillStyle = '#555';
      ctx.fillRect(34, 23, 4, 3);
      ctx.fillRect(46, 23, 4, 3);
      // Barrel highlight
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(32, 4, 22, 1);
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(18, 16, 2, 3);
      // Pistol grip
      ctx.fillStyle = '#555';
      ctx.fillRect(14, 16, 6, 8);
    });

    // Laser rifle — 58x18 futuristic, smooth lines, glowing barrel tip
    this._ctw('weapon_laser_rifle', 58, 18, (ctx) => {
      // Stock (smooth, futuristic)
      const stockGrad = ctx.createLinearGradient(0, 0, 0, 10);
      stockGrad.addColorStop(0, '#555');
      stockGrad.addColorStop(0.5, '#444');
      stockGrad.addColorStop(1, '#3a3a3a');
      ctx.fillStyle = stockGrad;
      ctx.beginPath();
      ctx.roundRect(0, 5, 16, 8, 2);
      ctx.fill();
      // Body (sleek)
      const bodyGrad = ctx.createLinearGradient(0, 0, 0, 10);
      bodyGrad.addColorStop(0, '#777');
      bodyGrad.addColorStop(0.5, '#666');
      bodyGrad.addColorStop(1, '#555');
      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.roundRect(14, 4, 20, 10, 2);
      ctx.fill();
      // Energy cell
      ctx.fillStyle = '#336';
      ctx.beginPath();
      ctx.roundRect(18, 14, 8, 4, 1);
      ctx.fill();
      ctx.fillStyle = 'rgba(100,150,255,0.3)';
      ctx.fillRect(19, 15, 6, 2);
      // Barrel — smooth tube
      const barrelGrad = ctx.createLinearGradient(0, 0, 0, 6);
      barrelGrad.addColorStop(0, '#777');
      barrelGrad.addColorStop(1, '#555');
      ctx.fillStyle = barrelGrad;
      ctx.beginPath();
      ctx.roundRect(34, 6, 20, 6, 1);
      ctx.fill();
      // Heat fins
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 0.7;
      for (let i = 38; i < 52; i += 3) {
        ctx.beginPath();
        ctx.moveTo(i, 6); ctx.lineTo(i, 12);
        ctx.stroke();
      }
      // Glowing barrel tip
      ctx.fillStyle = '#ff3344';
      ctx.beginPath();
      ctx.roundRect(54, 5, 4, 8, 1);
      ctx.fill();
      // Barrel tip glow
      ctx.fillStyle = 'rgba(255,50,50,0.3)';
      ctx.beginPath();
      ctx.arc(56, 9, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,100,100,0.5)';
      ctx.beginPath();
      ctx.arc(56, 9, 3, 0, Math.PI * 2);
      ctx.fill();
      // Lens/emitter
      ctx.fillStyle = '#ff6666';
      ctx.beginPath();
      ctx.arc(57, 9, 1.5, 0, Math.PI * 2);
      ctx.fill();
      // Top rail
      ctx.fillStyle = '#555';
      ctx.fillRect(16, 2, 18, 3);
      // Optic
      ctx.fillStyle = '#444';
      ctx.beginPath();
      ctx.roundRect(22, 0, 10, 4, 1);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,50,50,0.3)';
      ctx.beginPath();
      ctx.arc(32, 2, 1.5, 0, Math.PI * 2);
      ctx.fill();
      // Body accents
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.fillRect(15, 4, 18, 1);
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(22, 13, 2, 3);
    });

    // Minigun — 56x28 multi-barrel rotary gun, motor housing
    this._ctw('weapon_minigun', 56, 28, (ctx) => {
      // Motor housing (rear cylinder)
      const motorGrad = ctx.createLinearGradient(0, 0, 0, 18);
      motorGrad.addColorStop(0, '#666');
      motorGrad.addColorStop(0.5, '#555');
      motorGrad.addColorStop(1, '#444');
      ctx.fillStyle = motorGrad;
      ctx.beginPath();
      ctx.ellipse(8, 14, 7, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      // Motor detail
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.arc(8, 14, 5, 0, Math.PI * 2);
      ctx.stroke();
      // Drive shaft housing
      ctx.fillStyle = '#555';
      ctx.fillRect(14, 8, 8, 12);
      // Multiple barrels (6 barrels in a circle pattern)
      const barrelOffsets = [
        { y: 8 }, { y: 11 }, { y: 14 },
        { y: 17 }, { y: 20 }, { y: 5 }
      ];
      barrelOffsets.forEach((b) => {
        const bGrad = ctx.createLinearGradient(22, 0, 56, 0);
        bGrad.addColorStop(0, '#666');
        bGrad.addColorStop(1, '#555');
        ctx.fillStyle = bGrad;
        ctx.fillRect(22, b.y, 32, 2);
        // Barrel end
        ctx.fillStyle = '#333';
        ctx.fillRect(53, b.y, 1, 2);
      });
      // Barrel clamp ring - front
      ctx.fillStyle = '#666';
      ctx.fillRect(46, 4, 3, 20);
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(46, 4, 3, 20);
      // Barrel clamp ring - rear
      ctx.fillStyle = '#666';
      ctx.fillRect(28, 4, 3, 20);
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.strokeRect(28, 4, 3, 20);
      // Muzzle flash suppressor ring
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(54, 13, 8, 0, Math.PI * 2);
      ctx.stroke();
      // Handle/grip top
      ctx.fillStyle = '#555';
      ctx.fillRect(18, 0, 10, 5);
      ctx.fillStyle = '#444';
      ctx.fillRect(20, 1, 6, 3);
      // Grip bottom
      ctx.fillStyle = '#555';
      ctx.fillRect(14, 22, 8, 6);
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      for (let i = 24; i < 28; i += 2) {
        ctx.beginPath();
        ctx.moveTo(15, i); ctx.lineTo(21, i);
        ctx.stroke();
      }
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(17, 21, 2, 3);
      // Ammo feed
      ctx.fillStyle = '#cc9900';
      ctx.fillRect(10, 22, 4, 4);
      ctx.fillStyle = '#ddaa00';
      ctx.fillRect(10, 22, 3, 3);
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.fillRect(22, 8, 30, 1);
      ctx.fillRect(22, 14, 30, 1);
    });

    // RPG launcher — 64x26 wider tube than rocket launcher
    this._ctw('weapon_rpg', 64, 26, (ctx) => {
      // Main tube (wider)
      const tubeGrad = ctx.createLinearGradient(0, 2, 0, 22);
      tubeGrad.addColorStop(0, '#6B8E3F');
      tubeGrad.addColorStop(0.3, '#556B2F');
      tubeGrad.addColorStop(0.7, '#4A5B25');
      tubeGrad.addColorStop(1, '#3A4B1A');
      ctx.fillStyle = tubeGrad;
      ctx.beginPath();
      ctx.roundRect(6, 2, 52, 22, 4);
      ctx.fill();
      // Rear exhaust (flared)
      ctx.fillStyle = '#555';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(7, 3);
      ctx.lineTo(7, 23);
      ctx.lineTo(0, 26);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#333';
      ctx.fillRect(0, 3, 3, 20);
      // Exhaust vents
      ctx.fillStyle = '#222';
      ctx.fillRect(1, 5, 2, 3);
      ctx.fillRect(1, 11, 2, 3);
      ctx.fillRect(1, 17, 2, 3);
      // Front opening (larger)
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(60, 13, 9, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#4a5a2a';
      ctx.beginPath();
      ctx.arc(60, 13, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(60, 13, 4, 0, Math.PI * 2);
      ctx.fill();
      // Warhead visible inside
      ctx.fillStyle = '#aa5500';
      ctx.beginPath();
      ctx.arc(60, 13, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#dd6600';
      ctx.beginPath();
      ctx.arc(60, 13, 1.5, 0, Math.PI * 2);
      ctx.fill();
      // Pistol grip
      ctx.fillStyle = '#555';
      ctx.fillRect(22, 22, 10, 4);
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 0.5;
      for (let i = 24; i < 32; i += 2.5) {
        ctx.beginPath();
        ctx.moveTo(i, 22); ctx.lineTo(i, 26);
        ctx.stroke();
      }
      // Trigger
      ctx.fillStyle = '#333';
      ctx.fillRect(27, 21, 2, 3);
      // Fore grip
      ctx.fillStyle = '#555';
      ctx.fillRect(38, 22, 8, 4);
      // Sight (larger)
      ctx.fillStyle = '#555';
      ctx.fillRect(28, -1, 14, 4);
      ctx.fillStyle = '#444';
      ctx.fillRect(30, 0, 10, 2);
      // Sight posts
      ctx.fillStyle = '#666';
      ctx.fillRect(28, -2, 2, 3);
      ctx.fillRect(40, -2, 2, 3);
      // Band details
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(16, 2); ctx.lineTo(16, 24);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(42, 2); ctx.lineTo(42, 24);
      ctx.stroke();
      // Tube highlight
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(7, 3, 48, 3);
    });

    // Railgun — 66x20 sci-fi railgun, two parallel rails, energy coils
    this._ctw('weapon_railgun', 66, 20, (ctx) => {
      // Stock (futuristic)
      const stockGrad = ctx.createLinearGradient(0, 0, 0, 12);
      stockGrad.addColorStop(0, '#555');
      stockGrad.addColorStop(0.5, '#444');
      stockGrad.addColorStop(1, '#333');
      ctx.fillStyle = stockGrad;
      ctx.beginPath();
      ctx.roundRect(0, 5, 14, 10, 2);
      ctx.fill();
      // Main housing
      const bodyGrad = ctx.createLinearGradient(0, 0, 0, 12);
      bodyGrad.addColorStop(0, '#666');
      bodyGrad.addColorStop(0.5, '#555');
      bodyGrad.addColorStop(1, '#444');
      ctx.fillStyle = bodyGrad;
      ctx.fillRect(12, 4, 16, 12);
      // Top rail
      ctx.fillStyle = '#777';
      ctx.fillRect(28, 3, 36, 3);
      // Bottom rail
      ctx.fillStyle = '#777';
      ctx.fillRect(28, 14, 36, 3);
      // Energy coils along rails
      for (let i = 30; i < 62; i += 6) {
        // Top coil
        ctx.fillStyle = '#556';
        ctx.fillRect(i, 1, 4, 4);
        ctx.fillStyle = 'rgba(80,120,255,0.4)';
        ctx.fillRect(i + 0.5, 1.5, 3, 3);
        // Bottom coil
        ctx.fillStyle = '#556';
        ctx.fillRect(i, 15, 4, 4);
        ctx.fillStyle = 'rgba(80,120,255,0.4)';
        ctx.fillRect(i + 0.5, 15.5, 3, 3);
      }
      // Central channel (between rails)
      ctx.fillStyle = '#333';
      ctx.fillRect(28, 6, 36, 8);
      // Energy glow in channel
      const channelGrad = ctx.createLinearGradient(28, 0, 64, 0);
      channelGrad.addColorStop(0, 'rgba(50,100,255,0.1)');
      channelGrad.addColorStop(0.5, 'rgba(80,150,255,0.3)');
      channelGrad.addColorStop(1, 'rgba(100,200,255,0.5)');
      ctx.fillStyle = channelGrad;
      ctx.fillRect(28, 7, 36, 6);
      // Muzzle energy
      ctx.fillStyle = 'rgba(80,150,255,0.4)';
      ctx.beginPath();
      ctx.arc(66, 10, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(150,200,255,0.6)';
      ctx.beginPath();
      ctx.arc(66, 10, 2, 0, Math.PI * 2);
      ctx.fill();
      // Grip
      ctx.fillStyle = '#555';
      ctx.fillRect(16, 16, 8, 4);
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 0.5;
      for (let i = 17; i < 20; i += 1.5) {
        ctx.beginPath();
        ctx.moveTo(17, i); ctx.lineTo(23, i);
        ctx.stroke();
      }
      // Energy cell/battery
      ctx.fillStyle = '#336';
      ctx.beginPath();
      ctx.roundRect(6, 16, 8, 4, 1);
      ctx.fill();
      ctx.fillStyle = 'rgba(80,150,255,0.3)';
      ctx.fillRect(7, 17, 6, 2);
      // Scope/targeting
      ctx.fillStyle = '#444';
      ctx.fillRect(16, 1, 10, 4);
      ctx.fillStyle = 'rgba(80,150,255,0.3)';
      ctx.beginPath();
      ctx.arc(26, 3, 1.5, 0, Math.PI * 2);
      ctx.fill();
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(20, 15, 2, 3);
      // Rail highlights
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.fillRect(28, 3, 34, 0.5);
      ctx.fillRect(28, 16.5, 34, 0.5);
    });

    // Plasma cannon — 60x26 bulbous energy weapon, glowing chamber
    this._ctw('weapon_plasma_cannon', 60, 26, (ctx) => {
      // Stock/handle
      const stockGrad = ctx.createLinearGradient(0, 0, 0, 10);
      stockGrad.addColorStop(0, '#555');
      stockGrad.addColorStop(1, '#333');
      ctx.fillStyle = stockGrad;
      ctx.beginPath();
      ctx.roundRect(0, 6, 12, 10, 2);
      ctx.fill();
      // Main body
      const bodyGrad = ctx.createLinearGradient(0, 0, 0, 14);
      bodyGrad.addColorStop(0, '#666');
      bodyGrad.addColorStop(0.5, '#555');
      bodyGrad.addColorStop(1, '#444');
      ctx.fillStyle = bodyGrad;
      ctx.fillRect(10, 5, 16, 14);
      // Bulbous energy chamber
      const chamberGrad = ctx.createRadialGradient(36, 13, 2, 36, 13, 10);
      chamberGrad.addColorStop(0, 'rgba(150,80,255,0.6)');
      chamberGrad.addColorStop(0.3, '#555');
      chamberGrad.addColorStop(0.7, '#444');
      chamberGrad.addColorStop(1, '#333');
      ctx.fillStyle = chamberGrad;
      ctx.beginPath();
      ctx.ellipse(36, 13, 12, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      // Chamber glow
      const glowGrad = ctx.createRadialGradient(36, 13, 0, 36, 13, 6);
      glowGrad.addColorStop(0, 'rgba(200,100,255,0.7)');
      glowGrad.addColorStop(0.5, 'rgba(150,50,255,0.3)');
      glowGrad.addColorStop(1, 'rgba(100,0,200,0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(36, 13, 6, 0, Math.PI * 2);
      ctx.fill();
      // Energy swirls
      ctx.strokeStyle = 'rgba(200,150,255,0.4)';
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.arc(36, 13, 4, 0, Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(36, 13, 3, Math.PI, Math.PI * 2);
      ctx.stroke();
      // Barrel/emitter
      const emitGrad = ctx.createLinearGradient(46, 0, 60, 0);
      emitGrad.addColorStop(0, '#555');
      emitGrad.addColorStop(1, '#666');
      ctx.fillStyle = emitGrad;
      ctx.fillRect(46, 8, 10, 10);
      // Emitter tip
      ctx.fillStyle = '#777';
      ctx.fillRect(56, 7, 4, 12);
      // Emitter glow
      ctx.fillStyle = 'rgba(150,80,255,0.4)';
      ctx.beginPath();
      ctx.arc(59, 13, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(200,150,255,0.6)';
      ctx.beginPath();
      ctx.arc(59, 13, 2, 0, Math.PI * 2);
      ctx.fill();
      // Grip
      ctx.fillStyle = '#555';
      ctx.fillRect(14, 19, 8, 6);
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 0.5;
      for (let i = 21; i < 25; i += 2) {
        ctx.beginPath();
        ctx.moveTo(15, i); ctx.lineTo(21, i);
        ctx.stroke();
      }
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(18, 18, 2, 3);
      // Energy conduits
      ctx.strokeStyle = 'rgba(150,80,255,0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(24, 10);
      ctx.quadraticCurveTo(28, 13, 26, 16);
      ctx.stroke();
      // Top rail
      ctx.fillStyle = '#555';
      ctx.fillRect(12, 3, 14, 3);
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(11, 5, 14, 1);
    });

    // Gauss rifle — 62x20 magnetic rifle, coil sections along barrel
    this._ctw('weapon_gauss_rifle', 62, 20, (ctx) => {
      // Stock
      const stockGrad = ctx.createLinearGradient(0, 0, 0, 10);
      stockGrad.addColorStop(0, '#555');
      stockGrad.addColorStop(0.5, '#444');
      stockGrad.addColorStop(1, '#333');
      ctx.fillStyle = stockGrad;
      ctx.beginPath();
      ctx.roundRect(0, 5, 14, 10, 2);
      ctx.fill();
      // Receiver body
      const bodyGrad = ctx.createLinearGradient(0, 0, 0, 12);
      bodyGrad.addColorStop(0, '#666');
      bodyGrad.addColorStop(0.5, '#555');
      bodyGrad.addColorStop(1, '#444');
      ctx.fillStyle = bodyGrad;
      ctx.fillRect(12, 4, 14, 12);
      // Barrel core
      ctx.fillStyle = '#555';
      ctx.fillRect(26, 6, 34, 5);
      // Magnetic coil sections (distinctive feature)
      const coilColors = ['#556', '#446', '#556', '#446', '#556'];
      for (let i = 0; i < 5; i++) {
        const x = 28 + i * 7;
        ctx.fillStyle = coilColors[i];
        ctx.fillRect(x, 4, 5, 9);
        // Coil windings
        ctx.strokeStyle = 'rgba(100,150,255,0.3)';
        ctx.lineWidth = 0.5;
        for (let j = 0; j < 4; j++) {
          ctx.beginPath();
          ctx.moveTo(x + j * 1.3 + 0.5, 4);
          ctx.lineTo(x + j * 1.3 + 0.5, 13);
          ctx.stroke();
        }
        // Energy glow between coils
        ctx.fillStyle = 'rgba(80,150,255,0.2)';
        ctx.fillRect(x + 5, 7, 2, 3);
      }
      // Muzzle
      ctx.fillStyle = '#555';
      ctx.fillRect(60, 5, 2, 7);
      // Muzzle energy
      ctx.fillStyle = 'rgba(100,180,255,0.4)';
      ctx.beginPath();
      ctx.arc(62, 8.5, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(180,220,255,0.6)';
      ctx.beginPath();
      ctx.arc(62, 8.5, 1.5, 0, Math.PI * 2);
      ctx.fill();
      // Energy cell
      ctx.fillStyle = '#336';
      ctx.beginPath();
      ctx.roundRect(14, 16, 10, 4, 1);
      ctx.fill();
      ctx.fillStyle = 'rgba(80,150,255,0.4)';
      ctx.fillRect(15, 17, 8, 2);
      // Grip
      ctx.fillStyle = '#555';
      ctx.fillRect(16, 15, 8, 5);
      // Top rail and optic
      ctx.fillStyle = '#555';
      ctx.fillRect(14, 2, 16, 3);
      ctx.fillStyle = '#444';
      ctx.fillRect(18, 0, 8, 3);
      ctx.fillStyle = 'rgba(80,150,255,0.3)';
      ctx.beginPath();
      ctx.arc(26, 1.5, 1.5, 0, Math.PI * 2);
      ctx.fill();
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(20, 15, 2, 3);
      // Barrel highlight
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(26, 6, 32, 0.5);
    });

    // Tesla cannon — 58x26 tesla coil weapon, arcing electricity, spherical emitter
    this._ctw('weapon_tesla_cannon', 58, 26, (ctx) => {
      // Body/housing
      const bodyGrad = ctx.createLinearGradient(0, 0, 0, 16);
      bodyGrad.addColorStop(0, '#666');
      bodyGrad.addColorStop(0.5, '#555');
      bodyGrad.addColorStop(1, '#444');
      ctx.fillStyle = bodyGrad;
      ctx.fillRect(6, 5, 22, 14);
      // Stock
      const stockGrad = ctx.createLinearGradient(0, 0, 0, 10);
      stockGrad.addColorStop(0, '#555');
      stockGrad.addColorStop(1, '#333');
      ctx.fillStyle = stockGrad;
      ctx.beginPath();
      ctx.roundRect(0, 7, 8, 10, 2);
      ctx.fill();
      // Barrel/conduit
      ctx.fillStyle = '#555';
      ctx.fillRect(28, 8, 14, 8);
      // Tesla coil rings along barrel
      ctx.strokeStyle = '#77aacc';
      ctx.lineWidth = 1.5;
      for (let i = 30; i < 42; i += 4) {
        ctx.beginPath();
        ctx.arc(i, 12, 5, 0, Math.PI * 2);
        ctx.stroke();
      }
      // Coil energy
      ctx.fillStyle = 'rgba(80,180,255,0.15)';
      ctx.fillRect(28, 6, 14, 12);
      // Spherical emitter (tesla ball)
      ctx.fillStyle = '#666';
      ctx.beginPath();
      ctx.arc(50, 12, 8, 0, Math.PI * 2);
      ctx.fill();
      // Emitter shell
      const shellGrad = ctx.createRadialGradient(48, 10, 1, 50, 12, 8);
      shellGrad.addColorStop(0, '#888');
      shellGrad.addColorStop(0.5, '#666');
      shellGrad.addColorStop(1, '#444');
      ctx.fillStyle = shellGrad;
      ctx.beginPath();
      ctx.arc(50, 12, 7, 0, Math.PI * 2);
      ctx.fill();
      // Inner energy orb
      const orbGrad = ctx.createRadialGradient(50, 12, 0, 50, 12, 4);
      orbGrad.addColorStop(0, 'rgba(150,220,255,0.8)');
      orbGrad.addColorStop(0.5, 'rgba(80,180,255,0.4)');
      orbGrad.addColorStop(1, 'rgba(50,100,255,0)');
      ctx.fillStyle = orbGrad;
      ctx.beginPath();
      ctx.arc(50, 12, 4, 0, Math.PI * 2);
      ctx.fill();
      // Arcing electricity from sphere
      ctx.strokeStyle = 'rgba(100,200,255,0.7)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(54, 8);
      ctx.lineTo(56, 6);
      ctx.lineTo(55, 4);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(55, 14);
      ctx.lineTo(57, 16);
      ctx.lineTo(56, 19);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(54, 12);
      ctx.lineTo(57, 11);
      ctx.lineTo(58, 13);
      ctx.stroke();
      // Bright arc cores
      ctx.strokeStyle = 'rgba(180,230,255,0.9)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(54, 8); ctx.lineTo(56, 6);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(55, 14); ctx.lineTo(57, 16);
      ctx.stroke();
      // Power cable from body to coils
      ctx.strokeStyle = '#444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(26, 12);
      ctx.quadraticCurveTo(27, 10, 28, 12);
      ctx.stroke();
      // Energy cell
      ctx.fillStyle = '#336';
      ctx.beginPath();
      ctx.roundRect(10, 19, 10, 5, 1);
      ctx.fill();
      ctx.fillStyle = 'rgba(80,180,255,0.4)';
      ctx.fillRect(11, 20, 8, 3);
      // Grip
      ctx.fillStyle = '#555';
      ctx.fillRect(14, 18, 8, 7);
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 0.5;
      for (let i = 20; i < 25; i += 2) {
        ctx.beginPath();
        ctx.moveTo(15, i); ctx.lineTo(21, i);
        ctx.stroke();
      }
      // Trigger
      ctx.fillStyle = '#444';
      ctx.fillRect(18, 18, 2, 3);
      // Top rail
      ctx.fillStyle = '#555';
      ctx.fillRect(10, 3, 14, 3);
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(7, 5, 20, 1);
    });
  }
}
