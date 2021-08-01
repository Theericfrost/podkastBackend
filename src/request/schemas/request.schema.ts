import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RequestDocument = Request & Document;

@Schema()
export class Request {
  @Prop()
  email: string;
}

export const RequestSchema = SchemaFactory.createForClass(Request);