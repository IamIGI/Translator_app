/* eslint-disable @typescript-eslint/no-explicit-any */
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { TranslateModelSourceEnum } from '$lib/api/translator/generated';

declare global {
  namespace T_ {
    interface Translation {
      details: any;
      translations: {
        source: TranslateModelSourceEnum;
        target: TranslateModelTargetEnum;
        text: string;
        translation: string;
      };
    }

    interface TranslationLS {
      date: string;
      source: { id: TranslateModelSourceEnum; lang: string };
      target: { id: TranslateModelSourceEnum; lang: string };
      text: string;
      translation: string;
    }

    interface SupportedLanguagesData {
      'Auto Detect': TranslateModelSourceEnum;
      Afrikaans: TranslateModelSourceEnum;
      Albanian: TranslateModelSourceEnum;
      Amharic: TranslateModelSourceEnum;
      Arabic: TranslateModelSourceEnum;
      Armenian: TranslateModelSourceEnum;
      Azerbaijani: TranslateModelSourceEnum;
      Basque: TranslateModelSourceEnum;
      Belarusian: TranslateModelSourceEnum;
      Bengali: TranslateModelSourceEnum;
      Bosnian: TranslateModelSourceEnum;
      Bulgarian: TranslateModelSourceEnum;
      Catalan: TranslateModelSourceEnum;
      Cebuano: TranslateModelSourceEnum;
      'Chinese (Simplified)': TranslateModelSourceEnum;
      'Chinese (Traditional)': TranslateModelSourceEnum;
      Corsican: TranslateModelSourceEnum;
      Croatian: TranslateModelSourceEnum;
      Czech: TranslateModelSourceEnum;
      Danish: TranslateModelSourceEnum;
      Dutch: TranslateModelSourceEnum;
      English: TranslateModelSourceEnum;
      Esperanto: TranslateModelSourceEnum;
      Estonian: TranslateModelSourceEnum;
      Finnish: TranslateModelSourceEnum;
      French: TranslateModelSourceEnum;
      Frisian: TranslateModelSourceEnum;
      Galician: TranslateModelSourceEnum;
      Georgian: TranslateModelSourceEnum;
      German: TranslateModelSourceEnum;
      Greek: TranslateModelSourceEnum;
      Gujarati: TranslateModelSourceEnum;
      'Haitian Creole': TranslateModelSourceEnum;
      Hausa: TranslateModelSourceEnum;
      Hawaiian: TranslateModelSourceEnum;
      Hebrew: TranslateModelSourceEnum;
      Hindi: TranslateModelSourceEnum;
      Hmong: TranslateModelSourceEnum;
      Hungarian: TranslateModelSourceEnum;
      Icelandic: TranslateModelSourceEnum;
      Igbo: TranslateModelSourceEnum;
      Indonesian: TranslateModelSourceEnum;
      Irish: TranslateModelSourceEnum;
      Italian: TranslateModelSourceEnum;
      Japanese: TranslateModelSourceEnum;
      Javanese: TranslateModelSourceEnum;
      Kannada: TranslateModelSourceEnum;
      Kazakh: TranslateModelSourceEnum;
      Khmer: TranslateModelSourceEnum;
      Kinyarwanda: TranslateModelSourceEnum;
      Korean: TranslateModelSourceEnum;
      'Kurdish (Kurmanji)': TranslateModelSourceEnum;
      'Kurdish (Sorani)': TranslateModelSourceEnum;
      Kyrgyz: TranslateModelSourceEnum;
      Lao: TranslateModelSourceEnum;
      Latin: TranslateModelSourceEnum;
      Latvian: TranslateModelSourceEnum;
      Lithuanian: TranslateModelSourceEnum;
      Luxembourgish: TranslateModelSourceEnum;
      Macedonian: TranslateModelSourceEnum;
      Malagasy: TranslateModelSourceEnum;
      Malay: TranslateModelSourceEnum;
      Malayalam: TranslateModelSourceEnum;
      Maltese: TranslateModelSourceEnum;
      Maori: TranslateModelSourceEnum;
      Marathi: TranslateModelSourceEnum;
      Mongolian: TranslateModelSourceEnum;
      'Myanmar (Burmese)': TranslateModelSourceEnum;
      Nepali: TranslateModelSourceEnum;
      Norwegian: TranslateModelSourceEnum;
      'Nyanja (Chichewa)': TranslateModelSourceEnum;
      'Odia (Oriya)': TranslateModelSourceEnum;
      Pashto: TranslateModelSourceEnum;
      Persian: TranslateModelSourceEnum;
      Polish: TranslateModelSourceEnum;
      'Portuguese (Portugal, Brazil)': TranslateModelSourceEnum;
      Punjabi: TranslateModelSourceEnum;
      Romanian: TranslateModelSourceEnum;
      Russian: TranslateModelSourceEnum;
      Samoan: TranslateModelSourceEnum;
      'Scots Gaelic': TranslateModelSourceEnum;
      Serbian: TranslateModelSourceEnum;
      Sesotho: TranslateModelSourceEnum;
      Shona: TranslateModelSourceEnum;
      Sindhi: TranslateModelSourceEnum;
      'Sinhala (Sinhalese)': TranslateModelSourceEnum;
      Slovak: TranslateModelSourceEnum;
      Slovenian: TranslateModelSourceEnum;
      Somali: TranslateModelSourceEnum;
      Spanish: TranslateModelSourceEnum;
      Sundanese: TranslateModelSourceEnum;
      Swahili: TranslateModelSourceEnum;
      Swedish: TranslateModelSourceEnum;
      'Tagalog (Filipino)': TranslateModelSourceEnum;
      Tajik: TranslateModelSourceEnum;
      Tamil: TranslateModelSourceEnum;
      Tatar: TranslateModelSourceEnum;
      Telugu: TranslateModelSourceEnum;
      Thai: TranslateModelSourceEnum;
      Turkish: TranslateModelSourceEnum;
      Turkmen: TranslateModelSourceEnum;
      Ukrainian: TranslateModelSourceEnum;
      Urdu: TranslateModelSourceEnum;
      Uyghur: TranslateModelSourceEnum;
      Uzbek: TranslateModelSourceEnum;
      Vietnamese: TranslateModelSourceEnum;
      Welsh: TranslateModelSourceEnum;
      Xhosa: TranslateModelSourceEnum;
      Yiddish: TranslateModelSourceEnum;
      Yoruba: TranslateModelSourceEnum;
      Zulu: TranslateModelSourceEnum;
    }

    interface LangItem {
      value: TranslateModelSourceEnum;
      text: string;
    }
  }
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}
