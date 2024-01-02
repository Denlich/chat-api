import { ChatRepository } from "../../repositories/chat.repository.js";
import { UserRepository } from "../../repositories/user.repository.js";
import { ChatDto } from "../dtos/chat.dto.js";

export class ChatService {
  private chatRepository: ChatRepository;
  private userRepository: UserRepository;

  constructor() {
    this.chatRepository = new ChatRepository();
    this.userRepository = new UserRepository();
  }

  createChat = async (chatDto: ChatDto) => {
    const { name, users } = chatDto;

    const dbUsers = await this.userRepository.getUsersByIds(users);

    const chat = await this.chatRepository.create({
      name,
      users: {
        connect: dbUsers.map((user) => ({ id: user.id })),
      },
    });

    return chat;
  };
}
