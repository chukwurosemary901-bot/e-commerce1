import { Cart } from "../models/cart.js"
import { User } from "../models/user.js"

export const findUserbyEmail = async (email) => {
   return await User.findOne({where: email})
}
export const getUsers = async () => {
    User.findAll(User)
}

export const signUpUser = async (value) => {
   return await User.create(value)
}
export const signUpUserCart = async (value) => {
   return await Cart.create(value)
}
export const userCart = async (value) => {
   return await Cart.findOne({where: value})
}
export const updateRole = async (attribute , value) => {
   return await User.update(attribute, {where: value})
}















// export const  users = [

//     {
//     id:1,
//     firstName:"Chukwu",
//     lastName:"Israel",
//     email:"chuk1@gmail.com",
//     phoneNumber:"09092002922",
//     password:"iehiehi",
//     role:"admin"
// },
//     {
//     "id":31,
//     firstName:"Chukwu",
//     lastName:"David",
//     email:"chuk12@gmail.com",
//     phoneNumber:"09092002922",
//     password:"iehiehi",
//     role:"customer"
// },
//     {
//     "id":21,
//     firstName:"Mattheuw",
//     lastName:"Israel",
//     email:"chuk123@gmail.com",
//     phoneNumber:"09092002922",
//     password:"iehiehi",
//     role:"customer"
// }

//     ]

//     export const carts = [
//         {
//             id: 1,
//             userID: 1
//         },
//         {
//             id: 1,
//             userID: 21
//         },
//         {
//             id: 1,
//             userID: 31
//         }
//     ]
//     export const reviews = [
//         {id: 1,
//         userID: 1,
//         comment: "Lovely product, delivered very fast"
    
//         },
//         {id: 11,
//         userID: 21,
//         comment: "Good product, delivered very fast"
    
//         },
//         {id: 12,
//         userID: 41,
//         comment: "Lovely product"
    
//         },
//     ]