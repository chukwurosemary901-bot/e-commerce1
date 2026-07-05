import { Router } from "express";
import express from 'express'
import { initializePayment } from "./payment.controllers.js";
import { paystackWebhook } from "./payment.webhook.js";
import {auth} from '.././middleware/auth.js'
export const  paymentRouter = Router()

paymentRouter.post('/',auth, initializePayment)
paymentRouter.post(
    "/webhook",
    express.json({verify: (req, res, buf) => (req.rawBody = buf)}),
    paystackWebhook
)

 