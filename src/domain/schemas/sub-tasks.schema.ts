import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, SchemaType, SchemaTypes } from 'mongoose';

export const subTaskCollection = 'sub_tasks';

@Schema({ collection: subTaskCollection, timestamps: true })
export class SubTask extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({})
  taskListId: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const SubTaskSchema = SchemaFactory.createForClass(SubTask);
