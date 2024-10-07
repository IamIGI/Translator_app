<script lang="ts">
  import { TranslatorType } from '$lib/models/enums';
  import configStore from '$lib/+stores/config.store';
  import microphoneSVG from '$assets/microphone.svg';
  import loudSpeakerSVG from '$assets/loudspeaker.svg';
  import copySVG from '$assets/copy.svg';
  import keyboardSVG from '$assets/keyboard.svg';
  import shareSVG from '$assets/share.svg';
  import translateSVG from '$assets/translate.svg';
  import { createEventDispatcher } from 'svelte';

  export let letterCounter: number;
  export let maxTextSize: number;
  export let type: TranslatorType;

  let isKeyboardOpen: boolean = false;

  const dispatch = createEventDispatcher<{
    copyToClipboard: null;
    shareTranslation: undefined;
    showKeyboard: boolean;
    callForTranslate: undefined;
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

  function callForTranslate() {
    console.log('callForTranslate_1');
    dispatch('callForTranslate');
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
          <button
            class="transparent-button-color"
            on:click={onCopyText}
            disabled={letterCounter === 0}
          >
            <img src={copySVG} alt="copy" class="svg-icon" />
          </button>
          <button
            class="transparent-button-color"
            on:click={onShareTranslation}
            disabled={letterCounter === 0}
          >
            <img src={shareSVG} alt="share" class="svg-icon" />
          </button>
          <button class="transparent-button-color">
            <img src={loudSpeakerSVG} alt="loudspeaker" class="svg-icon" />
          </button>
        </div>
      {/if}
    </div>
    <div class="buttons-wrapper-items">
      {#if type === TranslatorType.Source}
        <p class="letter-counter">{letterCounter} / {maxTextSize}</p>
        <div class="source">
          {#if $configStore.isSmallScreen}
            <button on:click={callForTranslate} class="svg-translate-icon">
              <img src={translateSVG} alt="translate" />
            </button>
          {:else}
            <button on:click={openKeyboard}>
              <img src={keyboardSVG} alt="keyboard" class="svg-icon" />
            </button>
          {/if}
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

  .transparent-button-color {
    background-color: transparent;
  }

  .svg-icon {
    height: 30px;
    width: 30px;
    cursor: pointer;
    filter: var(--icon-color-filter);
  }

  .svg-translate-icon {
    cursor: pointer;
    padding: 10px;
    background-color: var(--color-button);
    border: 3px solid var(--color-accent);
    border-radius: 15px;

    img {
      height: 40px;
      width: 80px;
      background-color: transparent;
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
</style>
