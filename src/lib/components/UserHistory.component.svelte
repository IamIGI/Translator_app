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
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    max-height: 650px;
    overflow: auto;
    /* outline: 1px solid green; */
  }
</style>
