import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Render } from '@nestjs/common';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @Render('index')
  index() {
    const data = {
      articles: [
        {
          id: 1,
          title: 'The first one',
          content: 'Lorem ipsum ....',
        },
        {
          id: 2,
          title: 'The second one',
          content: 'Lorem ipsum ....',
        },
      ],
      title: 'hui'
    };
    return data;
  }
}
