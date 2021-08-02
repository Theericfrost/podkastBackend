import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RequestModule } from './request/request.module';
import { EmailSendModule } from './email-send/email-send.module';
import { EmailGenerateModule } from './email-generate/email-generate.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.BD),
    RequestModule,
    EmailSendModule,
    EmailGenerateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
