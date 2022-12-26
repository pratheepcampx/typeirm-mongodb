import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document, SchemaTypes, Types } from 'mongoose';
import { SubTask } from './sub-tasks.schema';

@Schema({ collection: 'tasklists', timestamps: true })
export class TaskList extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({})
  completed: boolean;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SubTask' })
  subTasks: SubTask[];

  @Prop({ default: Date.now() })
  updatedAt: Date;

  @Prop({ default: 0 })
  priority: number;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;
}

export const TaskListSchema = SchemaFactory.createForClass(TaskList);
