import { cartItem } from "../models/cartitem.js"
import { Category } from "../models/category.js"
import { Product } from "../models/product.js"
import { Cart } from "../models/cart.js"
export const newCategory = async (value) => {
    return await Category.create(value)

}
export const findCategory = async (value) => {
    return await Category.findOne({where: value})

}
export const findProduct = async (value) => {
    return await Product.findOne({where: value})

}

export const createProduct = async (value) => {
    return await Product.create(value)

}
// export const deleteProduct = async (value) => {
//     return await Product.

// }
export const updateUnit = async (attribute, value) => {
    return await Product.update(attribute, {where: value})

}
export const findID = async (user, product) => {
    return await cartItem.findOne({where: user, product})

}
export const findCart = async (value) => {
    return await Cart.findOne({where: value})

}
export const updateCart = async (attribute, user, product) => {
    return await cartItem.update(attribute, {where: user, product})

}
export const creatCartItem = async (value) => {
    return await cartItem.create(value)

}
export const deleteProduct = async (value) => {
    return await Product.destroy({where:value})

}
export const productImages = async (value) => {
    return await Product.create(value)

}
























// export const products = [
// {
//     id:"21",
//     unit: 20,
//     price: 5000,
//     categoryID: "Snacks",
//     name: "Biscuit",
//     status: "available"
// },
// {
//     id:"43",
//     unit: 20,
//     price: 5000,
//     categoryID: "Snacks",
//     name: "Biscuit",
//     status: "available"
// },
// {
//     id:"22",
//     unit: 20,
//     price: 5000,
//     categoryID: "Snacks",
//     name: "Biscuit",
//     status: "available"
// }
// ]

// export const category = [
//     {id: "1",
//         name:"Snacks"
//     },
//     {id: "2",
//         name:"Fashion"
//     },
// ] 