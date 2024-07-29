const actionsMap: { [char: string]: () => void } = {
  f: togglePlay,
  e: previousSong,
  d: nextSong,
  b: decreaseVolume,
  c: toggleMute,
  a: increaseVolume,
};

chrome.runtime.onMessage.addListener((request) => {
  console.log(request);
  const action = actionsMap[request];

  if (action) {
    action();
  } else {
    console.error("Action not defined");
  }
});

function togglePlay() {
  pressKey(" ");
  console.log("togglePlay");
}

function previousSong() {
  pressKey("K");
  console.log("previousSong");
}

function nextSong() {
  pressKey("J");
  console.log("nextSong");
}

function decreaseVolume() {
  pressKey("-");
  console.log("decreaseVolume");
}

function toggleMute() {
  pressKey("M");
  console.log("toggleMute");
}

function increaseVolume() {
  pressKey("=");
  console.log("increaseVolume");
}

function pressKey(key: string) {
  document.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: key,
    }),
  );
}
