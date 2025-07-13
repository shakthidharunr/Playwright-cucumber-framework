module.exports = {
  defaultTimeout: 60000, // 60 seconds
  default: {
    require: [
      'src/steps/**/*.ts',
      'src/support/**/*.ts'
    ],
    paths: ['features/**/*.feature'],
    requireModule: ['ts-node/register'],
    format: [
      'cucumberjs-allure2-reporter',
      'json:reports/cucumber-report.json',
      'progress'
    ],
    formatOptions: {
      'cucumberjs-allure2-reporter': {
        resultDir: 'allure-results'
      }
    }
  }
};
