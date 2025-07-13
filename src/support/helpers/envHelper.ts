// src/support/helpers/envHelper.ts
import fs from 'fs';
import path from 'path';

export function writeAllureEnvironmentInfo() {
  const envPath = path.join('allure-results', 'environment.properties');
  const metadata = [
    `Browser=${process.env.BROWSER_NAME || 'chromium'}`,
    `RunEnv=${process.env.RUN_ENV || 'local'}`,
    `Platform=${process.platform}`,
    `Node.js=${process.version}`,
    `Author=Shakthi Dharun`,
    `Project=Playwright Cucumber Framework`,
    `ExecutionTime=${new Date().toLocaleString()}`
  ];
  fs.mkdirSync('allure-results', { recursive: true });
  fs.writeFileSync(envPath, metadata.join('\n'));
}
