import { get, writable } from 'svelte/store';

export interface TranslatorStore {
  supportedLanguages: T_.LangItem[];
}

const translatorStore = () => {
  const store = writable<TranslatorStore>();
  const { subscribe, set } = store;

  async function setInitData(supportedLanguages: T_.LangItem[]) {
    console.log('setInitData');
    const initData: TranslatorStore = {
      supportedLanguages,
    };
    set(initData);
  }

  function getSupportedLanguageList() {
    return get(store).supportedLanguages;
  }

  function getLanguageShortMenuList() {
    const supportedLanguages = getSupportedLanguageList();
    return supportedLanguages.slice(0, 4);
  }

  return {
    subscribe,
    setInitData,
    getSupportedLanguageList,
    getLanguageShortMenuList,
  };
};

export default translatorStore();
