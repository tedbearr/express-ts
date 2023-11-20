import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import load from "./config/env.config";
import globalParameterRoute from "./route/global-parameter.route";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '25mb' }));

let loadEnv = load.env();
const port = loadEnv.PORT

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json("Welcome!");
});

app.use("/api/v1", globalParameterRoute);

app.use("*", (req: Request, res: Response) => {
  return res.status(404).json("What are you looking for");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
