"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// src/utils/BrowserManager.ts
const playwright_1 = require("playwright");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class BrowserManager {
    static browser;
    static getBrowserType() {
        const browserName = (process.env.BROWSER_NAME || 'chromium').toLowerCase();
        switch (browserName) {
            case 'firefox':
                return playwright_1.firefox;
            case 'webkit':
                return playwright_1.webkit;
            case 'chromium':
            default:
                return playwright_1.chromium;
        }
    }
    static async getBrowser() {
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
                const wsEndpoint = `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`;
                BrowserManager.browser = await playwright_1.chromium.connectOverCDP(wsEndpoint);
            }
            else {
                BrowserManager.browser = await browserType.launch({ headless: false });
            }
        }
        return BrowserManager.browser;
    }
    static async closeBrowser() {
        if (BrowserManager.browser) {
            await BrowserManager.browser.close();
            BrowserManager.browser = null;
        }
    }
}
exports.default = BrowserManager;
