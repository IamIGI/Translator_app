<script lang="ts">
  import UserHistory from './UserHistory.component.svelte';
  import UserSaved from './UserSaved.component.svelte';
</script>

<div class="wrapper">
  <UserHistory />
  <UserSaved />
</div>

<style lang="scss">
  .wrapper {
    /* outline: 1px solid red; */
    margin: 0 4%;
    width: calc(100% - 4%);
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
</style>
