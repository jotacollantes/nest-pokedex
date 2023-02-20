import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeInterface } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  //private readonly axios: AxiosInstance = axios;

  constructor(
    //*Inyectamos la dependencia del modelo o entidad con un decarador especifico de nest para mongoose
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    //*Inyectamos el adaptador de axios
    private readonly http: AxiosAdapter
  ) {}

  async executeSeed() {
    //*Borramos todos los registros
    await this.pokemonModel.deleteMany()

    // const { data } = await this.axios.get<PokeInterface>(
    //   'https://pokeapi.co/api/v2/pokemon?limit=650',
    // );

    const data = await this.http.get<PokeInterface>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );


    //*Podemos hacer la insercion masiva con un arreglo de promesas y luego ejecutar el await Promise.all o con insertMany. En este caso usamos insertMany
    //const arrayPromises:any=[]
    const arrayPokemones:{name:string,no:number}[]=[]
    for (const { name, url } of data.results) {
      const segments = url.split('/');
      const no: number = +segments[6];

      //console.log({ name, no });
      //* Create individuales  
      //await this.pokemonModel.create({name,no})

      //*Array de promesas
      //arrayPromises.push(this.pokemonModel.create({name,no}))

      //*Insert Many
      arrayPokemones.push({name,no})
    }
    //*Array de promesas
    //await Promise.all(arrayPromises)
    
    //*Insert Many
    await this.pokemonModel.insertMany(arrayPokemones)
    //return data.results;
    return 'Seed Executed'
  }
}