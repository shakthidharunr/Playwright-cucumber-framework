import { After, AfterStep, Before, setWorldConstructor, World } from '@cucumber/cucumber';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Browser, Page } from 'playwright';
import { DesignerPage } from '../pages/DesignerPage';
import { HomePage } from '../pages/Homepage';
import BrowserManager from '../utils/BrowserManager'; // ✅ new import;

dotenv.config();

class CustomWorld extends World {
  browser!: Browser;
  page!: Page;
  homePage!: HomePage;
  designerpage!: DesignerPage;
}

setWorldConstructor(CustomWorld);

Before(async function (scenario) {
  const browserName = process.env.BROWSER_NAME || 'chromium';
  const runEnv = process.env.RUN_ENV || 'local';

  this.attach(`Browser: ${browserName}`, 'text/plain');
  this.attach(`RunEnv: ${runEnv}`, 'text/plain');

  if (runEnv === 'bs') {
    this.page = (global as any).page;
  } else {
    this.browser = await BrowserManager.getBrowser();

    const context = await this.browser.newContext({
      recordVideo: {
        dir: 'reports/videos', // 👈 video output directory
        size: { width: 1280, height: 720 },
      },
    });

    await context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
    });

    const page = await context.newPage();
    this.context = context;
    this.page = page;
  }

  this.homePage = new HomePage(this.page);
  this.designerpage = new DesignerPage(this.page);
});


AfterStep(async function ({ result }) {
  if (result?.status === 'FAILED' && this.page) {
    const screenshotPath = path.join('reports/screenshots', `FAILED_${Date.now()}.png`);
    const buffer = await this.page.screenshot({ path: screenshotPath, fullPage: true });

    if (!fs.existsSync('reports/screenshots')) {
      fs.mkdirSync('reports/screenshots', { recursive: true });
    }

    this.attach(buffer, 'image/png'); // For Allure (optional)
  }
});

After(async function (scenario) {
  if (this.page && this.context) {
    const tracePath = `reports/traces/trace-${Date.now()}.zip`;
    await this.context.tracing.stop({ path: tracePath });

    // ✅ Attach trace to Allure
    if (fs.existsSync(tracePath)) {
      this.attach(fs.readFileSync(tracePath), 'application/zip');
    }

    // ✅ Attach video
    const videoPath = await this.page.video()?.path();
    if (videoPath && fs.existsSync(videoPath)) {
      const videoBuffer = fs.readFileSync(videoPath);
      this.attach(videoBuffer, 'video/webm');
    }

    await this.page.close();
    await this.context.close();
  }

  if (this.browser) {
    await this.browser.close();
  }
});