const playButton: HTMLElement = document.querySelector(
  "#left-controls #play-pause-button",
)!;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  playButton.click();
});
