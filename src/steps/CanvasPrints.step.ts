import { Given } from '@cucumber/cucumber';
import { sites } from '../config';
import { logger } from '../utils/logger';


Given('the user launches live {string}', { timeout: 10000 }, async function (site: string) {
  const url = sites[site.toLowerCase() as keyof typeof sites];
  if (!url) {
    logger.error(`Unknown site key: ${site}`);
    throw new Error(`Unknown site: ${site}`);
  }

  logger.info(`Launching site: ${url}`);
  await this.page.goto(url);
  logger.info(`Successfully launched site: ${url}`);
});


Given('the user hovers over the Canvas category in the top navigation', async function () {
  try {
    logger.info('Hovering over Canvas category...');
    await this.homePage.canvasNav.waitFor({ state: 'visible' });
    await this.homePage.canvasNav.hover();
    logger.info('Successfully hovered over Canvas category');
  } catch (e: any) {
    logger.error(`Failed to hover over Canvas category: ${e.message}`);
    throw new Error('Failed to hover: ' + e.message);
  }
});

Given('the user clicks on the Canvas Prints sub-category under the Canvas Prints category', async function () {
  try {
    logger.info('Clicking on Canvas Prints sub-category...');
    await this.homePage.canvasPrintsSubCategory.waitFor({ state: 'visible', timeout: 5000 });
    await this.homePage.canvasPrintsSubCategory.click();
    logger.info('Successfully clicked on Canvas Prints sub-category');
  } catch (e: any) {
    logger.error(`Failed to click Canvas Prints sub-category: ${e.message}`);
    throw new Error(`Failed to click on Canvas Prints subcategory: ${e.message}`);
  }
});

Given('the user selects {string} from the pricing grid', async function (size: string) {
  try {
    logger.info(`Selecting size: ${size} from pricing grid...`);

    if (size === 'Size 8x8') {
      await this.designerpage.size8x8.waitFor({ state: 'visible' });
      await this.designerpage.size8x8.click();
      logger.info(`Successfully selected size: ${size}`);
    } else {
      throw new Error(`Unsupported size: ${size}`);
    }
  } catch (e: any) {
    throw new Error(`Failed to select size "${size}" from pricing grid: ${e.message}`);
  }
});

