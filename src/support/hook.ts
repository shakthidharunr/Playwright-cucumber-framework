import { Before, After } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';

let browser: Browser;
let context: BrowserContext;
// eslint-disable-next-line import/no-mutable-exports
export let page: Page;

Before(async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
});

After(async () => {
  await page.close();
  await context.close();
  await browser.close();
});
