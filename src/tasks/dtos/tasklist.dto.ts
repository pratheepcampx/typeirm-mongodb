import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { SubTask } from 'src/domain/schemas/sub-tasks.schema';

export class TaskListDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsBoolean()
  completed: boolean;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsNumber()
  priority: number;

  @IsString()
  createdBy: string;

  @IsString()
  updatedBy: string;
}
