import sortUtils from './sort.utils';

export enum LSKey {
  userHistory = 'userTranslateHistory',
  userFavorites = 'userTranslatedFavorites',
}

function saveData(
  key: LSKey,
  translation: T_.TranslationLS
): T_.TranslationLS[] {
  console.log('saveData');
  const historyArray = getData(key);

  historyArray.unshift(translation);
  localStorage.setItem(key, JSON.stringify(historyArray));

  return historyArray;
}

function getData(key: LSKey): T_.TranslationLS[] {
  console.log('getData');
  if (typeof localStorage === 'undefined') return [];

  const data = localStorage.getItem(key);
  if (!data) return [];

  const parsedData = JSON.parse(data);
  const sortedData = sortUtils.sortByDate(
    parsedData,
    'newest'
  ) as unknown as T_.TranslationLS[];
  return sortedData;
}

function deleteItemFromData(key: LSKey, id: string): T_.TranslationLS[] {
  console.log('deleteItemFromData');
  const data = getData(key);
  const updatedArray = data.filter((item) => item.id !== id);
  localStorage.setItem(key, JSON.stringify(updatedArray));

  return updatedArray;
}

export default {
  saveData,
  getData,
  deleteItemFromData,
};
