
import jwt from 'jsonwebtoken'
import { config } from "../config/env.js"

export const auth = async (req, res, next) => {
    
    try {
        
        const authHeader = req.headers.authorization
        console.log(authHeader);
        
        
        if(!authHeader) return res.status(401).json({error: `No token provided, Pls re-login`})

        const auth = authHeader.split(' ')[1]
        
        if(!auth) return res.status(401).json({error: `Token is neccessary`})

        jwt.verify(auth, config.access, (error, user) => {
        
        if(error) return res.status(401).json({error:`This token is expired already, kindly relogin`})
console.log(user);

    req.user = user
        console.log(req.user);
        
        next()

        });
    } catch (error) {
            console.error( `Error authorizing User`,error);

    return res.status(500).json({error:`Internal Server Error`})
    }
}

export const staffAuth = async (req, res, next) => {
try {
    const user = req.user

console.log(user);

    if(user.role !== "Administrator" && user.role !== "Staff" ) return res.status(401).json({error: `You are not a staff or an Admin, unAuthorized access`})

    next();

} catch (error) {
 console.error( `Error authorind admin and staff roles `,error);
    
    return res.status(500).json({error:`Internal Server Error`})
}

}

export const AdminAuth = async (req, res, next) => {

    try {
        const user = req.user

        if(user.role !== "Administrator") return res.status(401).json({error: `Only Admins can access this endpoint`}) 

        next()
    } catch (error) {
        
         console.error( `Error authorizing admn role `,error);
    
    return res.status(500).json({error:`Internal Server Error`})

    }


}