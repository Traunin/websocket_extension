const PREV_TAB = "j";
const NEXT_TAB = "g";
let webSocket: WebSocket | null = null;
let serverStatus = WebSocket.CLOSED;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const action: string = request.action;
  switch (action) {
    case "getStatus":
      sendStatus();
      break;
    case "connectWebsocket":
      connect(request.ip, request.port);
      break;
    case "disconnectWebsocket":
      disconnect();
      break;
  }
});

function connect(ip: string, port: string) {
  let address = `ws://${ip}:${port}`;
  console.log(address);
  try {
    webSocket = new WebSocket(address);
  } catch (e) {
    disconnect();
    return;
  }
  sendStatus();

  webSocket.onopen = () => {
    keepAlive();
    sendStatus();
  };

  webSocket.onerror = () => {
    disconnect();
  };

  webSocket.onclose = () => {
    webSocket = null;
    sendStatus();
  };

  webSocket.onmessage = ({ data }) => {
    if (data == PREV_TAB || data == NEXT_TAB) {
      switchTab(data);
      return;
    }
    chrome.runtime.sendMessage({ action: "websocketAction", data });
    sendMessageToCurrentTab(data);
  };
}

function disconnect() {
  if (webSocket == null) {
    return;
  }

  webSocket.close();
}

function keepAlive() {
  const keepAliveInterval = setInterval(
    () => {
      if (webSocket) {
        webSocket.send("keepAlive");
      } else {
        clearInterval(keepAliveInterval);
      }
    },
    20 * 1000, // 20 seconds
  );
}

function sendStatus() {
  chrome.runtime.sendMessage({
    action: "sendStatus",
    websocketStatus: webSocket ? webSocket.readyState : WebSocket.CLOSED,
  });
}

function sendMessageToCurrentTab(message: string) {
  chrome.tabs.query({ active: true }, (tabs) => {
    tabs.forEach((tab) => {
      if (tab != undefined && tab.id != undefined) {
        chrome.tabs.sendMessage(tab.id, message);
      }
    });
  });
}

function switchTab(data: string) {
  let tabOffset = data == PREV_TAB ? 1 : -1;
  chrome.tabs.query({}, (tabs) => {
    let currentTabIndex = tabs.find((tab) => tab.active)?.index;
    if (currentTabIndex == undefined) {
      return;
    }

    let nextTabId = currentTabIndex + tabOffset;
    let tabCount = tabs.length;
    if (nextTabId < 0) {
      nextTabId = tabCount - 1;
    }
    nextTabId %= tabCount;
    let nextTab = tabs[nextTabId].id!;
    chrome.tabs.update(nextTab, { active: true });
  });
}
