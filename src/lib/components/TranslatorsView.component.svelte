<script lang="ts">
  import translatorStore from '$lib/+stores/translator.store';
  import LangMenuBig from './LangMenuBig.component.svelte';
  import SourceTranslator from './SourceTranslator.component.svelte';
  import TargetTranslator from './TargetTranslator.component.svelte';
  import translateSVG from '$assets/translate.svg';
  import switchSVG from '$assets/arrows-horizontal.svg';

  let callForTranslate: boolean = false;
  let translatedTextData: T_.TranslationLS;

  function handleCallForTranslate() {
    callForTranslate = true;
    const timeoutInstance = setTimeout(() => {
      callForTranslate = false;
      return clearTimeout(timeoutInstance);
    }, 100);
  }

  function handleTranslateDataChange(e: CustomEvent<T_.TranslationLS>) {
    translatedTextData = e.detail;
  }
</script>

<div class="wrapper">
  <SourceTranslator
    selectedSourceLanguage={$translatorStore.selectedSourceLanguage}
    selectedTargetLanguage={$translatorStore.selectedTargetLanguage}
    translateOnTimeout={$translatorStore.configuration.translateOnTimeout}
    supportedLanguages={translatorStore.getSupportedLanguageList()}
    translateCall={callForTranslate}
    on:translatedTextData={handleTranslateDataChange}
  />
  <div class="mid-buttons">
    <button class="mid-button" on:click={translatorStore.swapSelectedLanguages}>
      <img src={switchSVG} alt="switch" />
    </button>
    <button class="mid-button" on:click={handleCallForTranslate}>
      <img src={translateSVG} alt="translate" />
    </button>
  </div>
  <TargetTranslator
    selectedLanguage={$translatorStore.selectedTargetLanguage}
    translatedText={$translatorStore.translatedText}
    {translatedTextData}
  />
  {#if $translatorStore.bigLangMenu.isOpen}
    <LangMenuBig
      type={$translatorStore.bigLangMenu.type}
      supportedLanguages={translatorStore.getSupportedLanguageList()}
    />
  {/if}
</div>

<style lang="scss">
  .wrapper {
    position: relative;
    /* outline: 1px solid red; */
    margin: 0 2.5rem;
    display: flex;
    flex-direction: row;
    gap: 0.6rem;
    justify-content: center;
    align-items: center;

    width: calc(100% - 2.5rem);
    max-width: 1600px;

    /* outline: 1px solid red; */
    @media (max-width: 850px) {
      margin: 0 1rem;
      gap: 1rem;
    }
  }

  .mid-buttons {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10rem;
  }

  .mid-button {
    padding: 10px 10px 7px 10px;
    border-radius: 25%;

    img {
      $size: 25px;
      width: $size;
      height: $size;
    }

    &:hover {
      background-color: rgb(234, 234, 234);
    }
  }
</style>
