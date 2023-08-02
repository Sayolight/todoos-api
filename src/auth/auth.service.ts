/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { compare } from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email).select("+password");
    if (user && (await compare(password, user.password))) {
      const { password, ...result } = user;
      return result["_doc"];
    }
    return null;
  }

  async getAccessToken(user: any) {
    const payload = {
      email: user.email,
      username: user.username,
      id: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getProfile(userId: string) {
    const user = await this.usersService.findOne(userId);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(user: any) {
    const { password, ...result } = await this.usersService.create(user);
    const newUser = await this.usersService.findOne(result["_doc"]._id);
    return newUser;
  }
}
