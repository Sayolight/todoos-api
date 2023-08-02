import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Request,
  UseGuards,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UsersService } from "src/users/users.service";

@UseGuards(JwtAuthGuard)
@Controller("tasks")
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly usersService: UsersService
  ) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    const author = await this.usersService.findOne(req.user.id);
    return await this.tasksService.create(createTaskDto, author);
  }

  @Get()
  async findAll(@Request() req) {
    const author = await this.usersService.findOne(req.user.id);
    return this.tasksService.findAll(author);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Request() req) {
    const task = await this.tasksService.findOne(id, req.user.id);
    if (!task) {
      return new NotFoundException();
    }
    return task;
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updatetaskDto: UpdateTaskDto,
    @Request() req
  ) {
    const task = await this.tasksService.update(id, updatetaskDto, req.user.id);
    if (!task) {
      return new NotFoundException();
    }
    return task;
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Request() req) {
    return this.tasksService.remove(id, req.user.id);
  }
}
