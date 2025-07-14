// src/support/helpers/artifactHelper.ts
import fs from "fs";
import path from "path";
import { Page, BrowserContext } from "playwright";

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9-_]/g, "_");
}

export async function attachFailureScreenshot(
  page: Page,
  scenarioName: string
): Promise<Buffer> {
  const dir = "reports/screenshots";
  fs.mkdirSync(dir, { recursive: true });

  const name = sanitizeFileName(scenarioName);
  const filePath = path.join(dir, `FAILED_${name}.png`);
  const buffer = await page.screenshot({ path: filePath, fullPage: true });

  return buffer;
}

export async function stopAndAttachTrace(
  context: BrowserContext,
  attach: (data: string | Buffer, mediaType: string) => void,
  scenarioName: string
): Promise<void> {
  if (process.env.ENABLE_TRACE !== "true") return;

  const dir = "reports/traces";
  fs.mkdirSync(dir, { recursive: true });

  const name = sanitizeFileName(scenarioName);
  const tracePath = path.join(dir, `trace_${name}.zip`);

  await context.tracing.stop({ path: tracePath });

  if (fs.existsSync(tracePath)) {
    attach(fs.readFileSync(tracePath), "application/zip");

    const relativePath = tracePath.replace(/^reports[/\\]/, "");
    const traceLink = `<a href="https://trace.playwright.dev/?trace=${relativePath}" target="_blank">🔍 View Playwright Trace</a>`;
    attach(traceLink, "text/html");
  }
}

export async function attachVideo(
  page: Page,
  attach: (data: string | Buffer, mediaType: string) => void,
  scenarioName: string
): Promise<void> {
  if (process.env.ENABLE_VIDEO !== "true") return;

  const video = page.video();
  if (!video) return;

  const originalPath = await video.path();
  if (!fs.existsSync(originalPath)) return;

  const dir = "reports/videos";
  fs.mkdirSync(dir, { recursive: true });

  const name = sanitizeFileName(scenarioName);
  const newPath = path.join(dir, `video_${name}.webm`);

  // Retry if video is still locked
  for (let i = 0; i < 10; i++) {
    try {
      fs.renameSync(originalPath, newPath);
      break;
    } catch (err: unknown) {
      if (
        err instanceof Error &&
        "code" in err &&
        (err.code === "EBUSY" || err.code === "EPERM")
      ) {
        await new Promise((res) => setTimeout(res, 200));
      } else {
        throw err;
      }
    }
  }

  if (fs.existsSync(newPath)) {
    attach(fs.readFileSync(newPath), "video/webm");

    const relativePath = newPath.replace(/^reports[/\\]/, "");
    const videoLink = `<a href="${relativePath}" target="_blank">▶️ Watch Video</a>`;
    attach(videoLink, "text/html");
  }
}
