"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePage = void 0;
class HomePage {
    canvasNav;
    canvasPrintsSubCategory;
    constructor(page) {
        this.canvasNav = page.locator("//div[contains(@class, 'bottom-sub-header-right-items')]//span[@class='cstore-category-name' and normalize-space()='Canvas']");
        this.canvasPrintsSubCategory = page.locator("//div[@class='bottom-sub-header-right-items flex content-center']//span[@class='grid-item-text button--caret-pink'][normalize-space()='Canvas Prints']");
    }
}
exports.HomePage = HomePage;
