import { After, Before, setWorldConstructor, World } from '@cucumber/cucumber';
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
  if (process.env.RUN_ENV === 'bs') {
    // BrowserStack SDK injects page
    this.page = (global as any).page;
  } else {
    this.browser = await BrowserManager.getBrowser(); // ✅ now respects BROWSER_NAME
    const context = await this.browser.newContext();
    this.page = await context.newPage();
  }

  this.homePage = new HomePage(this.page);
  this.designerpage = new DesignerPage(this.page);
});

After(async function () {
  if (this.page) await this.page.close();
  if (this.browser) await this.browser.close();
});
