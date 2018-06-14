import * as env from 'dotenv';
import 'reflect-metadata';
import * as logger from 'morgan';
env.config();

import * as express from 'express';
import * as bodyParser from 'body-parser';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initDocumentation } from './documentation';

declare const module: any;

async function bootstrap() {
  const server = express();
  server.use(logger(process.env.NODE_ENV));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));

  const app = await NestFactory.create(AppModule);

  initDocumentation(app, {
    version: '1.0',
    description: 'Nest Js Boilerplate',
    title: 'Nest Js Boilerplate',
    endpoint: '/docs',
  });

  await app.listen(process.env.PORT || 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
