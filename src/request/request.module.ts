import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { MongooseModule } from '@nestjs/mongoose';
import {Request, RequestSchema} from './schemas/request.schema'

@Module({
  providers: [RequestService],
  controllers: [RequestController],
  imports: [
    MongooseModule.forFeature([{ name: Request.name, schema: RequestSchema }]),
  ]
})
export class RequestModule {}
