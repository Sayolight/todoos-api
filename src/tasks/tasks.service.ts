import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Tasks, TasksDocument } from "./tasks.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "src/users/users.schema";

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Tasks.name) private tasksModel: Model<TasksDocument>
  ) {}

  create(createTaskDto: CreateTaskDto, author: Users) {
    return new this.tasksModel({ ...createTaskDto, author }).save();
  }

  findAll(author: Users) {
    return this.tasksModel.find({ author: author });
  }

  findOne(id: string, author: Users) {
    return this.tasksModel.findOne({ _id: id, author: author });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, author: Users) {
    const note = await this.tasksModel.findOneAndUpdate(
      { _id: id, author: author },
      updateTaskDto
    );
    if (note) {
      note.title = updateTaskDto.title ?? note.title;
      note.status = updateTaskDto.status ?? note.status;
      return note;
    }
  }

  remove(id: string, author: Users) {
    return this.tasksModel.findOneAndDelete({ _id: id, author: author });
  }
}
