import { Module } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { NotesController } from "./notes.controller";
import { UsersModule } from "src/users/users.module";
import { Notes, NotesSchema } from "./notes.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Notes.name, schema: NotesSchema }]),
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
