import { BeforeAll, AfterAll, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';

let browser: Browser;
export let page: Page;

BeforeAll(async () => {
  browser = await chromium.launch();
});

AfterAll(async () => {
  await browser.close();
});

Before(async () => {
  const context = await browser.newContext();
  page = await context.newPage();
});

After(async () => {
  await page.close();
});
