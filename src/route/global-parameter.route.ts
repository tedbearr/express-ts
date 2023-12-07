import { Router } from "express";
import * as controller from "../controller/global-parameter.controller";
import validate from "../middleware/zod.middleware";
import { insertValidation } from "../validation/global-parameter.validation";
import { jwtMiddleware } from "../middleware/jwt.middleware";

const router = Router();

/**
 * @openapi
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
 * @openapi
 *  /api/v1/global-parameter/insert:
 *   post:
 *     tags: [Global Parameter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:          
 *                 type: string
 *                 default: GLOBAL_PARAMETER_CODE
 *             required:
 *               - code          
 *     responses:
 *       200:
 *         description: success
 *       400:
 *         description: Header not found
 */
router.post(
  "/global-parameter/insert",
  jwtMiddleware,
  validate(insertValidation),
  controller.Insert
);

/**
 * @openapi
 *  /api/v1/global-parameter/update/{id}:
 *   post:
 *     tags: [Global Parameter]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: Global parameter id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:          
 *                 type: string
 *                 default: GLOBAL_PARAMETER_CODE
 *             required:
 *               - code          
 *     responses:
 *       200:
 *         description: success
 *       400:
 *         description: Header not found
 */
router.post("/global-parameter/update/:id", jwtMiddleware, controller.Update);

/**
 * @openapi
 *  /api/v1/global-parameter/delete/{id}:
 *   post:
 *     tags: [Global Parameter]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: Global parameter id       
 *     responses:
 *       200:
 *         description: success
 *       400:
 *         description: Header not found
 */
router.post("/global-parameter/delete/:id", jwtMiddleware, controller.Delete);

export default router;
