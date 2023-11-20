import * as repository from "../repository/global-parameter.respository";
import { insertInterface, updateInterface } from "../dto/global-parameter.dto";
import moment from "moment";

const All = async () => {
  try {
    return await repository.All();
  } catch (error) {
    throw error;
  }
};

const Find = async (id: number) => {
  try {
    return (await repository.Find(id)) ? await repository.Find(id) : {};
  } catch (error) {
    throw error;
  }
};

const Insert = async (data: any) => {
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
    return await repository.Insert(dataInsert);
  } catch (error) {
    throw error;
  }
};

const Update = async (data: any, id: number) => {
  try {
    let dataUpdate: updateInterface;
    let { code } = data;

    let find = await repository.Find(id);
    if (!find) {
        console.log("first")
      throw new Error("data not found!");
    }

    dataUpdate = {
      code: code,
      updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    return await repository.Update(dataUpdate, id);
  } catch (error) {
    throw error;
  }
};

const Delete = async (id: number) => {
  try {
    let find = await repository.Find(id);
    if (!find) {
        console.log("first")
      throw new Error("data not found!");
    }

    return await repository.Delete(id);
  } catch (error) {
    throw error;
  }
};

export { All, Find, Insert, Update, Delete };
