import { getSupportedLanguage } from '$lib/api/translator/translator.api.service';

export async function load() {
  const supportedLangs = await getSupportedLanguage();

  return {
    supportedLangs,
  };
}
