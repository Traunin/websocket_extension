import "../styles/popup.css";

const connectButton: Element = document.querySelector(".connect")!;
const ipField: HTMLInputElement = document.querySelector(".ip")!;
const portField: HTMLInputElement = document.querySelector(".port")!;
const logDisplay: HTMLElement = document.querySelector("p")!;
const logs: HTMLElement = document.querySelector(".logs")!;

let websocketStatus: number = WebSocket.CLOSED;

displayDataFromStorage();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const action: string = request.action;
  switch (action) {
    case "sendStatus":
      websocketStatus = request.websocketStatus;
      updateButtonVisual();
      break;
    case "websocketAction":
      logDisplay.innerHTML = request.data;
  }
});

function updateButtonVisual() {
  switch (websocketStatus) {
    case WebSocket.CONNECTING:
      connectButton.innerHTML = "Connecting...";
      connectButton.className = "connecting";
      logs.className = "hidden";
      break;
    case WebSocket.OPEN:
      connectButton.innerHTML = "Disconnect";
      connectButton.className = "connected";
      logs.className = "logs";
      break;
    case WebSocket.CLOSED:
      connectButton.innerHTML = "Connect";
      connectButton.className = "disconnected";
      logs.className = "hidden";
      break;
  }
}

connectButton.addEventListener("click", () => {
  switch (websocketStatus) {
    case WebSocket.CONNECTING:
      disconnectWebsocket();
      break;
    case WebSocket.OPEN:
      disconnectWebsocket();
      break;
    case WebSocket.CLOSED:
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
    ipField.value = storedData["ip"] || "";
  });
  chrome.storage.sync.get(["port"], (storedData) => {
    portField.value = storedData["port"] || "";
  });
  askForButtonStatus();
}

function askForButtonStatus() {
  chrome.runtime.sendMessage({ action: "getStatus" });
}
