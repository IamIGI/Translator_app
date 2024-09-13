<script lang="ts">
  import dateUtils from '$lib/utils/date.utils';
  import rightArrowSVG from '$assets/rightArrow.svg';

  export let data: T_.TranslationLS[];
</script>

<div class="list-wrapper">
  {#each data as translation, index}
    <div class="item-wrapper">
      <div class="top-menu">
        <div class="top-menu-languages">
          <span>{translation.source.lang}</span>
          <img src={rightArrowSVG} alt="rightArrow" class="right-svg" />
          <span>{translation.target.lang}</span>
        </div>
        <div class="top-menu-options">
          <slot name="menu" translationId={translation.id} {index} />
        </div>
      </div>
      <div class="text-wrapper">
        <p>{translation.text}</p>
        <p>{translation.translation}</p>
      </div>
      <div class="date-wrapper">
        <p>{dateUtils.formatDateToDDMMYYYY(new Date(translation.date))}</p>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
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
      position: relative;
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
