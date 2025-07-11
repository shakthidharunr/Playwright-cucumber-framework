import { Browser } from 'playwright';

declare global {
  var browserInstance: Browser | undefined;
}

export {};
