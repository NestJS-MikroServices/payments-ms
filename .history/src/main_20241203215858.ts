import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@ne'

async function bootstrap() {

  const logger = new Logger('PAYMENTS-MS ACTIVATED')
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  logger.log(`PAYMENTS MICROSERVICE RUNNING ON PORT ${envs.port}`)
}
bootstrap();