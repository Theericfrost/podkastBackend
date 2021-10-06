import { Controller, Res, Post, Body } from '@nestjs/common';
import { Response } from 'express';
import { ErrorDto } from './dto/error.dto';
import { ErrorsService } from './errors.service';

@Controller('errors')
export class ErrorsController {
  constructor(private readonly errorService: ErrorsService) {}

  @Post()
  addError(@Body() body: ErrorDto, @Res() res: Response) {
    this.errorService.addError(body, res);
  }
}
