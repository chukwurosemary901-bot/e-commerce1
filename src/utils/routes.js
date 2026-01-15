import { Router } from "express";
import { userRouter } from "../users/users.routes.js";
import { orderRouter } from "../orders/order.routes.js";
import { productRouter } from "../products/products.routes.js";
import { refresh } from "../users/refresh/refresh.js";
import { paymentRouter } from "../payment/payment.routes.js";

export const routes = Router()

routes.use('/users', userRouter)
routes.use('/order', orderRouter)
routes.use('/product', productRouter)
routes.use('/refreshtokens', refresh)
routes.use('/payment', paymentRouter)