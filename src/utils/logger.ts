// src/utils/logger.ts
import pino from 'pino';

export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true, // still gives colorized output in terminal
      translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
      ignore: 'pid,hostname',
      levelFirst: true,
    },
  },
  level: process.env.LOG_LEVEL || 'info',
});
