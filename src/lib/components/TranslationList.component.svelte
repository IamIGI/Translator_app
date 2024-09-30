<script lang="ts">
  import { onMount, tick } from 'svelte';
  import dateUtils from '$lib/utils/date.utils';
  import rightArrowSVG from '$assets/rightArrow.svg';

  export let data: T_.TranslationLS[];

  let expanded: boolean[] = [];
  let needsToggle: boolean[] = [];

  let listRef: HTMLElement;

  function toggleExpand(index: number) {
    expanded[index] = !expanded[index];
  }

  async function updateWrapperStates() {
    if (listRef) {
      await tick();
      const wrappers = listRef.querySelectorAll('.text-wrapper');

      wrappers.forEach((wrapper, index) => {
        if (wrapper.scrollHeight > 100) {
          needsToggle[index] = true;
        } else {
          needsToggle[index] = false;
        }
      });
    }
  }

  onMount(() => {
    updateWrapperStates();
  });

  $: if (data) {
    expanded = data.map(() => false);
    needsToggle = data.map(() => false);
    updateWrapperStates();
  }
</script>

<div class="list-wrapper" bind:this={listRef}>
  {#each data as translation, index}
    <div class="item-wrapper">
      <div class="top-menu">
        <div class="top-menu-languages">
          <p>{translation.source.lang}</p>
          <img src={rightArrowSVG} alt="rightArrow" class="right-svg" />
          <p>{translation.target.lang}</p>
        </div>
        <div class="top-menu-options">
          <slot name="menu" translationId={translation.id} {index} />
        </div>
      </div>
      <div class="text-wrapper" class:expanded={expanded[index]}>
        <p>{translation.text}</p>
        <p>{translation.translation}</p>
        {#if needsToggle[index]}
          <button class="toggle-button" on:click={() => toggleExpand(index)}>
            {expanded[index] ? 'Collapse' : 'Read more...'}
          </button>
        {/if}
      </div>
      <div class="date-wrapper">
        <p>{dateUtils.formatDateToDDMMYYYY(new Date(translation.date))}</p>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
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
    }
  }

  .text-wrapper {
    position: relative;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: hidden;
    max-height: 100px; // Default collapsed height
    transition: max-height 0.3s ease;

    &.expanded {
      max-height: none; // Allow full height when expanded
    }

    p {
      font-size: var(--font-size-min);
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

  .toggle-button {
    width: fit-content;
    position: absolute;
    right: 4px;
    bottom: 7px;
    padding: 0 0 0 4px;
    color: var(--color-button);
    font-weight: 600;
    cursor: pointer;
    background-color: white;
    font-size: var(--font-size-min);

    &:hover {
      color: black;
      color: var(--color-button-hover);
    }
  }
</style>
