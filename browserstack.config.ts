// browserstack.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    // Connect to BrowserStack's cloud
    connectOptions: {
      wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify({
        'browser': 'chrome',
        'browser_version': 'latest',
        'os': 'osx',
        'os_version': 'ventura',
        'build_name': 'My BDD Build',
        'name': 'Playwright Cucumber Test',
        'browserstack.username': 'shakthidharunr_hHoMIB',
        'browserstack.accessKey': 'ipvhZJRsT9nw7zJkryr6',
      }))}`
    }
  },
});
