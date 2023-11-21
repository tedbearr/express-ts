import { Router } from "express";
import * as controller from "../controller/global-parameter.controller";
import validate from "../middleware/zod.middleware";
import { insertValidation } from "../validation/global-parameter.validation";

const router = Router();

router.get("/global-parameter", controller.All);
router.get("/global-parameter/:id", controller.Find);
router.post(
  "/global-parameter/insert",
  validate(insertValidation),
  controller.Insert
);
router.post("/global-parameter/update/:id", controller.Update);
router.post("/global-parameter/delete/:id", controller.Delete);

export default router;
