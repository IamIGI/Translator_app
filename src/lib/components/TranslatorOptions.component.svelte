<script lang="ts">
  import { TranslatorType } from '$lib/models/enums';
  import microphoneSVG from '$assets/microphone.svg';
  import loudSpeakerSVG from '$assets/loudspeaker.svg';
  import copySVG from '$assets/copy.svg';
  import keyboardSVG from '$assets/keyboard.svg';
  import shareSVG from '$assets/share.svg';
  import { createEventDispatcher } from 'svelte';

  export let letterCounter: number;
  export let maxTextSize: number;
  export let type: TranslatorType;

  const dispatch = createEventDispatcher();

  function onCopyText() {
    dispatch('copyToClipboard', null);
  }

  function onShareTranslation() {
    dispatch('shareTranslation');
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
        <p>{letterCounter} / {maxTextSize}</p>
        <div class="source">
          <button>
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

    .source,
    .target {
      display: flex;
      gap: 20px;

      button {
        background-color: transparent;
        /* &:disabled {
          border-bottom: 1px solid red;
        } */
      }
    }

    .source {
      button {
        padding: 5px;
      }
    }

    .target {
      button {
        :hover {
          background-color: #262522;
        }
      }
    }
  }

  .svg-icon {
    height: 30px;
    width: 30px;
    cursor: pointer;
  }
</style>
