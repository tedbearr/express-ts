import { NextFunction } from "express";
import eWinston from "express-winston";
import winston from "winston";
import "winston-daily-rotate-file";

const { combine, timestamp, printf, align, json } = winston.format;

// const logMiddleware = (next: NextFunction) => {
const logger = {
  request: eWinston.logger({
    transports: [
      new winston.transports.DailyRotateFile({
        filename: "logs/%DATE%.DAILY.log",
        datePattern: "YYYY-MM-DD",
        maxFiles: "2d",
      }),
    ],
    format: combine(
      timestamp({
        format: "YYYY-MM-DD HH:mm:ss.SSS",
      }),
      align(),
      printf(
        (info) =>
          `[${info.timestamp}] REQ ${
            JSON.stringify(info.meta.req.body)
              ? JSON.stringify(info.meta.req.body)
              : {}
          } ${info.meta.req.originalUrl} ${info.meta.req.ip}`
      )
    ),
    requestWhitelist: [
      ...eWinston.requestWhitelist,
      "body",
      "id",
      "ip",
      "timestamp",
    ],
  }),
  response: eWinston.logger({
    transports: [
      new winston.transports.DailyRotateFile({
        filename: "logs/%DATE%.DAILY.log",
        datePattern: "YYYY-MM-DD",
        maxFiles: "2d",
      }),
    ],
    format: combine(
      timestamp({
        format: "YYYY-MM-DD HH:mm:ss.SSS",
      }),
      align(),
      printf(
        (info) =>
          `[${info.timestamp}] RES ${info.meta.req.originalUrl} ${
            info.meta.responseTime
          }ms ${
            JSON.stringify(info.meta.res.body)
              ? JSON.stringify(info.meta.res.body)
              : {}
          }`
      )
    ),
    responseWhitelist: [
      ...eWinston.responseWhitelist,
      "body",
      "id",
      "ip",
      "timestamp",
    ],
  }),
  //   return next;
};

const testMiddleware = () => {
  console.log("first");
};

export { logger };
