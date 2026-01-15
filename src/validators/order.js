import joi from 'joi'

export const orderSchema = joi.object({
    description: joi.string().required(),
    // amount: joi.number().required(),
    quantity: joi.number().required(),
    address: joi.string().required()
})
// export const paymentSchema = joi.object({
//     name: joi.string().required(),
//     amount: joi.number().required(),
//     quantity: joi.number().required(),
//     address: joi.string().required()
// })