import * as Joi  from 'joi'

export const JoiValidationSchema=Joi.object({
    PORT:Joi.number().default(3001),         
    DEFAULT_LIMIT:Joi.number().default(6),
    MONGODB: Joi.required()      
})

