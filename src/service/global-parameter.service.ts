import * as repository from "../repository/global-parameter.respository";
import { insertInterface, updateInterface } from "../dto/global-parameter.dto";
import moment from "moment";
import build from "../helper/response.helper";

const All = async () => {
  let response;
  try {
    let get = await repository.All();
    response = build.response("00", "success", get);
  } catch (error) {
    response = build.response("500", `${(error as Error).message}`, []);
  }

  return response;
};

const Find = async (id: number) => {
  let response;
  try {
    let get = (await repository.Find(id)) ? await repository.Find(id) : {};
    response = build.response("00", "success", get);
  } catch (error) {
    response = build.response("500", `${(error as Error).message}`, {});
  }

  return response;
};

const Insert = async (data: any) => {
  let response;
  try {
    let { code, name, value, description, status_id } = data;
    let dataInsert: insertInterface;
    dataInsert = {
      code: code,
      name: name,
      description: description,
      status_id: status_id,
      value: value,
    };
    await repository.Insert(dataInsert);

    response = build.response("00", "success", {});
  } catch (error) {
    response = build.response("500", `${(error as Error).message}`, {});
  }

  return response;
};

const Update = async (data: any, id: number) => {
  let response;
  try {
    let dataUpdate: updateInterface;
    let { code } = data;

    let find = await repository.Find(id);
    if (!find) {
      return (response = build.response("400", "data not found", {}));
    }

    dataUpdate = {
      code: code,
      updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    await repository.Update(dataUpdate, id);

    response = build.response("00", "success", {});
  } catch (error) {
    response = build.response("500", `${(error as Error).message}`, {});
  }

  return response;
};

const Delete = async (id: number) => {
  let response;
  try {
    let find = await repository.Find(id);
    if (!find) {
      return (response = build.response("400", "data not found", {}));
    }
    await repository.Delete(id);

    response = build.response("00", "success", {});
  } catch (error) {
    response = build.response("500", `${(error as Error).message}`, {});
  }

  return response;
};

export { All, Find, Insert, Update, Delete };
