// src/support/helpers/browserHelper.ts
import BrowserManager from '../../utils/BrowserManager';

export async function launchBrowserWithContext() {
  const browser = await BrowserManager.getBrowser();

  const shouldRecordVideo = process.env.ENABLE_VIDEO === 'true';
  const shouldStartTracing = process.env.ENABLE_TRACE === 'true';

  const context = await browser.newContext({
    ...(shouldRecordVideo && {
      recordVideo: {
        dir: 'reports/videos',
        size: { width: 1280, height: 720 },
      },
    }),
  });

  if (shouldStartTracing) {
    await context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
    });
  }

  const page = await context.newPage();
  return { browser, context, page };
}
