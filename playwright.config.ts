import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  use: {
    trace: 'on',
    video: 'retain-on-failure',
    browserName: 'chromium',
  },
  projects: [
    {
      name: 'BrowserStack-Chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
  ],
  reporter: [['list']],
  workers: 1,
  retries: 1,
});
