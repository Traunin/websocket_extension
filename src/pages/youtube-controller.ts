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

const playButton: HTMLElement = document.querySelector(
  "#left-controls #play-pause-button",
)!;

function togglePlay() {
  //playButton.click();
  // space
  pressKey(" ")
  console.log("togglePlay");
}

function previousSong() {
  //K
  pressKey("K")
  console.log("previousSong");
}

function nextSong() {
  //J
  pressKey("J")
  console.log("nextSong");
}

function decreaseVolume() {
  //-
  pressKey("-")
  console.log("decreaseVolume");
}

function toggleMute() {
  //M
  pressKey("M")
  console.log("toggleMute");
}

function increaseVolume() {
  //=
  pressKey("=")
  console.log("increaseVolume");
}

function pressKey(key: string) {
  document.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: key,
    }),
  );
}
