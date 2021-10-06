import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from './schema/article.schema';
import { Model } from 'mongoose';
import { ArticleDto } from './dto/article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private readonly model: Model<ArticleDocument>,
  ) {}

  async getArticles(response: Response) {
    await this.model
      .find()
      .select('-__v')
      .exec()
      .then(
        (res) => {
          if (res) {
            response.status(200).send({
              status: 200,
              data: res,
            });
          }
        },
        (err) => {
          if (err) {
            response
              .status(400)
              .send({ status: 400, message: 'Ошибка при получении статей' });
          }
        },
      );
  }

  async getArticleById(id: string, response: Response) {
    return await this.model
      .findById(id)
      .select('-__v')
      .select('-_id')
      .exec()
      .then(
        (res) => {
          if (res) {
            response.status(200).send({ status: 200, data: res });
          }
        },
        (err) => {
          if (err) {
            response
              .status(400)
              .send({ status: 400, message: 'Статья не найдена' });
          }
        },
      );
  }

  async addArticle(body: ArticleDto, response: Response) {
    return await new this.model({
      ...body,
      createdAt: new Date(),
    })
      .save()
      .then(
        (res) => {
          if (res) {
            response
              .status(200)
              .send({ status: 200, message: 'Статья сохранена' });
          }
        },
        (err) => {
          if (err) {
            response
              .status(400)
              .send({ status: 400, message: 'Статья не сохранена' });
          }
        },
      );
  }
}
