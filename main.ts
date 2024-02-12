import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './logger.middleware';
import { HttpExceptionFilter } from './http-exception.filter';
import { SuccessInterceptor } from './success.interceptor';
import { ErrorsInterceptor } from './error.interceptor';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new LoggerMiddleware().use);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new SuccessInterceptor(), new ErrorsInterceptor());
  await app.listen(3065);
}
bootstrap();
