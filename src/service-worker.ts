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
  chrome.tabs.query({ active: true }, ([tab]) => {
    if (tab != undefined && tab.id != undefined) {
      chrome.tabs.sendMessage(tab.id, message);
    }
  });
}
