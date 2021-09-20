import { Controller, Get, Session, Res, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Render } from '@nestjs/common';
import { Response, Request } from 'express';
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
    if (session.token) {
      const data = {
        title: 'Личный кабинет',
        token: session.token,
        reset: () => {
          session.token = null;
        },
      };
      return data;
    } else {
      res.status(301).redirect('/');
    }
  }

  @Get('/dashboard/question')
  @Render('question')
  question(@Session() session: { token?: string }) {
    const data = {
      token: session.token,
      reset: () => {
        session.token = null;
      },
    };
    return data;
  }

  @Get('/dashboard/send-emails')
  @Render('send-email')
  sendEmails(@Session() session: { token?: string }) {
    const data = {
      token: session.token,
      reset: function () {
        console.log('hui');
        session.token = null;
      },
    };
    return data;
  }

  @Get('/dashboard/request')
  @Render('request')
  request(@Session() session: { token?: string }) {
    const data = {
      token: session.token,
      reset: () => {
        session.token = null;
      },
    };
    return data;
  }

  @Get('/dashboard/calendar')
  @Render('calendar')
  calendar(@Session() session: { token?: string }) {
    const data = {
      token: session.token,
      reset: () => {
        session.token = null;
      },
    };
    return data;
  }

  @Get('/dashboard/exit')
  exit(@Req() req: Request, @Res() res: Response) {
    req.session.destroy((err) => {console.log(err)});
    res.status(301).redirect('/');
  }
}
