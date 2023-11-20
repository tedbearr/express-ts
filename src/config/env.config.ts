import dotenv from "dotenv";

interface EnvInterface {
  PORT: string;
  APP_FOR: string;
  DB_HOST: string;
  DB_NAME: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
}

const env = (): EnvInterface => {
  let obj = {};
  try {
    let loadEnv = dotenv.config();
    if (!loadEnv) {
      throw new Error("Fail to load env");
    }

    let appPort = process.env.APP_PORT;
    if (!appPort || appPort == undefined) {
      throw new Error("Fail to load env APP_PORT");
    }

    let appFor = process.env.APP_FOR;
    if (!appFor || appFor == undefined) {
      throw new Error("Fail to load env APP_FOR");
    }

    let dbHost = process.env.DB_HOST;
    if (!dbHost || dbHost == undefined) {
      throw new Error("Fail to load env DB_HOST");
    }

    let dbName = process.env.DB_NAME;
    if (!dbName || dbName == undefined) {
      throw new Error("Fail to load env DB_NAME");
    }

    let dbPort = process.env.DB_PORT;
    if (!dbPort || dbPort == undefined) {
      throw new Error("Fail to load env DB_PORT");
    }

    let dbUser = process.env.DB_USER;
    if (!dbUser || dbUser == undefined) {
      throw new Error("Fail to load env DB_USER");
    }

    let dbPassword = process.env.DB_PASSWORD;
    if (!dbPassword || dbPassword == undefined) {
      throw new Error("Fail to load env DB_PASSWORD");
    }

    obj = {
      PORT: appPort,
      APP_FOR: appFor,
      DB_HOST: dbHost,
      DB_NAME: dbName,
      DB_PORT: dbPort,
      DB_USER: dbUser,
      DB_PASSWORD: dbPassword,
    };
  } catch (error) {
    console.log(error);
  }

  return obj as EnvInterface;
};

export default { env };
