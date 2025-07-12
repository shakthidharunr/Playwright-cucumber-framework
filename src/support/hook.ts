import { Before, After, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';
import { HomePage } from '../pages/Homepage';
import { DesignerPage } from '../pages/DesignerPage';

class CustomWorld extends World {
  browser!: Browser;
  page!: Page;
  homePage!: HomePage;
}

setWorldConstructor(CustomWorld);

Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  this.page = await this.browser.newPage();
  this.homePage = new HomePage(this.page);
  this.designerpage = new DesignerPage(this.page);
});

After(async function () {
  await this.page.close();
  await this.browser.close();
});
