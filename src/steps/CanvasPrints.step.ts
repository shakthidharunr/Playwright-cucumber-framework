import { Given } from '@cucumber/cucumber';
import { sites } from '../config/sites';
import { logger } from '../utils/logger';
import { HomePage } from '../pages/Homepage';
import { DesignerPage } from '../pages/DesignerPage';

Given(
  'the user launches live {string}',
  { timeout: 90000 },
  async function (site: string) {
    const url = sites[site.toLowerCase() as keyof typeof sites];

    if (!url) {
      logger.error(`Unknown site key: ${site}`);
      throw new Error(`Unknown site: ${site}`);
    }

    logger.info(`Launching site: ${url}`);
    await this.page.goto(url);
    logger.info(`Successfully launched site: ${url}`);
  }
);

Given(
  'the user hovers over the Canvas category in the top navigation',
  async function () {
    const homePage = new HomePage(this.page);

    try {
      logger.debug('Hovering over Canvas category...');
      await homePage.canvasNav.waitFor({ state: 'visible' });
      await homePage.canvasNav.hover();
      logger.info('Successfully hovered over Canvas category');
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      logger.error(`Failed to hover over Canvas category: ${message}`);
      throw new Error(`Failed to hover: ${message}`);
    }
  }
);

Given(
  'the user clicks on the Canvas Prints sub-category under the Canvas Prints category',
  async function () {
    const homePage = new HomePage(this.page);

    try {
      logger.info('Clicking on Canvas Prints sub-category...');
      await homePage.canvasPrintsSubCategory.waitFor({
        state: 'visible',
        timeout: 5000,
      });
      await homePage.canvasPrintsSubCategory.click();
      logger.info('Successfully clicked on Canvas Prints sub-category');
    } catch (e: any) {
      logger.error(`Failed to click Canvas Prints sub-category: ${e.message}`);
      throw new Error(
        `Failed to click on Canvas Prints subcategory: ${e.message}`
      );
    }
  }
);

Given(
  'the user selects {string} from the pricing grid',
  async function (size: string) {
    const designerPage = new DesignerPage(this.page);

    try {
      logger.info(`Selecting size: ${size} from pricing grid...`);

      if (size === 'Size 8x8') {
        await designerPage.size8x8.waitFor({ state: 'visible' });
        await designerPage.size8x8.click();
        logger.info(`Successfully selected size: ${size}`);
      } else {
        throw new Error(`Unsupported size: ${size}`);
      }
    } catch (e: any) {
      logger.error(`Failed to select size "${size}": ${e.message}`);
      throw new Error(
        `Failed to select size "${size}" from pricing grid: ${e.message}`
      );
    }
  }
);
