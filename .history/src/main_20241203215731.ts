import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  const logger = new Logger('PAYMENTS-MS ACTIVATED')
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  logger.log(``)
}
bootstrap();
