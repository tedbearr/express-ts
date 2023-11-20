import { Router } from "express";
import * as controller from "../controller/global-parameter.controller";

const router = Router();

router.get("/global-parameter", controller.All);
router.get("/global-parameter/:id", controller.Find);
router.post("/global-parameter/insert", controller.Insert);
router.post("/global-parameter/update/:id", controller.Update);
router.post("/global-parameter/delete/:id", controller.Delete);

export default router;
