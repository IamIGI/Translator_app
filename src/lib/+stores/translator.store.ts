import { TranslateModelSourceEnum } from '$lib/api/translator/generated';
import { TranslatorType } from '$lib/models/enums';
import localStorageDataUtils, {
  LSKey,
} from '$lib/utils/localStorageData.utils';
import { get, writable } from 'svelte/store';

export interface TranslatorStore {
  configuration: {
    translateOnTimeout: boolean;
  };
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

function getInitLangShortMenu(supportedLanguages: T_.LangItem[]) {
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
  const slicedArray = supportedLanguages.slice(2, -1);
  for (let index = 0; index < 2; index++) {
    langShortMenu.push(slicedArray[index]);
  }

  return langShortMenu;
}

const translatorStore = () => {
  const store = writable<TranslatorStore>();
  const { subscribe, update, set } = store;

  async function setInitData(supportedLanguages: T_.LangItem[]) {
    const initData: TranslatorStore = {
      configuration: {
        translateOnTimeout: false,
      },
      supportedLanguages,
      langShortMenu: getInitLangShortMenu(supportedLanguages),
      bigLangMenu: { isOpen: false, type: TranslatorType.Source },
      selectedSourceLanguage: TranslateModelSourceEnum.Auto,
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
    console.log('getLanguageShortMenuList');
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
    console.log('getUserFavItem: ', id);
    const userHistoryData = get(store).userFavorites;
    if (userHistoryData.length === 0) return undefined;
    return userHistoryData.find((item) => item.id === id);
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
  };
};

export default translatorStore();
