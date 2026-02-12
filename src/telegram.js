const tg = window.Telegram?.WebApp;

export function initTelegram() {
  if (!tg) return;
  tg.ready();
  tg.expand();

  // Методы новых версий API могут выбросить ошибку в старых клиентах
  const safeTry = (fn) => { try { fn(); } catch (e) { /* unsupported in this client */ } };

  safeTry(() => tg.requestFullscreen());
  safeTry(() => tg.lockOrientation());
  safeTry(() => tg.disableVerticalSwipes());
  safeTry(() => tg.enableClosingConfirmation());
}

export function getUserName() {
  return tg?.initDataUnsafe?.user?.first_name || 'Hunter';
}

export function getUserId() {
  return tg?.initDataUnsafe?.user?.id || null;
}

export function getTheme() {
  if (!tg) return 'dark';
  return tg.colorScheme || 'dark';
}

export function isTelegram() {
  return !!tg;
}

// Пауза/возобновление игры при сворачивании Telegram
export function onVisibilityChange(onPause, onResume) {
  if (!tg) return;
  if (tg.onEvent) {
    tg.onEvent('deactivated', onPause);
    tg.onEvent('activated', onResume);
  }
}

export function disableClosingConfirmation() {
  try { tg?.disableClosingConfirmation(); } catch (e) { /* unsupported */ }
}

export function enableClosingConfirmation() {
  try { tg?.enableClosingConfirmation(); } catch (e) { /* unsupported */ }
}

// Сохранение/загрузка рекордов через Telegram CloudStorage
export function cloudSaveScore(score) {
  try {
    if (!tg?.CloudStorage) return;
    tg.CloudStorage.setItem('highscore', score.toString(), () => {});
  } catch (e) { /* CloudStorage unsupported */ }
}

export function cloudLoadScore(callback) {
  try {
    if (!tg?.CloudStorage) { callback(0); return; }
    tg.CloudStorage.getItem('highscore', (err, value) => {
      callback((!err && value) ? (parseInt(value, 10) || 0) : 0);
    });
  } catch (e) { callback(0); }
}

// Haptic feedback
export function haptic(type) {
  if (!tg?.HapticFeedback) return;
  switch (type) {
    case 'shoot':
      tg.HapticFeedback.impactOccurred('light');
      break;
    case 'hit':
      tg.HapticFeedback.impactOccurred('medium');
      break;
    case 'kill':
      tg.HapticFeedback.notificationOccurred('success');
      break;
    case 'explosion':
      tg.HapticFeedback.impactOccurred('heavy');
      break;
    case 'life_lost':
      tg.HapticFeedback.notificationOccurred('error');
      break;
    case 'weapon_switch':
      tg.HapticFeedback.selectionChanged();
      break;
    case 'weapon_unlock':
      tg.HapticFeedback.notificationOccurred('success');
      break;
    case 'game_over':
      tg.HapticFeedback.notificationOccurred('error');
      break;
  }
}
