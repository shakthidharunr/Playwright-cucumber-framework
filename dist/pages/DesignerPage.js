"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignerPage = void 0;
class DesignerPage {
    size8x8;
    constructor(page) {
        this.size8x8 = page.locator("//a[normalize-space()='8\" x 8\"']");
    }
}
exports.DesignerPage = DesignerPage;
