import { BadRequestException, Injectable } from '@nestjs/common';
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

    const Subtasks = await this.SubTaskModel.findById(task.id);
    if (Subtasks != null) {
      task.subTasks.push(Subtasks);
    }
    const result = await task.save();

    return result;
  }
  async getTasksById(id: string) {
    return await this.SubTaskModel.findById(id);
  }
  async createSubTask(body: SubTaskDto, id: string) {
    const task = await this.TaskModel.findById(id);
    if (!task) {
      throw new BadRequestException('Task Not Exist');
    }
    const subtask = new this.SubTaskModel();

    return subtask.save();
  }

  async getTasks() {
    const tasks = await this.TaskModel.find();
    return tasks;
  }
  async getSubTasks() {
    const tasks = await this.SubTaskModel.find();
    return tasks;
  }
}
