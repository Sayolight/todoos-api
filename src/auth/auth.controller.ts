import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Request() req) {
    return this.authService.register(req.body);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return this.authService.getAccessToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
