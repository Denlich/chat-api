import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../../utils/exceptions/unauthorized.exception.js";
import jwt from "jsonwebtoken";

export const jwtTokenVerify = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new UnauthorizedException("Unauthorized");
  const token = authHeader.split(" ")[1];
  if (!token) throw new UnauthorizedException("Unauthorized");
  try {
    const decoded = jwt.verify(token, process.env.SECRET!);
    req.body.id = decoded.sub;
    next();
  } catch (error) {
    throw new UnauthorizedException("Unauthorized");
  }
};
