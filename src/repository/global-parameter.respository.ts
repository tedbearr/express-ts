import knex from "../config/db.config";
import { updateInterface } from "../dto/global-parameter.dto";

interface GlobalParameter {
  id: number;
}

const All = async () => {
  let result = await knex<GlobalParameter>("global_parameter");
  console.log();
  return result;
};

const Find = async (id: number) => {
  let result = await knex("global_parameter").where("id", "=", id).first();
  return result;
};

const Insert = async (data: any) => {
  let result = await knex("global_parameter").insert(data);
  return result;
};

const Update = async (data: any, id: number) => {
  let result = knex("global_parameter").where("id", "=", id).update(data);
  return result;
};

const Delete = async (id: number) => {
  let result = await knex("global_parameter").where("id", "=", id).del();
  return result;
};

export { All, Find, Insert, Update, Delete };
