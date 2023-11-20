import load from "./env.config";

let env = load.env();

const knex = require("knex")({
  client: "pg",
  connection: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
  },
});

export default knex;
