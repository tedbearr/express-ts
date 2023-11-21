import { NextFunction, Request, Response } from "express";
import build from "../helper/response.helper";
import jwt from "jsonwebtoken";
import envConfig from "../config/env.config";

const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let getHeader = req.header("Authorization");
  let token = getHeader?.split(" ")[1];

  if (getHeader) {
    if (!token) {
      return build.response("400", "token not found", {});
    }

    let verifyOptions = {
      issuer: "express-ts",
    };

    jwt.verify(
      token,
      envConfig.env().ACCESS_TOKEN_SECRET,
      verifyOptions,
      (err: any, data: any) => {
        if (err) {
          return build.response("400", "invalid token", {});
        }
        console.log(data);
        // req.username = data.username;
      }
    );
  } else {
    return build.response("400", "header not found", {});
  }

  next();
};

export { jwtMiddleware };
