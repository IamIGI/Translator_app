import translatorStore from '$lib/+stores/translator.store';
import { getSupportedLanguage } from '$lib/api/translator/translator.api.service';

export async function load() {
  const supportedLanguages = await getSupportedLanguage();

  translatorStore.setInitData(supportedLanguages);
}
