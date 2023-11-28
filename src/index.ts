import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import load from "./config/env.config";
import globalParameterRoute from "./route/global-parameter.route";
import { logger, uniqueCodeMiddleware } from "./middleware/log.middleware";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import authRoute from "./route/auth.route";

const app = express();
app.use(cors());
app.use(bodyParser.json());

let loadEnv = load.env();
const port = loadEnv.PORT;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Welcome!",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3001",
      description: "Local-Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearer: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearer: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./src/route/*"],
};

const swaggerSpec = swaggerJsDoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(uniqueCodeMiddleware);

app.use(logger.request);
app.use(logger.response);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json("Welcome!");
});

app.use("/api/v1", globalParameterRoute, authRoute);

app.use("*", (req: Request, res: Response) => {
  return res.status(404).json("What are you looking for");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
