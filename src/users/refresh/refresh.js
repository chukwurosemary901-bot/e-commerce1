
import jwt from 'jsonwebtoken'
import { config } from '../../config/env.js'
import { aToken } from '../../utils/tokens.js'

export const refresh = async (req, res) => {
    
    try {
        const {token} = req.body

        if(!token) return res.status(400).json({error: `Pls token is required `})

        jwt.verify(token, config.refresh, async(error, decode) => {
           
        if(error) return res.status(400).json({error: `Token is expired already`})
       
            console.log(decode);
        let id = decode.id
        let email = decode.email
        let role = decode.role
       
        const accessToken = await aToken({id, email, role})
      
        console.log(accessToken);
       
        return res.status(201).json({message: `Your new acces token`, accessToken })
            }
        
        )
    
        
    } catch (error) {
        
         console.error( `Error creating refresh tokens User`,error);
    
    return res.status(500).json({error:`Internal Server Error`})
    }
}