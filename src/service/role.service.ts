import * as repository from "../repository/role.repository";
import build from "../helper/response.helper";
import { Request } from "express";
import moment from "moment";

const All = async () => {
  let response;
  try {
    let data = await repository.All();
    response = build.response("00", "success", data);
  } catch (error) {
    response = build.response("500", `${(error as Error).message}`, []);
  }

  return response;
};

const Find = async (req: Request) => {
  let response;
  try {
    let { id } = req.params;
    let data = await repository.Find(parseInt(id));
    response = build.response("00", "success", data ? data : {});
  } catch (error) {
    response = build.response("500", `${(error as Error).message}`, {});
  }

  return response;
};

const Insert = async (req: Request) => {
  let response;
  try {
    let { code, name, description } = req.body;

    let data = {
      code: code,
      name: name,
      description: description,
    };

    await repository.Insert(data);
    response = build.response("00", "success", {});
  } catch (error) {
    response = build.response("500", `${(error as Error).message}`, {});
  }

  return response;
};

const Update = async (req: Request) => {
  let response;
  try {
    let { code, name, description } = req.body;
    let { id } = req.params;

    let data = {
      code: code,
      name: name,
      description: description,
      updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    await repository.Update(parseInt(id), data);
    response = build.response("00", "success", {});
  } catch (error) {
    response = build.response("500", `${(error as Error).message}`, {});
  }

  return response;
};

const Delete = async (req: Request) => {
  let response;
  try {
    let { id } = req.params;

    let data = {
      deleted_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    await repository.Delete(parseInt(id), data);
    response = build.response("00", "success", {});
  } catch (error) {
    response = build.response("500", `${(error as Error).message}`, {});
  }

  return response;
};

export { All, Find, Insert, Update, Delete };
