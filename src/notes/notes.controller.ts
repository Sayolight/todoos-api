import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  NotFoundException,
} from "@nestjs/common";
import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { UsersService } from "src/users/users.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("notes")
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private readonly usersService: UsersService
  ) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto, @Request() req) {
    const author = await this.usersService.findOne(req.user.id);
    return await this.notesService.create(createNoteDto, author);
  }

  @Get()
  async findAll(@Request() req) {
    const author = await this.usersService.findOne(req.user.id);
    return this.notesService.findAll(author);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Request() req) {
    const note = await this.notesService.findOne(id, req.user.id);
    if (!note) {
      return new NotFoundException();
    }
    return note;
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Request() req
  ) {
    const note = await this.notesService.update(id, updateNoteDto, req.user.id);
    if (!note) {
      return new NotFoundException();
    }
    return note;
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Request() req) {
    return this.notesService.remove(id, req.user.id);
  }
}
