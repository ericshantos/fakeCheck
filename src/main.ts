import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { READER } from '@shared/providers/tokens';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = app.get(ConfigService);

  const port = config.get<number>('app.port');
  const swagger = config.get('swagger');

  const swaggerConfig = (await swagger(app.get(READER))).build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port ?? 3000, () => {
    console.log(`🚀 FakeCheck_API[${config.get<string>('app.env')}] running on port ${port}`);
  });
}
bootstrap();