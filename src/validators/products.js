import joi from 'joi'

export const addProductSchema = joi.object({
    description: joi.string().required(),
    unit: joi.number().required(),
    price: joi.number().required(),
    category: joi.string().required(),
    
    
})
export const deleteProductSchema = joi.object({
    category: joi.string().required(),
    description: joi.string().required(),
    
})
export const addProductUnitSchema = joi.object({
    category: joi.string().required(),
    description: joi.string().required(),
    unit: joi.number().required()
})
export const categorySchema = joi.object({
    
    description: joi.string().required(),
    
})
export const addCartSchema = joi.object({
    
    description: joi.string().required(),
    quantity: joi.number().required()
    
})