import { NextFunction, Request, Response } from "express";
import eWinston from "express-winston";
import winston from "winston";
import "winston-daily-rotate-file";
import { generateUniqueCode } from "../helper/unique-code.helper";

const { combine, timestamp, printf, align, json } = winston.format;

const logRotateFile = new winston.transports.DailyRotateFile({
  filename: "logs/%DATE%.normal.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "1d",
});

var uniqueCode: string;

const uniqueCodeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  uniqueCode = generateUniqueCode();
  next();
};

const logger = {
  request: eWinston.logger({
    transports: [logRotateFile],
    format: combine(
      timestamp({
        format: "YYYY-MM-DD HH:mm:ss.SSS",
      }),
      align(),
      printf(
        (info) =>
          `[${info.timestamp}] REQ ${uniqueCode} ${info.meta.req.originalUrl} ${
            JSON.stringify(info.meta.req.body)
              ? JSON.stringify(info.meta.req.body)
              : JSON.stringify({})
          } ${info.meta.req.ip}`
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
    transports: [logRotateFile],
    format: combine(
      timestamp({
        format: "YYYY-MM-DD HH:mm:ss.SSS",
      }),
      align(),
      printf(
        (info) =>
          `[${info.timestamp}] RES ${uniqueCode} ${info.meta.req.originalUrl} ${
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
};

export { logger, uniqueCodeMiddleware };
