<script lang="ts">
  import configStore from '$lib/+stores/config.store';
  import '$lib/styles/global.scss';
  import dayNightModeUtils from '$lib/utils/dayNightMode.utils';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  let isMounted: boolean = false;
  let isSmallScreen: boolean = false;

  onMount(() => {
    isMounted = true;
    dayNightModeUtils.changeMode(document, get(configStore).isDayMode);
    window.addEventListener('resize', updateIsSmallScreenStatus);
    updateIsSmallScreenStatus();

    return () => {
      window.addEventListener('resize', updateIsSmallScreenStatus);
    };
  });

  function updateIsSmallScreenStatus() {
    if (window.innerWidth < 850 && !isSmallScreen) {
      isSmallScreen = true;
      configStore.updateIsSmallScreen(true);
    }

    if (window.innerWidth > 850 && isSmallScreen) {
      isSmallScreen = false;
      configStore.updateIsSmallScreen(false);
    }
  }

  configStore.subscribe((state) => {
    if (isMounted && document) {
      dayNightModeUtils.changeMode(document, state.isDayMode);
    }
  });
</script>

<slot />
