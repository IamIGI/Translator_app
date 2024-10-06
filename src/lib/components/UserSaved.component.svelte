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
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    max-height: 715px;
    overflow: auto;

    /* outline: 2px solid purple; */
    /* outline: 1px solid green; */

    @media (max-width: 850px) {
      flex: none;
    }
  }
</style>
