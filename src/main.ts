import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
  .setTitle('JWT-Demo')
  .setDescription('Create demo JWT Auth')
  .setVersion('1.0')
  .build()  

  const document = SwaggerModule.createDocument(app, swaggerConfig);;
  SwaggerModule.setup('api',app,document);

  await app.listen(3000);
}
bootstrap();