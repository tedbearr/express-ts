import { NextFunction, Request, Response } from "express";
import build from "../helper/response.helper";
import jwt from "jsonwebtoken";
import envConfig from "../config/env.config";

const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let getHeader = req.header("Authorization");
  let token = getHeader?.split(" ")[1];

  if (getHeader) {
    if (!token) {
      return res.status(200).json(build.response("400", "token not found", {}));
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
          let result = build.response("400", "invalid token", {});
          return res.status(200).json(result);
        }
        next();
      }
    );
  } else {
    return res.status(200).json(build.response("400", "header not found", {}));
  }
};

export { jwtMiddleware };
