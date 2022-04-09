import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 8080;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  Logger.log(
    `Node.js 기반 Nese.js의 Back-End Server가 ${port}번으로 실행 되었습니다!`,
  );
}
bootstrap();
