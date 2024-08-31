<script lang="ts">
  import { CONSTS } from '$lib/CONSTS';
  import { TranslatorType } from '$lib/models/enums';
  import LanguageMenu from './LanguageMenu.component.svelte';
  import TranslatorOptions from './TranslatorOptions.component.svelte';
  import xSymbolSVG from '$assets/xSymbol.svg';
  import translatorStore from '$lib/+stores/translator.store';
  import type { TranslateModelSourceEnum } from '$lib/api/translator/generated';

  export let type: TranslatorType;
  export let selectedLanguage: TranslateModelSourceEnum;
  const isSourceTranslator = type === TranslatorType.Source;

  let text: string = '';
</script>

<div class="wrapper">
  <LanguageMenu
    langShortMenu={translatorStore.getLanguageShortMenuList(selectedLanguage)}
    {selectedLanguage}
    {type}
  />
  <div class="translator-wrapper" class:translator-target={!isSourceTranslator}>
    <textarea
      name="translator"
      bind:value={text}
      maxlength={CONSTS.maxTextSize}
      placeholder={isSourceTranslator
        ? 'Type your text here... (max 500 characters)'
        : ''}
      class:translator-target={!isSourceTranslator}
    />
    {#if text.length > 0 && isSourceTranslator}
      <button class="remove-mark" on:click={() => (text = '')}>
        <img src={xSymbolSVG} class="svg-icon" alt="removeMark" />
      </button>
    {/if}
    <TranslatorOptions
      letterCounter={text.length}
      maxTextSize={CONSTS.maxTextSize}
      {type}
    />
  </div>
</div>

<style lang="scss">
  .wrapper {
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

  .translator-target {
    background-color: #f5f5f5;
  }
</style>
