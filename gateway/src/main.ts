import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@/app.module';
import { AppConfig, createSwaggerConfig } from '@/config';
import { JSON_READER } from '@shared/providers/tokens';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = await createSwaggerConfig(app.get(JSON_READER));
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(AppConfig.port);
  console.log(`🚀 ${AppConfig.appName} running on port ${AppConfig.port}`)
}
bootstrap();
