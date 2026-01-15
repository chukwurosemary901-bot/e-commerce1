import { cartItem} from "../models/cartitem.js"
import {  Order,  } from "../models/order.js"
import {  orderProduct } from "../models/orderproduct.js"
import {  Product } from "../models/product.js"
// import { Cart } from "../models/cart"

 











export const findProduct = async (value) => {
    
    return await Product.findOne({where: value})
}
export const updateCartProduct = async (attribute, value) => {
    
    return await cartItem.update(attribute, {where: value})
}
export const findProductCart = async (product, cart) => {
    
    return await cartItem.findOne({where: product, cart})
}
export const createOrder = async (value) => {
    
    return await Order.create(value)
}
export const createOrderItem = async (value) => {
    
    return await orderProduct.create(value)
}
export const findItem = async (value) => {
    
    return await Order.findAll({value})
}




























// export const orders = [
//     {
//         id: 1,
//         userID: 1,
//         status:"delivered",
//         address: "lorem ipsum is dior? "
//     },
//     {
//         id: 2,
//         userID: 1,
//         status:"delivered",
//         address: "lorem ipsum is dior? "
//     },
//     {
//         id: 3,
//         userID: 3,
//         status:"delivered",
//         address: "lorem ipsum is dior? "
//     },
   
// ]