<script lang="ts">
  import translatorStore from '$lib/+stores/translator.store';
  import configStore from '$lib/+stores/config.store';
  import LangMenuBig from './LangMenuBig.component.svelte';
  import SourceTranslator from './SourceTranslator.component.svelte';
  import TargetTranslator from './TargetTranslator.component.svelte';
  import translateSVG from '$assets/translate.svg';
  import switchSVG from '$assets/arrows-horizontal.svg';
  import { TranslatorType } from '$lib/models/enums';
  import { createEventDispatcher } from 'svelte';

  export let translatedTextData: T_.TranslationLS;
  export let isDayMode: boolean;
  export let nightSVG: string;
  export let daySVG: string;

  let callForTranslate: boolean = false;

  const dispatch = createEventDispatcher<{ dateDayNightMode: boolean }>();

  function updateDayNightMode() {
    dispatch('dateDayNightMode', !isDayMode);
  }

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
  <div class="small-navigation-menu">
    <div class="mobile-lang-menu">
      <button
        class="langButton langButtonActive"
        on:click={() =>
          translatorStore.toggleLangBigMenu(TranslatorType.Source)}
      >
        {translatorStore.getLangItem($translatorStore.selectedSourceLanguage)
          .text}
      </button>
      <button
        class="mid-button"
        on:click={translatorStore.swapSelectedLanguages}
      >
        <img src={switchSVG} alt="switch" />
      </button>
      <button
        class="langButton langButtonActive"
        on:click={() =>
          translatorStore.toggleLangBigMenu(TranslatorType.Target)}
      >
        {translatorStore.getLangItem($translatorStore.selectedTargetLanguage)
          .text}
      </button>
    </div>
    <button on:click={updateDayNightMode}>
      <div class="icon-container">
        {#if isDayMode}
          <img class="svg-icon day" src={nightSVG} alt="day" />
        {:else}
          <img class="svg-icon night" src={daySVG} alt="night" />
        {/if}
      </div>
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
      //Navigation is disabled;
      padding-top: 1rem;
      flex-direction: column;
      /* margin: 0 1rem;
      gap: 1rem; */
    }
  }

  .small-navigation-menu {
    display: none;
    @media (max-width: 650px) {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
  }

  .mobile-lang-menu {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    .langButton {
      min-width: 100px;
      height: 45px;
      font-size: 16px;
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

  .icon-container {
    position: relative;
    height: 40px;
    width: 40px;
    background-color: 'black';
  }

  .svg-icon {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    /* background-color: #151411; */
  }

  .day {
    background-color: #fff;
  }
  .night {
    background-color: #262522;
  }
</style>
