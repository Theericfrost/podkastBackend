import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { createTransport } from 'nodemailer';

@Injectable()
export class EmailGenerateService {
  async emailSender(subscribers: { email: string }[]) {
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    let emailHtml = '';
    try {
      const data = readFileSync(
        __dirname.replace('/email-generate', '') +
          '/assets/emails/newEpisod.html',
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
            cid: 'logo1',
          },
        ],
      };
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          return false;
        } else {
          return true;
        }
      });
    });
  }
}
