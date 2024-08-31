<script lang="ts">
  import DownArrowSvg from '$assets/downArrow.svg';
  import { TranslateModelSourceEnum } from '$lib/api/translator/generated';

  export let supportedLanguages: T_.LangItem[];
  export let langShortMenu: T_.LangItem[];

  let selectedLang: TranslateModelSourceEnum = TranslateModelSourceEnum.Auto;
  let isAllLanguageMenuVisible = false;

  function onSelectLanguage(value: TranslateModelSourceEnum) {
    selectedLang = value;
  }
</script>

<div class="wrapper">
  <div class="mediumPlusScreen">
    {#if langShortMenu.length > 0}
      {#each langShortMenu as langButton (langButton.value)}
        <button
          id={langButton.value}
          class:langButtonActive={selectedLang === langButton.value}
          class="langButton"
          on:click={() => onSelectLanguage(langButton.value)}
        >
          {langButton.text}
        </button>
      {/each}

      <button
        class="dropDownButton"
        on:click={() => (isAllLanguageMenuVisible = !isAllLanguageMenuVisible)}
      >
        <img
          src={DownArrowSvg}
          alt="down arrow"
          width="14"
          height="14"
          class={`svg-icon ${isAllLanguageMenuVisible ? 'rotateImage' : 'rotateImageBack'}`}
        />
      </button>
    {/if}
  </div>
  <div class="smallScreen">
    <button
      class="langButton langButtonActive"
      on:click={() => (isAllLanguageMenuVisible = !isAllLanguageMenuVisible)}
    >
      Polski
    </button>
  </div>
  {#if isAllLanguageMenuVisible}
    <div class="allLangMenuWrapper"></div>
  {/if}
</div>

<style lang="scss">
  .wrapper {
    padding: 0 0.5rem;
    width: 100%;

    position: relative;
  }

  .langButton {
    font-size: 14px;
    color: #5f6368;
    font-weight: 500;
    padding: 10px 7px;
    border-bottom: 2px solid transparent;
    cursor: pointer;

    &:hover {
      background-color: rgb(245, 243, 243);
      border-bottom: 2px solid rgb(12, 163, 9);
    }
  }

  .langButtonActive {
    color: rgb(12, 163, 9);
    border-bottom: 2px solid rgb(12, 163, 9);
  }

  .dropDownButton {
    margin-left: 0.7em;
    color: #5f6368;

    padding: 10px 10px;
    border-radius: 50%;
    //   outline: 1px solid red;

    &:hover {
      background-color: rgb(245, 243, 243);
      // border-bottom: 2px solid rgb(12, 163, 9);
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

  .allLangMenuWrapper {
    z-index: 100;
    position: absolute;
    top: 100;
    left: 0;
    width: 100%;
    // height: fit-content;
    height: 100px;

    border: 1px solid green;
    background-color: purple;
  }

  .svg-icon {
  }
</style>
