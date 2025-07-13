import { After, AfterStep, Before, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, Page } from 'playwright';
import { DesignerPage } from '../pages/DesignerPage';
import { HomePage } from '../pages/Homepage';
import * as dotenv from 'dotenv';
import BrowserManager from '../utils/BrowserManager'; // ✅ new import

dotenv.config();

class CustomWorld extends World {
  browser!: Browser;
  page!: Page;
  homePage!: HomePage;
  designerpage!: DesignerPage;
}

setWorldConstructor(CustomWorld);

Before(async function () {
  const browserName = process.env.BROWSER_NAME || 'chromium';
  const runEnv = process.env.RUN_ENV || 'local';

  // ✅ Attach environment info (shows up in Allure report)
  this.attach(`Browser: ${browserName}`, 'text/plain');
  this.attach(`RunEnv: ${runEnv}`, 'text/plain');

  if (runEnv === 'bs') {
    this.page = (global as any).page;
  } else {
    this.browser = await BrowserManager.getBrowser();
    const context = await this.browser.newContext();
    this.page = await context.newPage();
  }

  this.homePage = new HomePage(this.page);
  this.designerpage = new DesignerPage(this.page);
});


AfterStep(async function ({ result }) {
  if (result?.status === 'FAILED' && this.page) {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png'); // ✅ Attach screenshot to Allure
  }
});

After(async function () {
  if (this.page) await this.page.close();
  if (this.browser) await this.browser.close();
});
