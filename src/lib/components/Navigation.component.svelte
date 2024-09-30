<script lang="ts">
  import daySVG from '$assets/night_day_mode/day.svg';
  import nightSVG from '$assets/night_day_mode/night.svg';
  import dayNightModeUtils from '$lib/utils/dayNightMode.utils';

  let isDayMode: boolean = true;

  function changeBackgroundColor() {
    isDayMode = !isDayMode;
    dayNightModeUtils.changeMode(document, isDayMode);
  }
</script>

<div class="wrapper">
  <button on:click={changeBackgroundColor}>
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
