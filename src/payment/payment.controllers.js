import axios from "axios"
import { config } from "../config/env.js"
import { Order } from "../models/order.js"
import { User } from "../models/user.js"

export const initializePayment = async (req, res) => {
   
    try {
        const loggedIn = req.user

    if (!loggedIn) return res.status(401).json({error: `Kindly re-login`})

const {  orderID} = req.body
if( !orderID)
    return res.status(400).json({message: ` orderID is required`})
const order = await Order.findByPk(orderID)


if( !order)
    return res.status(400).json({message: `order does not exist`})

const user = await User.findByPk(order.userID)

if( !user)
    return res.status(400).json({message: `User not found`})

const response = await axios.post(
    "https://api.paystack.co/transaction/initialize",
    {
        email: user.email,
        amount: order.totalAmount * 100,
        metadata:{
            orderID: order.id
        }
        
    },
    {
      headers:{
        Authorization: `Bearer ${config.PS.secretKey}`,
        "Content-Type": "application/json"
    }  
    }
    

);
return res.status(200).json({
    authorization_url: response.data.data.authorization_url,
    reference: response.data.data.reference
})

    } catch (error) {
         console.error(`Error initializing payment`, error);
        
         return res.status(500).json({
            message: error.message
         })
    }

}