import { Injectable } from '@nestjs/common';
import { Question, QuestionDocument } from './schema/question.shema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { QuestionDto } from './dto/question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private readonly model: Model<QuestionDocument>,
  ) {}

  async getAllQuestions(res: Response) {
    const questions = await this.model.find().exec();
    if (questions.length) {
      res.status(200).send({ status: 200, data: questions });
    } else {
      res.status(400).send({ status: 400, message: 'Подкасты не найдены' });
    }
  }

  async createQuestion(question: QuestionDto, response: Response) {
    return await new this.model({
      ...question,
    })
      .save()
      .then(
        (res) => {
          if (res) {
            response
              .status(200)
              .send({ status: 200, message: 'Вопрос сохранен' });
          }
        },
        (err) => {
          if (err) {
            response
              .status(400)
              .send({ status: 400, message: 'Вопрос не сохранен' });
          }
        },
      );
  }
}
