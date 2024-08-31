import { SUPPORTED_LANGUAGES_MOCKS } from '$lib/mocks/translator.mock';
import type { TranslateModelSourceEnum } from './generated';
import translateApi from './translator.api.config';

export async function getSupportedLanguage(): Promise<T_.LangItem[]> {
  // const response =
  //   await translateApi.translateService.supportedLanguagesSupportedLanguagesGet();

  const response = { supported_languages: SUPPORTED_LANGUAGES_MOCKS };

  const transformedLanguageArray: T_.LangItem[] = Object.entries(
    response.supported_languages
  ).map(([key, value]) => ({
    text: key,
    value: value as TranslateModelSourceEnum, // Assuming TranslateModelSourceEnum is similar to a string
  }));

  return transformedLanguageArray;
}

export async function translate(
  text: string,
  source: TranslateModelSourceEnum,
  target: TranslateModelSourceEnum
): Promise<T_.Translation> {
  const payload = {
    text,
    source,
    target,
  };
  const response = (await translateApi.translateService.translateTranslatePost(
    payload
  )) as T_.Translation;

  return response;
}
