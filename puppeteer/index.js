const labelSearch = require("./labelSearch.js");
const labelPrint = require("./labelPrint.js");

const main = async () => {
  const foundLabels = await labelSearch();
  const printedLabels = await labelPrint(foundLabels);
  return printedLabels;
};

module.exports = main;
