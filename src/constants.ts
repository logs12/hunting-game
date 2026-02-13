import type { AnimalConfig, WeaponConfig, LayoutConfig } from './types';

export const GAME: {
  WIDTH: number; HEIGHT: number; LIVES: number;
  WAVE_DURATION: number; WAVE_PAUSE: number;
  COMBO_TIMEOUT: number; MAX_COMBO: number;
  GROUND_TOP: number; GROUND_BOTTOM: number;
  FLYING_MIN_Y: number; FLYING_MAX_Y: number;
} = {
  WIDTH: 360,
  HEIGHT: 640,
  LIVES: 5,
  WAVE_DURATION: 20000,
  WAVE_PAUSE: 3000,
  COMBO_TIMEOUT: 1500,
  MAX_COMBO: 4,
  GROUND_TOP: 280,
  GROUND_BOTTOM: 580,
  FLYING_MIN_Y: 260,
  FLYING_MAX_Y: 400,
};

export const LAYOUTS: Record<string, LayoutConfig> = {
  portrait:  { width: 360, height: 640, groundTop: 280, groundBottom: 580, flyingMinY: 260, flyingMaxY: 400 },
  landscape: { width: 640, height: 360, groundTop: 160, groundBottom: 320, flyingMinY: 140, flyingMaxY: 240 },
};

export function applyLayout(orientation: string): void {
  const l = LAYOUTS[orientation] || LAYOUTS.portrait;
  GAME.WIDTH = l.width;
  GAME.HEIGHT = l.height;
  GAME.GROUND_TOP = l.groundTop;
  GAME.GROUND_BOTTOM = l.groundBottom;
  GAME.FLYING_MIN_Y = l.flyingMinY;
  GAME.FLYING_MAX_Y = l.flyingMaxY;
}

export const ANIMALS: Record<string, AnimalConfig> = {
  // Tier 1 — minWave:1
  rabbit:   { name: 'Кролик',   hp: 1, speed: 180, points: 7,  color: 0xaaaaaa, minWave: 1, headZone: { xFrac: 0.25, yFrac: 0.35 } },
  fox:      { name: 'Лиса',     hp: 2, speed: 130, points: 18, color: 0xff8833, minWave: 1, headZone: { xFrac: 0.25, yFrac: 0.35 } },
  pheasant: { name: 'Фазан',    hp: 1, speed: 160, points: 20, color: 0xCD853F, minWave: 1, flying: true, headZone: { xFrac: 0.30, yFrac: 0.40 } },
  sparrow:  { name: 'Воробей',  hp: 1, speed: 200, points: 5,  color: 0x8B7355, minWave: 4, flying: true, headZone: { xFrac: 0.30, yFrac: 0.40 } },
  mouse:    { name: 'Мышь',     hp: 1, speed: 240, points: 3,  color: 0x999999, minWave: 3, headZone: { xFrac: 0.25, yFrac: 0.35 } },
  frog:     { name: 'Лягушка',  hp: 1, speed: 140, points: 8,  color: 0x44aa44, minWave: 2, headZone: { xFrac: 0.30, yFrac: 0.40 } },

  // Tier 2 — minWave:2-3
  deer:     { name: 'Олень',    hp: 4, speed: 100, points: 40, color: 0x996633, minWave: 2, headZone: { xFrac: 0.20, yFrac: 0.30 } },
  eagle:    { name: 'Орёл',     hp: 2, speed: 200, points: 35, color: 0x8B6914, minWave: 2, flying: true, headZone: { xFrac: 0.25, yFrac: 0.35 } },
  duck:     { name: 'Утка',     hp: 2, speed: 170, points: 18, color: 0x336633, minWave: 3, flying: true, headZone: { xFrac: 0.30, yFrac: 0.40 } },
  crow:     { name: 'Ворона',   hp: 2, speed: 190, points: 28, color: 0x222244, minWave: 5, flying: true, headZone: { xFrac: 0.30, yFrac: 0.40 } },
  hare:     { name: 'Заяц',     hp: 2, speed: 210, points: 12, color: 0xbb9966, minWave: 4, headZone: { xFrac: 0.25, yFrac: 0.35 } },
  raccoon:  { name: 'Енот',     hp: 3, speed: 120, points: 30, color: 0x888888, minWave: 2, headZone: { xFrac: 0.25, yFrac: 0.35 } },
  boar:     { name: 'Кабан',    hp: 6, speed: 170, points: 50, color: 0x665544, minWave: 3, headZone: { xFrac: 0.20, yFrac: 0.30 } },
  snake:    { name: 'Змея',     hp: 1, speed: 220, points: 20, color: 0x228B22, minWave: 3, headZone: { xFrac: 0.20, yFrac: 0.40 } },
  turkey:   { name: 'Индейка',  hp: 3, speed: 90,  points: 35, color: 0x8B4513, minWave: 3, headZone: { xFrac: 0.25, yFrac: 0.35 } },
  badger:   { name: 'Барсук',   hp: 4, speed: 100, points: 38, color: 0x444444, minWave: 3, headZone: { xFrac: 0.25, yFrac: 0.35 } },

  // Tier 3 — minWave:4-6
  wolf:     { name: 'Волк',     hp: 3, speed: 175, points: 60,  color: 0x777788, minWave: 4, formation: 'pack', headZone: { xFrac: 0.25, yFrac: 0.35 } },
  moose:    { name: 'Лось',     hp: 10, speed: 50, points: 100, color: 0x8B7355, minWave: 4, headZone: { xFrac: 0.20, yFrac: 0.30 } },
  lynx:     { name: 'Рысь',     hp: 4, speed: 200, points: 70,  color: 0xCC9944, minWave: 4, headZone: { xFrac: 0.25, yFrac: 0.35 } },
  hawk:     { name: 'Ястреб',   hp: 3, speed: 230, points: 55,  color: 0x8B6914, minWave: 4, flying: true, headZone: { xFrac: 0.25, yFrac: 0.35 } },
  coyote:   { name: 'Койот',    hp: 3, speed: 185, points: 55,  color: 0xBB9966, minWave: 4, formation: 'pack', headZone: { xFrac: 0.25, yFrac: 0.35 } },
  goose:    { name: 'Гусь',     hp: 3, speed: 160, points: 45,  color: 0xCCCCCC, minWave: 5, flying: true, formation: 'v', headZone: { xFrac: 0.30, yFrac: 0.40 } },
  bear:     { name: 'Медведь',  hp: 15, speed: 60, points: 150, color: 0x553322, minWave: 5, headZone: { xFrac: 0.20, yFrac: 0.30 } },
  porcupine:{ name: 'Дикобраз', hp: 5, speed: 60,  points: 65,  color: 0x554433, minWave: 5, headZone: { xFrac: 0.25, yFrac: 0.35 } },
  wolverine:{ name: 'Росомаха', hp: 6, speed: 150, points: 80,  color: 0x443322, minWave: 5, headZone: { xFrac: 0.25, yFrac: 0.35 } },
  owl:      { name: 'Сова',     hp: 2, speed: 170, points: 50,  color: 0x998877, minWave: 5, flying: true, headZone: { xFrac: 0.30, yFrac: 0.40 } },
  ram:      { name: 'Баран',    hp: 7, speed: 130, points: 75,  color: 0xDDDDCC, minWave: 6, headZone: { xFrac: 0.25, yFrac: 0.30 } },

  // Tier 4 — minWave:7-9
  tiger:    { name: 'Тигр',     hp: 12, speed: 140, points: 200, color: 0xFF8800, minWave: 7, headZone: { xFrac: 0.20, yFrac: 0.30 } },
  bison:    { name: 'Бизон',    hp: 18, speed: 80,  points: 180, color: 0x554422, minWave: 7, formation: 'stampede', headZone: { xFrac: 0.20, yFrac: 0.30 } },
  condor:   { name: 'Кондор',   hp: 5,  speed: 180, points: 120, color: 0x222222, minWave: 7, flying: true, headZone: { xFrac: 0.25, yFrac: 0.35 } },
  panther:  { name: 'Пантера',  hp: 8,  speed: 220, points: 160, color: 0x111111, minWave: 8, headZone: { xFrac: 0.25, yFrac: 0.35 } },
  elk:      { name: 'Вапити',   hp: 12, speed: 70,  points: 130, color: 0xAA8855, minWave: 8, headZone: { xFrac: 0.20, yFrac: 0.30 } },
  vulture:  { name: 'Гриф',     hp: 4,  speed: 150, points: 90,  color: 0x443333, minWave: 8, flying: true, headZone: { xFrac: 0.25, yFrac: 0.35 } },
  alligator:{ name: 'Аллигатор',hp: 14, speed: 50,  points: 170, color: 0x336633, minWave: 9, headZone: { xFrac: 0.20, yFrac: 0.30 } },

  // Tier 5 — minWave:10+ (elite/boss)
  rhino:       { name: 'Носорог',  hp: 25, speed: 100, points: 300, color: 0x888888, minWave: 10, headZone: { xFrac: 0.20, yFrac: 0.30 } },
  hippo:       { name: 'Бегемот',  hp: 30, speed: 40,  points: 350, color: 0x887788, minWave: 10, headZone: { xFrac: 0.20, yFrac: 0.30 } },
  gorilla:     { name: 'Горилла',  hp: 20, speed: 90,  points: 280, color: 0x333333, minWave: 10, headZone: { xFrac: 0.20, yFrac: 0.30 } },
  golden_eagle:{ name: 'Беркут',   hp: 8,  speed: 250, points: 200, color: 0xCC9933, minWave: 10, flying: true, headZone: { xFrac: 0.25, yFrac: 0.35 } },
  mammoth:     { name: 'Мамонт',   hp: 40, speed: 35,  points: 500, color: 0x8B6914, minWave: 12, headZone: { xFrac: 0.15, yFrac: 0.25 } },
  dragon:      { name: 'Дракон',   hp: 35, speed: 120, points: 450, color: 0xCC2200, minWave: 15, flying: true, headZone: { xFrac: 0.20, yFrac: 0.30 } },
};

export const DIFFICULTY: {
  hpScale: (wave: number) => number;
  speedScale: (wave: number) => number;
  spawnDelay: (wave: number) => number;
  groupChance: (wave: number) => number;
  groupSize: (wave: number) => number;
} = {
  hpScale: (wave: number) => 1 + Math.floor(wave / 2) * 0.3,
  speedScale: (wave: number) => 1 + Math.min(wave * 0.015, 0.6),
  spawnDelay: (wave: number) => Math.max(250, 1800 - wave * 70),
  groupChance: (wave: number) => Math.min(0.6, wave * 0.04),
  groupSize: (wave: number) => Math.min(6, 2 + Math.floor(wave / 3)),
};

// Calibers: slingshot=камень, pistol=9×19, revolver=.357Mag, shotgun/db=12ga, smg=7.62×25TT
// rifle=7.62×54R, crossbow=болт, lever=.30-30, machinegun=7.62×54R, hunting=.308Win
// sniper=7.62×54R, assault=7.62×39, heavy_mg=12.7×108, minigun=7.62×51NATO
export const WEAPONS: Record<string, WeaponConfig> = {
  slingshot:       { name: 'Рогатка',       damage: 1,  cooldown: 350,  unlock: 0,      spread: 0,  projectiles: 1, aoe: 0,   barrelOffsetY: -2, magSize: Infinity, reloadTime: 0 },
  pistol:          { name: 'Пистолет',      damage: 1,  cooldown: 250,  unlock: 0,      spread: 0,  projectiles: 1, aoe: 0,   barrelOffsetY: -3, magSize: 12, reloadTime: 1200 },
  revolver:        { name: 'Револьвер',     damage: 3,  cooldown: 325,  unlock: 200,    spread: 0,  projectiles: 1, aoe: 0,   barrelOffsetY: -3, magSize: 6, reloadTime: 2000 },
  shotgun:         { name: 'Дробовик',      damage: 1,  cooldown: 450,  unlock: 400,    spread: 12, projectiles: 5, aoe: 0,   barrelOffsetY: -3, magSize: 5, reloadTime: 2200 },
  doublebarrel:    { name: 'Двустволка',    damage: 1,  cooldown: 550,  unlock: 700,    spread: 14, projectiles: 8, aoe: 0,   barrelOffsetY: -3, magSize: 2, reloadTime: 2800 },
  smg:             { name: 'ППШ',           damage: 1,  cooldown: 40,   unlock: 1200,   spread: 2,  projectiles: 1, aoe: 0,   barrelOffsetY: -4, magSize: 71, reloadTime: 2500 },
  rifle:           { name: 'Винтовка',      damage: 5,  cooldown: 400,  unlock: 1800,   spread: 0,  projectiles: 1, aoe: 0,   barrelOffsetY: -4, magSize: 5, reloadTime: 1800 },
  crossbow:        { name: 'Арбалет',       damage: 4,  cooldown: 600,  unlock: 2500,   spread: 0,  projectiles: 1, aoe: 0,   barrelOffsetY: -3, magSize: 1, reloadTime: 2000 },
  lever_rifle:     { name: 'Карабин',       damage: 3,  cooldown: 225,  unlock: 3500,   spread: 0,  projectiles: 1, aoe: 0,   barrelOffsetY: -4, magSize: 7, reloadTime: 2000 },
  machinegun:      { name: 'Пулемёт',      damage: 2,  cooldown: 60,   unlock: 5000,   spread: 0,  projectiles: 1, aoe: 0,   barrelOffsetY: -5, magSize: 47, reloadTime: 3000 },
  hunting_rifle:   { name: 'Охот.винт.',   damage: 7,  cooldown: 400,  unlock: 7000,   spread: 0,  projectiles: 1, aoe: 0,   barrelOffsetY: -4, magSize: 5, reloadTime: 1800 },
  auto_shotgun:    { name: 'Авто-дробовик', damage: 1,  cooldown: 250,  unlock: 9000,   spread: 10, projectiles: 4, aoe: 0,   burstCount: 2, burstDelay: 100, barrelOffsetY: -3, magSize: 8, reloadTime: 2500 },
  sniper:          { name: 'Снайперка',     damage: 10, cooldown: 600,  unlock: 12000,  spread: 0,  projectiles: 1, aoe: 0,   barrelOffsetY: -4, magSize: 5, reloadTime: 2000 },
  flamethrower:    { name: 'Огнемёт',      damage: 2,  cooldown: 40,   unlock: 15000,  spread: 8,  projectiles: 1, aoe: 15,  maxRange: 200, barrelOffsetY: -3, magSize: 100, reloadTime: 3000 },
  grenade_launcher:{ name: 'Гранатомёт',   damage: 8,  cooldown: 700,  unlock: 20000,  spread: 0,  projectiles: 1, aoe: 60,  gravity: 200, barrelOffsetY: -2, magSize: 1, reloadTime: 2500 },
  assault_rifle:   { name: 'Автомат',       damage: 3,  cooldown: 55,   unlock: 25000,  spread: 1,  projectiles: 1, aoe: 0,   burstCount: 3, burstDelay: 25, barrelOffsetY: -4, magSize: 30, reloadTime: 2200 },
  heavy_mg:        { name: 'Тяж.пулемёт',  damage: 5,  cooldown: 50,   unlock: 32000,  spread: 1,  projectiles: 1, aoe: 0,   barrelOffsetY: -5, magSize: 50, reloadTime: 3500 },
  rocket:          { name: 'Ракетница',     damage: 12, cooldown: 750,  unlock: 40000,  spread: 0,  projectiles: 1, aoe: 80,  barrelOffsetY: 0, magSize: 1, reloadTime: 2500 },
  laser_rifle:     { name: 'Лазер.винт.',  damage: 8,  cooldown: 300,  unlock: 50000,  spread: 0,  projectiles: 1, aoe: 0,   barrelOffsetY: -4, magSize: 20, reloadTime: 2000 },
  minigun:         { name: 'Миниган',       damage: 2,  cooldown: 30,   unlock: 62000,  spread: 1,  projectiles: 1, aoe: 0,   barrelOffsetY: -5, magSize: 100, reloadTime: 4000 },
  rpg:             { name: 'РПГ',           damage: 18, cooldown: 900,  unlock: 75000,  spread: 0,  projectiles: 1, aoe: 100, barrelOffsetY: 0, magSize: 1, reloadTime: 3000 },
  railgun:         { name: 'Рельсотрон',    damage: 25, cooldown: 1000, unlock: 90000,  spread: 0,  projectiles: 1, aoe: 0,   piercing: true, barrelOffsetY: -4, magSize: 1, reloadTime: 3000 },
  plasma_cannon:   { name: 'Плазм.пушка',  damage: 15, cooldown: 400,  unlock: 110000, spread: 0,  projectiles: 1, aoe: 50,  barrelOffsetY: -3, magSize: 8, reloadTime: 2500 },
  gauss_rifle:     { name: 'Гаусс-винт.',  damage: 30, cooldown: 750,  unlock: 135000, spread: 0,  projectiles: 1, aoe: 0,   barrelOffsetY: -4, magSize: 3, reloadTime: 2500 },
  tesla_cannon:    { name: 'Тесла-пушка',  damage: 15, cooldown: 200,  unlock: 165000, spread: 0,  projectiles: 3, aoe: 30,  barrelOffsetY: -3, magSize: 12, reloadTime: 2000 },
};

export const WEAPON_ORDER: string[] = [
  'slingshot', 'pistol', 'revolver', 'shotgun', 'doublebarrel',
  'smg', 'rifle', 'crossbow', 'lever_rifle', 'machinegun',
  'hunting_rifle', 'auto_shotgun', 'sniper', 'flamethrower', 'grenade_launcher',
  'assault_rifle', 'heavy_mg', 'rocket', 'laser_rifle', 'minigun',
  'rpg', 'railgun', 'plasma_cannon', 'gauss_rifle', 'tesla_cannon',
];

export const COLORS: {
  bg: number; ground: number; blood: number; muzzleFlash: number;
  bullet: number; rocket: number; explosion: number;
  textWhite: string; textYellow: string; textRed: string; hud: number;
} = {
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
