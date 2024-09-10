<script lang="ts">
  import starSVG from '$assets/star.svg';
  import dotMenuSVG from '$assets/dotMenu.svg';
  import rightArrowSVG from '$assets/rightArrow.svg';
  import { onMount } from 'svelte';
  import localStorageDataUtils from '$lib/utils/localStorageData.utils';
  import translatorStore from '$lib/+stores/translator.store';
  import dateUtils from '$lib/utils/date.utils';

  export let data: T_.TranslationLS[];

  let isItemHistoryMenuVisible: number | undefined = undefined;

  // Reference to the currently visible history menu
  let currentHistoryMenu: HTMLDivElement | null = null;

  const handleClickOutside = (event: MouseEvent) => {
    // If the current history menu is open and the clicked element is outside of it, close the menu

    if (
      isItemHistoryMenuVisible != undefined &&
      currentHistoryMenu &&
      !currentHistoryMenu.contains(event.target as Node)
    ) {
      isItemHistoryMenuVisible = undefined;
    }
  };

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  function handleOpenMenu(index: number, event: MouseEvent) {
    event.stopPropagation();
    isItemHistoryMenuVisible = index;
  }

  function deleteUserHistoryItem(id: string) {
    const updatedHistory =
      localStorageDataUtils.deleteTranslationHistoryItem(id);
    translatorStore.setUserHistory(updatedHistory);
    isItemHistoryMenuVisible = undefined;
  }
</script>

<div class="wrapper">
  <div class="list-wrapper">
    {#each data as translation, index}
      <div class="item-wrapper">
        <div class="top-menu">
          <div class="top-menu-languages">
            <span>{translation.source.lang}</span>
            <img src={rightArrowSVG} alt="rightArrow" class="right-svg" />
            <span>{translation.target.lang}</span>
          </div>
          <div class="top-menu-options">
            <button>
              <img src={starSVG} alt="star" class="options-svg" />
            </button>
            <button on:click={(e) => handleOpenMenu(index, e)}>
              <img src={dotMenuSVG} alt="dotMenu" class="options-svg" />
            </button>

            {#if isItemHistoryMenuVisible === index}
              <div class="history-menu" bind:this={currentHistoryMenu}>
                <ul>
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                  <li on:click={() => deleteUserHistoryItem(translation.id)}>
                    delete
                  </li>
                </ul>
              </div>
            {/if}
          </div>
        </div>
        <div class="text-wrapper">
          <p>{translation.text}</p>
          <p>{translation.translation}</p>
        </div>
        <div class="date-wrapper">
          <p>{dateUtils.formatDateToDDMMYYYY(new Date(translation.date))}</p>
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    max-height: 650px;
    overflow: auto;
    /* outline: 1px solid green; */
  }

  .list-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .item-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);

    padding: 5px 0px 6px 10px;

    max-height: 150px;
    overflow: auto;
  }

  .top-menu {
    width: 100%;
    padding-right: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .top-menu-languages {
      width: fit-content;
      display: flex;
      justify-content: flex-start;
      gap: 10px;
      align-items: center;
      font-size: var(--font-size-minV2);

      .right-svg {
        width: 20px;
        height: 20px;
      }
    }

    .top-menu-options {
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

    .history-menu {
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
  }

  .text-wrapper {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    p {
      font-size: var(-font-size-min);
      margin: 0;
      padding: 0;

      &:nth-of-type(2) {
        color: rgb(102, 101, 101);
      }
    }
  }

  .date-wrapper {
    width: 100%;
    p {
      font-size: var(--font-size-footer);
      margin: 0;
      padding: 0;
      color: rgb(134, 134, 134);
    }
  }
</style>
