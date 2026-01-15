import { Router } from "express";
import * as userControllers from './users.controllers.js'
import { refresh } from "./refresh/refresh.js";
import { AdminAuth, auth, staffAuth } from "../middleware/auth.js";
export const userRouter  = Router()

userRouter.get('/', auth, staffAuth, userControllers.allUsersController )
userRouter.get('/profile/',  auth, userControllers.usersIdController )
userRouter.post('/signUp', userControllers.userSignUpController )
userRouter.post('/login', userControllers.usersLoginController )
// userRouter.post('/userReview',  auth, userControllers.userReview)
userRouter.patch('/updateRole',  auth,AdminAuth, userControllers.updateRoleController)
userRouter.post('/refresh',  auth, refresh)
userRouter.get('/allCarts',  auth, staffAuth, userControllers.allCartController)
// userRouter.get('/allReviews',  auth,staffAuth, userControllers.allReviews)
