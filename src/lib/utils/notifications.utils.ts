import Information from '$lib/components/Modals/Notifications/Information.component.svelte';

function showInformation(message: string, timeout?: number) {
  new Information({
    target: document.body,
    props: {
      message,
      timeout,
    },
  });
}

export default {
  showInformation,
};
