import { HttpException } from "./http.exception.js";

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(401, message);
  }
}
