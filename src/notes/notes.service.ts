import { Injectable } from "@nestjs/common";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { Users } from "src/users/users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Notes, NotesDocument } from "./notes.schema";
import { Model } from "mongoose";

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Notes.name) private notesModel: Model<NotesDocument>
  ) {}

  create(createNoteDto: CreateNoteDto, author: Users) {
    return new this.notesModel({ ...createNoteDto, author }).save();
  }

  findAll(author: Users) {
    return this.notesModel.find({ author: author });
  }

  findOne(id: string, author: Users) {
    return this.notesModel.findOne({ _id: id, author: author });
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, author: Users) {
    const note = await this.notesModel.findOneAndUpdate(
      { _id: id, author: author },
      updateNoteDto
    );
    if (note) {
      note.title = updateNoteDto.title ?? note.title;
      note.content = updateNoteDto.content ?? note.content;
      return note;
    }
  }

  remove(id: string, author: Users) {
    return this.notesModel.findOneAndDelete({ _id: id, author: author });
  }
}
