export const GAME = {
  WIDTH: 360,
  HEIGHT: 640,
  LIVES: 3,
  WAVE_DURATION: 20000,
  WAVE_PAUSE: 3000,
  COMBO_TIMEOUT: 2000,
  MAX_COMBO: 5,
  GROUND_TOP: 430,     // верхняя граница земли (линия перехода холмы→трава)
  GROUND_BOTTOM: 580,  // нижняя граница (над HUD)
};

export const ANIMALS = {
  rabbit: { name: 'Кролик', hp: 1, speed: 180, points: 10, color: 0xaaaaaa, minWave: 1 },
  fox:    { name: 'Лиса',   hp: 2, speed: 130, points: 25, color: 0xff8833, minWave: 1 },
  deer:   { name: 'Олень',  hp: 4, speed: 100, points: 40, color: 0x996633, minWave: 2 },
  boar:   { name: 'Кабан',  hp: 6, speed: 170, points: 50, color: 0x665544, minWave: 3 },
  wolf:   { name: 'Волк',   hp: 3, speed: 175, points: 60, color: 0x777788, minWave: 4 },
  bear:   { name: 'Медведь',hp: 15, speed: 60,  points: 150, color: 0x553322, minWave: 5 },
  eagle:    { name: 'Орёл',    hp: 2,  speed: 200, points: 35,  color: 0x8B6914, minWave: 2, flying: true },
  snake:    { name: 'Змея',    hp: 1,  speed: 220, points: 20,  color: 0x228B22, minWave: 3 },
  moose:    { name: 'Лось',    hp: 10, speed: 50,  points: 100, color: 0x8B7355, minWave: 4 },
  pheasant: { name: 'Фазан',   hp: 1,  speed: 160, points: 30,  color: 0xCD853F, minWave: 1, flying: true },
};

export const WEAPONS = {
  pistol:   { name: 'Пистолет',  damage: 1,  cooldown: 500,  unlock: 0,    spread: 0, projectiles: 1, aoe: 0, barrelOffsetY: -2 },
  shotgun:  { name: 'Дробовик',  damage: 1,  cooldown: 900,  unlock: 50,   spread: 15, projectiles: 5, aoe: 0, barrelOffsetY: -2 },
  rifle:    { name: 'Винтовка',  damage: 4,  cooldown: 700,  unlock: 200,  spread: 0, projectiles: 1, aoe: 0, barrelOffsetY: -3 },
  machinegun:{ name: 'Пулемет', damage: 1,  cooldown: 400,  unlock: 500,  spread: 5, projectiles: 1, aoe: 0, burstCount: 3, burstDelay: 50, barrelOffsetY: -4 },
  rocket:   { name: 'Ракетница', damage: 10, cooldown: 1500, unlock: 1000, spread: 0, projectiles: 1, aoe: 80, barrelOffsetY: 0 },
};

export const WEAPON_ORDER = ['pistol', 'shotgun', 'rifle', 'machinegun', 'rocket'];

export const COLORS = {
  bg: 0x87CEEB,
  ground: 0x4a7a2e,
  blood: 0xcc0000,
  muzzleFlash: 0xffff00,
  bullet: 0xffcc00,
  rocket: 0xff4400,
  explosion: 0xff6600,
  textWhite: '#ffffff',
  textYellow: '#ffdd00',
  textRed: '#ff3333',
  hud: 0x000000,
};
