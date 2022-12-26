import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaType, SchemaTypes } from 'mongoose';
import { TaskList } from './task-list.schema';

export class SubTask extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({})
  taskListId: string;
}

export const SubTaskSchema = SchemaFactory.createForClass(SubTask);
