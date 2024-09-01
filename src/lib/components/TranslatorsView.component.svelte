<script lang="ts">
  import translatorStore from '$lib/+stores/translator.store';

  import LangMenuBig from './LangMenuBig.component.svelte';
  import SourceTranslator from './SourceTranslator.component.svelte';
  import TargetTranslator from './TargetTranslator.component.svelte';
</script>

<div class="wrapper">
  <SourceTranslator
    selectedSourceLanguage={$translatorStore.selectedSourceLanguage}
    selectedTargetLanguage={$translatorStore.selectedTargetLanguage}
    translateOnTimeout={$translatorStore.configuration.translateOnTimeout}
  />
  <TargetTranslator
    selectedLanguage={$translatorStore.selectedTargetLanguage}
    translatedText={$translatorStore.translatedText}
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
    gap: 2.5rem;
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
</style>
