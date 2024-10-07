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
  import localStorageDataUtils, {
    LSKey,
  } from '$lib/utils/localStorageData.utils';
  import Keyboard from 'svelte-keyboard';
  import keyboardHandler from '$lib/utils/keyboard.utils';
  import { createEventDispatcher } from 'svelte';

  export let translateOnTimeout: boolean;
  export let selectedSourceLanguage: TranslateModelSourceEnum;
  export let selectedTargetLanguage: TranslateModelSourceEnum;
  export let supportedLanguages: T_.LangItem[];
  export let translateCall: boolean;

  let searchTimeout: number;
  let isKeyboardVisible: boolean = false;

  let text: string = '';
  let textAreaRef: HTMLTextAreaElement | null = null;

  $: text, translateOnTimeout && translateTexOnKeyStroke();
  $: translateCall, handleCallForTranslate();

  const dispatch = createEventDispatcher<{ callForTranslate: undefined }>();

  function handleCallForTranslate() {
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
    if (isKeyboardVisible) {
      event.preventDefault(); // Block typing from the physical keyboard
    }
    if (event.key === 'Enter') await translateText();
  }

  async function translateText() {
    if (text.length === 0) return;

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

      supportedLanguages
    );
    const userHistory = localStorageDataUtils.saveData(
      LSKey.userHistory,
      LS_payload
    );
    translatorStore.setUserHistory(userHistory);
  }

  function clearText() {
    text = '';
    translatorStore.updateTranslatedText('', '');
  }

  function onShowKeyboard(e: CustomEvent<boolean>) {
    console.log(e.detail);
    isKeyboardVisible = e.detail;
  }

  const onKeydown = async (event: CustomEvent<string>) => {
    if (!textAreaRef) return;
    if (event.detail === 'Enter') {
      await translateText();
      return;
    }
    text = keyboardHandler(textAreaRef, text, event.detail);
  };

  translatorStore.subscribe((state) => {
    const { sourceText, translatedText } = state;
    if (translatedText !== '' && sourceText !== text) text = sourceText;
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
      bind:this={textAreaRef}
      name="translator"
      bind:value={text}
      on:keydown={handleEnter}
      maxlength={CONSTS.maxTextSize}
      placeholder="Type your text here... (max 500 characters)"
    />
    {#if text.length > 0}
      <button class="remove-mark" on:click={() => clearText()}>
        <img src={xSymbolSVG} alt="removeMark" />
      </button>
    {/if}
    {#if isKeyboardVisible}
      <div class="keyboard-wrapper">
        <Keyboard
          on:keydown={onKeydown}
          --background="#cdcdcd"
          --active-background="#c2c2c2"
          --min-width="3rem"
        />
      </div>
    {/if}
    <TranslatorOptions
      letterCounter={text.length}
      maxTextSize={CONSTS.maxTextSize}
      type={TranslatorType.Source}
      on:showKeyboard={onShowKeyboard}
      on:callForTranslate={() => dispatch('callForTranslate')}
    />
  </div>
</div>

<style lang="scss">
  .wrapper {
    /* outline: 1px solid blue; */
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 400px;
    @media (max-width: 850px) {
      width: 100%;
    }
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
    border-radius: var(--main-border-radius);
    padding: 0.5rem;
    background-color: var(--main-second-background-color);

    textarea {
      border: none;
      flex: 1;
      width: calc(100% - 35px);

      resize: none;
      outline: none;
      font-size: var(--font-size-normal);
      //   border: 1px solid red;
      margin-right: 35px;
      background-color: var(--main-second-background-color);
    }
  }

  .keyboard-wrapper {
    z-index: 3;
    padding: 10px;
    background-color: var(--main-second-background-color);
    position: absolute;
    bottom: -250px;
    left: 150px;
  }

  .remove-mark {
    position: absolute;
    top: 10px;
    right: 12px;
    background-color: transparent;
    cursor: pointer;
    border-radius: 25%;
    padding: 5px 3px 3px 5px;

    &:hover {
      background-color: rgb(231, 172, 70);
      color: white;
      border-bottom: 1px solid rgba(250, 249, 249, 0.12);
    }

    img {
      height: 20px;
      width: 20px;
      background-color: transparent;
      filter: var(--icon-color-filter);
    }
  }
</style>
