import { Module } from '@nestjs/common';
import { EmailSendController } from './email-send.controller';
import { EmailSendService } from './email-send.service';
import { MongooseModule } from '@nestjs/mongoose';
import {Request, RequestSchema} from '../request/schemas/request.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Request.name, schema: RequestSchema }])],
  controllers: [EmailSendController],
  providers: [EmailSendService],
})
export class EmailSendModule {}
