import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports:[
    MongooseModule.forFeature([{
      //*El name es una propiedad del document
      name: Pokemon.name,
      schema: PokemonSchema
    }])
  ],
  //*Exportamos el mongooseModule para que el servicio en el modulo seed lo pueda usar
  exports:[MongooseModule]

})
export class PokemonModule {}
