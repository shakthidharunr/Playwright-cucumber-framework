// import { Browser, chromium } from 'playwright';
// import * as dotenv from 'dotenv';

// dotenv.config();

// class BrowserManager {
//   private static browser: Browser | null = null;

//   static async getBrowser(): Promise<Browser> {
//     if (!this.browser) {
//       const caps = {
//         browser: 'chrome',
//         os: 'osx',
//         os_version: 'catalina',
//         name: 'Playwright Test',
//         build: 'playwright-cucumber-build',
//         'browserstack.username': process.env.BROWSERSTACK_USERNAME,
//         'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
//       };

//       const wsEndpoint = `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
//         JSON.stringify(caps)
//       )}`;

//       this.browser = await chromium.connectOverCDP(wsEndpoint);
//     }

//     return this.browser;
//   }

//   static async closeBrowser(): Promise<void> {
//     if (this.browser) {
//       await this.browser.close();
//       this.browser = null;
//     }
//   }
// }

// export default BrowserManager;




import { Browser, chromium } from 'playwright';

class BrowserManager {
  private static browser: Browser;

  static async getBrowser(): Promise<Browser> {
    if (!BrowserManager.browser) {
      BrowserManager.browser = await chromium.launch({ headless: false }); // set true for CI
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
