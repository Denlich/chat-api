import { AuthController } from "@/api/controllers/auth.controller.js";
import { jwtTokenVerify } from "@/api/middlewares/jwt-token-verify.js";
import { Router } from "express";

const router = Router();
const authController = new AuthController();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", jwtTokenVerify, authController.getMe);
router.post("/refresh", jwtTokenVerify, authController.refresh);

export { router as authRouter };
