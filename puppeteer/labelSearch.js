const puppeteer = require("puppeteer");
const chrome = require("chrome-cookies-secure");

const message = require("./message.js");

const foundLabels = [];

const labelSearch = async () => {
  const cookies = await chrome.getCookiesPromised(
    "https://www.example.com",
    "puppeteer",
    "Profile"
  );

  const browser = await puppeteer.launch({
    slowMo: 250,
    headless: false,
    // executablePath: "Path to chrome/chromium",
  });
  let pages = await browser.pages();
  const page = pages[0];

  await page.setCookie(...cookies);
  try {
    await page.goto("https://www.ebay.com/sh/lst/active", {
      waitUntil: "networkidle2",
    });

    await page.select("select#primaryFilter", "listingSKU");

    let start = 1;
    let end = 200;
    let code = 65;
    let char = String.fromCharCode(code);

    while (start <= end) {
      let label = `${char}${start}`;

      await page.type(
        "#filters > form > div:nth-child(3) > div > div > div.tertiary-filter-wrap > div > div > input[type=text]",
        label,
        { delay: 100 }
      );

      await page.keyboard.press("Enter");

      await page.waitForSelector(
        "#shlistings-cntr > div.summary > div:nth-child(1) > h2 > span.result-range",
        { visible: true, timeout: 0 }
      );

      let exists = await page.evaluate(() => {
        return document.querySelector(
          "#shlistings-cntr > div.summary > div:nth-child(1) > h2 > span.result-range"
        ).innerText;
      });

      if (!exists.includes("1")) {
        foundLabels.push(label);
        message(`label: ${label} does not exist`);
      } else {
        message(`label: ${label} does  exist`);
      }
      start++;

      await page.evaluate(() => {
        document.querySelector(
          "#filters > form > div:nth-child(3) > div > div > div.tertiary-filter-wrap > div > div > input[type=text]"
        ).value = "";
      });

      if (start > end) {
        if (char.length === 1) {
          char = String.fromCharCode(code).repeat(2);
          start = 1;
        } else if (char.length === 2) {
          char = String.fromCharCode(code).repeat(3);
          start = 1;
          end = 100;
        } else if (char.length === 3) {
          code = code + 1;
          char = String.fromCharCode(code);
          start = 1;
          end = 200;
        }
      }

      if (char === 91) break;
    }
    await browser.close();
    return foundLabels;
  } catch (error) {
    message(
      `Something went wrong: ${error.message}, found ${foundLabels.length} ${
        foundLabels.length === 1 ? "label" : "labels"
      }`
    );
  } finally {
    if (foundLabels.length === 0) {
      return ["Nothing was found"];
    }
    browser.close();
    return foundLabels;
  }
};

module.exports = labelSearch;
