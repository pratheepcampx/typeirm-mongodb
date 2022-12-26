import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Blog } from 'src/domain/entities/blog.entity';
import { User } from 'src/domain/entities/user.entity';
export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  blogs: Blog[];
}

export class PersonalDetailsDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
}

export class BlogDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
