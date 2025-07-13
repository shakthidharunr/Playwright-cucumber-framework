"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachFailureScreenshot = attachFailureScreenshot;
exports.stopAndAttachTrace = stopAndAttachTrace;
exports.attachVideo = attachVideo;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function sanitizeFileName(name) {
    return name.replace(/[^a-zA-Z0-9-_]/g, '_');
}
async function attachFailureScreenshot(page, scenarioName) {
    const dir = 'reports/screenshots';
    fs_1.default.mkdirSync(dir, { recursive: true });
    const name = sanitizeFileName(scenarioName);
    const filePath = path_1.default.join(dir, `FAILED_${name}.png`);
    const buffer = await page.screenshot({ path: filePath, fullPage: true });
    return buffer;
}
async function stopAndAttachTrace(context, attach, scenarioName) {
    const dir = 'reports/traces';
    fs_1.default.mkdirSync(dir, { recursive: true });
    const name = sanitizeFileName(scenarioName);
    const tracePath = path_1.default.join(dir, `trace_${name}.zip`);
    await context.tracing.stop({ path: tracePath });
    if (fs_1.default.existsSync(tracePath)) {
        attach(fs_1.default.readFileSync(tracePath), 'application/zip');
        // ✅ HTML link to trace viewer
        const relativePath = tracePath.replace(/^reports[\/\\]/, '');
        const traceLink = `<a href="https://trace.playwright.dev/?trace=${relativePath}" target="_blank">🔍 View Playwright Trace</a>`;
        attach(traceLink, 'text/html');
    }
}
async function attachVideo(page, attach, scenarioName) {
    const originalPath = await page.video()?.path();
    if (!originalPath || !fs_1.default.existsSync(originalPath))
        return;
    const dir = 'reports/videos';
    fs_1.default.mkdirSync(dir, { recursive: true });
    const name = sanitizeFileName(scenarioName);
    const newPath = path_1.default.join(dir, `video_${name}.webm`);
    fs_1.default.renameSync(originalPath, newPath);
    attach(fs_1.default.readFileSync(newPath), 'video/webm');
    // ✅ HTML link to video
    const relativePath = newPath.replace(/^reports[\/\\]/, '');
    const videoLink = `<a href="${relativePath}" target="_blank">▶️ Watch Video</a>`;
    attach(videoLink, 'text/html');
}
