<script lang="ts">
  import leftArrowSVG from '$assets/leftArrow.svg';
  import translatorStore from '$lib/+stores/translator.store';

  export let supportedLanguages: T_.LangItem[];
</script>

<div class="wrapper">
  <div class="search-wrapper">
    <button on:click={() => translatorStore.toggleLangBigMenu()}>
      <img src={leftArrowSVG} alt="leftArrow" class="icon-svg" />
    </button>
    <input type="text" placeholder="Search language" />
  </div>
  <div class="language-menu">
    {#each supportedLanguages as lang (lang.value)}
      <div class="language-item">
        {lang.text}
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .wrapper {
    position: absolute;
    top: 40px;
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
      &:hover {
        background-color: rgb(245, 243, 243);
      }
    }

    input {
      border: none; /* Removes all borders */
      outline: none; /* Removes the focus outline */
      box-shadow: none; /* Ensures no box-shadow is applied */

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
    max-height: 80vh;
    overflow: auto;

    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 10px;

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
    padding: 7px;
    border-top-right-radius: var(--border-radius);
    text-align: center;
    border-bottom: 2px solid transparent;

    cursor: pointer;

    &:hover {
      background-color: #f9f9f9;
      border-bottom: 2px solid var(--color-accent);
    }
  }
</style>
