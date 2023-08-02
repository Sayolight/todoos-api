import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { HydratedDocument, now } from "mongoose";
import { Users } from "src/users/users.schema";

export type NotesDocument = HydratedDocument<Notes>;

@Schema()
export class Notes {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  shareLink: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Users.name })
  @Type(() => Users)
  author: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const NotesSchema = SchemaFactory.createForClass(Notes);
