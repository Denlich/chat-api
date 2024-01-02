import { body } from "express-validator";

export class ChatValidator {
  private constructor() {}

  static validateCreateChat = [
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("users").isArray().notEmpty().withMessage("Users are required"),
  ];
}
