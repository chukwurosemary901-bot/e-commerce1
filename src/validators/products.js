import joi from 'joi'

export const addProductSchema = joi.object({
    name: joi.string().required(),
    quantity: joi.number().required(),
    price: joi.number().required(),
    categoryID: joi.string().required(),
    description: joi.string().required()
    
    
})
export const deleteProductSchema = joi.object({
    categoryID: joi.string().required(),
    productID: joi.string().required(),
    
})
export const addProductUnitSchema = joi.object({
    categoryID: joi.string().required(),
    productID: joi.string().required(),
    quantity: joi.number().required()
})
export const categorySchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    
})
export const addCartSchema = joi.object({
    
    productID: joi.string().required(),
    quantity: joi.number().required()
    
})