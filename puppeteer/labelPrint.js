const puppeteer = require("puppeteer");
const message = require("./message.js");

const url =
  "https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1640049982&rver=7.3.6962.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fonedrive.live.com%2Fedit.aspx%3Fcid%3Dfce7c48191d3f700%26page%3Dview%26resid%3DFCE7C48191D3F700!1656%26parId%3DFCE7C48191D3F700!335%26app%3DWord&lc=1033&id=250206&cbcxt=sky&cbcxt=sky";

const labelPrint = async (foundLabels) => {
  message("Initiating printing");
  const browser = await puppeteer.launch({
    args: [
      "--kiosk-printing",
      "--disable-web-security",
      "--disable-features=IsolateOrigins,site-per-process",
    ],
    slowMo: 250,
    headless: false,
    // executablePath: "Path to chrome/chromium",
  });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    await page.focus("input[type=email]");

    await page.type("input[type=email]", "USER", { delay: 350 });

    await page.click("input#idSIButton9");

    await page.waitForSelector("input[type=password]", { visible: true });

    await page.type("input[type=password]", "PASSWORD", { delay: 350 });

    await page.click("input#idSIButton9");

    await page.waitForSelector("input#idSIButton9", { visible: true });

    await page.click("input#idSIButton9");

    await page.waitForNavigation();

    await page.waitForSelector("div#c_base", { visible: true });

    const iFrame = await page.$("#WacFrame_Word_0");
    const frame = await iFrame.contentFrame();

    await frame.click("p.Paragraph");

    for (let i = 0; i < foundLabels.length; i++) {
      await frame.type("p.Paragraph", foundLabels[i], { delay: 100 });

      await page.keyboard.press("Enter");
    }

    await frame.click("#FileMenuLauncherContianer > button");

    await frame.click("#FilePrintPage");

    await frame.click(
      "#ReactTabbedPanelMenuPageContainer > div:nth-child(2) > div:nth-child(1) > div > button"
    );
    message("Printing done");
    browser.close();
  } catch (error) {
    browser.close();
    console.log(error);
  }
};

module.exports = labelPrint;
