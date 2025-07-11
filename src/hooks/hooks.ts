import { BeforeAll, AfterAll, After } from '@cucumber/cucumber';
import BrowserManager from '../utils/BrowserManager';

BeforeAll(async () => {
  await BrowserManager.getBrowser();
});

AfterAll(async () => {
  await BrowserManager.closeBrowser();
});

After(async function () {
  await this.page?.close();
  await this.context?.close();
});
