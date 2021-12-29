const message = (message) => {
  catchMessage(message);
};

module.exports = message;

const catchMessage = require("../electron/main.js");
