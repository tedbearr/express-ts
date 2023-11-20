import load from "./env.config";
import { knex } from "knex";

let env = load.env();

const knexx = knex({
  client: "pg",
  connection: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
  },
});

export default knexx;
