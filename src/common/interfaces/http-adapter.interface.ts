export interface HttpAdapter {
    //*Las clases que implementan el HttpAdapter deben de tener el metodo get<T> que retornara una Promise<T>
    get<T>(url:string):Promise<T>
}