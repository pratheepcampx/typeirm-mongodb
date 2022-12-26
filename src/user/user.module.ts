import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/domain/entities/blog.entity';
import { PersonalDetails } from 'src/domain/entities/personalDetails.entity';
import { User } from 'src/domain/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, PersonalDetails, Blog])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
