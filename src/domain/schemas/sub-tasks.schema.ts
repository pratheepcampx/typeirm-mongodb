import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TaskList } from './task-list.schema';

export class SubTask extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({})
  taskListId: TaskList;
}

export const SubTaskSchema = SchemaFactory.createForClass(SubTask);
