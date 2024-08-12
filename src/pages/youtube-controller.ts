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
const volumeSlider = document.querySelector(".ytp-volume-panel")!;

new Controller(actionsMap);

const K_KEY_KEYCODE = 75;
function togglePlay() {
  pressKeyKeyCode(K_KEY_KEYCODE);
}

const ARROW_LEFT_KEYCODE = 37;
function seekBackward() {
  pressKeyKeyCode(ARROW_LEFT_KEYCODE);
}

const ARROW_RIGHT_KEYCODE = 39;
function seekForward() {
  pressKeyKeyCode(ARROW_RIGHT_KEYCODE);
}

function decreaseVolume() {
  changeVolume(-60);
}

const M_KEY_KEYCODE = 77;
function toggleMute() {
  pressKeyKeyCode(M_KEY_KEYCODE);
}

function increaseVolume() {
  changeVolume(60);
}

// Emulates a scroll on a volume slider
function changeVolume(scrollAmount: number) {
  let scrollEvent = new WheelEvent("wheel", { deltaY: -scrollAmount });
  volumeSlider.dispatchEvent(scrollEvent);
}
