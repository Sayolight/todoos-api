import { IsEmail, IsNotEmpty } from "class-validator";

export class UserLoginDTO {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
