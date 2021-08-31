import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RequestModule } from './request/request.module';
import { EmailSendModule } from './email-send/email-send.module';
import { EmailGenerateModule } from './email-generate/email-generate.module';
import { CalendarModule } from './calendar/calendar.module';
import { PodkastModule } from './podkast/podkast.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { QuestionModule } from './question/question.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.BD),
    RequestModule,
    EmailSendModule,
    EmailGenerateModule,
    CalendarModule,
    PodkastModule,
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
