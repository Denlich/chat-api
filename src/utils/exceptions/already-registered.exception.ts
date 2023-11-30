import { HttpException } from "./http.exception.js";

export class AlreadyRegisteredException extends HttpException {
  constructor() {
    super(404, "User already registered");
  }
}
