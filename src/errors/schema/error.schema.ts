import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ErrorDocument = Error & Document;

@Schema()
export class Error {
  @Prop()
  error: string;

  @Prop()
  createdAt: string;
}

export const ErrorSchema = SchemaFactory.createForClass(Error);
