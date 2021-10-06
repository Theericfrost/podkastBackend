import { Injectable } from '@nestjs/common';
import { Error, ErrorDocument } from './schema/error.schema';
import { Model } from 'mongoose';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorDto } from './dto/error.dto';

@Injectable()
export class ErrorsService {
  constructor(
    @InjectModel(Error.name) private readonly model: Model<ErrorDocument>,
  ) {}

  async getErrors() {
    return await this.model.find().select('-__v').exec();
  }

  async addError(body: ErrorDto, response: Response) {
    return await new this.model({
      ...body,
      createdAt: new Date(),
    })
      .save()
      .then(
        (res) => {
          if (res) {
            response
              .status(200)
              .send({ status: 200, message: 'Сообщение сохранено' });
          }
        },
        (err) => {
          if (err) {
            response
              .status(400)
              .send({ status: 400, message: 'Сообщение не сохранено' });
          }
        },
      );
  }
}
