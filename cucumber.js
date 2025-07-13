// cucumber.js

module.exports = {
  default: {
    timeout: 60000, // Scenario timeout (in milliseconds)

    requireModule: ['ts-node/register'], // To allow Cucumber to run TypeScript files directly
    require: [
      'src/steps/**/*.ts', // Path to your step definition files
      'src/support/hook.ts', // Corrected to hook.ts based on your error output (was hooks.ts in previous example)
      'src/support/CustomWorld.ts', // Make sure your CustomWorld is also required
    ],
    paths: ['features/**/*.feature'], // Path to your feature files

    format: [
      'summary', // Basic summary in console
      'progress', // Shows progress in console
      'json:reports/cucumber-report.json', // Generates a JSON report
      'allure-cucumberjs/reporter', // <-- THIS SHOULD BE JUST THE STRING NAME OF THE REPORTER
    ],
    // This is where you put the options for your formatters
    formatOptions: {
      'allure-cucumberjs/reporter': {
        resultsDir: 'allure-results', // Correctly specify the results directory here
      },
    },

    publishQuiet: true, // Suppress the default Cucumber.js public report URL
  },
};