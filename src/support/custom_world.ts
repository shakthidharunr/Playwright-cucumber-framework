import { Browser, BrowserContext, Page, chromium } from 'playwright';
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';

export class CustomWorld extends World {
  browser: Browser;
  context: BrowserContext;
  page: Page;

  constructor(options: IWorldOptions) {
    super(options);
    this.browser = global.browserInstance!;
  }
}

declare global {
  var browserInstance: Browser | undefined;
}

setWorldConstructor(CustomWorld);
