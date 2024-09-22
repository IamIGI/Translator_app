import type { JsonGet200Response } from '$lib/api/ipapi/generated';
import ipapiApi from '$lib/api/ipapi/ipapi.api.config';
import { TranslateModelSourceEnum } from '$lib/api/translator/generated';
import { get, writable } from 'svelte/store';

export interface ConfigStore {
  translateOnTimeout: boolean;
  localization: JsonGet200Response;
}

const configStore = () => {
  const store = writable<ConfigStore>();
  const { subscribe, set } = store;

  async function setInitData() {
    const localizationData = await ipapiApi.ipapiService.jsonGet();
    // const response = await fetch(`https://ipapi.co/json/`);
    // const localizationData = await response.json();

    const initData: ConfigStore = {
      translateOnTimeout: false,
      localization: localizationData,
    };

    set(initData);
  }

  function getCountryCode(): TranslateModelSourceEnum {
    const localizationData = get(store).localization;

    if (!localizationData.country) return TranslateModelSourceEnum.Auto;
    return localizationData.country.toLowerCase() as unknown as TranslateModelSourceEnum;
  }

  return {
    subscribe,
    setInitData,
    getCountryCode,
  };
};

export default configStore();
