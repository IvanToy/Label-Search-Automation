const { ipcRenderer } = require("electron");

const button = document.querySelector(".start-btn");
document.querySelector(".underline").style.display = "none";

const startHandle = () => {
  document.querySelector(".message-display").style.color = "blue";
  document.querySelector(".message-display").innerText = "Search started";
  document.querySelector(".underline").style.display = "inline-block";
  ipcRenderer.send("search-start");
};

button.addEventListener("click", startHandle);

ipcRenderer.on("message", (event, message) => {
  document.querySelector(".message-display").innerText = "";
  if (!message.includes("not")) {
    document.querySelector(".message-display").style.color = "green";
    document.querySelector(".message-display").innerText = `${message}`;
  } else if (message.includes("not")) {
    document.querySelector(".message-display").style.color = "red";
    document.querySelector(".message-display").innerText = ` ${message}`;
  } else {
    document.querySelector(".message-display").style.color = "blue";
    document.querySelector(".message-display").innerText = `${message}`;
  }
});
