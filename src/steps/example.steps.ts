import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I launch the browser', async function () {
  await this.initBrowser(); 
});

When('I navigate to {string}', async function (url: string) {
  await this.page.goto(url);
});

Then('the page title should contain {string}', async function (expectedTitle: string) {
  const actualTitle = await this.page.title();
  expect(actualTitle).toContain(expectedTitle);
});
