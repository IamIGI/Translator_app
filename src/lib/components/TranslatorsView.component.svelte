<script lang="ts">
  import translatorStore from '$lib/+stores/translator.store';
  import configStore from '$lib/+stores/config.store';
  import LangMenuBig from './LangMenuBig.component.svelte';
  import SourceTranslator from './SourceTranslator.component.svelte';
  import TargetTranslator from './TargetTranslator.component.svelte';
  import translateSVG from '$assets/translate.svg';
  import switchSVG from '$assets/arrows-horizontal.svg';
  import { TranslatorType } from '$lib/models/enums';

  let callForTranslate: boolean = false;

  export let translatedTextData: T_.TranslationLS;

  function handleCallForTranslate() {
    callForTranslate = true;
    const timeoutInstance = setTimeout(() => {
      callForTranslate = false;
      return clearTimeout(timeoutInstance);
    }, 100);
  }
</script>

<div class="wrapper">
  <!-- Language menu navigation on mobile screen -->
  <div class="mobile-lang-menu">
    <button
      class="langButton langButtonActive"
      on:click={() => translatorStore.toggleLangBigMenu(TranslatorType.Source)}
    >
      {translatorStore.getLangItem($translatorStore.selectedSourceLanguage)
        .text}
    </button>
    <button class="mid-button" on:click={translatorStore.swapSelectedLanguages}>
      <img src={switchSVG} alt="switch" />
    </button>
    <button
      class="langButton langButtonActive"
      on:click={() => translatorStore.toggleLangBigMenu(TranslatorType.Target)}
    >
      {translatorStore.getLangItem($translatorStore.selectedTargetLanguage)
        .text}
    </button>
  </div>
  <!-- Translators  -->
  <SourceTranslator
    selectedSourceLanguage={$translatorStore.selectedSourceLanguage}
    selectedTargetLanguage={$translatorStore.selectedTargetLanguage}
    translateOnTimeout={$configStore.translateOnTimeout}
    supportedLanguages={translatorStore.getSupportedLanguageList()}
    translateCall={callForTranslate}
    on:callForTranslate={handleCallForTranslate}
  />
  <div class="mid-buttons">
    <button class="mid-button" on:click={translatorStore.swapSelectedLanguages}>
      <img src={switchSVG} alt="switch" />
    </button>
    <button class="mid-button" on:click={handleCallForTranslate}>
      <img src={translateSVG} alt="translate" />
    </button>
  </div>
  {#if !$configStore.isSmallScreen || $translatorStore.translatedText.length !== 0}
    <TargetTranslator
      selectedLanguage={$translatorStore.selectedTargetLanguage}
      translatedText={$translatorStore.translatedText}
      {translatedTextData}
    />
  {/if}
  <!-- Language menu modal for big menu -->
  {#if $translatorStore.bigLangMenu.isOpen}
    <LangMenuBig
      type={$translatorStore.bigLangMenu.type}
      supportedLanguages={translatorStore.getSupportedLanguageList()}
    />
  {/if}
</div>

<style lang="scss">
  .wrapper {
    height: fit-content;
    position: relative;
    /* outline: 1px solid red; */
    margin: 0 2.5rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.6rem;

    width: calc(100% - 2.5rem);
    max-width: 1600px;

    /* outline: 1px solid red; */
    @media (max-width: 850px) {
      flex-direction: column;
      /* margin: 0 1rem;
      gap: 1rem; */
    }
  }

  .mobile-lang-menu {
    display: none;

    @media (max-width: 650px) {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }

    .langButton {
      min-width: 100px;
      font-size: 14px;
      color: #5f6368;
      font-weight: 500;
      padding: 10px 7px;
      border-bottom: 2px solid transparent;
      cursor: pointer;

      &:hover {
        background-color: var(--main-button-background-color-hover);
        border-bottom: 2px solid var(--color-accent);
      }
    }

    .langButtonActive {
      color: var(--color-accent);
      border-bottom: 2px solid var(--color-accent);
    }
  }

  .mid-buttons {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10rem;

    @media (max-width: 850px) {
      flex-direction: row;
      gap: 5rem;
      /* margin: 0 1rem;
      gap: 1rem; */
    }

    @media (max-width: 650px) {
      display: none;
    }
  }

  .mid-button {
    padding: 10px 10px 7px 10px;
    border-radius: 25%;

    img {
      $size: 25px;
      width: $size;
      height: $size;
      filter: var(--icon-color-filter);
    }

    &:hover {
      /* background-color: rgb(234, 234, 234); */
      background-color: var(--main-button-background-color-hover);
    }
  }
</style>
