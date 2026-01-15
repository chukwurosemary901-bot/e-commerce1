import jwt from 'jsonwebtoken'
import { config } from '../config/env.js'

export const aToken = async (payload) => {
   return  jwt.sign(payload, config.access, {expiresIn: '50m'})
}

export const rToken = async (payload) => {

   return jwt.sign(payload, config.refresh, {expiresIn: '10m'})
}