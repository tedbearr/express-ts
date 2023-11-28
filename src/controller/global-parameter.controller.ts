import { Request, Response } from "express";
import response from "../helper/response.helper";
import * as service from "../service/global-parameter.service";
import * as winston from "../helper/log.helper";

const All = async (req: Request, res: Response) => {
  let result = await service.All();

  return res.status(200).json(result);
};

const Find = async (req: Request, res: Response) => {
  let { id } = req.params;

  let result = await service.Find(parseInt(id));

  return res.status(200).json(result);
};

const Insert = async (req: Request, res: Response) => {

  let result = await service.Insert(req.body);

  return res.status(200).json(result);
};

const Update = async (req: Request, res: Response) => {
  let { id } = req.params;

  let result = await service.Update(req.body, parseInt(id));

  return res.status(200).json(result);
};

const Delete = async (req: Request, res: Response) => {
  let { id } = req.params;

  let result = await service.Delete(parseInt(id));

  return res.status(200).json(result);
};

export { All, Find, Insert, Update, Delete };
