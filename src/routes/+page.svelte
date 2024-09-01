<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { translate } from '$lib/api/translator/translator.api.service';
  import { TranslateModelSourceEnum } from '$lib/api/translator/generated';
  import Navigation from '$lib/components/Navigation.component.svelte';
  import TranslatorsView from '$lib/components/TranslatorsView.component.svelte';
  import InfoForUser from '$lib/components/InfoForUser.component.svelte';
  import Footer from '$lib/components/Footer.component.svelte';

  onMount(() => {
    // translate('Cz', TranslateModelSourceEnum.Auto, TranslateModelSourceEnum.En);
  });
</script>

<div class="wrapper">
  <Navigation />
  <TranslatorsView />
  <InfoForUser />
  <Footer />
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
    height: 100%;
    width: 100%;
    /* outline: 1px solid red; */
    margin: 0;
    padding: 0;
  }
</style>
