import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import {
  BlogDto,
  CreateUserDto,
  PersonalDetailsDto,
} from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async cresteUser(@Body() body: CreateUserDto) {
    return this.service.createUser(body);
  }
  @Post(':id/details')
  async cresteUserDetails(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PersonalDetailsDto,
  ) {
    return this.service.createPersonaLDetails(id, body);
  }
  @Post(':id/blog')
  async creteBlog(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: BlogDto,
  ) {
    return this.service.createBlog(id, body);
  }
  @Put(':id/editdetails')
  async UpdateDetails(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PersonalDetailsDto,
  ) {
    return this.service.UpdatePersonalDetails(id, body);
  }

  @Put(':id/editblog')
  async editBlog(@Param('id', ParseIntPipe) id: number, @Body() body: BlogDto) {
    return this.service.editBlog(id, body);
  }
  @Get()
  async getUsers() {
    return await this.service.findUsers();
  }
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return await this.service.findUserById(id);
  }
  @Delete(':id')
  async deleteUserById(@Param('id') id: number) {
    return await this.service.deleteUserById(id);
  }
}
