export function pressKeyCode(code: string) {
  document.dispatchEvent(
    new KeyboardEvent("keydown", {
      code: code,
    }),
  );
}

export function pressKeyKeyCode(code: number) {
  document.dispatchEvent(
    new KeyboardEvent("keydown", {
      keyCode: code,
    }),
  );
}

export function pressKey(key: string) {
  document.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: key,
    }),
  );
}
