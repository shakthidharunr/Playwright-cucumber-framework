import { After, AfterStep, Before, BeforeAll, setWorldConstructor, World } from '@cucumber/cucumber';
import * as dotenv from 'dotenv';
import { Browser, Page, BrowserContext } from 'playwright';
import { DesignerPage } from '../pages/DesignerPage';
import { HomePage } from '../pages/Homepage';

import { writeAllureEnvironmentInfo } from './helpers/envHelper';
import { launchBrowserWithContext } from './helpers/browserHelper';
import { attachFailureScreenshot, stopAndAttachTrace, attachVideo } from './helpers/artifactHelper';
import { logger } from '../utils/logger';


dotenv.config();


class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
}
setWorldConstructor(CustomWorld);

BeforeAll({ timeout: 10 * 1000 }, writeAllureEnvironmentInfo);

Before({ timeout: 20 * 1000 }, async function () {
    logger.info('Starting test setup...');
  const browserName = process.env.BROWSER_NAME || 'chromium';
  const runEnv = process.env.RUN_ENV || 'local';
  const os = process.platform;


  this.attach(`Browser: ${browserName}`, 'text/plain');
  this.attach(`RunEnv: ${runEnv}`, 'text/plain');
  this.attach(`OS: ${process.platform}`, 'text/plain');

  // For console
  logger.info(`Metadata - Browser: ${browserName}, Env: ${runEnv}, OS: ${os}`);

  if (runEnv === 'bs') {
    this.page = (global as any).page;
  } else {
    const { browser, context, page } = await launchBrowserWithContext();
    this.browser = browser;
    this.context = context;
    this.page = page;
  }

  this.homePage = new HomePage(this.page);
  this.designerpage = new DesignerPage(this.page);

   logger.info('Initialized browser and page');
});

AfterStep(async function ({ pickle, result }) {
  if (result?.status === 'FAILED' && this.page) {
    const buffer = await attachFailureScreenshot(this.page, pickle.name);
    this.attach(buffer, 'image/png');
  }
});

After(async function ({ pickle }) {
  const scenarioName = pickle.name;

  const attachFn = this.attach.bind(this) as (data: string | Buffer, mediaType: string) => void;

  try {
    if (this.page && this.context) {
      await stopAndAttachTrace(this.context, attachFn, scenarioName);

      await this.page.close(); // ✅ MUST close before accessing video
      await attachVideo(this.page, attachFn, scenarioName);

      await this.context.close();
    }
  } catch (err: any) {
    logger.error(`Error in After hook for '${scenarioName}': ${err.message}`);
  } finally {
    if (this.browser) {
      try {
        await this.browser.close();
      } catch (e: any) {
        logger.error(`Failed to close browser: ${e.message}`);
      }
    }
  }
});
