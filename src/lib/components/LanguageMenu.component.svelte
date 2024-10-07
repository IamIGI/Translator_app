<script lang="ts">
  import DownArrowSvg from '$assets/downArrow.svg';
  import translatorStore from '$lib/+stores/translator.store';
  import type { TranslateModelSourceEnum } from '$lib/api/translator/generated';
  import type { TranslatorType } from '$lib/models/enums';

  export let langShortMenu: T_.LangItem[];
  export let selectedLanguage: TranslateModelSourceEnum;
  export let type: TranslatorType;
</script>

<div class="wrapper">
  <div class="mediumPlusScreen">
    {#if langShortMenu.length > 0}
      {#each langShortMenu as langButton (langButton.value)}
        <button
          id={langButton.value}
          class:langButtonActive={langButton.value === selectedLanguage}
          class="langButton"
          on:click={() =>
            translatorStore.selectLanguage(type, langButton.value)}
        >
          {langButton.text}
        </button>
      {/each}

      <button
        class="dropDownButton"
        on:click={() => translatorStore.toggleLangBigMenu(type)}
      >
        <img
          src={DownArrowSvg}
          alt="down arrow"
          width="14"
          height="14"
          class={`svg-icon ${type === $translatorStore.bigLangMenu.type && $translatorStore.bigLangMenu.isOpen ? 'rotateImage' : 'rotateImageBack'}`}
        />
      </button>
    {/if}
  </div>
  <div class="smallScreen">
    <button
      class="langButton langButtonActive"
      on:click={() => translatorStore.toggleLangBigMenu(type)}
    >
      {translatorStore.getLangItem(selectedLanguage).text}
    </button>
  </div>
</div>

<style lang="scss">
  .wrapper {
    padding: 2px 0.5rem;
    width: 100%;

    position: relative;

    @media (max-width: 650px) {
      display: none;
    }
  }

  .langButton {
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

  .dropDownButton {
    margin-left: 0.7em;
    color: #5f6368;
    padding: 10px;
    border-radius: 50%;

    &:hover {
      background-color: var(--main-button-background-color-hover);
    }

    img {
      filter: var(--icon-color-filter);
    }
  }

  .mediumPlusScreen {
    display: flex;
    flex-direction: row;
    gap: 0.2rem;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    @media (max-width: 850px) {
      gap: 0rem;
    }

    @media (max-width: 800px) {
      display: none;
    }
  }

  .smallScreen {
    display: none;
    flex-direction: row;
    gap: 0.2rem;
    justify-content: center;
    align-items: center;
    width: 100%;

    @media (max-width: 800px) {
      display: flex;
    }
  }

  .rotateImage {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
  }

  .rotateImageBack {
    transform: rotate(0deg);
    transition: transform 0.3s ease;
  }
</style>
