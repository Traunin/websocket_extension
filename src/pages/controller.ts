export default class Controller {
  constructor(actionsMap: { [id: string]: () => void }) {
    chrome.runtime.onMessage.addListener((request) => {
      console.log(request);
      const action = actionsMap[request];

      if (action) {
        action();
      } else {
        console.error("Action not defined");
      }
    });
  }
}
