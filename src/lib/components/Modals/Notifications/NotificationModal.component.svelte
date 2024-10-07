<script lang="ts">
  import { fly } from 'svelte/transition';

  export let header: string = '';
  export let titleAlign: 'left' | 'center' = 'center';
  export let animationDuration: number; // ms
</script>

<div
  class="modal"
  in:fly={{ x: -300, duration: animationDuration }}
  out:fly={{ x: -300, duration: animationDuration }}
>
  {#if header.length > 0}
    <div
      class="header"
      style="align-items: {titleAlign === 'left' ? 'flex-start' : 'center'}"
    >
      {header}
    </div>
  {/if}
  <slot />
</div>

<style lang="scss">
  .modal {
    position: fixed;
    bottom: 20px;
    left: 20px;
    min-width: 180px;
    min-height: 60px;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    border-radius: var(--main-border-radius);
  }

  .header {
    display: flex;
    height: 41px;
    padding: 5px 20px 15px 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    font-size: var(--font-size-normal);
    font-weight: 700;
  }
</style>
