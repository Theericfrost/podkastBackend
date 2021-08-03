import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CalendarDocument = Request & Document;
@Schema()
export class Calendar {
  @Prop()
  end: string;

  @Prop()
  start: string;

  @Prop()
  name: string;

  @Prop()
  type: string;
}

export const CalendarSchema = SchemaFactory.createForClass(Calendar);
