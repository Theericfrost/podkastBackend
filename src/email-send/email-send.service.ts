import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, RequestDocument } from '../request/schemas/request.schema';
import { Model } from 'mongoose';
import { Response } from 'express';

const fs = require('fs');
const nodemailer = require('nodemailer');

@Injectable()
export class EmailSendService {
  constructor(
    @InjectModel(Request.name) private readonly model: Model<RequestDocument>,
  ) {}

  async emailSender(subscribers: { email: string }[], res: Response) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    let emailHtml = '';
    try {
      const data = fs.readFileSync(
        __dirname.replace('/email-send', '') + '/assets/emails/newEpisod.html',
        'utf8',
      );
      emailHtml = data;
    } catch (err) {
      console.error(err);
    }

    subscribers.map((subscriber) => {
      const { email } = subscriber;
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `Вышла новая серия FrostCast`,
        html: emailHtml,
        attachments: [
          {
            filename: 'header_logo.png',
            path: `${__dirname}/../assets/images/header_logo.png`,
            cid: 'logo1', //same cid value as in the html img src
          },
        ],
      };
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.log(err);
          res.status(200).send({
            message: 'При отправке письма произошла ошибка',
            status: 400,
          });
        } else {
          res
            .status(200)
            .send({ message: 'Письма отправлены подписчикам', status: 200 });
        }
      });
    });
  }

  async sendMails(res: Response) {
    const subscribers = await this.model.find().exec();
    if (subscribers.length) {
      const subscribersOnlyEmail = subscribers.map((el) => ({
        email: el.email,
      }));
      this.emailSender(subscribersOnlyEmail, res);
    } else {
      res.status(404).send({ message: 'Подписчиков нет', status: 404 });
    }
  }
}
