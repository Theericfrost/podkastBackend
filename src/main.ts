import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const port = process.env.PORT || 3001;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setBaseViewsDir(join(__dirname, '../views'));
  app.setViewEngine('pug');
  await app.listen(port, () => console.log(`server start on ${port}`));
}
bootstrap();
