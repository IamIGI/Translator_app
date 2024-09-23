import translatorStore from '$lib/+stores/translator.store';
import { UrlParamsEnum } from '$lib/models/enums';
import notificationsUtils from './notifications.utils';

function getSharedTranslation() {
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has(UrlParamsEnum.TranslationHistory)) return;

  const sharedTranslation = urlParams.get(UrlParamsEnum.TranslationHistory);
  if (!sharedTranslation) return;

  const sharedTranslationObj = JSON.parse(
    sharedTranslation
  ) as T_.SharedTranslation;

  translatorStore.saveSharedTranslation(sharedTranslationObj);
  notificationsUtils.showInformation('Successfully opened shared translation');
}

function createLink(paramName: UrlParamsEnum, paramValue: string) {
  const params = new URLSearchParams({
    [`${paramName}`]: paramValue,
  });

  return `${window.location.origin}/?${params.toString()}`;
}

export default { getSharedTranslation, createLink };
