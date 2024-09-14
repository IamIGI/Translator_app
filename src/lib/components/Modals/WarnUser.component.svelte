<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  import Modal from './Modal.component.svelte';

  export let text: string;
  export let onConfirm: () => void;

  let modalRef: SvelteComponent;

  function handleConfirm() {
    modalRef.$destroy();
    onConfirm();
  }
</script>

<Modal bind:this={modalRef} header="Uwaga">
  <div class="content">
    <p>
      {text}
    </p>
  </div>
  <div class="buttons-wrapper">
    <button on:click={handleConfirm}>OK</button>
  </div>
</Modal>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 10px;

    p {
      font-size: var(--font-size-normal);
      margin: 0;
      padding: 0;
    }
  }

  .buttons-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;

    button {
      width: 80px;
      height: 40px;
      border-radius: 5px;
      font-size: var(--font-size-min);
      background-color: var(--color-button);
      color: white;
      font-weight: 700;

      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: var(--color-button-hover);
      }
    }
  }
</style>
