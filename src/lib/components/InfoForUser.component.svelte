<script lang="ts">
  import UserHistory from './UserHistory.component.svelte';
  import UserSaved from './UserSaved.component.svelte';
  import translatorStore from '$lib/+stores/translator.store';
</script>

<div class="wrapper">
  <UserHistory data={$translatorStore.userHistory} />
  <UserSaved />
</div>

<style lang="scss">
  .wrapper {
    /* outline: 1px solid red; */
    margin: 0 15%;
    width: calc(100% - 15%);
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;

    @media (max-width: 1750px) {
      margin: 0 4%;
      width: calc(100% - 4%);
    }
  }
</style>
