import { Router } from "express";
import * as controller from "../controller/global-parameter.controller";
import validate from "../middleware/zod.middleware";
import { insertValidation } from "../validation/global-parameter.validation";
import { jwtMiddleware } from "../middleware/jwt.middleware";

const router = Router();

/**
 * @swagger
 *  /api/v1/global-parameter/:
 *   get:
 *     tags: [Global Parameter]
 *     content:
 *       application/json
 *     description: Get All Global Parameter!
 *     responses:
 *       200:
 *         description: Returns all global parameter data.
 */
router.get("/global-parameter", jwtMiddleware, controller.All);

/**
 * @swagger
 *  /api/v1/global-parameter/{id}:
 *   get:
 *     tags: [Global Parameter]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The book id
 *     content:
 *       application/json
 *     description: Get All Global Parameter!
 *     responses:
 *       200:
 *         description: Returns all global parameter data.
 */
router.get("/global-parameter/:id", jwtMiddleware, controller.Find);

/**
 * @swagger
 *  /api/v1/global-parameter/insert:
 *   post:
 *     tags: [Global Parameter]
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *         required: true
 *         description: body request
 *     content:
 *       application/json
 *     description: Get All Global Parameter!
 *     responses:
 *       200:
 *         description: Returns all global parameter data.
 */
router.post(
  "/global-parameter/insert",
  jwtMiddleware,
  validate(insertValidation),
  controller.Insert
);
router.post("/global-parameter/update/:id", jwtMiddleware, controller.Update);
router.post("/global-parameter/delete/:id", jwtMiddleware, controller.Delete);

export default router;
