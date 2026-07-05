import joi from "joi";

export const otpSchema = joi.object({
    email: joi.string().required(),
    subject: joi.string().required() ,
    message: joi.string().required(),
})