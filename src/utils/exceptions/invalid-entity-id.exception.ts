import { HttpException } from "./http.exception.js";

export class InvalidEntityIdException extends HttpException {
  constructor(entity: string) {
    super(400, `${entity} with such id is not found`);
  }
}
