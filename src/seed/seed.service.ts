import { Injectable } from '@nestjs/common';
import axios,{ AxiosInstance } from 'axios';
import { PokeInterface } from './interfaces/poke-response.interface';



@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance= axios
  async executeSeed(){
    const {data}= await this.axios.get<PokeInterface>('https://pokeapi.co/api/v2/pokemon?limit=10')

    for (const {name,url} of data.results) {
      
      const segments=url.split('/')
      const no:number=+segments[6]

      console.log({name,no})

    }
    return data.results;
  }
}



