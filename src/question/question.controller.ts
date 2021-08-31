import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Response } from 'express';
import { QuestionDto } from './dto/question.dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @Get()
  getAllQuestions(@Res() res: Response) {
    this.questionService.getAllQuestions(res);
  }
  @Post()
  createQuestion(@Body() body: QuestionDto, @Res() res: Response) {
    this.questionService.createQuestion(body, res);
  }
}
