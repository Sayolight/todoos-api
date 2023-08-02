import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "./users.schema";
import { Model } from "mongoose";
import { hash } from "bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private userModel: Model<Users>) {}

  async create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    user.password = await hash(user.password, 10);
    try {
      return await user.save();
    } catch (e) {
      if (e.code === 11000) {
        throw new BadRequestException(["username or email already exists"]);
      }
      return e;
    }
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
