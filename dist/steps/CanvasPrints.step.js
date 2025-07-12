"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const config_1 = require("../config");
const logger_1 = require("../utils/logger");
(0, cucumber_1.Given)('the user launches live {string}', { timeout: 10000 }, async function (site) {
    const url = config_1.sites[site.toLowerCase()];
    if (!url) {
        logger_1.logger.error(`Unknown site key: ${site}`);
        throw new Error(`Unknown site: ${site}`);
    }
    logger_1.logger.info(`🌐 Launching site: ${url}`);
    await this.page.goto(url);
    logger_1.logger.info(`Successfully launched site: ${url}`);
});
(0, cucumber_1.Given)('the user hovers over the Canvas category in the top navigation', async function () {
    try {
        logger_1.logger.info('🖱 Hovering over Canvas category...');
        await this.homePage.canvasNav.waitFor({ state: 'visible' });
        await this.homePage.canvasNav.hover();
        logger_1.logger.info('✅ Successfully hovered over Canvas category');
    }
    catch (e) {
        logger_1.logger.error(`❌ Failed to hover over Canvas category: ${e.message}`);
        throw new Error('Failed to hover: ' + e.message);
    }
});
(0, cucumber_1.Given)('the user clicks on the Canvas Prints sub-category under the Canvas Prints category', async function () {
    try {
        logger_1.logger.info('🖱 Clicking on Canvas Prints sub-category...');
        await this.homePage.canvasPrintsSubCategory.waitFor({ state: 'visible', timeout: 5000 });
        await this.homePage.canvasPrintsSubCategory.click();
        logger_1.logger.info('✅ Successfully clicked on Canvas Prints sub-category');
    }
    catch (e) {
        logger_1.logger.error(`❌ Failed to click Canvas Prints sub-category: ${e.message}`);
        throw new Error(`Failed to click on Canvas Prints subcategory: ${e.message}`);
    }
});
(0, cucumber_1.Given)('the user selects {string} from the pricing grid', async function (size) {
    try {
        logger_1.logger.info(`📦 Selecting size: ${size} from pricing grid...`);
        if (size === 'Size 8x8') {
            await this.designerpage.size8x8.waitFor({ state: 'visible' });
            await this.designerpage.size8x8.click();
            logger_1.logger.info(`✅ Successfully selected size: ${size}`);
        }
        else {
            logger_1.logger.warn(`⚠️ Unsupported size: ${size}`);
            throw new Error(`Unsupported size: ${size}`);
        }
    }
    catch (e) {
        logger_1.logger.error(`❌ Failed to select size "${size}": ${e.message}`);
        throw new Error(`Failed to select size "${size}" from pricing grid: ${e.message}`);
    }
});
