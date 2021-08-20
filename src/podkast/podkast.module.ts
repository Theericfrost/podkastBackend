import { Module } from '@nestjs/common';
import { PodkastController } from './podkast.controller';
import { PodkastService } from './podkast.service';
import { Podkast, PodkastSchema } from './schema/podkast.shema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [PodkastController],
  providers: [PodkastService],
  imports: [
    MongooseModule.forFeature([{ name: Podkast.name, schema: PodkastSchema }]),
  ],
})
export class PodkastModule {}
