// src/utils/BrowserManager.ts
import { Browser, chromium, firefox, webkit, BrowserType } from 'playwright';
import * as dotenv from 'dotenv';

dotenv.config();

class BrowserManager {
  private static browser: Browser;

  private static getBrowserType(): BrowserType {
    const browserName = (process.env.BROWSER_NAME || 'chromium').toLowerCase();
    switch (browserName) {
      case 'firefox':
        return firefox;
      case 'webkit':
        return webkit;
      case 'chromium':
      default:
        return chromium;
    }
    
  }

  static async getBrowser(): Promise<Browser> {
    if (!BrowserManager.browser) {
      const runEnv = process.env.RUN_ENV || 'local';
      const browserType = this.getBrowserType();
      if (runEnv === 'bs') {
        const caps = {
          browser: process.env.BROWSER_NAME || 'chrome', 
          os: 'osx',
          os_version: 'catalina',
          name: 'Playwright Test',
          build: 'playwright-cucumber-build',
          'browserstack.username': process.env.BROWSERSTACK_USERNAME,
          'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
        };

        const wsEndpoint = `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
          JSON.stringify(caps)
        )}`;

      
        BrowserManager.browser = await chromium.connectOverCDP(wsEndpoint);
      } else {
        BrowserManager.browser = await browserType.launch({ headless: false });
      }
    }

    return BrowserManager.browser;
  }

  static async closeBrowser(): Promise<void> {
    if (BrowserManager.browser) {
      await BrowserManager.browser.close();
      BrowserManager.browser = null as any;
    }
  }
}

export default BrowserManager;
