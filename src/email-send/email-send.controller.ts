import { Controller, Post, Res, UseGuards, UseFilters } from '@nestjs/common';
import { EmailSendService } from './email-send.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ViewAuthFilter } from 'src/auth/jwt-catch.guard';

@Controller('email-send')
export class EmailSendController {
  constructor(private readonly emaildSendService: EmailSendService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseFilters(ViewAuthFilter)
  sendMails(@Res() res: Response) {
    this.emaildSendService.sendMails(res);
  }
}
