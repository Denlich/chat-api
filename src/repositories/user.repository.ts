import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma.server.js";

export class UserRepository {
  async findById(id: string) {
    return await prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async find(where: Prisma.UserWhereInput) {
    return await prisma.user.findFirst({
      where,
    });
  }
}
