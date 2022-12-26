import { Body, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Blog } from 'src/domain/entities/blog.entity';
import { PersonalDetails } from 'src/domain/entities/personalDetails.entity';
import { User } from 'src/domain/entities/user.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import {
  BlogDto,
  CreateUserDto,
  PersonalDetailsDto,
} from './dtos/create-user.dto';

@Injectable()
export class UserService {
  private readonly userRepo: Repository<User>;
  private readonly blogRepo: Repository<Blog>;
  private readonly detailsRepo: Repository<PersonalDetails>;
  private readonly manager: EntityManager;
  constructor(private readonly dataSource: DataSource) {
    this.userRepo = this.dataSource.getRepository(User);
    this.detailsRepo = this.dataSource.getRepository(PersonalDetails);
    this.blogRepo = this.dataSource.getRepository(Blog);
    this.manager = this.dataSource.manager;
  }

  async createUser(data: CreateUserDto) {
    const existing = await this.manager.findOne(User, {
      where: { name: data.name },
    });
    if (existing) {
      throw new UnprocessableEntityException('User Already exists');
    }

    const user = new User();
    user.name = data.name;

    await this.userRepo.save(user);
  }

  async createPersonaLDetails(id: number, data: PersonalDetailsDto) {
    const user = await this.manager.findOne(User, {
      where: { id: id },
    });
    if (!user) {
      throw new UnprocessableEntityException('User Not Found');
    }
    const details = new PersonalDetails();
    details.email = data.email;
    details.phone = data.phone;

    const saveDetails = await this.detailsRepo.save(details);
    user.personalDetails = saveDetails;
    return await this.userRepo.save(user);
  }

  async createBlog(id: number, data: BlogDto) {
    const user = await this.manager.findOneBy(User, { id });
    if (!user) {
      throw new UnprocessableEntityException('user not found');
    }
    const blog = new Blog();
    blog.title = data.title;
    blog.content = data.content;
    blog.user = user;

    return await this.blogRepo.save(blog);
  }

  async editBlog(id: number, data: BlogDto) {
    const blog = await this.manager.findOneBy(Blog, { id });
    if (!blog) {
      throw new UnprocessableEntityException('blog not found');
    }
    blog.title = data.title;
    blog.content = data.content;

    return await this.blogRepo.save(blog);
  }

  async UpdatePersonalDetails(id: number, data: PersonalDetailsDto) {
    const user = await this.manager.findOne(User, {
      where: { id: id },
    });
    if (!user) {
      throw new UnprocessableEntityException('User Not Found');
    }
    const details = await this.manager.findOneBy(PersonalDetails, { id });
    details.email = data.email;
    details.phone = data.phone;
    const saveDetails = await this.detailsRepo.save(details);
    user.personalDetails = saveDetails;
    return await this.userRepo.save(user);
  }
  async findUsers() {
    return await this.userRepo.find({
      relations: ['personalDetails', 'blogs'],
    });
  }

  async findUserById(id: number) {
    const user = await this.manager.findOneBy(User, { id });
    if (!user) {
      throw new UnprocessableEntityException('User Not Found');
    }
    return user;
  }
  async deleteUserById(id: number) {
    const user = await this.manager.findOneBy(User, { id });
    if (!user) {
      throw new UnprocessableEntityException('User Not Found');
    }
    return await this.userRepo.remove(user);
  }
}
