"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomWorld = void 0;
const cucumber_1 = require("@cucumber/cucumber");
const BrowserManager_1 = __importDefault(require("../utils/BrowserManager"));
class CustomWorld extends cucumber_1.World {
    context;
    page;
    constructor(options) {
        super(options);
    }
    async initBrowser() {
        const browser = await BrowserManager_1.default.getBrowser();
        this.context = await browser.newContext();
        this.page = await this.context.newPage();
    }
}
exports.CustomWorld = CustomWorld;
(0, cucumber_1.setWorldConstructor)(CustomWorld);
