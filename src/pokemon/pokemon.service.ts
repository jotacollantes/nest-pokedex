import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  private defaultLimit:number
  constructor(
    //*Inyectamos la dependencia del modelo o entidad con un decarador especifico de nest para mongoose
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    //*Inyectamos el config service qure tiene las variables de entorno.
    private readonly configService: ConfigService

  ) {
    //console.log(process.env.DEFAULT_LIMIT)
    this.defaultLimit=configService.get<number>('defaultLimit')
    //console.log({this.defaultLimit})
  }

  

  async findAll(paginationDto:PaginationDto) {
    //return `This action returns all pokemon`;
    const {limit=this.defaultLimit,offset}=paginationDto
    return await this.pokemonModel.find().
    limit(limit).
    skip(offset).
    //*Ordenamos por el campo no de forma asc
    sort({no : 1}).
    select('-__v');
  }

  async findOne(term: string) {
    //return `This action returns a #${id} pokemon`;

    let pokemon: Pokemon; // De tipo entity

    //* Busco por el campo no:
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    //* SI no encuentro el pokemon Buscar por Mongo ID
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }
    //* SI no encuentro el pokemon Buscar por Name

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term });
    }

    //* En este punto el pokemon no existe
    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with no,name or id ${term} not found`,
      );

    return pokemon;
  }

  async create(createPokemonDto: CreatePokemonDto) {
    //return 'This action adds a new pokemon';
    //console.log('entro al create',createPokemonDto)
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      //console.log(error)
      this.handlerExceptions(error)
    }
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    //*llamamos al metodo de esta misma clase this.findOne que nos devuelve un modelo
    const pokemon = await this.findOne(term);
    //* En caso de que  venga el name porque como UpdatePokemonDto es un extends del documento, los campos vienen como opcionales
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto);
      //*Propago el pokemon que es de tipo objeto recuperado de la busqueda en el findOne y sobre escribo sus datos con ...updatePokemonDto
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      
      this.handlerExceptions(error)
    }
  }

  async remove(id: string) {

    const pokemon = await this.findOne(id)
    // //* Si encuentro un pokemon obtengo una instancia del pokemon y puedo usar el metodo deleteOne para eliminarlo
    await pokemon.deleteOne()
    return pokemon

    //* Hay otra manera de eliminar que es directa sin necesidad de hacer la busqueda en la base de datos:
    // const {deletedCount} = await this.pokemonModel.deleteOne({_id:id})

    // if(deletedCount===0) throw new BadRequestException(`Pokemon with id ${id} not found`)
    // return;
    
  }

  private handlerExceptions=(error:any)=>{
    //console.log(error)
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon existe ${JSON.stringify(error.keyValue)}`,
      );
    }
    //* En este punto es otro error que hay que controlar.
    throw new InternalServerErrorException(`No se pudo crear el pokemon`);
  }
}
