import { AuthService } from "@/api/services/auth.service.js";
import { UserService } from "@/api/services/user.service.js";
import { NextFunction, Request, Response } from "express";

export class AuthController {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userToken = await this.authService.register(req.body);
      return res.status(200).json(userToken);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userToken = await this.authService.login(req.body);
      return res.status(200).json(userToken);
    } catch (error) {
      next(error);
    }
  };

  getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUser(req.body.id);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await this.authService.refresh(req.body);
      return res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  };
}
