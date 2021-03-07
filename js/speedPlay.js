chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const videoPlayers = document.querySelectorAll('video');
  switch (request.tag) {
    case "changeAllVideoSpeed":
      videoPlayers.forEach(item => {
        item.playbackRate = request.speedValue;
      })
      sendResponse({
        code: 200,
        speedValue: request.speedValue
      });
      break;

    case "resetAllVideoSpeed":
      videoPlayers.forEach(item => {
        item.playbackRate = 1;
      })
      sendResponse({
        code: 200,
        speedValue: 1
      });
      break;

    default:
      sendResponse({
        code: 202
      });
  }


});

