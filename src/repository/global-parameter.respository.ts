import knex from "../config/db.config";

const All = async () => {
  let result = await knex("global_parameterr");
  return result;
};

export { All };
