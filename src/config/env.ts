// src/config/env.ts
import * as dotenv from "dotenv";
dotenv.config();

export const envConfig = {
  runEnv: process.env.RUN_ENV || "local",
  browserName: process.env.BROWSER_NAME || "firefox",
  browserStack: {
    username: process.env.BROWSERSTACK_USERNAME,
    accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
  },
};
