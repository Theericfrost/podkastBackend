import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarDto } from './dto/calendar.dto';
import { Response } from 'express';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  getDates(@Res() res: Response) {
    this.calendarService.getDates(res);
  }

  @Post()
  createDate(@Body() body: CalendarDto, @Res() res: Response) {
    this.calendarService.createDate(body, res);
  }
}
