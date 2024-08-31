<script lang="ts">
  import { TranslatorType } from '$lib/models/enums';
  import microphoneSVG from '$assets/microphone.svg';
  import loudSpeakerSVG from '$assets/loudspeaker.svg';
  import copySVG from '$assets/copy.svg';
  import keyboardSVG from '$assets/keyboard.svg';

  export let letterCounter: number;
  export let maxTextSize: number;
  export let type: TranslatorType;
</script>

<div class="wrapper">
  <div class="buttons-wrapper">
    <div class="buttons-wrapper-items">
      {#if type === TranslatorType.Source}
        <img src={microphoneSVG} alt="microphone" class="svg-icon" />
        <img src={loudSpeakerSVG} alt="loudspeaker" class="svg-icon" />
      {:else}
        <img src={copySVG} alt="copy" class="svg-icon" />
        <img src={loudSpeakerSVG} alt="loudspeaker" class="svg-icon" />
      {/if}
    </div>
    <div class="buttons-wrapper-items">
      {#if type === TranslatorType.Source}
        <p>{letterCounter} / {maxTextSize}</p>
        <img src={keyboardSVG} alt="keyboard" class="svg-icon" />
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
  }

  .svg-icon {
    height: 30px;
    width: 30px;
    cursor: pointer;
  }
</style>
