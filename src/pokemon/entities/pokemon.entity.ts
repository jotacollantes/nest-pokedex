import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema()
export class Pokemon extends Document{
    //id: string // MOngo me lo da

    @Prop({
        unique: true,
        index: true
    })

    //* Numero del Pokemon
    no: number;

    @Prop({
        unique: true,
        index: true
    })

    //*Nombre del Pokemon
    name: string;
    
}
export const PokemonSchema=SchemaFactory.createForClass(Pokemon)