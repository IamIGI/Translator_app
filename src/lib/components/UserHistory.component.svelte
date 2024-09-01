<script lang="ts">
  import { TranslateModelSourceEnum } from '$lib/api/translator/generated';
  import starSVG from '$assets/star.svg';
  import dotMenuSVG from '$assets/dotMenu.svg';
  import rightArrowSVG from '$assets/rightArrow.svg';

  const mock: T_.TranslationLS[] = [
    {
      date: '30.03.2024',
      source: { id: TranslateModelSourceEnum.En, lang: 'english' },
      target: { id: TranslateModelSourceEnum.Pl, lang: 'polish' },
      text: 'Cześc co słychać',
      translation: "Hello, what's up?",
    },
    {
      date: '30.03.2024',
      source: { id: TranslateModelSourceEnum.En, lang: 'english' },
      target: { id: TranslateModelSourceEnum.Pl, lang: 'polish' },
      text: 'Nie ma mnie w domu',
      translation: "I'm not at home",
    },
    {
      date: '30.03.2024',
      source: { id: TranslateModelSourceEnum.En, lang: 'english' },
      target: { id: TranslateModelSourceEnum.Pl, lang: 'polish' },
      text: 'Piecze ziemniaki',
      translation: 'Baking potatoes',
    },
    {
      date: '30.03.2024',
      source: { id: TranslateModelSourceEnum.En, lang: 'english' },
      target: { id: TranslateModelSourceEnum.Pl, lang: 'polish' },
      text: 'Chodze na silownie',
      translation: 'I go to the gym',
    },
    {
      date: '30.03.2024',
      source: { id: TranslateModelSourceEnum.En, lang: 'english' },
      target: { id: TranslateModelSourceEnum.Pl, lang: 'polish' },
      text: 'Głośniki są głośne ale da sie wytzymać',
      translation: 'The speakers are loud but bearable',
    },
    {
      date: '30.03.2024',
      source: { id: TranslateModelSourceEnum.En, lang: 'english' },
      target: { id: TranslateModelSourceEnum.Pl, lang: 'polish' },
      text: 'Ten problem może wystąpić, jeśli te funkcje zostaną błędnie wywołane w bloku kodu, który nie jest bezpośrednio wykonywany podczas inicjalizacji komponentu. Na przykład umieszczenie ich wewnątrz bloku warunkowego lub wewnątrz funkcji asynchronicznej może spowodować ten problem.',
      translation:
        "This issue can arise if these functions are mistakenly called within a block of code that is not directly executed during the component's initialization. For example, placing them inside a conditional block or inside an asynchronous function can cause this problem.",
    },
  ];
</script>

<div class="wrapper">
  <div class="list-wrapper">
    {#each mock as translation}
      <div class="item-wrapper">
        <div class="top-menu">
          <div class="top-menu-languages">
            <span>{translation.source.lang}</span>
            <img src={rightArrowSVG} alt="rightArrow" class="right-svg" />
            <span>{translation.target.lang}</span>
          </div>
          <div class="top-menu-options">
            <img src={starSVG} alt="star" class="options-svg" />
            <img src={dotMenuSVG} alt="dotMenu" class="options-svg" />
          </div>
        </div>
        <div class="text-wrapper">
          <p>{translation.text}</p>
          <p>{translation.translation}</p>
        </div>
        <div class="date-wrapper">
          <p>{translation.date}</p>
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    max-height: 650px;
    overflow: auto;
    /* outline: 1px solid green; */
  }

  .list-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .item-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);

    padding: 5px 0px 6px 10px;

    max-height: 150px;
    overflow: auto;
  }

  .top-menu {
    width: 100%;
    padding-right: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .top-menu-languages {
      width: fit-content;
      display: flex;
      justify-content: flex-start;
      gap: 10px;
      align-items: center;
      font-size: var(--font-size-minV2);

      .right-svg {
        width: 20px;
        height: 20px;
      }
    }

    .top-menu-options {
      width: fit-content;
      display: flex;
      justify-content: flex-start;
      gap: 5px;
      align-items: center;

      .options-svg {
        width: 30px;
        height: 30px;
        border-radius: 25%;
        padding: 5px;
        cursor: pointer;

        &:hover {
          background-color: var(--color-hover);
        }
      }
    }
  }

  .text-wrapper {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    p {
      font-size: var(-font-size-min);
      margin: 0;
      padding: 0;

      &:nth-of-type(2) {
        color: rgb(102, 101, 101);
      }
    }
  }

  .date-wrapper {
    width: 100%;
    p {
      font-size: var(--font-size-footer);
      margin: 0;
      padding: 0;
      color: rgb(134, 134, 134);
    }
  }
</style>
