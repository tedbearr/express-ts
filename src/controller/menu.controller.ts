import { Request, Response } from "express";
import * as service from "../service/menu.service";

const All = async (req: Request, res: Response) => {
  let result = await service.All();
  return res.status(200).json(result);
};

const Find = async (req: Request, res: Response) => {
  let result = await service.Find(req);
  return res.status(200).json(result);
};

const Insert = async (req: Request, res: Response) => {
  let result = await service.Insert(req);
  return res.status(200).json(result);
};

const Update = async (req: Request, res: Response) => {
  let result = await service.Update(req);
  return res.status(200).json(result);
};

const Delete = async (req: Request, res: Response) => {
  let result = await service.Delete(req);
  return res.status(200).json(result);
};

export { All, Find, Insert, Update, Delete };
