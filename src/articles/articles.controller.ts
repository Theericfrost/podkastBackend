import { Controller, Res, Get, Post, Body, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Response } from 'express';
import { ArticleDto } from './dto/article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  getArticles(@Res() res: Response) {
    this.articlesService.getArticles(res);
  }

  @Get(':id')
  getArticleById(@Param('id') id: string, @Res() res: Response) {
    this.articlesService.getArticleById(id, res);
  }

  @Post()
  addArticle(@Body() body: ArticleDto, @Res() res: Response) {
    this.articlesService.addArticle(body, res);
  }
}
