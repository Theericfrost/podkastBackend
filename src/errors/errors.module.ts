import { Module } from '@nestjs/common';
import { ErrorsController } from './errors.controller';
import { ErrorsService } from './errors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Error, ErrorSchema } from './schema/error.schema';

@Module({
  controllers: [ErrorsController],
  providers: [ErrorsService],
  imports: [
    MongooseModule.forFeature([{ name: Error.name, schema: ErrorSchema }]),
  ],
  exports: [ErrorsService],
})
export class ErrorsModule {}
