import { Module } from '@nestjs/common';
import { EmailSendController } from './email-send.controller';
import { EmailSendService } from './email-send.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailGenerateModule } from 'src/email-generate/email-generate.module';
import { Request, RequestSchema } from '../request/schemas/request.schema';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    EmailGenerateModule,
    MongooseModule.forFeature([{ name: Request.name, schema: RequestSchema }]),
    AuthModule,
  ],
  controllers: [EmailSendController],
  providers: [EmailSendService],
})
export class EmailSendModule {}
