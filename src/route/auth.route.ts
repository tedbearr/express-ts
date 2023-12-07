import { Router } from "express";
import * as controller from "../controller/auth.controller";
import router from "./global-parameter.route";
import validate from "../middleware/zod.middleware";
import { loginValidation } from "../validation/auth.validation";

/**
 * @openapi
 *  /api/v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:          
 *                 type: string
 *                 default: admin
 *               password:          
 *                 type: string
 *                 default: 123
 *             required:
 *               - username
 *               - password          
 *     responses:
 *       200:
 *         description: success
 */
router.post("/auth/login", validate(loginValidation), controller.Login);

export default router;
