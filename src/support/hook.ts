// src/support/hooks.ts
import { Before, After, setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, Page, BrowserContext, chromium, firefox, webkit } from "playwright";

class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
}

setWorldConstructor(CustomWorld);

Before(async function () {
  const browserName = process.env.BROWSER_NAME || 'chromium';

  let browserType;
  if (browserName === 'firefox') {
    browserType = firefox;
  } else if (browserName === 'webkit') {
    browserType = webkit;
  } else {
    browserType = chromium;
  }

  this.browser = await browserType.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});
