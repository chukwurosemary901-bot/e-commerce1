import { Router } from "express";
import {auth} from '../middleware/auth.js'
import * as orderControllers from './order.controllers.js'
export const orderRouter = Router()

orderRouter.post('/orderProducts', auth, orderControllers.OrderProductsController)

orderRouter.get('/allOrders', orderControllers.allOrderController)
orderRouter.get('/allmyOrders', orderControllers.allOrderController)
