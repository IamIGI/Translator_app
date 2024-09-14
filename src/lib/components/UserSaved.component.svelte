<script lang="ts">
  import SavedHistoryItemMenu from './SavedHistoryItemMenu.component.svelte';
  import TranslationList from './TranslationList.component.svelte';

  export let data: T_.TranslationLS[];
</script>

<div class="wrapper">
  <TranslationList {data}>
    <SavedHistoryItemMenu slot="menu" let:translationId {translationId} />
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
