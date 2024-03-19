import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerRunner } from './shared/swagger/swagger-runner';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/auth');

  app.use(
    helmet({
      xPoweredBy: false,
    }),
  );
  app.use(helmet.hidePoweredBy());
  app.enableCors();
  new SwaggerRunner(app).run();
  await app.listen(3000);
}
bootstrap();
