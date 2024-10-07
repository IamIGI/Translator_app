<script lang="ts">
  export let backgroundColor: string = 'white';
  export let header: string = '';
  export let titleAlign: 'left' | 'center' = 'center';
</script>

<div class="modal">
  <!-- remove box shadow when background color is transparent -->
  <div
    class="modal-content"
    style="background-color: {backgroundColor};  {backgroundColor ===
      'transparent' && 'box-shadow: none;'}"
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
</div>

<style lang="scss">
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    border-radius: var(--main-border-radius);
  }

  .modal-content {
    position: relative;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    /* To change in future */
    /* max-width: 760px; */
    padding: 10px;
    border-radius: var(--main-border-radius);

    .header {
      display: flex;
      height: 41px;
      padding: 5px 20px 15px 20px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      align-self: stretch;
      background-color: white;
      font-size: var(--font-size-normal);
      font-weight: 700;
    }
  }
</style>
