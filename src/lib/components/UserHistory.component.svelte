<script lang="ts">
  import HistoryItemMenu from './HistoryItemMenu.component.svelte';
  import TranslationList from './TranslationList.component.svelte';

  export let data: T_.TranslationLS[];

  let isItemMenuVisible: number | undefined = undefined;

  function handleItemMenuVisibleChange(value: number | undefined) {
    isItemMenuVisible = value;
  }
</script>

<div class="wrapper">
  <TranslationList {data}>
    <HistoryItemMenu
      slot="menu"
      let:translationId
      let:index
      {translationId}
      {index}
      {isItemMenuVisible}
      onItemMenuVisibleChange={handleItemMenuVisibleChange}
    />
  </TranslationList>
</div>

<style lang="scss">
  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    max-height: 715px;
    overflow: auto;
    /* outline: 2px solid orange; */

    @media (max-width: 850px) {
      flex: none;
    }
  }
</style>
