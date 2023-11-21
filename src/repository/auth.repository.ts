import knex from "../config/db.config";

const Check = async (username: string) => {
  let result = await knex
    .table("users")
    .where("username", "=", username)
    .first();
  return result;
};

// const Insert = async () => {};

export { Check };
