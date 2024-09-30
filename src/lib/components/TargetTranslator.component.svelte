<script lang="ts">
  import { CONSTS } from '$lib/CONSTS';
  import { TranslatorType, UrlParamsEnum } from '$lib/models/enums';
  import LanguageMenu from './LanguageMenu.component.svelte';
  import TranslatorOptions from './TranslatorOptions.component.svelte';
  import translatorStore from '$lib/+stores/translator.store';
  import { TranslateModelSourceEnum } from '$lib/api/translator/generated';
  import starSVG from '$assets/star.svg';
  import localStorageDataUtils, {
    LSKey,
  } from '$lib/utils/localStorageData.utils';
  import notificationsUtils from '$lib/utils/notifications.utils';
  import translatorUtils from '$lib/utils/translator.utils';

  export let selectedLanguage: TranslateModelSourceEnum;
  export let translatedText: string = '';
  export let translatedTextData: T_.TranslationLS;

  function saveFavorites() {
    console.log('saveFavorites');
    console.log(translatedTextData);
    if (!translatedText || !translatedTextData) {
      console.warn('No translated text to save');
      return;
    }
    const userFavorites = localStorageDataUtils.saveData(
      LSKey.userFavorites,
      translatedTextData
    );
    translatorStore.setUserFavorites(userFavorites);
    notificationsUtils.showInformation('Translation added to favorites');
  }

  function handleCopyToClipboard() {
    if (translatedText.length === 0) return;
    navigator.clipboard.writeText(translatedText);
    notificationsUtils.showInformation('Text copied!');
  }

  function handleShareTranslation() {
    const translatedTextPair = translatorStore.getObjectFroSharedTranslation();
    const translatedTextPairString = JSON.stringify(translatedTextPair);

    const link = translatorUtils.createLink(
      UrlParamsEnum.TranslationHistory,
      translatedTextPairString
    );

    navigator.clipboard.writeText(link);
    notificationsUtils.showInformation('Link copied. Now you can share it!');
  }
</script>

<div class="wrapper">
  <LanguageMenu
    langShortMenu={translatorStore.getLanguageShortMenuList(selectedLanguage)}
    {selectedLanguage}
    type={TranslatorType.Target}
  />
  <div class="translator-wrapper translator-target">
    <textarea
      name="translator"
      bind:value={translatedText}
      placeholder="Your translated text"
      class="translator-target"
    />
    {#if translatedText.length > 0}
      <button class="save-mark" on:click={saveFavorites}>
        <img src={starSVG} class="svg-icon" alt="removeMark" />
      </button>
    {/if}
    <TranslatorOptions
      letterCounter={translatedText.length}
      maxTextSize={CONSTS.maxTextSize}
      type={TranslatorType.Target}
      on:copyToClipboard={handleCopyToClipboard}
      on:shareTranslation={handleShareTranslation}
    />
  </div>
</div>

<style lang="scss">
  .wrapper {
    /* outline: 1px solid green; */
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 400px;
  }

  .translator-wrapper {
    position: relative;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
    max-height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: var(--border-radius);
    padding: 0.5rem;

    textarea {
      border: none;
      flex: 1;
      width: calc(100% - 35px);

      resize: none;
      outline: none;
      font-size: var(--font-size-normal);
      //   border: 1px solid red;
      margin-right: 35px;
    }
  }

  .save-mark {
    position: absolute;
    top: 5px;
    right: 6px;
    background-color: transparent;
    cursor: pointer;
    border-radius: 25%;
    padding: 3px;

    &:hover {
      cursor: pointer;
      background-color: rgb(231, 172, 70);
      color: white;
      border-bottom: 1px solid rgba(250, 249, 249, 0.12);
    }

    img {
      height: 23px;
      width: 23px;
      background-color: transparent;
    }
  }

  .translator-target {
    background-color: var(--target-translator-background-color);
  }
</style>
