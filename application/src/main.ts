
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import * as express from 'express';
import fs = require('graceful-fs')

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  var bodyParser = require('body-parser');
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "500mb", extended: true, parameterLimit: 50000 }));
  await app.listen(process.env.PORT_SERVER);

}
bootstrap();
