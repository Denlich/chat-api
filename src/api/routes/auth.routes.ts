import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { jwtTokenVerify } from "../middlewares/jwt-token-verify.middleware.js";
import { AuthValidator } from "../validators/auth.validator.js";
import { validationHandler } from "../middlewares/validation-handler.middleware.js";

const router = Router();
const authController = new AuthController();

router.post(
  "/register",
  AuthValidator.validateRegister,
  validationHandler,
  authController.register
);
router.post(
  "/login",
  AuthValidator.validateLogin,
  validationHandler,
  authController.login
);
router.get("/me", jwtTokenVerify, authController.getMe);
router.post("/refresh", jwtTokenVerify, authController.refresh);

export { router as authRouter };
