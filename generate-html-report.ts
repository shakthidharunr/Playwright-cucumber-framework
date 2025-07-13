import reporter, { Options } from 'cucumber-html-reporter';

const options: Options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0",
    "Test Environment": process.env.RUN_ENV || "local",
    "Browser": process.env.BROWSER_NAME || "chromium",
    "Platform": process.platform,
    "Executed": "Local"
  }
};

reporter.generate(options);
