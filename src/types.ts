// Telegram WebApp API
export interface TelegramHapticFeedback {
  impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void;
  notificationOccurred(type: 'error' | 'success' | 'warning'): void;
  selectionChanged(): void;
}

export interface TelegramCloudStorage {
  setItem(key: string, value: string, callback?: (error: string | null, stored: boolean) => void): void;
  getItem(key: string, callback: (error: string | null, value?: string) => void): void;
}

export interface TelegramWebApp {
  ready(): void;
  expand(): void;
  requestFullscreen?(): void;
  disableVerticalSwipes?(): void;
  enableClosingConfirmation?(): void;
  disableClosingConfirmation?(): void;
  colorScheme?: string;
  initDataUnsafe?: { user?: { first_name?: string; id?: number } };
  onEvent?(event: string, cb: () => void): void;
  CloudStorage?: TelegramCloudStorage;
  HapticFeedback?: TelegramHapticFeedback;
}

declare global {
  interface Window {
    Telegram?: { WebApp?: TelegramWebApp };
    webkitAudioContext?: typeof AudioContext;
  }
}

// Game config types
export interface HeadZone {
  xFrac: number;
  yFrac: number;
}

export interface AnimalConfig {
  name: string;
  hp: number;
  speed: number;
  points: number;
  color: number;
  minWave: number;
  flying?: boolean;
  formation?: string;
  headZone: HeadZone;
}

export interface WeaponConfig {
  name: string;
  damage: number;
  cooldown: number;
  unlock: number;
  spread: number;
  projectiles: number;
  aoe: number;
  barrelOffsetY: number;
  magSize: number;
  reloadTime: number;
  burstCount?: number;
  burstDelay?: number;
  maxRange?: number;
  gravity?: number;
  piercing?: boolean;
}

export type HapticType =
  | 'shoot'
  | 'hit'
  | 'kill'
  | 'explosion'
  | 'life_lost'
  | 'weapon_switch'
  | 'weapon_unlock'
  | 'game_over';

export interface LayoutConfig {
  width: number;
  height: number;
  groundTop: number;
  groundBottom: number;
  flyingMinY: number;
  flyingMaxY: number;
}

export interface GameOverData {
  score: number;
  wave: number;
  highScore: number;
  isNewRecord: boolean;
}

export interface TouchControlCallbacks {
  onMoveTo: (y: number) => void;
  onMoveBy: (dy: number) => void;
  onMoveToXY: (x: number, y: number) => void;
  onMoveByX: (dx: number) => void;
  onFire: () => void;
  onSwitchWeapon: () => void;
  onReload: () => void;
  onWeaponTap?: (key: string) => void;
}

export interface HUDCallbacks {
  onPause?: () => void;
  onToggleMute?: () => void;
  onReload?: () => void;
}
