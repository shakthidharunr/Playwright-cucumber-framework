import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // This is important
  use: {
    headless: true,
  },
});
