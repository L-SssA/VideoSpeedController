const SpeedNumber = document.querySelector("#SpeedNum");
const bg = chrome.extension.getBackgroundPage();
const button = document.querySelector("#setButton")

button.addEventListener('click', function () {
  bg.setSpeed(Number(SpeedNumber.value))
})

document.addEventListener('DOMContentLoaded', async function () {
  SpeedNumber.value = await bg.getSpeed();
})