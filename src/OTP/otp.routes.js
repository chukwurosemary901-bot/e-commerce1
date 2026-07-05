import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {createdOTP, verifyOtp} from './otp.controllers.js'
export const otpRouter = Router()

otpRouter.post('/', createdOTP)
otpRouter.post('/verifyotp', verifyOtp)