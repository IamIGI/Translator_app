const instructions = {
  day: {
    backgroundColor: '#fff',
    backgroundColorSecond: '#fff',

    buttonBackgroundColor: '#fff',
    buttonBackgroundColorHover: '#f5f3f3',

    textColor: '#000',
    targetTranslatorBackgroundColor: '#f5f5f5',
    borderColor: '#e5e7eb',
    scrollBarBackgroundColorThumb: '#c2c2c2',
    scrollBarBackgroundColorThumbHover: '#b3b3b3',
    /* https://codepen.io/sosuke/pen/Pjoqqp */
    iconColorFilter:
      'invert(0%) sepia(10%) saturate(56%) hue-rotate(274deg) brightness(109%) contrast(100%)', //black
  },
  night: {
    backgroundColor: '#151411',
    backgroundColorSecond: '#262522',

    buttonBackgroundColor: '#262522',
    buttonBackgroundColorHover: '#333130',

    textColor: '#cccccc',
    targetTranslatorBackgroundColor: '#333130',
    borderColor: '#42403f',
    scrollBarBackgroundColorThumb: '#333130',
    scrollBarBackgroundColorThumbHover: '#2b2a29',
    iconColorFilter:
      'invert(56%) sepia(5%) saturate(191%) hue-rotate(314deg) brightness(98%) contrast(88%)', // white
  },
};

function changeMode(document: Document, isDayMode: boolean) {
  //background
  document.documentElement.style.setProperty(
    '--main-background-color',
    isDayMode
      ? instructions.day.backgroundColor
      : instructions.night.backgroundColor
  );
  //second background
  document.documentElement.style.setProperty(
    '--main-second-background-color',
    isDayMode
      ? instructions.day.backgroundColorSecond
      : instructions.night.backgroundColorSecond
  );
  //button background
  document.documentElement.style.setProperty(
    '--main-button-background-color',
    isDayMode
      ? instructions.day.buttonBackgroundColor
      : instructions.night.buttonBackgroundColor
  );
  //button hover background
  document.documentElement.style.setProperty(
    '--main-button-background-color-hover',
    isDayMode
      ? instructions.day.buttonBackgroundColorHover
      : instructions.night.buttonBackgroundColorHover
  );

  document.documentElement.style.setProperty(
    '--main-text-color',
    isDayMode ? instructions.day.textColor : instructions.night.textColor
  );
  document.documentElement.style.setProperty(
    '--target-translator-background-color',
    isDayMode
      ? instructions.day.targetTranslatorBackgroundColor
      : instructions.night.targetTranslatorBackgroundColor
  );
  document.documentElement.style.setProperty(
    '--border-color',
    isDayMode ? instructions.day.borderColor : instructions.night.borderColor
  );
  document.documentElement.style.setProperty(
    '--scrollbar-background-color-thumb',
    isDayMode
      ? instructions.day.scrollBarBackgroundColorThumb
      : instructions.night.scrollBarBackgroundColorThumb
  );
  document.documentElement.style.setProperty(
    '--scrollbar-background-color-thumb-hover',
    isDayMode
      ? instructions.day.scrollBarBackgroundColorThumbHover
      : instructions.night.scrollBarBackgroundColorThumbHover
  );
  document.documentElement.style.setProperty(
    '--icon-color-filter',
    isDayMode
      ? instructions.day.iconColorFilter
      : instructions.night.iconColorFilter
  );
}

export default {
  changeMode,
};
