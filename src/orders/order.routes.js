import { Router } from "express";
import {AdminAuth, auth, staffAuth} from '../middleware/auth.js'
import * as orderControllers from './order.controllers.js'
export const orderRouter = Router()

orderRouter.post('/orderProducts', auth, orderControllers.OrderProductsController)

orderRouter.get('/allOrders', auth, staffAuth,orderControllers.allOrderController)
orderRouter.get('/allmyOrders',auth, orderControllers.allUserController)
