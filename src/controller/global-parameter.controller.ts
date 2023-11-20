import { Request, Response } from "express";
import response from "../helper/response.helper";
import * as service from "../service/global-parameter.service";

const All = async (req: Request, res: Response) => {
  let resp;
  try {
    let globalParameter = await service.All();
    resp = response.response("00", "success", globalParameter);
  } catch (error) {
    resp = response.response("500", `${(error as Error).message}`, []);
  }

  return res.status(200).json(resp);
};

const Find = () => {};

const Insert = () => {};

const Update = () => {};

const Delete = () => {};

export { All, Find, Insert, Update, Delete };
