<script lang="ts">
  import UserHistory from './UserHistory.component.svelte';
  import UserSaved from './UserSaved.component.svelte';
  import translatorStore from '$lib/+stores/translator.store';
  import favoritesSVG from '$assets/favoritesList.svg';
  import historyListSVG from '$assets/historyList.svg';
  import configStore from '$lib/+stores/config.store';

  let isUserHistoryVisible: boolean = false;
  let isUserSavedHistoryVisible: boolean = false;

  configStore.subscribe((state) => {
    if (
      state.isSmallScreen &&
      isUserHistoryVisible &&
      isUserSavedHistoryVisible
    ) {
      isUserHistoryVisible = false;
      isUserSavedHistoryVisible = false;
    }
  });

  function updateUserHistoryVisibility() {
    isUserHistoryVisible = !isUserHistoryVisible;
    if (configStore.isSmallScreen()) {
      isUserSavedHistoryVisible = false;
    }
  }

  function updateUserSavedHistoryVisibility() {
    isUserSavedHistoryVisible = !isUserSavedHistoryVisible;
    if (configStore.isSmallScreen()) {
      isUserHistoryVisible = false;
    }
  }
</script>

<div class="wrapper">
  <div class="list-menu">
    <button class="menu-button" on:click={updateUserHistoryVisibility}>
      <img src={historyListSVG} alt="historyExpand" />
    </button>
    <button class="menu-button" on:click={updateUserSavedHistoryVisibility}>
      <img src={favoritesSVG} alt="savedExpand" />
    </button>
  </div>
  <div class="list-wrapper">
    <div class="list-item-wrapper-medium">
      {#if isUserHistoryVisible}
        <UserHistory data={$translatorStore.userHistory} />
      {/if}
    </div>
    <div class="list-item-wrapper-medium">
      {#if isUserSavedHistoryVisible}
        <UserSaved data={$translatorStore.userFavorites} />
      {/if}
    </div>
    <div class="list-item-wrapper-small">
      {#if isUserHistoryVisible}
        <UserHistory data={$translatorStore.userHistory} />
      {/if}
      {#if isUserSavedHistoryVisible}
        <UserSaved data={$translatorStore.userFavorites} />
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  .wrapper {
    flex: 1;
    /* outline: 1px solid red; */
    margin: 0 15%;
    width: calc(100% - 15%);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    /* gap: 2em; */
    @media (max-width: 1750px) {
      width: calc(100% - 4%);
      margin: 0 4%;
    }

    @media (max-width: 850px) {
      width: calc(100% - 2%);
      margin: 0 2%;
      gap: 0;
    }
  }

  .list-wrapper {
    width: 100%;
    display: flex;
    gap: 2rem;

    @media (max-width: 850px) {
      gap: 0rem;
    }

    .list-item-wrapper-medium {
      display: flex;
      /* outline: 1px solid red; */
      flex: 1;
      @media (max-width: 850px) {
        display: none;
      }
    }

    .list-item-wrapper-small {
      /* outline: 1px solid green; */
      display: none;
      width: 100%;

      @media (max-width: 850px) {
        display: flex;
      }
    }
  }

  .list-menu {
    /* outline: 1px solid blue; */
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4rem;
  }

  .menu-button {
    $size: 60px;
    height: $size;
    width: $size;
    border-radius: calc($size/2);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--main-button-background-color);

    border: 1px solid var(--border-color);
    img {
      $size: 35px;
      width: $size;
      height: $size;
      /* https://codepen.io/sosuke/pen/Pjoqqp */
      filter: var(--icon-color-filter);
    }

    &:hover {
      background-color: var(--main-button-background-color-hover);
    }
  }
</style>
