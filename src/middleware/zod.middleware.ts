import { AnyZodObject } from "zod";
import { NextFunction, Request, Response } from "express";
import build from "../helper/response.helper";

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      let result = build.response(
        "400",
        `${JSON.parse((error as Error).message)[0].message}`,
        {}
      );
      return res.status(400).json(result);
    }
  };

export default validate;
