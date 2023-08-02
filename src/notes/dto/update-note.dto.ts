import { PartialType } from "@nestjs/mapped-types";
import { CreateNoteDto } from "./create-note.dto";
import { IsNotEmpty } from "class-validator";

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  readonly title: string;
  readonly content: string;
}
