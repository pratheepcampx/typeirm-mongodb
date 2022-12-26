import {
  IsBoolean,
  IsDate,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class SubTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  taskId: String;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
