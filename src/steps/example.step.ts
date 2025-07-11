import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom_world';

Given('I launch the browser', async function (this: CustomWorld) {
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

When('I navigate to {string}', async function (this: CustomWorld, url: string) {
  await this.page.goto(url);
});

Then('the page title should contain {string}', async function (this: CustomWorld, expectedTitle: string) {
  const title = await this.page.title();
  expect(title).toContain(expectedTitle);
});
