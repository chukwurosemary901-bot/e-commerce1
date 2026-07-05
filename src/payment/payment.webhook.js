import crypto from 'crypto'

import { config } from '../config/env.js'
import { Order } from '../models/order.js';
import {Product} from '../models/product.js'
import { findProduct } from '../products/products.services.js';
// import { log } from 'console';

export const paystackWebhook = async (req, res) => {
   

try {
  console.log("Webhook received:", req.body);
  console.log("Metadata orderId:", req.body.data.metadata.orderId);
    const signature = req.headers["x-paystack-signature"]

    const hash = crypto
    .createHmac("sha512", config.PS.secretKey)
    .update(JSON.stringify(req.body))
    .digest("hex");

    // if(hash !== signature){
    //     return res.status(401)
    // }
// const quantity = await findProduct({})
    const event = req.body
    
    
    if(event.event === "charge.success"){
        const {reference, metadata} = event.data
console.log(event);
    await Order.update({
        status: 'paid',
        paymentReference: reference
        
    },
{
    where: {id: metadata.orderID}
}
);

// await Product.update({

// })
    }

    return res.status(200)   
} catch (error) {
    console.log(`Error updating order payment`);
    
}

}