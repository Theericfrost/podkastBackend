import { Module } from '@nestjs/common';
import { EmailGenerateController } from './email-generate.controller';
import { EmailGenerateService } from './email-generate.service';

@Module({
  controllers: [EmailGenerateController],
  providers: [EmailGenerateService],
  exports: [EmailGenerateService],
})
export class EmailGenerateModule {}
