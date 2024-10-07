export default function keyboardHandler(
  inputRef: HTMLTextAreaElement,
  textValue: string,
  key: string
): string {
  //   const caretPosition = inputRef.selectionStart;

  switch (key) {
    case 'Backspace':
      textValue = textValue.slice(0, -1);
      //   textValue =
      //     textValue.slice(0, caretPosition - 1) + textValue.slice(caretPosition);
      break;
    case 'Space':
      textValue = textValue + ' ';
      break;

    default:
      textValue = textValue + key;
      break;
  }

  return textValue;
}
