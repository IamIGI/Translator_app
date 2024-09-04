<script lang="ts">
  import { CONSTS } from '$lib/CONSTS';
  import { TranslatorType } from '$lib/models/enums';
  import LanguageMenu from './LanguageMenu.component.svelte';
  import TranslatorOptions from './TranslatorOptions.component.svelte';
  import xSymbolSVG from '$assets/xSymbol.svg';
  import translatorStore from '$lib/+stores/translator.store';
  import { TranslateModelSourceEnum } from '$lib/api/translator/generated';

  export let selectedLanguage: TranslateModelSourceEnum;
  export let translatedText: string = '';
</script>

<div class="wrapper">
  <LanguageMenu
    langShortMenu={translatorStore.getLanguageShortMenuList(selectedLanguage)}
    {selectedLanguage}
    type={TranslatorType.Target}
  />
  <div class="translator-wrapper translator-target">
    <textarea
      name="translator"
      bind:value={translatedText}
      placeholder="Your translated text"
      class="translator-target"
    />
    <TranslatorOptions
      letterCounter={translatedText.length}
      maxTextSize={CONSTS.maxTextSize}
      type={TranslatorType.Target}
    />
  </div>
</div>

<style lang="scss">
  .wrapper {
    /* outline: 1px solid green; */
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

  .translator-target {
    background-color: #f5f5f5;
  }
</style>
