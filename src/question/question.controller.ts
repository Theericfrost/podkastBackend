import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { Response } from 'express';
import { QuestionDto } from './dto/question.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ViewAuthFilter } from 'src/auth/jwt-catch.guard';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @Get()
  getAllQuestions(@Res() res: Response) {
    this.questionService.getAllQuestions(res);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseFilters(ViewAuthFilter)
  createQuestion(@Body() body: QuestionDto, @Res() res: Response) {
    this.questionService.createQuestion(body, res);
  }
}
