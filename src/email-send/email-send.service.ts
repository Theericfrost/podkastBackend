import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, RequestDocument } from '../request/schemas/request.schema';
import { Model } from 'mongoose';
import { Response } from 'express';
import { EmailGenerateService } from 'src/email-generate/email-generate.service';

@Injectable()
export class EmailSendService {
  constructor(
    private emailGenerateService: EmailGenerateService,
    @InjectModel(Request.name) private readonly model: Model<RequestDocument>,
  ) {}

  async sendMails(res: Response) {
    const subscribers = await this.model.find().exec();
    if (subscribers.length) {
      const subscribersOnlyEmail = subscribers.map((el) => ({
        email: el.email,
      }));
      const answer =
        this.emailGenerateService.emailSender(subscribersOnlyEmail);
      if (answer) {
        res
          .status(200)
          .send({ message: 'Письма отправлены подписчикам', status: 200 });
      } else {
        res.status(200).send({
          message: 'При отправке письма произошла ошибка',
          status: 400,
        });
      }
    } else {
      res.status(404).send({ message: 'Подписчиков нет', status: 404 });
    }
  }
}
