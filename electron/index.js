const { ipcRenderer } = require("electron");

const button = document.querySelector(".btn");

const onClickHandler = () => {
  document.querySelector(".message-display__box").style.display =
    "inline-block";
  document.querySelector(".message-display").style.color = "#FEFCD7";
  document.querySelector(".message-display").innerText = "Search started";
  ipcRenderer.send("search-start");
};

button.addEventListener("click", onClickHandler);

ipcRenderer.on("message", (event, message) => {
  document.querySelector(".message-display").innerText = "";
  if (!message.includes("not")) {
    document.querySelector(".message-display").style.color = "#A6CB45";
    document.querySelector(".message-display").innerText = `${message}`;
  } else {
    document.querySelector(".message-display").style.color = "#FC6C85";
    document.querySelector(".message-display").innerText = ` ${message}`;
  }
});
