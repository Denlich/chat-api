import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { jwtTokenVerify } from "../middlewares/jwt-token-verify.middleware.js";

const router = Router();
const authController = new AuthController();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", jwtTokenVerify, authController.getMe);
router.post("/refresh", jwtTokenVerify, authController.refresh);

export { router as authRouter };
