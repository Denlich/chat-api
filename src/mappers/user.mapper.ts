import { User } from "@prisma/client";

export class UserMapper {
  getUser(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      username: user.username,
    };
  }
}
