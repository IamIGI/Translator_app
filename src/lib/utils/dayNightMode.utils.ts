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
  },
};

function changeMode(document: Document, isDayMode: boolean) {
  //background
  document.documentElement.style.setProperty(
    '--main-background-color',
    isDayMode
      ? instructions.day.backgroundColor
      : instructions.night.backgroundColor // Day: Blue, Night: Dark Gray
  );
  //second background
  document.documentElement.style.setProperty(
    '--main-second-background-color',
    isDayMode
      ? instructions.day.backgroundColorSecond
      : instructions.night.backgroundColorSecond // Day: Blue, Night: Dark Gray
  );
  //button background
  document.documentElement.style.setProperty(
    '--main-button-background-color',
    isDayMode
      ? instructions.day.buttonBackgroundColor
      : instructions.night.buttonBackgroundColor // Day: Blue, Night: Dark Gray
  );
  //button hover background
  document.documentElement.style.setProperty(
    '--main-button-background-color-hover',
    isDayMode
      ? instructions.day.buttonBackgroundColorHover
      : instructions.night.buttonBackgroundColorHover // Day: Blue, Night: Dark Gray
  );

  document.documentElement.style.setProperty(
    '--main-text-color',
    isDayMode ? instructions.day.textColor : instructions.night.textColor // Day: Blue, Night: Dark Gray
  );
  document.documentElement.style.setProperty(
    '--target-translator-background-color',
    isDayMode
      ? instructions.day.targetTranslatorBackgroundColor
      : instructions.night.targetTranslatorBackgroundColor // Day: Blue, Night: Dark Gray
  );
  document.documentElement.style.setProperty(
    '--border-color',
    isDayMode ? instructions.day.borderColor : instructions.night.borderColor // Day: Blue, Night: Dark Gray
  );
  document.documentElement.style.setProperty(
    '--scrollbar-background-color-thumb',
    isDayMode
      ? instructions.day.scrollBarBackgroundColorThumb
      : instructions.night.scrollBarBackgroundColorThumb // Day: Blue, Night: Dark Gray
  );
  document.documentElement.style.setProperty(
    '--scrollbar-background-color-thumb-hover',
    isDayMode
      ? instructions.day.scrollBarBackgroundColorThumbHover
      : instructions.night.scrollBarBackgroundColorThumbHover // Day: Blue, Night: Dark Gray
  );
}

export default {
  changeMode,
};
