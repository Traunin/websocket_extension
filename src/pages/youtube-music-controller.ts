import Controller from "./controller";
import { pressKey } from "./key-press";

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
