import crypto from 'crypto'
// import Order from '../order.js'
import { config } from '../config/env.js'
import { Order } from '../models/order.js';

export const paystackWebhook = async (req, res) => {
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
    }

    return res.status(200)
}