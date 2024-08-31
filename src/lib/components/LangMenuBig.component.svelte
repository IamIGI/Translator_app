<script lang="ts">
  import leftArrowSVG from '$assets/leftArrow.svg';
  import acceptMarkSVG from '$assets/acceptMark.svg';
  import xSymbolSVG from '$assets/xSymbol.svg';
  import translatorStore from '$lib/+stores/translator.store';
  import { TranslatorType } from '$lib/models/enums';

  export let supportedLanguages: T_.LangItem[];
  export let type: TranslatorType;

  let searchTerm = '';
  let filteredLanguages: T_.LangItem[] = supportedLanguages;

  let searchTimeout: number;

  $: {
    if (searchTerm) {
      if (searchTimeout) clearTimeout(searchTimeout);

      searchTimeout = setTimeout(() => {
        filteredLanguages = supportedLanguages.filter((lang) =>
          lang.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }, 100);
    } else {
      filteredLanguages = supportedLanguages;
    }
  }

  function handleInput(event: Event) {
    searchTerm = (event.target as HTMLInputElement).value;
  }
</script>

<div class="wrapper">
  <div class="search-wrapper">
    <button on:click={() => translatorStore.toggleLangBigMenu(type)}>
      <img src={leftArrowSVG} alt="leftArrow" class="icon-svg" />
    </button>
    <input type="text" placeholder="Search language" on:input={handleInput} />
    {#if searchTerm.length > 0}
      <button on:click={() => (searchTerm = '')}>
        <img src={xSymbolSVG} alt="XMark" class="icon-svg" />
      </button>
    {/if}
  </div>
  <!-- Language Menu -->
  <div class="language-menu">
    {#if filteredLanguages.length !== 0}
      <div class="language-menu-result">
        {#each filteredLanguages as lang (lang.value)}
          <button
            class="language-item"
            class:selected-language={$translatorStore[
              type === TranslatorType.Source
                ? 'selectedSourceLanguage'
                : 'selectedTargetLanguage'
            ] === lang.value}
            on:click={() => translatorStore.selectLanguage(type, lang.value)}
          >
            <div class="accept-wrapper">
              {#if $translatorStore[type === TranslatorType.Source ? 'selectedSourceLanguage' : 'selectedTargetLanguage'] === lang.value}
                <img src={acceptMarkSVG} alt="acceptMark" />
              {/if}
            </div>
            <span>{lang.text}</span>
          </button>
        {/each}
      </div>
    {:else}
      <p>No results</p>
    {/if}
  </div>
</div>

<style lang="scss">
  .wrapper {
    position: absolute;
    top: 38px;
    width: 100%;

    height: fit-content;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background-color: white;
    border-radius: var(--border-radius);
    gap: 10px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .search-wrapper {
    display: flex;
    justify-content: flex-start;

    align-items: center;
    gap: 10px;
    width: 100%;
    height: 50px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* X-offset | Y-offset | Blur-radius | Color */

    button {
      width: 50px;
      height: 100%;
      border-top-left-radius: var(--border-radius);
      border-top-right-radius: var(--border-radius);
      &:hover {
        background-color: rgb(245, 243, 243);
      }
    }

    input {
      flex: 1;

      border: none; /* Removes all borders */
      outline: none; /* Removes the focus outline */
      box-shadow: none; /* Ensures no box-shadow is applied */
      border-radius: var(--border-radius);

      height: 100%;
      font-size: var(--font-size-normal);
    }
  }

  .icon-svg {
    height: 20px;
    width: 20px;
  }

  .language-menu {
    width: 100%;
    padding-bottom: 7px;
    min-height: 300px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    p {
      margin-top: 125px;
      font-size: var(--font-size-big);
      font-weight: 600;
    }
  }
  .language-menu-result {
    width: 100%;
    height: 100%;

    overflow: auto;

    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 5px;

    @media (max-width: 1400px) {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }

    @media (max-width: 1200px) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    @media (max-width: 900px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: 750px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 600px) {
      grid-template-columns: repeat(1, minmax(0, 1fr)); /* 1 column on mobile */
    }

    &::-webkit-scrollbar {
      width: 12px;
    }

    &::-webkit-scrollbar-track {
      /* background: #f1f1f1; */
    }

    &::-webkit-scrollbar-thumb {
      background-color: #c2c2c2;
      border-radius: 10px;
      border: 2px solid #f1f1f1;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: #b3b3b3;
      cursor: pointer;
    }
  }

  .language-item {
    height: 40px;
    font-size: var(--font-size-min);
    padding: 7px;
    border-top-right-radius: var(--border-radius);
    text-align: center;
    border-bottom: 2px solid transparent;
    cursor: pointer;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    padding-left: 10px;

    .accept-wrapper {
      width: 20px;
    }
    img {
      color: var(--color-accent);
      height: 20px;
      width: 100%;
    }

    span {
      flex: 1;
      display: flex;
      justify-content: center;
    }

    &:hover {
      background-color: #f9f9f9;
      border-bottom: 2px solid var(--color-accent);
    }
  }

  .selected-language {
    color: var(--color-accent);
    border-bottom: 2px solid var(--color-accent);
  }
</style>
