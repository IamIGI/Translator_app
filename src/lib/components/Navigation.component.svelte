<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let isDayMode: boolean;
  export let nightSVG: string;
  export let daySVG: string;

  const dispatch = createEventDispatcher<{ dateDayNightMode: boolean }>();

  function updateDayNightMode() {
    dispatch('dateDayNightMode', !isDayMode);
  }
</script>

<div class="wrapper">
  <button on:click={updateDayNightMode}>
    <div class="icon-container">
      {#if isDayMode}
        <img class="svg-icon day" src={nightSVG} alt="day" />
      {:else}
        <img class="svg-icon night" src={daySVG} alt="night" />
      {/if}
    </div>
  </button>
</div>

<style lang="scss">
  .wrapper {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0.5rem;
    background-color: var(--main-second-background-color);
    border-bottom: 1px solid var(--border-color);

    @media (max-width: 650px) {
      display: none;
      height: 50px;
      padding: 1rem;
    }
  }

  .icon-container {
    position: relative;
    height: 40px;
    width: 40px;
    background-color: 'black';
  }

  .svg-icon {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    /* background-color: #151411; */
  }

  .day {
    background-color: #fff;
  }
  .night {
    background-color: #262522;
  }
</style>
