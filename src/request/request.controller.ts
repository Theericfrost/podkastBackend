import { Controller, Post, Body, Res } from '@nestjs/common';
import { RequestService } from './request.service';
import { Response } from 'express';
import { RequestDto } from './dto/request.dto';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  getRequest(@Body() body: RequestDto, @Res() res: Response) {
    this.requestService.getRequest(body, res);
  }
}
