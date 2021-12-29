const catchMessage = (message) => {
  displayMessage(message);
};

module.exports = catchMessage;

const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const main = require("../puppeteer/index.js");

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadFile(`${__dirname}/index.html`);
  mainWindow.on("close", () => {
    mainWindow = null;
  });
};

app.on("ready", createWindow);

ipcMain.on("search-start", (event, args) => {
  main();
});
function displayMessage(message) {
  mainWindow.webContents.send("message", message);
}

process.platform === "win32" && Menu(null);
