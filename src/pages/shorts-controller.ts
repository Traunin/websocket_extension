import Controller from "./controller";
const actionsMap: { [char: string]: () => void } = {
  f: togglePlay,
  e: previousShort,
  d: nextShort,
  b: decreaseVolume,
  c: toggleMute,
  a: increaseVolume,
};
const videoPlayer = document.querySelector("video")!;

new Controller(actionsMap);

function togglePlay() {
  pressKeyCode("Space");
}

function previousShort() {
  pressKeyCode("ArrowUp");
}

function nextShort() {
  pressKeyCode("ArrowDown");
}

function decreaseVolume() {
  changeVolume(-0.1);
}

function toggleMute() {
  pressKeyCode("KeyM");
}

function increaseVolume() {
  changeVolume(0.1);
}

function changeVolume(deltaVolume: number) {
  let currentVolume = videoPlayer.volume;
  let newVolume = Math.min(Math.max(currentVolume + deltaVolume, 0), 1);
  videoPlayer.volume = newVolume;
}

function pressKeyCode(code: string) {
  document.dispatchEvent(
    new KeyboardEvent("keydown", {
      code: code,
    }),
  );
}
