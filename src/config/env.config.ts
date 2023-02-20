export const EnvConfiguration=()=>{
    return {
        environment: process.env.NODE_ENV || 'dev',
        mongodb: process.env.MONGODB,
        port: process.env.PORT||3001,
        //*Como los datos por defecto de las variables de entorno se configuran antes por medio del Joi, los datos de numeros se cargan como strings. para tratarlo como numerico hay que anteponer el +
        defaultLimit: +process.env.DEFAULT_LIMIT||7
    }
}