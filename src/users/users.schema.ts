import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude, Transform } from "class-transformer";
import { HydratedDocument } from "mongoose";
import { Notes } from "src/notes/notes.schema";

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
