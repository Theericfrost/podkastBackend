import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Calendar, CalendarDocument } from './schemas/calendar.schema';
import { Model } from 'mongoose';
import { CalendarDto } from './dto/calendar.dto';
import { Response } from 'express';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Calendar.name) private readonly model: Model<CalendarDocument>,
  ) {}

  async getDates(response: Response) {
    return await this.model
      .find()
      .select('-__v')
      .select('-_id')
      .exec()
      .then(
        (res) => {
          if (res) {
            response.status(200).send({
              status: 200,
              data: res,
            });
          }
        },
        (err) => {
          if (err) {
            response
              .status(400)
              .send({ status: 400, message: 'Ошибка при получении дат' });
          }
        },
      );
  }
  async createDate(date: CalendarDto, response: Response) {
    return await new this.model({
      ...date,
    })
      .save()
      .then(
        (res) => {
          if (res) {
            response
              .status(200)
              .send({ status: 200, message: 'Дата сохранена' });
          }
        },
        (err) => {
          if (err) {
            response
              .status(400)
              .send({ status: 400, message: 'Дата не сохранена' });
          }
        },
      );
  }
}
