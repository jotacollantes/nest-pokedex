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
  ]

})
export class PokemonModule {}
