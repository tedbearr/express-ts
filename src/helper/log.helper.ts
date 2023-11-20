import winston from "winston";
const moment = require("moment");
import "winston-daily-rotate-file";
import "moment/locale/id";
moment.locale("id");
process.env.TZ = "Asia/Jakarta";

const { combine, timestamp, printf, align, json } = winston.format;

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: "logs/%DATE%.TRX.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "2d",
});

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

winston.addColors(colors);

var logger;

logger = winston.createLogger({
  levels: logLevels,
  level: level(),
  exitOnError: false,
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss.SSS",
    }),
    align(),
    json(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  defaultMeta: { service: "express-ts" },
  transports: [
    fileRotateTransport,
    new winston.transports.File({
      filename: `logs/error.trx.log`,
      level: "error",
    }),
  ],
});

export { logger };
