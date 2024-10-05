<script lang="ts">
  import binSVG from '$assets/bin.svg';
  import localStorageDataUtils, {
    LSKey,
  } from '$lib/utils/localStorageData.utils';
  import translatorStore from '$lib/+stores/translator.store';
  import notificationsUtils from '$lib/utils/notifications.utils';

  export let translationId: string;

  function deleteItem(id: string, event: MouseEvent) {
    const updatedHistory = localStorageDataUtils.deleteItemFromData(
      LSKey.userFavorites,
      id
    );
    translatorStore.setUserFavorites(updatedHistory);
    notificationsUtils.showInformation('Translation deleted');
    event.stopPropagation();
  }
</script>

<div class="wrapper">
  <button on:click={(e) => deleteItem(translationId, e)}>
    <img src={binSVG} alt="bin" class="options-svg" />
  </button>
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
      filter: var(--icon-color-filter);

      &:hover {
        background-color: var(--main-button-background-color-hover);
      }
    }
  }
</style>
