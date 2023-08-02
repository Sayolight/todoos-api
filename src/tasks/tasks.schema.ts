import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { HydratedDocument, now } from "mongoose";
import { Users } from "src/users/users.schema";

export type TasksDocument = HydratedDocument<Tasks>;

@Schema()
export class Tasks {
  @Prop({ required: true })
  title: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Users.name,
    required: true,
  })
  @Type(() => Users)
  author: string;

  @Prop({ required: true, default: false })
  status: boolean;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const TasksSchema = SchemaFactory.createForClass(Tasks);
