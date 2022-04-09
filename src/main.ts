import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server');

  const port = serverConfig.port;

  await app.listen(port);
  Logger.log(
    `Node.js 기반 Nese.js의 Back-End Server가 ${port}번으로 실행 되었습니다!`,
  );
}
bootstrap();
