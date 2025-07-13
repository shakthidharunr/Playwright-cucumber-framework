"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchBrowserWithContext = launchBrowserWithContext;
// src/support/helpers/browserHelper.ts
const BrowserManager_1 = __importDefault(require("../../utils/BrowserManager"));
async function launchBrowserWithContext() {
    const browser = await BrowserManager_1.default.getBrowser();
    const context = await browser.newContext({
        recordVideo: {
            dir: 'reports/videos',
            size: { width: 1280, height: 720 }
        },
    });
    await context.tracing.start({
        screenshots: true,
        snapshots: true,
        sources: true
    });
    const page = await context.newPage();
    return { browser, context, page };
}
