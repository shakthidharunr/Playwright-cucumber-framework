import pino from 'pino';

export const logger = pino({
  transport: {
    target: 'pino-pretty', // Optional: prettier logs
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
  level: 'info',
});
