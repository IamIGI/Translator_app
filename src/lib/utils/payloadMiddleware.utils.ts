import type { TranslateModelSourceEnum } from '$lib/api/translator/generated';

function translation_TranslationLS(
  translation: T_.Translation,
  langList: T_.LangItem[]
): T_.TranslationLS {
  const langName = (searched: TranslateModelSourceEnum) => {
    const name = langList.find((lang) => lang.value === searched)?.text;
    if (!name) {
      console.error('Language name not find');
      return 'unknown';
    }
    return name;
  };

  const {
    source,
    target,
    text,
    translation: translatedText,
  } = translation.translations;

  const targetObject: T_.TranslationLS = {
    id: crypto.randomUUID(),
    date: new Date(),
    source: { id: source, lang: langName(source) },
    target: { id: target, lang: langName(target) },
    text,
    translation: translatedText,
  };

  return targetObject;
}

export default {
  translation_TranslationLS,
};
