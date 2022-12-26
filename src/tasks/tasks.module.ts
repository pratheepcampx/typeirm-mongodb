import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubTask, SubTaskSchema } from 'src/domain/schemas/sub-tasks.schema';
import { TaskList, TaskListSchema } from 'src/domain/schemas/task-list.schema';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskList.name, schema: TaskListSchema },
    ]),
    MongooseModule.forFeature([{ name: SubTask.name, schema: SubTaskSchema }]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
