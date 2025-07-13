import pino from 'pino';
import chalk from 'chalk';

const baseLogger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
      ignore: 'pid,hostname',
      levelFirst: false,
    },
  },
  level: process.env.LOG_LEVEL || 'info',
});


export const logger = {
  info: (msg: string) =>
    baseLogger.info(chalk.green(`${msg}`)),

  warn: (msg: string) =>
    baseLogger.warn(chalk.yellow(`${msg}`)),

  error: (msg: string) =>
    baseLogger.error(chalk.red(`${msg}`)),

  debug: (msg: string) =>
    baseLogger.debug(chalk.gray(`${msg}`)),

  fatal: (msg: string) =>
    baseLogger.fatal(chalk.bgRed.white(`${msg}`)),
};
