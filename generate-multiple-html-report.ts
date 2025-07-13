const reporter = require('multiple-cucumber-html-reporter');
const os = require('os');
const path = require('path');

reporter.generate({
  jsonDir: 'reports', // Folder containing cucumber JSON
  reportPath: 'reports/html', // Output HTML
  reportName: 'E2E Test Execution Report',
  pageTitle: 'Automation Execution Summary',
  displayDuration: true,
  openReportInBrowser: true, // ✅ automatically opens after generation

  metadata: {
    browser: {
      name: process.env.BROWSER_NAME || 'chromium',
      version: 'latest',
    },
    device: os.hostname(),
    platform: {
      name: process.platform,
      version: os.release(),
    },
  },

  customData: {
    title: 'Run Details',
    data: [
      { label: 'Project', value: 'Playwright + Cucumber Framework' },
      { label: 'Release', value: 'v1.0.0' },
      { label: 'Tested By', value: os.userInfo().username },
      { label: 'Execution Time', value: new Date().toLocaleString() },
      { label: 'Environment', value: process.env.RUN_ENV || 'local' },
      { label: 'Browser', value: process.env.BROWSER_NAME || 'chromium' },
      { label: 'Reports Path', value: path.resolve('reports/html') },
      { label: 'Screenshots Folder', value: 'reports/screenshots (manual inclusion)' },
      { label: 'Videos Folder', value: 'reports/videos (if used)' }
    ]
  }
});
