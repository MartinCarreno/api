import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
 const app = await NestFactory.create(AppModule, { cors: true });
 app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true
  }));
 app.enableCors({
 origin: 'http://localhost:5173',
 credentials: true,
 });

 const config = new DocumentBuilder()
 .setTitle('Comandas API')
 .setDescription('CRUD de productos')
 .setVersion('1.0')
 .addBearerAuth()
 .build();
 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api/docs', app, document);
 
 await app.listen(3000);
}
bootstrap();