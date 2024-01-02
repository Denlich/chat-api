import { NextFunction, Request, Response } from "express";
import { ChatService } from "../services/chat.service.js";

export class ChatController {
  private chatService: ChatService;

  constructor() {
    this.chatService = new ChatService();
  }

  createChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, name, users } = req.body;
      const chat = await this.chatService.createChat({
        name,
        users: [id, ...users],
      });
      return res.status(200).json(chat);
    } catch (error) {
      next(error);
    }
  };
}
