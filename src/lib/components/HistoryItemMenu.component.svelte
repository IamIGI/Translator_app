<script lang="ts">
  import starSVG from '$assets/star.svg';
  import dotMenuSVG from '$assets/dotMenu.svg';
  import localStorageDataUtils from '$lib/utils/localStorageData.utils';
  import translatorStore from '$lib/+stores/translator.store';
  import { onMount } from 'svelte';

  export let index: number;
  export let translationId: string;
  export let isItemMenuVisible: number | undefined;
  export let onItemMenuVisibleChange: (value: number | undefined) => void;

  let currentHistoryMenu: HTMLDivElement | null = null;

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  function handleOpenMenu(index: number, event: MouseEvent) {
    if (isItemMenuVisible != undefined) {
      onItemMenuVisibleChange(undefined);

      return;
    }
    event.stopPropagation();
    onItemMenuVisibleChange(index);
  }

  const handleClickOutside = (event: MouseEvent) => {
    // If the current history menu is open and the clicked element is outside of it, close the menu

    if (
      isItemMenuVisible != undefined &&
      currentHistoryMenu &&
      !currentHistoryMenu.contains(event.target as Node)
    ) {
      onItemMenuVisibleChange(undefined);
    }
  };

  function deleteUserHistoryItem(id: string) {
    const updatedHistory =
      localStorageDataUtils.deleteTranslationHistoryItem(id);
    translatorStore.setUserHistory(updatedHistory);

    onItemMenuVisibleChange(undefined);
  }
</script>

<div class="wrapper">
  <button>
    <img src={starSVG} alt="star" class="options-svg" />
  </button>
  <button on:click={(e) => handleOpenMenu(index, e)}>
    <img src={dotMenuSVG} alt="dotMenu" class="options-svg" />
  </button>

  {#if isItemMenuVisible === index}
    <div class="menu" bind:this={currentHistoryMenu}>
      <ul>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <li on:click={() => deleteUserHistoryItem(translationId)}>delete</li>
      </ul>
    </div>
  {/if}
</div>

<style lang="scss">
  .wrapper {
    width: fit-content;
    display: flex;
    justify-content: flex-start;
    gap: 5px;
    align-items: center;
    position: relative;

    .options-svg {
      width: 30px;
      height: 30px;
      border-radius: 25%;
      padding: 5px;
      cursor: pointer;

      &:hover {
        background-color: var(--color-hover);
      }
    }
  }

  .menu {
    padding: 5px 10px;
    position: absolute;
    top: 100%;
    right: 0;
    display: flex;
    background-color: white;

    border-radius: 3px;
    box-shadow:
      0 3px 5px -1px rgba(0, 0, 0, 0.2),
      0 6px 10px 0 rgba(0, 0, 0, 0.14),
      0 1px 18px 0 rgba(0, 0, 0, 0.12);

    /* border: 1px solid red; */
    ul {
      li {
        padding: 0;
        margin: 0;
        padding: 3px 10px;
        border-bottom: 1px solid transparent;
        &:hover {
          cursor: pointer;
          border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        }
      }
    }
  }
</style>
