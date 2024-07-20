import "../styles/popup.css";
import { ServerStatus } from "./server-status";

const connectButton: Element = document.querySelector(".connect")!;
const ipField: HTMLInputElement = document.querySelector(".ip")!;
const portField: HTMLInputElement = document.querySelector(".port")!;
const logDisplay: HTMLElement = document.querySelector("p")!;

let serverStatus = ServerStatus.disconnected;

displayDataFromStorage();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const action: string = request.action;
  switch (action) {
    case "sendStatus":
      serverStatus = request.serverStatus;
      updateButtonVisual();
      break;
    case "websocketAction":
      logDisplay.innerHTML = request.data;
  }
});

function updateButtonVisual() {
  switch (serverStatus) {
    case ServerStatus.connecting:
      connectButton.innerHTML = "Connecting...";
      connectButton.className = "connecting";
      break;
    case ServerStatus.connected:
      connectButton.innerHTML = "Disconnect";
      connectButton.className = "connected";
      break;
    case ServerStatus.disconnected:
      connectButton.innerHTML = "Connect";
      connectButton.className = "disconnected";
      break;
  }
}

connectButton.addEventListener("click", () => {
  switch (serverStatus) {
    case ServerStatus.connecting:
      // might add early disconnect
      break;
    case ServerStatus.connected:
      disconnectWebsocket();
      break;
    case ServerStatus.disconnected:
      sendConnectionData();
      break;
  }
});

function sendConnectionData() {
  let ip = ipField.value;
  let port = portField.value;

  chrome.runtime.sendMessage({ action: "connectWebsocket", ip, port });
}

function disconnectWebsocket() {
  chrome.runtime.sendMessage({ action: "disconnectWebsocket" });
}

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
  askForButtonStatus();
}

function askForButtonStatus() {
  chrome.runtime.sendMessage({ action: "getStatus" });
}
