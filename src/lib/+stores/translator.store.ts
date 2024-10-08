import { TranslateModelSourceEnum } from '$lib/api/translator/generated';
import { TranslatorType } from '$lib/models/enums';
import localStorageDataUtils, {
  LSKey,
} from '$lib/utils/localStorageData.utils';
import { get, writable } from 'svelte/store';

export interface TranslatorStore {
  supportedLanguages: T_.LangItem[];
  bigLangMenu: { isOpen: boolean; type: TranslatorType };
  selectedSourceLanguage: TranslateModelSourceEnum;
  selectedTargetLanguage: TranslateModelSourceEnum;
  langShortMenu: T_.LangItem[];
  translatedText: string;
  sourceText: string;
  userHistory: T_.TranslationLS[];
  userFavorites: T_.TranslationLS[];
}

function getInitLangShortMenu(
  supportedLanguages: T_.LangItem[],
  sourceLanguage: TranslateModelSourceEnum
) {
  //Set constants languageItems in menu
  const langShortMenu: T_.LangItem[] = [
    {
      text: 'Auto Detect',
      value: TranslateModelSourceEnum.Auto,
    },
    {
      text: 'English',
      value: TranslateModelSourceEnum.En,
    },
  ];

  // Add language detected from localization
  const detectedUserLang = supportedLanguages.find(
    (lang) => lang.value === sourceLanguage
  );

  if (detectedUserLang) {
    const userLanguage = {
      text: detectedUserLang.text,
      value: sourceLanguage,
    };
    langShortMenu.splice(1, 0, userLanguage);
    langShortMenu.push();
  }
  // Fill rest of the languageMenu items
  const slicedArray = supportedLanguages.slice(2, -1);
  for (let index = 0; index < 1; index++) {
    langShortMenu.push(slicedArray[index]);
  }

  return langShortMenu;
}

const translatorStore = () => {
  const store = writable<TranslatorStore>();
  const { subscribe, update, set } = store;

  async function setInitData(
    supportedLanguages: T_.LangItem[],
    sourceLanguage: TranslateModelSourceEnum
  ) {
    const initData: TranslatorStore = {
      supportedLanguages,
      langShortMenu: getInitLangShortMenu(supportedLanguages, sourceLanguage),
      bigLangMenu: { isOpen: false, type: TranslatorType.Source },
      selectedSourceLanguage: sourceLanguage,
      selectedTargetLanguage: TranslateModelSourceEnum.En,
      translatedText: '',
      sourceText: '',
      userHistory: localStorageDataUtils.getData(LSKey.userHistory),
      userFavorites: localStorageDataUtils.getData(LSKey.userFavorites),
    };

    set(initData);
  }

  function getSupportedLanguageList(): T_.LangItem[] {
    return get(store).supportedLanguages;
  }

  function getLanguageShortMenuList(
    selectedLanguage: TranslateModelSourceEnum
  ): T_.LangItem[] {
    const currentLangShortMenu = get(store).langShortMenu;
    const isSelectedItemAlreadyIn = Boolean(
      currentLangShortMenu.find(
        (langItem) => langItem.value === selectedLanguage
      )
    );
    if (isSelectedItemAlreadyIn) return currentLangShortMenu;

    const supportedLanguages = getSupportedLanguageList();

    const menuList: T_.LangItem[] = [
      {
        text: 'Auto Detect',
        value: TranslateModelSourceEnum.Auto,
      },
      {
        text: 'English',
        value: TranslateModelSourceEnum.En,
      },
      supportedLanguages.find((item) => item.value == selectedLanguage)!,
    ];

    const supportedLanguagesFiltered = supportedLanguages.filter(
      (langItem) =>
        langItem.value !== selectedLanguage &&
        langItem.value !== TranslateModelSourceEnum.Auto
    )[0];
    menuList.push(supportedLanguagesFiltered);

    return menuList;
  }

  function toggleLangBigMenu(type: TranslatorType): void {
    update((state) => {
      return {
        ...state,
        bigLangMenu: { isOpen: !state.bigLangMenu.isOpen, type },
      };
    });
  }
  function closeLangBigMenu(): void {
    update((state) => {
      return {
        ...state,
        bigLangMenu: { ...state.bigLangMenu, isOpen: false },
      };
    });
  }

  function selectLanguage(
    type: TranslatorType,
    value: TranslateModelSourceEnum
  ) {
    update((state) => {
      if (type === TranslatorType.Source) {
        return { ...state, selectedSourceLanguage: value };
      } else {
        return { ...state, selectedTargetLanguage: value };
      }
    });
  }

  function swapSelectedLanguages() {
    //Swap text
    const { sourceText, translatedText } = get(store);
    updateTranslatedText(translatedText, sourceText);

    //Swap buttons
    update((state) => {
      const tempSourceLanguage = state.selectedSourceLanguage;
      state.selectedSourceLanguage = state.selectedTargetLanguage;
      state.selectedTargetLanguage = tempSourceLanguage;

      return state;
    });
  }

  function getSelectedSourceLanguage() {
    return get(store).selectedSourceLanguage;
  }

  function updateTranslatedText(provided: string, translated: string) {
    update((state) => {
      return { ...state, translatedText: translated, sourceText: provided };
    });
  }

  function setUserHistory(history: T_.TranslationLS[]) {
    update((state) => {
      return {
        ...state,
        userHistory: history,
      };
    });
  }

  function setUserFavorites(history: T_.TranslationLS[]) {
    update((state) => {
      return {
        ...state,
        userFavorites: history,
      };
    });
  }

  function getUserHistoryItem(id: string): T_.TranslationLS | undefined {
    const userHistoryData = get(store).userHistory;
    if (userHistoryData.length === 0) return undefined;
    return userHistoryData.find((item) => item.id === id);
  }

  function getUserFavItem(id: string): T_.TranslationLS | undefined {
    const userHistoryData = get(store).userFavorites;
    if (userHistoryData.length === 0) return undefined;
    return userHistoryData.find((item) => item.id === id);
  }

  function getObjectFroSharedTranslation(): T_.SharedTranslation {
    const {
      sourceText,
      translatedText,
      selectedSourceLanguage,
      selectedTargetLanguage,
    } = get(store);
    return {
      source: { lang: selectedSourceLanguage, text: sourceText },
      target: { lang: selectedTargetLanguage, text: translatedText },
    };
  }

  function saveSharedTranslation(data: T_.SharedTranslation) {
    update((prev) => {
      return {
        ...prev,
        selectedSourceLanguage: data.source.lang,
        selectedTargetLanguage: data.target.lang,
        sourceText: data.source.text,
        translatedText: data.target.text,
      };
    });
  }

  function getLangItem(lang: TranslateModelSourceEnum): T_.LangItem {
    const selectedLangItem = get(store).supportedLanguages.find(
      (langItem) => langItem.value === lang
    );
    if (!selectedLangItem) {
      console.warn(
        'Could not found selected lang, return default language instead: "English"'
      );
      return {
        text: 'English',
        value: TranslateModelSourceEnum.En,
      } as T_.LangItem;
    }
    return selectedLangItem;
  }

  return {
    subscribe,
    setInitData,
    getSupportedLanguageList,
    getLanguageShortMenuList,
    toggleLangBigMenu,
    selectLanguage,
    getSelectedSourceLanguage,
    updateTranslatedText,
    closeLangBigMenu,
    setUserHistory,
    swapSelectedLanguages,
    setUserFavorites,
    getUserHistoryItem,
    getUserFavItem,
    getObjectFroSharedTranslation,
    saveSharedTranslation,
    getLangItem,
  };
};

export default translatorStore();
