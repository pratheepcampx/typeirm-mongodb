import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SubTaskDto } from './dtos/subtask.dto';
import { TaskListDto } from './dtos/tasklist.dto';
import { TasksService } from './tasks.service';

@Controller('tasklist')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Post()
  async createTask(@Body() body: TaskListDto) {
    const message = await this.service.createTask(body);
    return message;
  }
  @Post(':id')
  async createSubTask(@Param('id') id: string, @Body() body: SubTaskDto) {
    const message = await this.service.createSubTask(body, id);
    return message;
  }
  @Get()
  async getTask() {
    return this.service.getTasks();
  }
  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    return this.service.getTasksById(id);
  }
  @Get('/subtasks')
  async getSubTask() {
    return this.service.getSubTasks();
  }
}
