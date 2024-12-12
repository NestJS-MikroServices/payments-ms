import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from "@nestjs/common";
import { envs } from './config';

async function bootstrap() {

  const logger = new Logger('PAYMENTS-MS ACTIVATED')
  const app = await NestFactory.create(AppModule, {
    rawBody: true
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  await app.listen(envs.port);
  logger.log(`PAYMENTS MICROSERVICE RUNNING ON PORT ${envs.port}`)

}
bootstrap();