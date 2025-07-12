import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly canvasNav: Locator;
   readonly canvasPrintsSubCategory: Locator;

  constructor(page: Page) {
   this.canvasNav = page.locator("//div[contains(@class, 'bottom-sub-header-right-items')]//span[@class='cstore-category-name' and normalize-space()='Canvas']");
    this.canvasPrintsSubCategory = page.locator("//div[@class='bottom-sub-header-right-items flex content-center']//span[@class='grid-item-text button--caret-pink'][normalize-space()='Canvas Prints']");

  }
}
