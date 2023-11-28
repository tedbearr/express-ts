import * as repository from "../repository/auth.repository";
import build from "../helper/response.helper";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import envConfig from "../config/env.config";
import "../dto/auth.dto";
import * as winston from "../helper/log.helper";
import { generateUniqueCode } from "../helper/unique-code.helper";

const Login = async (data: any) => {
  let response;
  let uniqueCode = generateUniqueCode();
  try {
    let { username, password } = data;
    winston.logger.info(
      uniqueCode + " [LOGIN] request " + JSON.stringify(data)
    );

    winston.logger.info(uniqueCode + " [LOGIN] check user by username... ");
    let user = await repository.Check(username);
    if (!user) {
      let res = build.response("400", "user not found", {});
      winston.logger.warn(
        uniqueCode + " [LOGIN] response " + JSON.stringify(res)
      );
      return res;
    }

    winston.logger.info(uniqueCode + " [LOGIN] comparing password... ");
    let comparingPassword = await comparePassword(password, user.password);
    if (!comparingPassword) {
      let res = build.response("400", "wrong password", {});
      winston.logger.warn(
        uniqueCode + " [LOGIN] response " + JSON.stringify(res)
      );
      return res;
    }

    winston.logger.info(uniqueCode + " [LOGIN] generating access token... ");
    let accessToken = await generateAccessToken(data);

    winston.logger.info(uniqueCode + " [LOGIN] generating refresh token... ");
    let refreshToken = await generateRefreshToken(data);

    let responseToken: ResponseToken;
    responseToken = { accessToken: accessToken, refreshToken: refreshToken };

    response = build.response("00", "success", responseToken);
    winston.logger.info(
      uniqueCode + " [LOGIN] response " + JSON.stringify(response)
    );
  } catch (error) {
    response = build.response("500", `${(error as Error).message}`, {});
    winston.logger.error(
      uniqueCode + " [LOGIN] response " + JSON.stringify(response)
    );
  }

  return response;
};

const comparePassword = async (
  plainPassword: string,
  hashPassword: string
): Promise<boolean> => {
  let result = await bcrypt.compare(plainPassword, hashPassword);
  return result;
};

const generateAccessToken = async (data: any): Promise<string> => {
  let expired = envConfig.env().TOKEN_EXPIRED;
  let signOptions = {
    issuer: "express-ts",
    expiresIn: expired,
  };

  let token = await jwt.sign(
    data,
    envConfig.env().ACCESS_TOKEN_SECRET,
    signOptions
  );
  return token;
};

const generateRefreshToken = async (data: any): Promise<string> => {
  let expired = envConfig.env().TOKEN_EXPIRED;
  let signOptions = {
    issuer: "express-ts",
    expiresIn: expired,
  };

  let token = await jwt.sign(
    data,
    envConfig.env().REFRESH_TOKEN_SECRET,
    signOptions
  );
  return token;
};

export { Login };
