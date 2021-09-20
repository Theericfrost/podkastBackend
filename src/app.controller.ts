import { Controller, Get, Session, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Render } from '@nestjs/common';
import { Response } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @Render('index')
  index() {
    const data = {
      title: 'Войти',
    };
    return data;
  }

  @Get('/dashboard')
  @Render('desktop')
  desktop(@Session() session: { token?: string }, @Res() res: Response) {
    console.log(session.token, 'dashboard')
    if (session.token) {
      const data = {
        title: 'Личный кабинет',
      };
      return data;
    } else {
      res.status(301).redirect('/');
    }
  }

  @Get('/dashboard/question')
  @Render('question')
  question(@Session() session: { token?: string }) {
    const data = { token: session.token || 'hui'};
    return data;
  }
}
