import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Blog } from './domain/entities/blog.entity';
import { User } from './domain/entities/user.entity';
import { UserModule } from './user/user.module';
import { PersonalDetails } from './domain/entities/personalDetails.entity';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Ksai@+-2818',
      database: 'sample_user_database',
      entities: [User, PersonalDetails, Blog],
      synchronize: true,
      logging: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://feuser:Ksai2818@cluster0.8qlg2oa.mongodb.net/sample?retryWrites=true&w=majority',
    ),
    UserModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
