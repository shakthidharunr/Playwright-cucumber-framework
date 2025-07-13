"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const chalk_1 = __importDefault(require("chalk"));
const baseLogger = (0, pino_1.default)({
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
exports.logger = {
    info: (msg) => baseLogger.info(chalk_1.default.cyan(`${msg}`)),
    warn: (msg) => baseLogger.warn(chalk_1.default.yellow(`${msg}`)),
    error: (msg) => baseLogger.error(chalk_1.default.red(`${msg}`)),
    debug: (msg) => baseLogger.debug(chalk_1.default.gray(`${msg}`)),
    fatal: (msg) => baseLogger.fatal(chalk_1.default.bgRed.white(`${msg}`)),
};
