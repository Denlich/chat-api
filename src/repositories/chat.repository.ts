import { Chat, Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma.server.js";

export class ChatRepository {
  async create(chat: Prisma.ChatCreateInput): Promise<Chat> {
    return prisma.chat.create({
      data: chat,
    });
  }
}
