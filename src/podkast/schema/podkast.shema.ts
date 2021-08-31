import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PodkastDocument = Podkast & Document;
@Schema()
export class Podkast {
  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop()
  pathAudio: string;

  @Prop()
  pathImg: string;

  @Prop()
  createdAt: string;

  @Prop()
  time: number;
}

export const PodkastSchema = SchemaFactory.createForClass(Podkast);
