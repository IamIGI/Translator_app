<script lang="ts">
  import configStore from '$lib/+stores/config.store';
  import '$lib/styles/global.scss';
  import dayNightModeUtils from '$lib/utils/dayNightMode.utils';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  let isMounted: boolean = false;

  onMount(() => {
    isMounted = true;
    dayNightModeUtils.changeMode(document, get(configStore).isDayMode);
  });

  configStore.subscribe((state) => {
    if (isMounted && document) {
      dayNightModeUtils.changeMode(document, state.isDayMode);
    }
  });
</script>

<slot />
