<script lang="ts">
  import { TranslatorType } from '$lib/models/enums';
  import configStore from '$lib/+stores/config.store';
  import microphoneSVG from '$assets/microphone.svg';
  import loudSpeakerSVG from '$assets/loudspeaker.svg';
  import copySVG from '$assets/copy.svg';
  import keyboardSVG from '$assets/keyboard.svg';
  import shareSVG from '$assets/share.svg';
  import { createEventDispatcher } from 'svelte';

  export let letterCounter: number;
  export let maxTextSize: number;
  export let type: TranslatorType;

  let isKeyboardOpen: boolean = false;

  const dispatch = createEventDispatcher<{
    copyToClipboard: null;
    shareTranslation: undefined;
    showKeyboard: boolean;
  }>();

  function onCopyText() {
    dispatch('copyToClipboard', null);
  }

  function onShareTranslation() {
    dispatch('shareTranslation');
  }

  function openKeyboard() {
    isKeyboardOpen = !isKeyboardOpen;
    dispatch('showKeyboard', isKeyboardOpen);
  }
</script>

<div class="wrapper">
  <div class="buttons-wrapper">
    <div class="buttons-wrapper-items">
      {#if type === TranslatorType.Source}
        <div class="source">
          <button>
            <img src={microphoneSVG} alt="microphone" class="svg-icon" />
          </button>
          <button>
            <img src={loudSpeakerSVG} alt="loudspeaker" class="svg-icon" />
          </button>
        </div>
      {:else}
        <div class="target">
          <button on:click={onCopyText} disabled={letterCounter === 0}>
            <img src={copySVG} alt="copy" class="svg-icon" />
          </button>
          <button on:click={onShareTranslation} disabled={letterCounter === 0}>
            <img src={shareSVG} alt="share" class="svg-icon" />
          </button>
          <button>
            <img src={loudSpeakerSVG} alt="loudspeaker" class="svg-icon" />
          </button>
        </div>
      {/if}
    </div>
    <div class="buttons-wrapper-items">
      {#if type === TranslatorType.Source}
        <p class="letter-counter">{letterCounter} / {maxTextSize}</p>
        <div class="source">
          <button on:click={openKeyboard} disabled={$configStore.isSmallScreen}>
            <img src={keyboardSVG} alt="keyboard" class="svg-icon" />
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  .buttons-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1.25rem;

    .buttons-wrapper-items {
      width: fit-content;
      display: flex;
      gap: 20px;
      align-items: center;
    }

    .letter-counter {
      background-color: transparent;
    }

    .source,
    .target {
      display: flex;
      gap: 20px;

      button {
        background-color: transparent;
        &:disabled {
          filter: invert(77%) sepia(0%) saturate(546%) hue-rotate(215deg)
            brightness(91%) contrast(99%);
        }
      }
    }

    .source {
      button {
        padding: 5px;
      }
    }
  }

  .svg-icon {
    height: 30px;
    width: 30px;
    cursor: pointer;
    filter: var(--icon-color-filter);
  }
</style>
