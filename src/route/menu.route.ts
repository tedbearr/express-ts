import { Router } from "express";
import * as controller from "../controller/menu.controller";
import validate from "../middleware/zod.middleware";
import { jwtMiddleware } from "../middleware/jwt.middleware";
import {
  insertValidation,
  deleteValidation,
  updateValidation,
} from "../validation/menu.validation";

const router = Router();

router.get("/menu/", jwtMiddleware, controller.All);
router.get("/menu/:id", jwtMiddleware, controller.Find);
router.post(
  "/menu/insert",
  jwtMiddleware,
  validate(insertValidation),
  controller.Insert
);
router.post(
  "/menu/update/:id",
  jwtMiddleware,
  validate(updateValidation),
  controller.Update
);
router.post(
  "/menu/delete/:id",
  jwtMiddleware,
  validate(deleteValidation),
  controller.Delete
);

export default router;
