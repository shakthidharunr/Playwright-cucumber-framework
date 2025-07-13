// src/support/CustomWorld.ts
import { IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, Page, chromium, firefox, webkit } from '@playwright/test';
import * as allure from 'allure-js-commons'; // Import Allure for runtime API

// Define a type for your CustomWorld
interface CustomWorld extends World {
  browser: Browser;
  page: Page;
  // You can add other properties here that you want to share across steps
  // e.g., userId: string;
}

class CustomWorld extends World {
  browser!: Browser;
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }

  // Method to initialize the Playwright browser and page
  async init(): Promise<void> {
    const browserName = process.env.BROWSER || 'chromium'; // Default to chromium
    switch (browserName) {
      case 'firefox':
        this.browser = await firefox.launch();
        break;
      case 'webkit':
        this.browser = await webkit.launch();
        break;
      case 'chromium':
      default:
        this.browser = await chromium.launch();
        break;
    }
    this.page = await this.browser.newPage();
  }

  // Method to close the Playwright browser
  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }

  // Helper to add a screenshot to Allure on failure
  async addScreenshotToAllure(scenarioName: string): Promise<void> {
    if (this.page) {
      const screenshotBuffer = await this.page.screenshot({ fullPage: true });
      await allure.attachment(
        `${scenarioName} - Screenshot on Failure`,
        screenshotBuffer,
        'image/png'
      );
    }
  }

  // You can add other helper methods here, e.g., for logging, attaching other data
}

// Set the CustomWorld as the default World for Cucumber
setWorldConstructor(CustomWorld);