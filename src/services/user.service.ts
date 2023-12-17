import { UserMapper } from "../mappers/user.mapper.js";
import { UserRepository } from "../repositories/user.repository.js";
import { UnauthorizedException } from "../utils/exceptions/unauthorized.exception.js";

export class UserService {
  private userRepository: UserRepository;
  private userMapper: UserMapper;

  constructor() {
    this.userRepository = new UserRepository();
    this.userMapper = new UserMapper();
  }

  async getUser(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (user) return this.userMapper.getUser(user);
    throw new UnauthorizedException("Unauthorized");
  }
}
