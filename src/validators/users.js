import joi from "joi";

export const userSchema = joi.object({

    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    phoneNumber: joi.string().required(),
    password: joi.string().required(),
    role:joi.string()
})

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})
export const UpdateRoleSchema = joi.object({
    email: joi.string().email().required(),
    phoneNumber: joi.string().required(),
    role: joi.string().required()
})
export const userReviewsSchema = joi.object({
    comment: joi.string().required()
})

export const idSchema = joi.object({
    
})



