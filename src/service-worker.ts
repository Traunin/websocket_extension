let webSocket: WebSocket | null = null;
const enum ServerStatus {
  disconnected = 0,
  connecting = 1,
  connected = 2,
}
let serverStatus = ServerStatus.disconnected;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  connect(request.ip, request.port);
});

function connect(ip: string, port: string) {
  let address = `ws://${ip}:${port}`;
  console.log(address);
  webSocket = new WebSocket(address);
  serverStatus = ServerStatus.connecting

  webSocket.onopen = () => {
    keepAlive();
    serverStatus = ServerStatus.connected
  };

  webSocket.onclose = () => {
    webSocket = null;
    serverStatus = ServerStatus.disconnected
  };

  webSocket.onmessage = ({ data }) => {
    console.log(data)
  }
}

function disconnect() {
  if (webSocket == null) {
    return
  }

  webSocket.close()
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
