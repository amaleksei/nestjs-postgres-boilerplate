import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {ValidationPipe} from "./pipes/validation.pipe";

async function bootstrap() {
  const PORT = process.env.PORT || 4000
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('NestJS boilerplate')
      .setDescription('REST API documentation')
      .setVersion('1.0.0')
      .addTag('Tag')
      .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe())

  app.enableCors({
    allowedHeaders:"*",
    origin: "*"
  });

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
