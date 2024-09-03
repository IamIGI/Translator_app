enum LSKey {
  userHistory = 'userTranslateHistory',
}

function saveUserTranslation(translation: T_.TranslationLS) {
  console.log('saveUserTranslation');
  if (typeof localStorage === 'undefined') return;

  const existingHistory = localStorage.getItem(LSKey.userHistory);
  const historyArray: T_.TranslationLS[] = existingHistory
    ? JSON.parse(existingHistory)
    : [];
  historyArray.push(translation);
  localStorage.setItem(LSKey.userHistory, JSON.stringify(historyArray));
}

function getUserTranslationHistory() {
  console.log('getUserTranslationHistory');
  if (typeof localStorage === 'undefined') return [];

  const data = localStorage.getItem(LSKey.userHistory);
  if (!data) return [];

  return JSON.parse(data) as T_.TranslationLS[];
}

export default {
  saveUserTranslation,
  getUserTranslationHistory,
};
