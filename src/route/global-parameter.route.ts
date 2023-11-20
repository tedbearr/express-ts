import { Router } from "express";
import * as controller from "../controller/global-parameter.controller";

const router = Router();

router.get("/global-parameter", controller.All);

export default router;
