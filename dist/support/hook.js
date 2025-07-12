"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const playwright_1 = require("playwright");
const Homepage_1 = require("../pages/Homepage");
const DesignerPage_1 = require("../pages/DesignerPage");
class CustomWorld extends cucumber_1.World {
    browser;
    page;
    homePage;
}
(0, cucumber_1.setWorldConstructor)(CustomWorld);
(0, cucumber_1.Before)(async function () {
    this.browser = await playwright_1.chromium.launch({ headless: false });
    this.page = await this.browser.newPage();
    this.homePage = new Homepage_1.HomePage(this.page);
    this.designerpage = new DesignerPage_1.DesignerPage(this.page);
});
(0, cucumber_1.After)(async function () {
    await this.page.close();
    await this.browser.close();
});
