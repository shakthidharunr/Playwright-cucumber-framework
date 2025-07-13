"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeAllureEnvironmentInfo = writeAllureEnvironmentInfo;
// src/support/helpers/envHelper.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function writeAllureEnvironmentInfo() {
    const envPath = path_1.default.join('allure-results', 'environment.properties');
    const metadata = [
        `Browser=${process.env.BROWSER_NAME || 'chromium'}`,
        `RunEnv=${process.env.RUN_ENV || 'local'}`,
        `Platform=${process.platform}`,
        `Node.js=${process.version}`,
        `Author=Shakthi Dharun`,
        `Project=Playwright Cucumber Framework`,
        `ExecutionTime=${new Date().toLocaleString()}`
    ];
    fs_1.default.mkdirSync('allure-results', { recursive: true });
    fs_1.default.writeFileSync(envPath, metadata.join('\n'));
}
