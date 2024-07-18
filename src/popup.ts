const connectButton: Element = document.querySelector(".connect")!;
const ipField: HTMLInputElement = document.querySelector(".ip")!;
const portField: HTMLInputElement = document.querySelector(".port")!;

connectButton.addEventListener("click", () => {
  let ip = ipField.value;
  let port = portField.value;
  console.log(`ws://${ip}:${port}`);
});
