function sendMessageToContentScript (message, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
      if (callback) callback(response);
    });
  });
}

function setSpeed (speedValue) {
  chrome.storage.local.set({ bg_speedValue: speedValue }, function () {
    console.log('speedValue：' + speedValue + '，保存成功！');
  });
}

async function getSpeed () {
  const speed = await new Promise((resolve, reject) => {
    chrome.storage.local.get({ bg_speedValue: 1 }, function (items) {
      resolve(items.bg_speedValue)
    });
  })

  return speed;
}

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  switch (request.tag) {
    case "getSpeed":
      await chrome.storage.local.get({ bg_speedValue: 1 }, function (items) {
        sendResponse({
          code: 200,
          speedValue: items.bg_speedValue
        });
      });
      break;

    default:
      sendResponse({
        code: 202
      });
  }
});

// 右键菜单
chrome.contextMenus.create({
  id: "main",
  title: "san'SpeedPlay",
  contexts: ["page"],
})

// 右键开始加速
chrome.contextMenus.create({
  id: "play",
  parentId: "main",
  title: "play",
  onclick: async function () {
    const speed = await getSpeed();
    await sendMessageToContentScript({ tag: "changeAllVideoSpeed", speedValue: speed }, function (response) {
      console.log(`加速成功！当前速度为：${response.speedValue}`)
    })
  },
})

// 右键重置加速
chrome.contextMenus.create({
  id: "stop",
  parentId: "main",
  title: "reset",
  onclick: async function () {
    await sendMessageToContentScript({ tag: "resetAllVideoSpeed" }, function (response) {
      console.log(`重置成功！当前速度为：${response.speedValue}`)
    })
  },
})