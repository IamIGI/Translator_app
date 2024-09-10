import sortUtils from './sort.utils';

enum LSKey {
  userHistory = 'userTranslateHistory',
}

function saveUserTranslation(
  translation: T_.TranslationLS
): T_.TranslationLS[] {
  console.log('saveUserTranslation');
  const historyArray = getUserTranslationHistory();

  historyArray.unshift(translation);
  localStorage.setItem(LSKey.userHistory, JSON.stringify(historyArray));

  return historyArray;
}

function getUserTranslationHistory(): T_.TranslationLS[] {
  console.log('getUserTranslationHistory');
  if (typeof localStorage === 'undefined') return [];

  const data = localStorage.getItem(LSKey.userHistory);
  if (!data) return [];

  const parsedData = JSON.parse(data);
  const sortedData = sortUtils.sortByDate(
    parsedData,
    'newest'
  ) as unknown as T_.TranslationLS[];
  return sortedData;
}

function deleteTranslationHistoryItem(id: string): T_.TranslationLS[] {
  console.log('deleteTranslationHistoryItem');
  const historyArray = getUserTranslationHistory();
  const updatedHistoryArray = historyArray.filter((item) => item.id !== id);
  localStorage.setItem(LSKey.userHistory, JSON.stringify(updatedHistoryArray));

  return updatedHistoryArray;
}

export default {
  saveUserTranslation,
  getUserTranslationHistory,
  deleteTranslationHistoryItem,
};
