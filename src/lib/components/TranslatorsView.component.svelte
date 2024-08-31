<script lang="ts">
  import translatorStore from '$lib/+stores/translator.store';
  import { TranslatorType } from '$lib/models/enums';
  import LangMenuBig from './LangMenuBig.component.svelte';
  import Translator from './Translator.component.svelte';
</script>

<div class="wrapper">
  <Translator type={TranslatorType.Source} />
  <Translator type={TranslatorType.Target} />
  {#if $translatorStore.isLangMenuBigOpen}
    <LangMenuBig
      supportedLanguages={translatorStore.getSupportedLanguageList()}
    />
  {/if}
</div>

<style lang="scss">
  .wrapper {
    position: relative;
    outline: 1px solid red;
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
