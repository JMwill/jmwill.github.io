import utils from "./utils/index";
import { getRandomColor } from "./utils/colors";

function changeContainerBgColor(color) {
  utils.$(".container-bg").style.backgroundColor = color;
}

function changeTitleColor(brightness) {
  utils.$(".main-title").style.color =
    brightness === "dark" ? "#ffffff" : "#000000";
}

let colorInterval;
document.addEventListener("DOMContentLoaded", () => {
  colorInterval = setInterval(() => {
    const color = getRandomColor();
    const brightness = utils.lightOrDark(color);
    changeContainerBgColor(color);
    changeTitleColor(brightness);
  }, 30 * 1000);
});
document.addEventListener("beforeunload", () => {
  clearInterval(colorInterval);
});
