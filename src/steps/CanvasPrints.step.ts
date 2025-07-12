import { Given } from '@cucumber/cucumber';
import { sites } from '../config';
import { page } from '../support/hook';

Given('the user launches live {string}', async (site: string) => {
  const url = sites[site.toLowerCase() as keyof typeof sites];
  if (!url) throw new Error(`Unknown site: ${site}`);
  await page.goto(url);
});
