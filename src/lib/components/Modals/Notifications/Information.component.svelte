<script lang="ts">
  import { onMount, type SvelteComponent } from 'svelte';
  import NotificationModal from './NotificationModal.component.svelte';

  export let message: string;
  export let timeout: number = 5; // seconds
  export let type: 'success' | 'warning' = 'success';

  let notificationModalRef: SvelteComponent;
  let showModal: boolean = false;
  let animationDuration: number = 500;
  let timeOutAnimationInstance: any;
  let timeoutDestroyInstance: any;

  onMount(() => {
    const visibilityTime = timeout * 1000;
    showModal = true;

    timeOutAnimationInstance = setTimeout(() => {
      showModal = false; // Trigger the fly-out transition
    }, visibilityTime - animationDuration);

    timeoutDestroyInstance = setTimeout(() => {
      notificationModalRef.$destroy();
    }, visibilityTime);

    return () => {
      clearTimeout(timeoutDestroyInstance);
      clearTimeout(timeOutAnimationInstance);
    };
  });
</script>

{#if showModal}
  <NotificationModal bind:this={notificationModalRef} {animationDuration}>
    <div
      class="wrapper"
      style="background-color: {type === 'success' ? '#059105' : '#b38405'};"
    >
      <p
        style="background-color: {type === 'success' ? '#059105' : '#b38405'};"
      >
        {message}
      </p>
    </div>
  </NotificationModal>
{/if}

<style lang="scss">
  .wrapper {
    border-radius: var(--main-border-radius);
    min-width: 180px;
    min-height: 60px;
    width: fit-content;
    padding: 10px 15px 10px 15px;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    p {
      color: white;
      font-weight: 600;
      font-size: var(--font-size-min);
    }
  }
</style>
