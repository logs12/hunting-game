export const GAME = {
  WIDTH: 360,
  HEIGHT: 640,
  LIVES: 3,
  WAVE_DURATION: 20000,
  WAVE_PAUSE: 3000,
  COMBO_TIMEOUT: 2000,
  MAX_COMBO: 5,
  GROUND_TOP: 280,
  GROUND_BOTTOM: 580,
  FLYING_MIN_Y: 260,
  FLYING_MAX_Y: 400,
};

export const LAYOUTS = {
  portrait:  { width: 360, height: 640, groundTop: 280, groundBottom: 580, flyingMinY: 260, flyingMaxY: 400 },
  landscape: { width: 640, height: 360, groundTop: 160, groundBottom: 320, flyingMinY: 140, flyingMaxY: 240 },
};

export function applyLayout(orientation) {
  const l = LAYOUTS[orientation] || LAYOUTS.portrait;
  GAME.WIDTH = l.width;
  GAME.HEIGHT = l.height;
  GAME.GROUND_TOP = l.groundTop;
  GAME.GROUND_BOTTOM = l.groundBottom;
  GAME.FLYING_MIN_Y = l.flyingMinY;
  GAME.FLYING_MAX_Y = l.flyingMaxY;
}

export const ANIMALS = {
  // Tier 1 — minWave:1
  rabbit:   { name: 'Кролик',   hp: 1, speed: 180, points: 10, color: 0xaaaaaa, minWave: 1 },
  fox:      { name: 'Лиса',     hp: 2, speed: 130, points: 25, color: 0xff8833, minWave: 1 },
  pheasant: { name: 'Фазан',    hp: 1, speed: 160, points: 30, color: 0xCD853F, minWave: 1, flying: true },
  sparrow:  { name: 'Воробей',  hp: 1, speed: 200, points: 8,  color: 0x8B7355, minWave: 1, flying: true },
  mouse:    { name: 'Мышь',     hp: 1, speed: 240, points: 5,  color: 0x999999, minWave: 1 },
  frog:     { name: 'Лягушка',  hp: 1, speed: 140, points: 12, color: 0x44aa44, minWave: 1 },

  // Tier 2 — minWave:2-3
  deer:     { name: 'Олень',    hp: 4, speed: 100, points: 40, color: 0x996633, minWave: 2 },
  eagle:    { name: 'Орёл',     hp: 2, speed: 200, points: 35, color: 0x8B6914, minWave: 2, flying: true },
  duck:     { name: 'Утка',     hp: 2, speed: 170, points: 25, color: 0x336633, minWave: 2, flying: true },
  crow:     { name: 'Ворона',   hp: 2, speed: 190, points: 28, color: 0x222244, minWave: 2, flying: true },
  hare:     { name: 'Заяц',     hp: 2, speed: 210, points: 18, color: 0xbb9966, minWave: 2 },
  raccoon:  { name: 'Енот',     hp: 3, speed: 120, points: 30, color: 0x888888, minWave: 2 },
  boar:     { name: 'Кабан',    hp: 6, speed: 170, points: 50, color: 0x665544, minWave: 3 },
  snake:    { name: 'Змея',     hp: 1, speed: 220, points: 20, color: 0x228B22, minWave: 3 },
  turkey:   { name: 'Индейка',  hp: 3, speed: 90,  points: 35, color: 0x8B4513, minWave: 3 },
  badger:   { name: 'Барсук',   hp: 4, speed: 100, points: 38, color: 0x444444, minWave: 3 },

  // Tier 3 — minWave:4-6
  wolf:     { name: 'Волк',     hp: 3, speed: 175, points: 60,  color: 0x777788, minWave: 4, formation: 'pack' },
  moose:    { name: 'Лось',     hp: 10, speed: 50, points: 100, color: 0x8B7355, minWave: 4 },
  lynx:     { name: 'Рысь',     hp: 4, speed: 200, points: 70,  color: 0xCC9944, minWave: 4 },
  hawk:     { name: 'Ястреб',   hp: 3, speed: 230, points: 55,  color: 0x8B6914, minWave: 4, flying: true },
  coyote:   { name: 'Койот',    hp: 3, speed: 185, points: 55,  color: 0xBB9966, minWave: 4, formation: 'pack' },
  goose:    { name: 'Гусь',     hp: 3, speed: 160, points: 45,  color: 0xCCCCCC, minWave: 5, flying: true, formation: 'v' },
  bear:     { name: 'Медведь',  hp: 15, speed: 60, points: 150, color: 0x553322, minWave: 5 },
  porcupine:{ name: 'Дикобраз', hp: 5, speed: 60,  points: 65,  color: 0x554433, minWave: 5 },
  wolverine:{ name: 'Росомаха', hp: 6, speed: 150, points: 80,  color: 0x443322, minWave: 5 },
  owl:      { name: 'Сова',     hp: 2, speed: 170, points: 50,  color: 0x998877, minWave: 5, flying: true },
  ram:      { name: 'Баран',    hp: 7, speed: 130, points: 75,  color: 0xDDDDCC, minWave: 6 },

  // Tier 4 — minWave:7-9
  tiger:    { name: 'Тигр',     hp: 12, speed: 140, points: 200, color: 0xFF8800, minWave: 7 },
  bison:    { name: 'Бизон',    hp: 18, speed: 80,  points: 180, color: 0x554422, minWave: 7, formation: 'stampede' },
  condor:   { name: 'Кондор',   hp: 5,  speed: 180, points: 120, color: 0x222222, minWave: 7, flying: true },
  panther:  { name: 'Пантера',  hp: 8,  speed: 220, points: 160, color: 0x111111, minWave: 8 },
  elk:      { name: 'Вапити',   hp: 12, speed: 70,  points: 130, color: 0xAA8855, minWave: 8 },
  vulture:  { name: 'Гриф',     hp: 4,  speed: 150, points: 90,  color: 0x443333, minWave: 8, flying: true },
  alligator:{ name: 'Аллигатор',hp: 14, speed: 50,  points: 170, color: 0x336633, minWave: 9 },

  // Tier 5 — minWave:10+ (elite/boss)
  rhino:       { name: 'Носорог',  hp: 25, speed: 100, points: 300, color: 0x888888, minWave: 10 },
  hippo:       { name: 'Бегемот',  hp: 30, speed: 40,  points: 350, color: 0x887788, minWave: 10 },
  gorilla:     { name: 'Горилла',  hp: 20, speed: 90,  points: 280, color: 0x333333, minWave: 10 },
  golden_eagle:{ name: 'Беркут',   hp: 8,  speed: 250, points: 200, color: 0xCC9933, minWave: 10, flying: true },
  mammoth:     { name: 'Мамонт',   hp: 40, speed: 35,  points: 500, color: 0x8B6914, minWave: 12 },
  dragon:      { name: 'Дракон',   hp: 35, speed: 120, points: 450, color: 0xCC2200, minWave: 15, flying: true },
};

export const DIFFICULTY = {
  hpScale: (wave) => 1 + Math.floor(wave / 3) * 0.15,
  speedScale: (wave) => 1 + Math.min(wave * 0.02, 0.8),
  spawnDelay: (wave) => Math.max(300, 2000 - wave * 80),
  groupChance: (wave) => Math.min(0.6, wave * 0.04),
  groupSize: (wave) => Math.min(5, 2 + Math.floor(wave / 4)),
};

export const WEAPONS = {
  slingshot:       { name: 'Рогатка',       damage: 1,  cooldown: 700,  unlock: 0,     spread: 2,  projectiles: 1, aoe: 0,   barrelOffsetY: -2 },
  pistol:          { name: 'Пистолет',      damage: 1,  cooldown: 500,  unlock: 0,     spread: 0,  projectiles: 1, aoe: 0,   barrelOffsetY: -3 },
  revolver:        { name: 'Револьвер',     damage: 2,  cooldown: 600,  unlock: 75,    spread: 0,  projectiles: 1, aoe: 0,   barrelOffsetY: -3 },
  shotgun:         { name: 'Дробовик',      damage: 1,  cooldown: 900,  unlock: 150,   spread: 15, projectiles: 5, aoe: 0,   barrelOffsetY: -3 },
  doublebarrel:    { name: 'Двустволка',    damage: 1,  cooldown: 1100, unlock: 250,   spread: 18, projectiles: 8, aoe: 0,   barrelOffsetY: -3 },
  smg:             { name: 'ППШ',           damage: 1,  cooldown: 120,  unlock: 400,   spread: 3,  projectiles: 1, aoe: 0,   barrelOffsetY: -4 },
  rifle:           { name: 'Винтовка',      damage: 4,  cooldown: 700,  unlock: 600,   spread: 0,  projectiles: 1, aoe: 0,   barrelOffsetY: -4 },
  crossbow:        { name: 'Арбалет',       damage: 5,  cooldown: 1000, unlock: 800,   spread: 0,  projectiles: 1, aoe: 0,   barrelOffsetY: -3 },
  lever_rifle:     { name: 'Карабин',       damage: 3,  cooldown: 450,  unlock: 1000,  spread: 0,  projectiles: 1, aoe: 0,   barrelOffsetY: -4 },
  machinegun:      { name: 'Пулемёт',      damage: 1,  cooldown: 150,  unlock: 1300,  spread: 0,  projectiles: 1, aoe: 0,   barrelOffsetY: -5 },
  hunting_rifle:   { name: 'Охот.винт.',   damage: 6,  cooldown: 800,  unlock: 1600,  spread: 0,  projectiles: 1, aoe: 0,   barrelOffsetY: -4 },
  auto_shotgun:    { name: 'Авто-дробовик', damage: 1,  cooldown: 500,  unlock: 2000,  spread: 12, projectiles: 4, aoe: 0,   burstCount: 2, burstDelay: 200, barrelOffsetY: -3 },
  sniper:          { name: 'Снайперка',     damage: 10, cooldown: 1200, unlock: 2500,  spread: 0,  projectiles: 1, aoe: 0,   barrelOffsetY: -4 },
  flamethrower:    { name: 'Огнемёт',      damage: 2,  cooldown: 80,   unlock: 3000,  spread: 8,  projectiles: 1, aoe: 15,  maxRange: 200, barrelOffsetY: -3 },
  grenade_launcher:{ name: 'Гранатомёт',   damage: 6,  cooldown: 1400, unlock: 3800,  spread: 0,  projectiles: 1, aoe: 60,  gravity: 200, barrelOffsetY: -2 },
  assault_rifle:   { name: 'Автомат',       damage: 2,  cooldown: 130,  unlock: 4500,  spread: 1,  projectiles: 1, aoe: 0,   burstCount: 3, burstDelay: 60, barrelOffsetY: -4 },
  heavy_mg:        { name: 'Тяж.пулемёт',  damage: 3,  cooldown: 100,  unlock: 5500,  spread: 2,  projectiles: 1, aoe: 0,   barrelOffsetY: -5 },
  rocket:          { name: 'Ракетница',     damage: 10, cooldown: 1500, unlock: 7000,  spread: 0,  projectiles: 1, aoe: 80,  barrelOffsetY: 0 },
  laser_rifle:     { name: 'Лазер.винт.',  damage: 8,  cooldown: 600,  unlock: 8500,  spread: 0,  projectiles: 1, aoe: 0,   barrelOffsetY: -4 },
  minigun:         { name: 'Миниган',       damage: 2,  cooldown: 60,   unlock: 10000, spread: 3,  projectiles: 1, aoe: 0,   barrelOffsetY: -5 },
  rpg:             { name: 'РПГ',           damage: 15, cooldown: 1800, unlock: 12000, spread: 0,  projectiles: 1, aoe: 100, barrelOffsetY: 0 },
  railgun:         { name: 'Рельсотрон',    damage: 20, cooldown: 2000, unlock: 15000, spread: 0,  projectiles: 1, aoe: 0,   piercing: true, barrelOffsetY: -4 },
  plasma_cannon:   { name: 'Плазм.пушка',  damage: 12, cooldown: 800,  unlock: 18000, spread: 0,  projectiles: 1, aoe: 50,  barrelOffsetY: -3 },
  gauss_rifle:     { name: 'Гаусс-винт.',  damage: 25, cooldown: 1500, unlock: 22000, spread: 0,  projectiles: 1, aoe: 0,   barrelOffsetY: -4 },
  tesla_cannon:    { name: 'Тесла-пушка',  damage: 15, cooldown: 400,  unlock: 28000, spread: 0,  projectiles: 3, aoe: 30,  barrelOffsetY: -3 },
};

export const WEAPON_ORDER = [
  'slingshot', 'pistol', 'revolver', 'shotgun', 'doublebarrel',
  'smg', 'rifle', 'crossbow', 'lever_rifle', 'machinegun',
  'hunting_rifle', 'auto_shotgun', 'sniper', 'flamethrower', 'grenade_launcher',
  'assault_rifle', 'heavy_mg', 'rocket', 'laser_rifle', 'minigun',
  'rpg', 'railgun', 'plasma_cannon', 'gauss_rifle', 'tesla_cannon',
];

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
