import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { Question, QuestionSchema } from './schema/question.shema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
})
export class QuestionModule {}
