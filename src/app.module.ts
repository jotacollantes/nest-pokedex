import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    //* ConfigModule.forRoot() SIempre se tiene que poner primero para que se configuren las variables de entorno.
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      //*JoiValidation establece las validaciones y los valores por defecto de las variables de entorno
      validationSchema:JoiValidationSchema
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'), 
    }),MongooseModule.forRoot(process.env.MONGODB),
    PokemonModule,
    CommonModule,
    SeedModule 
  ],
})
export class AppModule {
  constructor()
  {
    //console.log(process.env)
  }
}
