// // src/support/hooks.ts
// import {
//   Before,
//   After,
//   AfterStep,
//   BeforeAll,
//   setWorldConstructor,
//   World,
// } from '@cucumber/cucumber';
// import {
//   Browser,
//   BrowserContext,
//   Page,
//   chromium,
//   firefox,
//   webkit,
// } from 'playwright';
// import fs from 'fs';
// import path from 'path';
// import * as dotenv from 'dotenv';

// dotenv.config();

// // ---------- Config + Utility Functions ----------

// function sanitizeFileName(name: string): string {
//   return name.replace(/[^a-zA-Z0-9-_]/g, '_');
// }

// function getBrowserType() {
//   const browserName = (process.env.BROWSER_NAME || 'chromium').toLowerCase();
//   switch (browserName) {
//     case 'firefox':
//       return firefox;
//     case 'webkit':
//       return webkit;
//     default:
//       return chromium;
//   }
// }

// async function launchBrowserWithContext(): Promise<{
//   browser: Browser;
//   context: BrowserContext;
//   page: Page;
// }> {
//   const runEnv = process.env.RUN_ENV || 'local';
//   let browser: Browser;

//   if (runEnv === 'bs') {
//     const caps = {
//       browser: process.env.BROWSER_NAME || 'chrome',
//       os: 'osx',
//       os_version: 'catalina',
//       name: 'Playwright Test',
//       build: 'playwright-cucumber-build',
//       'browserstack.username': process.env.BROWSERSTACK_USERNAME,
//       'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
//     };

//     const wsEndpoint = `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
//       JSON.stringify(caps)
//     )}`;

//     browser = await chromium.connectOverCDP(wsEndpoint);
//   } else {
//     browser = await getBrowserType().launch({ headless: false });
//   }

//   const shouldRecordVideo = process.env.ENABLE_VIDEO === 'true';
//   const shouldStartTracing = process.env.ENABLE_TRACE === 'true';

//   const context = await browser.newContext({
//     ...(shouldRecordVideo && {
//       recordVideo: {
//         dir: 'reports/videos',
//         size: { width: 1280, height: 720 },
//       },
//     }),
//   });

//   if (shouldStartTracing) {
//     await context.tracing.start({
//       screenshots: true,
//       snapshots: true,
//       sources: true,
//     });
//   }

//   const page = await context.newPage();
//   return { browser, context, page };
// }

// function writeAllureEnvironmentInfo() {
//   const envPath = path.join('allure-results', 'environment.properties');
//   const metadata = [
//     `Browser=${process.env.BROWSER_NAME || 'chromium'}`,
//     `RunEnv=${process.env.RUN_ENV || 'local'}`,
//     `Platform=${process.platform}`,
//     `Node.js=${process.version}`,
//     `Author=Shakthi Dharun`,
//     `Project=Playwright Cucumber Framework`,
//     `ExecutionTime=${new Date().toLocaleString()}`,
//   ];
//   fs.mkdirSync('allure-results', { recursive: true });
//   fs.writeFileSync(envPath, metadata.join('\n'));
// }

// async function attachFailureScreenshot(page: Page, scenarioName: string) {
//   const dir = 'reports/screenshots';
//   fs.mkdirSync(dir, { recursive: true });

//   const fileName = sanitizeFileName(scenarioName);
//   const filePath = path.join(dir, `FAILED_${fileName}.png`);
//   const buffer = await page.screenshot({ path: filePath, fullPage: true });

//   return buffer;
// }

// async function stopAndAttachTrace(
//   context: BrowserContext,
//   attach: (data: string | Buffer, mediaType: string) => void,
//   scenarioName: string
// ) {
//   if (process.env.ENABLE_TRACE !== 'true') return;

//   const dir = 'reports/traces';
//   fs.mkdirSync(dir, { recursive: true });

//   const name = sanitizeFileName(scenarioName);
//   const tracePath = path.join(dir, `trace_${name}.zip`);

//   await context.tracing.stop({ path: tracePath });

//   if (fs.existsSync(tracePath)) {
//     attach(fs.readFileSync(tracePath), 'application/zip');

//     const relativePath = tracePath.replace(/^reports[/\\]/, '');
//     const traceLink = `<a href="https://trace.playwright.dev/?trace=${relativePath}" target="_blank">🔍 View Playwright Trace</a>`;
//     attach(traceLink, 'text/html');
//   }
// }

// async function attachVideo(
//   page: Page,
//   attach: (data: string | Buffer, mediaType: string) => void,
//   scenarioName: string
// ) {
//   if (process.env.ENABLE_VIDEO !== 'true') return;

//   const video = page.video();
//   if (!video) return;

//   const originalPath = await video.path();
//   if (!fs.existsSync(originalPath)) return;

//   const dir = 'reports/videos';
//   fs.mkdirSync(dir, { recursive: true });

//   const newPath = path.join(dir, `video_${sanitizeFileName(scenarioName)}.webm`);

//   for (let i = 0; i < 10; i++) {
//     try {
//       fs.renameSync(originalPath, newPath);
//       break;
//     } catch (err: any) {
//       if (['EBUSY', 'EPERM'].includes(err.code)) {
//         await new Promise((res) => setTimeout(res, 200));
//       } else {
//         throw err;
//       }
//     }
//   }

//   if (fs.existsSync(newPath)) {
//     attach(fs.readFileSync(newPath), 'video/webm');

//     const relativePath = newPath.replace(/^reports[/\\]/, '');
//     const videoLink = `<a href="${relativePath}" target="_blank">▶️ Watch Video</a>`;
//     attach(videoLink, 'text/html');
//   }
// }

// // ---------- World Definition ----------

// class CustomWorld extends World {
//   browser!: Browser;
//   context!: BrowserContext;
//   page!: Page;
// }

// setWorldConstructor(CustomWorld);

// // ---------- Hooks ----------

// BeforeAll({ timeout: 10_000 }, writeAllureEnvironmentInfo);

// Before({ timeout: 20_000 }, async function () {
//   const { browser, context, page } = await launchBrowserWithContext();
//   this.browser = browser;
//   this.context = context;
//   this.page = page;

//   this.attach(`Browser: ${process.env.BROWSER_NAME}`, 'text/plain');
//   this.attach(`Env: ${process.env.RUN_ENV}`, 'text/plain');
//   this.attach(`OS: ${process.platform}`, 'text/plain');
// });

// AfterStep(async function ({ pickle, result }) {
//   if (result?.status === 'FAILED' && this.page) {
//     const buffer = await attachFailureScreenshot(this.page, pickle.name);
//     this.attach(buffer, 'image/png');
//   }
// });

// After(async function ({ pickle }) {
//   const scenarioName = pickle.name;
//   const attach = this.attach.bind(this) as unknown as (data: string | Buffer, mediaType: string) => Promise<void>;

//   try {
//     if (this.context && this.page) {
//       await stopAndAttachTrace(this.context, attach, scenarioName);
//       await attachVideo(this.page, attach, scenarioName);
//       await this.page.close();
//       await this.context.close();
//     }
//   } catch (err: any) {
//     console.error(`Error in After hook for ${scenarioName}:`, err.message);
//   } finally {
//     if (this.browser) {
//       try {
//         await this.browser.close();
//       } catch (err: any) {
//         console.error('Error closing browser:', err.message);
//       }
//     }
//   }
// });

