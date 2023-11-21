import { Request, Response } from "express";
import * as service from "../service/auth.service";

const Login = async (req: Request, res: Response) => {
  let result = await service.Login(req.body);

  return res.status(200).json(result);
};

export { Login };
