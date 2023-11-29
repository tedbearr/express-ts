import knex from "../config/db.config";

const All = async () => {
  let result = await knex.table("role").where("status_id", 1);
  return result;
};

const Find = async (id: number) => {
  let result = await knex
    .table("role")
    .where("id", id)
    .where("status_id", 1)
    .first();
  return result;
};

const Insert = async (data: any) => {
  let result = await knex.table("role").insert(data);
  return result;
};

const Update = async (id: number, data: any) => {
  let result = await knex.table("role").where("id", id).update(data);
  return result;
};

const Delete = async (id: number, data: any) => {
  let result = await knex.table("role").where("id", id).update(data);
  return result;
};

export { All, Find, Insert, Update, Delete };
