import bcrypt from "bcrypt";
import { UserDto } from "../dtos/user.dto.js";
import { prisma } from "../utils/prisma.server.js";
import { JwtLocalService } from "./jwt.local.service.js";
import { AlreadyRegisteredException } from "../utils/exceptions/already-registered.exception.js";
import { JwtPayload } from "../security/jwt.payload.js";
import { User } from "@prisma/client";
import { UnauthorizedException } from "../utils/exceptions/unauthorized.exception.js";
import { InvalidEntityIdException } from "../utils/exceptions/invalid-entity-id.exception.js";
import { LoginDto } from "../dtos/login.dto.js";

export class AuthService {
  private jwtLocalService: JwtLocalService;

  constructor() {
    this.jwtLocalService = new JwtLocalService();
  }

  validateUser = async (username: string, password: string) => {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: username }, { username: username }],
      },
    });
    if (!user) {
      throw new InvalidEntityIdException("User");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("The password is incorrect");
    }

    return user;
  };

  register = async (user: UserDto) => {
    if (await this.checkIfUserExists(user)) {
      throw new AlreadyRegisteredException();
    }

    const tokenBody = {
      ...user,
      password: await this.hashPassword(user.password),
    };

    const newUser = await this.trulyRegister(tokenBody);

    return this.getAccessToken(newUser);
  };

  login = async (user: LoginDto) => {
    const userFromDb = await this.validateUser(user.username, user.password);

    return this.getAccessToken(userFromDb);
  };

  getAccessToken = (user: User) => {
    const payload = this.createPayload(user);

    return {
      accessToken: this.jwtLocalService.generateToken(payload),
    };
  };

  checkIfUserExists = async (query: { email?: string; username?: string }) => {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: query.email }, { username: query.username }],
      },
    });
    return !!user?.password;
  };

  hashPassword = async (password: string) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  };

  trulyRegister = async (user: UserDto) => {
    const newUser = await prisma.user.create({ data: { ...user } });
    return newUser;
  };

  createPayload = (user: User): JwtPayload => {
    return {
      sub: user.id,
      username: user.username,
    };
  };
}
