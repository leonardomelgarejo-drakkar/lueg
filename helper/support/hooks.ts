import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { getEnv } from "../env/env";
import { options } from "../util/logger";
import { createLogger } from "winston";
import { invokeBrowser } from "../browsers/browserManager";
import fs = require("fs-extra");
import HomePage from "../../pages/homePage";
import LoginPage from "../../pages/loginPage";
import Assert from "../wrapper/assert";
import { CustomWorld } from "./custom-world";
import { timeout } from "../../config/globalConfig";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function() {
  getEnv();
  browser = await invokeBrowser();
})

Before({ tags: "@skip" }, async function () {
  return "pending";
});

Before({ tags: "@ui" }, async function (this: CustomWorld, { pickle }) {
  const scenarioName = pickle.name + pickle.id;
  context = await browser.newContext({
    recordVideo: {
      dir: "test-results/report/videos"
    }
  });
  await context.tracing.start({
    name: scenarioName,
    title: pickle.name,
    sources: true,
    screenshots: true, snapshots: true
  });
  const page = await context.newPage();
  page.setDefaultTimeout(timeout);
  this.page = page;
  this.logger = createLogger(options(scenarioName));
  this.loginPage = new LoginPage(this.page);
  this.homePage = new HomePage(this.page);
  this.assert = new Assert(this.page);
})

After({ tags: "@ui" }, async function ({ pickle }) {
  try {
    if (!this.page) {
      console.warn(`Página não inicializada — pulando teardown para: ${pickle.name}`);
      return;
    }

    const path = `./test-results/report/trace/${pickle.id}.zip`;

    const img = await this.page.screenshot({
      path: `./test-results/report/screenshots/${pickle.name}.png`,
      type: "png"
    });

    const videoPath = await this.page.video()?.path();

    await context.tracing.stop({ path });
    await this.page.close();
    await context.close();

    this.attach(img, "image/png");

    if (videoPath) {
      const video = await fs.promises.readFile(videoPath);
      this.attach(video, "video/webm");
    }

  } catch (e) {
    console.warn(`Falha no After hook para "${pickle.name}": ${e}`);
  }
});

AfterAll(async function () {
  await browser.close();
});