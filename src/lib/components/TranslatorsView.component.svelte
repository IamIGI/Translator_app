<script lang="ts">
  import { TranslatorType } from '$lib/models/enums';
  import Translator from './Translator.component.svelte';
</script>

<div class="wrapper">
  <Translator type={TranslatorType.Source} />
  <Translator type={TranslatorType.Target} />
</div>

<style lang="scss">
  .wrapper {
    padding: 0 2.5rem;
    display: flex;
    flex-direction: row;
    gap: 2.5rem;
    justify-content: center;
    align-items: center;

    width: 100%;

    /* outline: 1px solid red; */
    @media (max-width: 850px) {
      padding: 0 1rem;
      gap: 1rem;
    }
  }
</style>
