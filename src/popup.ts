import "../styles/popup.css";
const connectButton: Element = document.querySelector(".connect")!;
const ipField: HTMLInputElement = document.querySelector(".ip")!;
const portField: HTMLInputElement = document.querySelector(".port")!;

displayDataFromStorage();

connectButton.addEventListener("click", () => {
  let ip = ipField.value;
  let port = portField.value;

  chrome.runtime.sendMessage({ ip, port });
});

ipField.addEventListener("keyup", () => {
  chrome.storage.sync.set({ ip: ipField.value });
});

portField.addEventListener("keyup", () => {
  chrome.storage.sync.set({ port: portField.value });
});

function displayDataFromStorage(): void {
  chrome.storage.sync.get(["ip"], (storedData) => {
    ipField.value = storedData["ip"];
  });
  chrome.storage.sync.get(["port"], (storedData) => {
    portField.value = storedData["port"];
  });
}
