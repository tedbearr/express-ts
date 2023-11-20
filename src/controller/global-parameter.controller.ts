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

const Find = async (req: Request, res: Response) => {
  let { id } = req.params;
  let resp;
  try {
    let find = await service.Find(parseInt(id));
    resp = response.response("00", "success", find);
  } catch (error) {
    resp = response.response("500", `${(error as Error).message}`, {});
  }

  return res.status(200).json(resp);
};

const Insert = async (req: Request, res: Response) => {
  let resp;
  try {
    await service.Insert(req.body);
    resp = response.response("00", "success", {});
  } catch (error) {
    resp = response.response("500", `${(error as Error).message}`, {});
  }

  return res.status(200).json(resp);
};

const Update = async (req: Request, res: Response) => {
  let resp;
  let { id } = req.params;
  try {
    await service.Update(req.body, parseInt(id));
    resp = response.response("00", "success", {});
  } catch (error) {
    resp = response.response("500", `${(error as Error).message}`, {});
  }

  return res.status(200).json(resp);
};

const Delete = async (req: Request, res: Response) => {
  let resp;
  let { id } = req.params;
  try {
    await service.Delete(parseInt(id));
    resp = response.response("00", "success", {});
  } catch (error) {
    resp = response.response("500", `${(error as Error).message}`, {});
  }

  return res.status(200).json(resp);
};

export { All, Find, Insert, Update, Delete };
