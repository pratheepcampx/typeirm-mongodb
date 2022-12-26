import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
  @Post(':id/subtask')
  async createSubTask(@Param('id') id: string, @Body() body: SubTaskDto) {
    return await this.service.createSubTask(body, id);
  }
  @Get()
  async getTask() {
    return this.service.getTasks();
  }
  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    return this.service.getTasksById(id);
  }
  @Get(':id/subtasks')
  async getSubTasks(@Param('id') id: string) {
    return this.service.getSubTasksByTask(id);
  }

  @Delete(':id/deletetask')
  async deleteById(@Param('id') id: string) {
    return this.service.deleteTaskById(id);
  }
}
