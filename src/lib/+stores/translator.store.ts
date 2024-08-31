import { get, writable } from 'svelte/store';

export interface TranslatorStore {
  supportedLanguages: T_.LangItem[];
  isLangMenuBigOpen: boolean;
}

const translatorStore = () => {
  const store = writable<TranslatorStore>();
  const { subscribe, update, set } = store;

  async function setInitData(supportedLanguages: T_.LangItem[]) {
    console.log('setInitData');
    console.log(supportedLanguages);
    const initData: TranslatorStore = {
      supportedLanguages,
      isLangMenuBigOpen: false,
    };
    set(initData);
  }

  function getSupportedLanguageList(): T_.LangItem[] {
    return get(store).supportedLanguages;
  }

  function getLanguageShortMenuList(): T_.LangItem[] {
    const supportedLanguages = getSupportedLanguageList();
    return supportedLanguages.slice(0, 4);
  }

  function toggleLangBigMenu(): void {
    update((state) => {
      return { ...state, isLangMenuBigOpen: !state.isLangMenuBigOpen };
    });
  }

  return {
    subscribe,
    setInitData,
    getSupportedLanguageList,
    getLanguageShortMenuList,
    toggleLangBigMenu: toggleLangBigMenu,
  };
};

export default translatorStore();
