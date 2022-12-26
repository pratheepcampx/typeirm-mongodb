import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubTask } from 'src/domain/schemas/sub-tasks.schema';
import { TaskList } from 'src/domain/schemas/task-list.schema';
import { SubTaskDto } from './dtos/subtask.dto';
import { TaskListDto } from './dtos/tasklist.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(TaskList.name) private readonly TaskModel: Model<TaskList>,
    @InjectModel(SubTask.name) private readonly SubTaskModel: Model<SubTask>,
  ) {}

  async createTask(body: TaskListDto) {
    const task = new this.TaskModel();
    task.title = body.title;
    task.description = body.description;
    task.priority = body.priority;
    const result = await task.save();

    return result;
  }
  async getTasksById(id: string) {
    return await this.SubTaskModel.findById(id);
  }
  async createSubTask(body: SubTaskDto, id: string) {
    const subTask = new this.SubTaskModel(body);
    subTask.taskListId = id;
    return subTask.save();
  }

  async getTasks() {
    const tasks = await this.TaskModel.find();
    return tasks;
  }
  async getSubTasksByTask(id: String) {
    const res = await this.TaskModel.aggregate([
      {
        $lookup: {
          from: 'SubTaskModel',
          localField: '_id',
          foreignField: 'taskListId',
          as: 'SubTasks',
        },
      },
    ]);

    return res;
  }
}
