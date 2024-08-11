import Controller from "./controller";
import { pressKeyKeyCode } from "./key-press";

const actionsMap: { [char: string]: () => void } = {
  f: togglePlay,
  e: seekBackward,
  d: seekForward,
  b: decreaseVolume,
  c: toggleMute,
  a: increaseVolume,
};
const videoPlayer = document.querySelector("video")!;

new Controller(actionsMap);

const K_KEY_KEYCODE = 75;
function togglePlay() {
  pressKeyKeyCode(K_KEY_KEYCODE);
}

const ARROW_LEFT_KEYCODE = 37
function seekBackward() {
  pressKeyKeyCode(ARROW_LEFT_KEYCODE);
}

const ARROW_RIGHT_KEYCODE = 39
function seekForward() {
  pressKeyKeyCode(ARROW_RIGHT_KEYCODE);
}

function decreaseVolume() {
  changeVolume(-0.1);
}

const M_KEY_KEYCODE = 77;
function toggleMute() {
  pressKeyKeyCode(M_KEY_KEYCODE);
}

function increaseVolume() {
  changeVolume(0.1);
}

function changeVolume(deltaVolume: number) {
  let currentVolume = videoPlayer.volume;
  let newVolume = Math.min(Math.max(currentVolume + deltaVolume, 0), 1);
  videoPlayer.volume = newVolume;
}
