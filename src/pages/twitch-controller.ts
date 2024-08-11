import Controller from "./controller";
import { pressKeyKeyCode } from "./key-press";

const actionsMap: { [char: string]: () => void } = {
  f: togglePlay,
  b: decreaseVolume,
  c: toggleMute,
  a: increaseVolume,
  e: selectPreviousStream,
  d: selectNextStream,
  i: goToSelectedStream,
};

new Controller(actionsMap);

let selectedStream = -1;
function selectPreviousStream() {
  selectOffset(-1);
}

function selectNextStream() {
  selectOffset(+1);
}

function goToSelectedStream() {
  if (selectedStream >= 0) {
    let selectedStreamLink = document.querySelectorAll(".side-bar-contents a")[
      selectedStream
    ];
    window.location.href = selectedStreamLink.getAttribute("href") || "";
  }
}

const selectedStyle = `
  scroll-padding-top: 100px;
  background: #0b0;
`;
function selectOffset(offset: number) {
  let streams = document.querySelectorAll(".side-bar-contents a");
  if (selectedStream >= 0) {
    streams[selectedStream].setAttribute("style", "");
  }
  selectedStream += offset;
  if (selectedStream < 0) {
    selectedStream = streams.length - 1;
  } else if (selectedStream >= streams.length) {
    selectedStream = 0;
  }

  streams[selectedStream].setAttribute("style", selectedStyle);
  streams[selectedStream].scrollIntoView();
}

const K_KEY_KEYCODE = 75;
function togglePlay() {
  pressKeyKeyCode(K_KEY_KEYCODE);
}

const M_KEY_KEYCODE = 77;
function toggleMute() {
  pressKeyKeyCode(M_KEY_KEYCODE);
}

function decreaseVolume() {
  changeVolume(-0.1);
}

function increaseVolume() {
  changeVolume(0.1);
}

function changeVolume(deltaVolume: number) {
  let videoPlayer = document.querySelector("video")!;
  let currentVolume = videoPlayer.volume;
  let newVolume = Math.min(Math.max(currentVolume + deltaVolume, 0), 1);
  videoPlayer.volume = newVolume;
}
