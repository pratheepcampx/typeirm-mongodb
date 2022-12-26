import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SubTask,
  subTaskCollection,
} from 'src/domain/schemas/sub-tasks.schema';
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
    return await this.TaskModel.findById(id);
  }
  async createSubTask(body: SubTaskDto, id: string) {
    const sTask = new this.SubTaskModel();
    sTask.title = body.title;
    sTask.description = body.description;
    sTask.taskListId = id;
    console.log(sTask);
    const result = await sTask.save();

    return result;
  }

  async getTasks() {
    const res = await this.TaskModel.aggregate([
      {
        $lookup: {
          from: subTaskCollection,
          localField: '_id',
          foreignField: 'taskListId',
          as: 'SubTasks',
        },
      },
    ]);

    return res;
  }
  async getSubTasksByTask(id: String) {
    const subtasks = await this.SubTaskModel.findOne({ taskListId: id });

    return subtasks;
  }

  async deleteTaskById(id: String) {
    const task = this.TaskModel.findById(id);
    const res = await this.TaskModel.remove(task);

    return res;
  }
}
