import Controller from "./controller";
const actionsMap: { [char: string]: () => void } = {
  f: togglePlay,
  e: previousSong,
  d: nextSong,
  b: decreaseVolume,
  c: toggleMute,
  a: increaseVolume,
};

new Controller(actionsMap);

function togglePlay() {
  pressKey(" ");
}

function previousSong() {
  pressKey("K");
}

function nextSong() {
  pressKey("J");
}

function decreaseVolume() {
  pressKey("-");
}

function toggleMute() {
  pressKey("M");
}

function increaseVolume() {
  pressKey("=");
}

function pressKey(key: string) {
  document.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: key,
    }),
  );
}
