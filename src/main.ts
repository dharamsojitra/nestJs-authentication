import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // use cookie for auth
  app.use(cookieParser());
  app.enableCors({ origin: "http://locahost:3000", credentials: true });

  // swagger api req
  const swaggerConfig = new DocumentBuilder()
    .setTitle("JWT-Demo")
    .setDescription("Create demo JWT Auth")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document);

  // http port
  await app.listen(3000);
}

bootstrap();