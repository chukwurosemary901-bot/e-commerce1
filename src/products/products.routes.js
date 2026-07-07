import { Router } from "express";
import * as productControllers from './products.controllers.js'
import {auth, staffAuth, AdminAuth} from '../middleware/auth.js'

export const productRouter = Router()

// productRouter.post('/' , auth, staffAuth,productControllers.allProductsController)
productRouter.post('/createCategory' , auth, AdminAuth,productControllers.createCategory)
productRouter.put('/addProductUnit' , auth, AdminAuth,productControllers.addProductsUnitController)
productRouter.post('/addProduct' ,auth, AdminAuth, productControllers.addProductsController)
productRouter.get('/' , productControllers.allProductsController)
productRouter.post('/addToCart' ,auth, productControllers.addToCartController)
productRouter.delete('/deleteProduct' ,auth, AdminAuth,  productControllers.deleteProductController)
// productRouter.post('/single' , productControllers.upload.single('image'),  productControllers.productImageController)