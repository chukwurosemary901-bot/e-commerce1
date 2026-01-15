import { orderSchema } from "../validators/order.js";
// import {products} from '../products/products.services.js'
import { orderPrice} from '../utils/order.js'
import { Order } from "../models/order.js";
import { createOrder, createOrderItem, findItem, findProduct, findProductCart, updateCartProduct } from "./order.services.js";
import { userCart } from "../users/users.services.js";
// import { cartItem } from "../models/cartitem.js";
export const allOrderController  =  async (req, res) => {

try {
    
      const loggedIn= req.user
        
        if(!loggedIn) return res.status(404).json({message: `Pls kindly re-login`})
    const allOrders = Order.findAll({Order})

return res.status(201).json({message: `Orders`, allOrders})

} catch (error) {

      console.error( `Error geting all orders `,error);
    
    return res.status(404).json({error:`Internal Server Error`})
}


}
export const allUserController  =  async (req, res) => {

try {
    
      const loggedIn= req.user
        
        if(!loggedIn) return res.status(404).json({message: `Pls kindly re-login`})

    const allOrders = await findItem({userID: loggedIn.id})

return res.status(201).json({message: `Orders`, allOrders})

} catch (error) {

      console.error( `Error geting all orders `,error);
    
    return res.status(404).json({error:`Internal Server Error`})
}


}

export const OrderProductsController  =  async (req, res) => {

    try {
        const loggedIn= req.user
        
        if(!loggedIn) return res.status(404).json({message: `Pls kindly re-login`})

         const {error, value } = orderSchema.validate(req.body)

        if (error) return res.status(404).json(error.message)

        let {description , quantity, address,  productID, orderID, unitPrice, userID, totalAmount} = value
     
    // check if product is in cart
    
    const product = await findProduct({description: value.description})

    if(!product) return res.status(404).json({error: `Pls product is not found`})

// find cart with user  .NOT NECESSARY!!!

    const findCart = await userCart({userID:loggedIn.id})
    console.log(findCart);
    console.log(loggedIn.id);
    
    if(!findCart) return res.status(404).json({error: `You cannot place an order unless you have signed up `})

// check if user has added any product before. NOT NECESSARY

    const user = await findProductCart({cartID: findCart.id}, {productID: product.id})

    if(!user) return res.status(404).json({error: `You have not added any product to your Cart`})

// check if user has added that product to cart

    const cart = await findProductCart({productID: product.id})

    if(!cart) return res.status(404).json({error: `Pls you have not added this product your cart`})

// take away the number of units of products

    if(quantity > cart.quantity) return res.status(404).json({error: `Not enough products in your cart, you have ${cart.quantity} left, pls add more products to your cart `})

// sort Out the price

    const  price = product.price
    
    quantity = value.quantity
    
    totalAmount = parseFloat(price) * parseFloat(quantity)

// update the quantity 

    const productLeft = cart.quantity - quantity

    console.log({productLeft: productLeft});

// // update cart  products quantity

// const newQuantity = await updateCartProduct()
  
    value.productID = cart.productID

    value.unitPrice = product.price

    value.totalAmount = totalAmount

    value.userID  = findCart.userID

    
    const newOrder = await createOrder(value)
    
    value.orderID  = newOrder.id

// if(cart.quantity == 0) return res.status(404).json({error: ``})

  const orderItem =   await createOrderItem(value)



  const cartProductLeft = parseFloat(cart.quantity) - parseFloat(value.quantity)

  

  await updateCartProduct  ({quantity: cartProductLeft},{productID: cart.productID})

    return res.status(404).json({message: ` Pls proceed for payment`,  newOrder ,orderItem})

    } catch (error) {
        console.error( `Error ordering  products`,error);
    
        return res.status(404).json({error:`Internal Server Error`}) 
    }

}

export const paymentController = async (req, res) => {
    
try {
    
let { price, quantity }  = req.body
      price = await orderPrice(findName.price,value.quantity)

console.log({price: price});

    let newPrice = parseFloat(price)

console.log({newPrice: newPrice});

    amount = parseFloat(value.amount)

    if (amount < newPrice) return res.status(404).json({error: `Insuffient balance, Balance is `})

    if (amount > newPrice) return res.status(404).json({error: ` The price of the product is ${newPrice} `})




    Object.assign()

console.log({pod:productLeft});

if(findName.unit === 0 ) return res.status(404).json({error: `We are out of products`})

    value.status = "delivering"

    value.id = "55"

    const Order = orders.push( {id:value.id},
        userID,
        {status:value.status},
        address)
    const order = orders.findLast((f)=> f.userID == userID )
    
console.log(order);


    return res.status(404).json({message: `You have succefully orderd this product, ` , order})
} catch (error) {
    
    console.error( `Error paying for products`,error);
    
        return res.status(404).json({error:`Internal Server Error`}) 

}

}


//  const amet= "Biscuit, Fan" 
  


//  const fr = amet.split(',')[1]

//  console.log(fr);
 