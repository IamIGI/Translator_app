import type { JsonGet200Response } from '$lib/api/ipapi/generated';
// import ipapiApi from '$lib/api/ipapi/ipapi.api.config';
import { TranslateModelSourceEnum } from '$lib/api/translator/generated';
import { LOCALIZATION_PL_MOCK } from '$lib/mocks/ipapi.mock';

import { get, writable } from 'svelte/store';

export interface ConfigStore {
  translateOnTimeout: boolean;
  localization: JsonGet200Response;
  isDayMode: boolean;
  isSmallScreen: boolean;
}

function checkForDayNightMode() {
  //hours
  const beginNightMode = 19; //7pm
  const endNightMode = 7; //7am

  const currentHour = new Date().getHours();

  if (currentHour >= beginNightMode || currentHour < endNightMode) {
    return false; //isNightMode
  } else {
    return true; //isDayMode
  }
}

const configStore = () => {
  const store = writable<ConfigStore>();
  const { subscribe, set, update } = store;

  async function setInitData() {
    const localizationData = LOCALIZATION_PL_MOCK;
    // const localizationData = await ipapiApi.ipapiService.jsonGet();
    // const response = await fetch(`https://ipapi.co/json/`);
    // const localizationData = await response.json();

    const initData: ConfigStore = {
      translateOnTimeout: false,
      localization: localizationData,
      isDayMode: checkForDayNightMode(),
      isSmallScreen: false,
    };

    set(initData);
  }

  function getCountryCode(): TranslateModelSourceEnum {
    const localizationData = get(store).localization;

    if (!localizationData.country) return TranslateModelSourceEnum.Auto;
    return localizationData.country.toLowerCase() as unknown as TranslateModelSourceEnum;
  }

  function updateDayNightMode(isDayMode: boolean) {
    update((state) => {
      state.isDayMode = isDayMode;
      return state;
    });
  }

  function updateIsSmallScreen(value: boolean) {
    update((state) => {
      state.isSmallScreen = value;
      return state;
    });
  }

  function isSmallScreen() {
    return get(store).isSmallScreen;
  }

  return {
    subscribe,
    setInitData,
    getCountryCode,
    updateDayNightMode,
    updateIsSmallScreen,
    isSmallScreen,
  };
};

export default configStore();
