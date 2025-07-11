import { BeforeAll, AfterAll, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';

BeforeAll(async () => {
  global.browserInstance = await chromium.launch({ headless: false }); // set true for CI
});

AfterAll(async () => {
  await global.browserInstance?.close();
});

After(async function () {
  await this.page?.close();
  await this.context?.close();
});
