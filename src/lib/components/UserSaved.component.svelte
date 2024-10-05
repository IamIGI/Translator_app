<script lang="ts">
  import SavedHistoryItemMenu from './SavedHistoryItemMenu.component.svelte';
  import TranslationList from './TranslationList.component.svelte';
  import favoritesSVG from '$assets/favoritesList.svg';

  export let data: T_.TranslationLS[];
</script>

<div class="wrapper">
  <TranslationList {data} icon={favoritesSVG}>
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

    max-height: 715px;
    overflow: scroll;
    /* outline: 1px solid green; */
  }
</style>
