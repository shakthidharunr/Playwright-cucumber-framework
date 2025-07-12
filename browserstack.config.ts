import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    browserName: 'chromium',
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'Chrome @ Windows',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
  ],
});
