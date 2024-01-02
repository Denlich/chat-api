import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../utils/exceptions/http-exception.js";

export const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpException)
    return res.status(err.getStatus()).json({ message: err.getResponse() });

  if (typeof err === "object" && err !== null) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  return next();
};
