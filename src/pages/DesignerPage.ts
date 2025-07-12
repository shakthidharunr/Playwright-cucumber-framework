import { Locator, Page } from '@playwright/test';

export class DesignerPage {
  readonly size8x8: Locator;

  constructor(page: Page) {
    
    this.size8x8 = page.locator("//a[normalize-space()='8\" x 8\"']");
  }
}
