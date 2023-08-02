import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
import { UsersModule } from "src/users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Tasks, TasksSchema } from "./tasks.schema";

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Tasks.name, schema: TasksSchema }]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
