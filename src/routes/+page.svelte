<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { translate } from '$lib/api/translator/translator.api.service';
  import { TranslateModelSourceEnum } from '$lib/api/translator/generated';
  import Navigation from '$lib/components/Navigation.component.svelte';
  import TranslatorsView from '$lib/components/TranslatorsView.component.svelte';
  import InfoForUser from '$lib/components/InfoForUser.component.svelte';
  import Footer from '$lib/components/Footer.component.svelte';
  import translatorUtils from '$lib/utils/translator.utils';
  import translatorStore from '$lib/+stores/translator.store';
  import payloadMiddlewareUtils from '$lib/utils/payloadMiddleware.utils';
  import configStore from '$lib/+stores/config.store';

  onMount(() => {
    // translate('Cz', TranslateModelSourceEnum.Auto, TranslateModelSourceEnum.En);
    translatorUtils.getSharedTranslation();
  });

  function onUpdateDayNightMode(e: CustomEvent<boolean>) {
    configStore.updateDayNightMode(e.detail);
  }

  let translatedTextData: T_.TranslationLS;

  translatorStore.subscribe((state) => {
    translatedTextData = payloadMiddlewareUtils.translation_TranslationLS(
      {
        details: null,
        translations: {
          source: state.selectedSourceLanguage,
          target: state.selectedTargetLanguage,
          text: state.sourceText,
          translation: state.translatedText,
        },
      },
      state.supportedLanguages
    );
  });
</script>

<div class="wrapper">
  <Navigation
    isDayMode={$configStore.isDayMode}
    on:dateDayNightMode={onUpdateDayNightMode}
  />
  <TranslatorsView {translatedTextData} />
  <InfoForUser />
  <Footer />
</div>

<style lang="scss">
  .wrapper {
    background-color: var(--main-background-color);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
    height: 100%;
    width: 100%;
    /* outline: 1px solid red; */
    margin: 0;
    padding: 0;
  }
</style>
