import { Router } from "express";

import { ChatController } from "../controllers/chat.controller.js";
import { ChatValidator } from "../validators/chat.validator.js";
import { validationHandler } from "../middlewares/validation-handler.js";

const router = Router();
const chatController = new ChatController();

router.post(
  "/create",
  ChatValidator.validateCreateChat,
  validationHandler,
  chatController.createChat
);

export { router as chatRouter };
