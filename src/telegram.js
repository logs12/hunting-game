const tg = window.Telegram?.WebApp;

export function initTelegram() {
  if (!tg) return;
  tg.ready();
  tg.expand();

  // Полноэкранный режим для игры (Bot API 8.0+)
  if (tg.requestFullscreen) {
    tg.requestFullscreen();
  }

  // Блокировка ориентации — портретный режим
  if (tg.lockOrientation) {
    tg.lockOrientation();
  }

  // Защита от случайного закрытия свайпом
  if (tg.disableVerticalSwipes) {
    tg.disableVerticalSwipes();
  }

  // Защита от случайного закрытия кнопкой «назад»
  if (tg.enableClosingConfirmation) {
    tg.enableClosingConfirmation();
  }
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

// Снять защиту от закрытия (на экране Game Over)
export function disableClosingConfirmation() {
  if (tg?.disableClosingConfirmation) {
    tg.disableClosingConfirmation();
  }
}

export function enableClosingConfirmation() {
  if (tg?.enableClosingConfirmation) {
    tg.enableClosingConfirmation();
  }
}

// Сохранение/загрузка рекордов через Telegram CloudStorage
export function cloudSaveScore(score) {
  if (!tg?.CloudStorage) return;
  tg.CloudStorage.setItem('highscore', score.toString(), (err) => {
    if (err) console.warn('CloudStorage save error:', err);
  });
}

export function cloudLoadScore(callback) {
  if (!tg?.CloudStorage) {
    callback(0);
    return;
  }
  tg.CloudStorage.getItem('highscore', (err, value) => {
    if (err || !value) {
      callback(0);
      return;
    }
    callback(parseInt(value, 10) || 0);
  });
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
