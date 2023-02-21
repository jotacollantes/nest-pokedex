import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2')

  app.useGlobalPipes(  
    new ValidationPipe({ 
      whitelist: true, 
      forbidNonWhitelisted: true,
      //*Para que haga la transformacion de la informacion que fluya en los DTO
       transform:true,
       transformOptions:{enableImplicitConversion:true}
    }) 
  );

   //* como el Main no esta dentro de un building block, no tiene acceso a las variables de entorno provistas por el ConfigModule
  await app.listen(process.env.PORT);
  console.log(`Corriendo en el puerto ${process.env.PORT}`)
}
bootstrap();
