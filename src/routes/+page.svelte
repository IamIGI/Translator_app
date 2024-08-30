<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { translate } from '$lib/api/translator/translator.api.service';
  import {
    TranslateModelSourceEnum,
    TranslateModelTargetEnum,
  } from '$lib/api/translator/generated';

  export let data: PageData;

  const { supportedLangs } = data;

  onMount(() => {
    console.log(supportedLangs);
    // translate(
    //   'Cześć, co słychać',
    //   TranslateModelSourceEnum.Pl,
    //   TranslateModelTargetEnum.En
    // );
  });
</script>

<div class="wrapper">
  <h1>Translator</h1>
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    height: 100%;
    width: 100%;
    outline: 1px solid red;
    margin: 0;
    padding: 0;
  }
</style>
