import { Router } from "express";
import * as controller from "../controller/role.controller";
import validate from "../middleware/zod.middleware";
import {
  insertValidation,
  updateValidation,
  deleteValidation,
} from "../validation/role.validation";
import { jwtMiddleware } from "../middleware/jwt.middleware";

const router = Router();

router.get("/role/", jwtMiddleware, controller.All);
router.get("/role/:id", jwtMiddleware, controller.Find);
router.post(
  "/role/insert",
  jwtMiddleware,
  validate(insertValidation),
  controller.Insert
);
router.post(
  "/role/update/:id",
  jwtMiddleware,
  validate(updateValidation),
  controller.Update
);
router.post(
  "/role/delete/:id",
  jwtMiddleware,
  validate(deleteValidation),
  controller.Delete
);

export default router;
