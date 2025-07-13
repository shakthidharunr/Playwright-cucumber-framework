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
const cucumber_1 = require("@cucumber/cucumber");
const dotenv = __importStar(require("dotenv"));
const DesignerPage_1 = require("../pages/DesignerPage");
const Homepage_1 = require("../pages/Homepage");
const envHelper_1 = require("./helpers/envHelper");
const browserHelper_1 = require("./helpers/browserHelper");
const artifactHelper_1 = require("./helpers/artifactHelper");
const logger_1 = require("utils/logger");
require("../support/customWorld");
dotenv.config();
class CustomWorld extends cucumber_1.World {
    browser;
    context;
    page;
    homePage;
    designerpage;
}
(0, cucumber_1.setWorldConstructor)(CustomWorld);
(0, cucumber_1.BeforeAll)(envHelper_1.writeAllureEnvironmentInfo);
(0, cucumber_1.Before)(async function () {
    logger_1.logger.info('Starting test setup...');
    const browserName = process.env.BROWSER_NAME || 'chromium';
    const runEnv = process.env.RUN_ENV || 'local';
    const os = process.platform;
    this.attach(`Browser: ${browserName}`, 'text/plain');
    this.attach(`RunEnv: ${runEnv}`, 'text/plain');
    this.attach(`OS: ${process.platform}`, 'text/plain');
    // For console
    logger_1.logger.info(`🔍 Metadata → Browser: ${browserName}, Env: ${runEnv}, OS: ${os}`);
    if (runEnv === 'bs') {
        this.page = global.page;
    }
    else {
        const { browser, context, page } = await (0, browserHelper_1.launchBrowserWithContext)();
        this.browser = browser;
        this.context = context;
        this.page = page;
    }
    this.homePage = new Homepage_1.HomePage(this.page);
    this.designerpage = new DesignerPage_1.DesignerPage(this.page);
    logger_1.logger.info('Initialized browser and page');
});
(0, cucumber_1.AfterStep)(async function ({ pickle, result }) {
    if (result?.status === 'FAILED' && this.page) {
        const buffer = await (0, artifactHelper_1.attachFailureScreenshot)(this.page, pickle.name);
        this.attach(buffer, 'image/png');
    }
});
(0, cucumber_1.After)(async function ({ pickle }) {
    const scenarioName = pickle.name;
    if (this.page && this.context) {
        await (0, artifactHelper_1.stopAndAttachTrace)(this.context, this.attach.bind(this), scenarioName);
        await (0, artifactHelper_1.attachVideo)(this.page, this.attach.bind(this), scenarioName);
        await this.page.close();
        await this.context.close();
    }
    if (this.browser) {
        await this.browser.close();
    }
});
