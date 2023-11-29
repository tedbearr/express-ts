import knex from "../config/db.config";

const All = async () => {
  let result = knex
    .table("menu")
    .select(
      "menu.id",
      "name",
      "path_url",
      "menu_parent_id",
      "icon",
      "status_id"
    )
    // .join("role_detail", "role_detail.menu_id", "=", "menu.id")
    .where("status_id", 1);
  // .where("menu_parent_id", 0);
  return result;
};

const Find = async (id: number) => {
  let result = await knex.table("menu").where("id", id).first();
  return result;
};

const Insert = async (data: any) => {
  let result = await knex.table("menu").insert(data);
  return result;
};

const Update = async (id: number, data: any) => {
  let result = await knex.table("menu").where("id", id).update(data);
  return result;
};

const Delete = async (id: number, data: any) => {
  let result = await knex.table("menu").where("id", id).update(data);
  return result;
};

const getChild = async (id: number) => {
  let result = knex
    .table("menu")
    .select("name as title", "icon", "path_url as path", "id as key")
    .where("menu_parent_id", id)
    .where("menu_parent_id", "!=", 0);
  return result;
};

export { All, Find, Insert, Update, Delete, getChild };
