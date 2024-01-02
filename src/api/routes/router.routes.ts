import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import { chatRouter } from "./chat.routes.js";
import { jwtTokenVerify } from "../middlewares/jwt-token-verify.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/chat", jwtTokenVerify, chatRouter);

export default router;
