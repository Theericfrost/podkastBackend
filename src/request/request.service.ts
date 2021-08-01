import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from 'express';
import { RequestDto } from './dto/request.dto';
import { Request, RequestDocument } from './schemas/request.schema';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request.name) private readonly model: Model<RequestDocument>,
  ) {}

  async findByEmail(email: string) {
    let answer = null;
    await this.model.findOne({ email: email }).then(function (doc) {
      answer = doc;
    });
    return answer;
  }

  async getRequest(body: RequestDto, res: Response) {
    const { email } = body;
    if (email) {
      if (await this.findByEmail(email)) {
        res
          .status(406)
          .send({ status: 406, message: 'Подписка на email уже существует' });
      } else {
        res.status(200).send({ status: 200, message: 'Запрос успешен' });
        return await new this.model({
          ...body,
          createdAt: new Date(),
        }).save();
      }
    } else {
      res.status(400).send({ status: 400, message: 'Что то пошло не так' });
    }
  }
}
