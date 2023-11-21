import { Router } from "express";
import * as controller from "../controller/auth.controller";
import router from "./global-parameter.route";
import validate from "../middleware/zod.middleware";
import { loginValidation } from "../validation/auth.validation";

router.post("/auth/login", validate(loginValidation), controller.Login);

export default router;
