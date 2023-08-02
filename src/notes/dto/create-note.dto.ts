import { IsNotEmpty } from "class-validator";

export class CreateNoteDto {
  @IsNotEmpty()
  readonly title: string;

  readonly content: string;
}
