import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Podkast, PodkastDocument } from './schema/podkast.shema';
import { Model } from 'mongoose';
import { PodkastDto } from './dto/podkast.dto';

@Injectable()
export class PodkastService {
  constructor(
    @InjectModel(Podkast.name) private readonly model: Model<PodkastDocument>,
  ) {}

  async getPodkasts(res: Response) {
    const podkasts = await this.model.find().exec();
    if (podkasts.length) {
      res.status(200).send({ status: 200, data: podkasts });
    } else {
      res.status(200).send({ status: 400, message: 'Подкасты не найдены' });
    }
  }

  async getPodkastsLength(){
    const podkasts = await this.model.find().exec();
    console.log(podkasts.length)
    return podkasts.length;
  }

  async getPodkastPagination(query, response: Response) {
    const {limit, page} = query;
    const podkastsAmount = await this.getPodkastsLength()
   await this.model.find().skip(Number(page*limit)).limit(Number(limit)).exec().then(
    (res) => {
      if (res) {
        response.status(200).send({ status: 200, data: res, total: podkastsAmount });
      }
    },
    (err) => {
      if (err) {
        response.send({ status: 400, message: 'Подкасты не найден' });
      }
    },
  );
  }


  async getPodkastById(id: string, response: Response) {
    await this.model
      .findById(id)
      .exec()
      .then(
        (res) => {
          if (res) {
            response.status(200).send({ status: 200, data: res });
          }
        },
        (err) => {
          if (err) {
            response.send({ status: 400, message: 'Подкаст не найден' });
          }
        },
      );
  }

  async createPodkast(body: PodkastDto, response: Response) {
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
              .send({ status: 200, message: 'Подкаст сохранен' });
          }
        },
        (err) => {
          if (err) {
            response
              .status(400)
              .send({ status: 400, message: 'Подкаст не сохранен' });
          }
        },
      );
  }
}
