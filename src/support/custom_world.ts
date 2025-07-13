import { BrowserContext, Page } from 'playwright';
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import BrowserManager from '../utils/BrowserManager';

export class CustomWorld extends World {
  context!: BrowserContext;
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async initBrowser() {
    const browser = await BrowserManager.getBrowser();

    this.context = await browser.newContext({
      recordVideo: {
        dir: 'reports/videos', // ✅ videos saved here
        size: { width: 1280, height: 720 },
      },
    });

    await this.context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
    });

    this.page = await this.context.newPage();
  }
}

setWorldConstructor(CustomWorld);
