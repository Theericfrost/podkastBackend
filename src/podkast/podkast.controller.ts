import { Body, Controller, Get, Post, Res, Param, Query } from '@nestjs/common';
import { PodkastService } from './podkast.service';
import { Response } from 'express';
import { PodkastDto } from './dto/podkast.dto';

@Controller('podkasts')
export class PodkastController {
  constructor(private readonly podkastService: PodkastService) {}
  @Get()
  getPodkasts(@Res() res: Response) {
    this.podkastService.getPodkasts(res);
  }

  @Get('pagination')
  getPodkastPagination(@Query() query, @Res() res: Response){
    this.podkastService.getPodkastPagination(query, res)
  }

  @Get(':id')
  getPodkastById(@Param('id') id: string, @Res() res: Response) {
    this.podkastService.getPodkastById(id, res);
  }

  @Post()
  createPodkast(@Body() body: PodkastDto, @Res() res: Response) {
    this.podkastService.createPodkast(body, res);
  }
}
