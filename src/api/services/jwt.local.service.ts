import jwt from "jsonwebtoken";

export class JwtLocalService {
  generateToken = (payload: any) => {
    return jwt.sign(payload, process.env.SECRET!, { expiresIn: "24h" });
  };
}
