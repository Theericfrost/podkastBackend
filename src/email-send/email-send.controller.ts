import { Controller, Post, Res } from '@nestjs/common';
import { EmailSendService } from './email-send.service';
import { Response } from 'express';

@Controller('email-send')
export class EmailSendController {
  constructor(private readonly emaildSendService: EmailSendService) {}

  @Post()
  sendMails(@Res() res: Response) {
    this.emaildSendService.sendMails(res);
  }
}
