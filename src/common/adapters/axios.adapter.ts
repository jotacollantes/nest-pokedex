import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";

//*Para poder implementar este adaptador hay que especificar el decorador @Injectable.
@Injectable()
export class AxiosAdapter implements HttpAdapter{

    private axios: AxiosInstance = axios;

   //* La clase debe de cumplir con la implementacion de HttpAdapter o sea debe de tener el metodo get que retorna una Promise definido en la interfaz  
   async get<T>(url: string): Promise<T> {
        try {
            //*Desestructuramos la response
            //const res = await this.axios.get<T>(url);
            const { data } = await this.axios.get<T>(url);
            return data;
        } catch (error) {
            throw new  Error ('Check errors in logs.')
        }
    }

}