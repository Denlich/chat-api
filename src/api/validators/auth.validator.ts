import { body } from "express-validator";

export class AuthValidator {
  private constructor() {}

  static validateRegister = [
    body("name")
      .isString()
      .trim()
      .isLength({ min: 2, max: 20 })
      .withMessage("Name must be between 2 and 20 characters"),
    body("surname")
      .isString()
      .trim()
      .isLength({ min: 4, max: 30 })
      .withMessage("Surname must be between 4 and 30 characters"),
    body("username")
      .isString()
      .isLength({ min: 3, max: 30 })
      .withMessage("Username must be between 3 and 30 characters"),
    body("email").isEmail().withMessage("Email must be valid").normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be between 6 and 20 characters"),
  ];

  static validateLogin = [
    body("username")
      .isLength({ min: 3, max: 30 })
      .withMessage("Username must be between 3 and 30 characters"),
    body("password")
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be between 6 and 20 characters"),
  ];
}
