import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarDto } from './dto/calendar.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ViewAuthFilter } from 'src/auth/jwt-catch.guard';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  getDates(@Res() res: Response) {
    this.calendarService.getDates(res);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseFilters(ViewAuthFilter)
  createDate(@Body() body: CalendarDto, @Res() res: Response) {
    this.calendarService.createDate(body, res);
  }
}
