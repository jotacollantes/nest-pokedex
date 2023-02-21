export const EnvConfiguration=()=>{
    return {
        environment: process.env.NODE_ENV || 'dev',
        mongodb: process.env.MONGODB,
        port: process.env.PORT||3002,
        //*Como los datos por defecto de las variables de entorno se configuran antes por medio del Joi, los datos de numeros se cargan como strings. para tratarlo como numerico hay que anteponer el +. Como a la variable de entorno defaultLimit ya se le establecio el valor en joiValidationSchema no se toma el cuenta el valor por defecto en caso de no estar definido en la variable de entorno en este caso 7 
        defaultLimit: +process.env.DEFAULT_LIMIT||7
    }
}