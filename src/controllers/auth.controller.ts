import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async ({ body }: Request, res: Response, next: NextFunction) => {
    try {
      const userToken = await this.authService.register(body);
      return res.status(200).json(userToken);
    } catch (error) {
      next(error);
    }
  };
}
