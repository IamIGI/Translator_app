<script lang="ts">
  import { CONSTS } from '$lib/CONSTS';
  import { TranslatorType } from '$lib/models/enums';
  import LanguageMenu from './LanguageMenu.component.svelte';
  import TranslatorOptions from './TranslatorOptions.component.svelte';
  import xSymbolSVG from '$assets/xSymbol.svg';
  import translatorStore from '$lib/+stores/translator.store';
  import { TranslateModelSourceEnum } from '$lib/api/translator/generated';
  import { translate } from '$lib/api/translator/translator.api.service';
  import payloadMiddlewareUtils from '$lib/utils/payloadMiddleware.utils';
  import localStorageDataUtils from '$lib/utils/localStorageData.utils';

  export let translateOnTimeout: boolean;
  export let selectedSourceLanguage: TranslateModelSourceEnum;
  export let selectedTargetLanguage: TranslateModelSourceEnum;
  export let supportedLanguages: T_.LangItem[];
  export let translateCall: boolean;

  let text: string = '';

  let searchTimeout: number;

  $: text, translateOnTimeout && translateTexOnKeyStroke();
  $: translateCall, handleCallForTranslate();

  function handleCallForTranslate() {
    console.log('translateCall: ', translateCall);
    if (translateCall) translateText();
  }

  function translateTexOnKeyStroke() {
    if (text.length >= 2) {
      if (searchTimeout) clearTimeout(searchTimeout);

      searchTimeout = setTimeout(async () => {
        const response = await translate(
          text,
          selectedSourceLanguage,
          selectedTargetLanguage
        );
        translatorStore.updateTranslatedText(
          text,
          response.translations.translation
        );
      }, 200);
    }
  }

  //When user hit Enter button, then save it to user history
  async function handleEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') await translateText();
  }

  async function translateText() {
    const timestamp = new Date();
    const response = await translate(
      text,
      selectedSourceLanguage,
      selectedTargetLanguage
    );
    translatorStore.updateTranslatedText(
      text,
      response.translations.translation
    );

    const LS_payload = payloadMiddlewareUtils.translation_TranslationLS(
      response,
      timestamp,
      supportedLanguages
    );
    const userHistory = localStorageDataUtils.saveUserTranslation(LS_payload);
    translatorStore.setUserHistory(userHistory);
  }

  function clearText() {
    text = '';
    translatorStore.updateTranslatedText('', '');
  }

  translatorStore.subscribe((state) => {
    const { sourceText } = state;
    if (sourceText !== text) text = sourceText;
  });
</script>

<div class="wrapper">
  <LanguageMenu
    langShortMenu={translatorStore.getLanguageShortMenuList(
      selectedSourceLanguage
    )}
    selectedLanguage={selectedSourceLanguage}
    type={TranslatorType.Source}
  />
  <div class="translator-wrapper">
    <textarea
      name="translator"
      bind:value={text}
      on:keydown={handleEnter}
      maxlength={CONSTS.maxTextSize}
      placeholder="Type your text here... (max 500 characters)"
    />
    {#if text.length > 0}
      <button class="remove-mark" on:click={() => clearText()}>
        <img src={xSymbolSVG} class="svg-icon" alt="removeMark" />
      </button>
    {/if}
    <TranslatorOptions
      letterCounter={text.length}
      maxTextSize={CONSTS.maxTextSize}
      type={TranslatorType.Source}
    />
  </div>
</div>

<style lang="scss">
  .wrapper {
    outline: 1px solid blue;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 400px;
  }

  .translator-wrapper {
    position: relative;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
    max-height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: var(--border-radius);
    padding: 0.5rem;

    textarea {
      border: none;
      flex: 1;
      width: calc(100% - 35px);

      resize: none;
      outline: none;
      font-size: var(--font-size-normal);
      //   border: 1px solid red;
      margin-right: 35px;
    }
  }

  .remove-mark {
    position: absolute;
    top: 10px;
    right: 12px;
    background-color: transparent;
    cursor: pointer;

    img {
      height: 23px;
      width: 23px;
      background-color: transparent;
    }
  }
</style>
