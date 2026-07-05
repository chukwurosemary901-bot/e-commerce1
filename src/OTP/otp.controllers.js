import { config } from "../config/env.js";
import { generateOTP } from "../utils/otp.js";
import { sendEmail } from "../utils/sendEmail.js";
import { otpSchema } from "../validators/otp.js";
import { deleteOTP, findOTP, newOTP, verifyOTP } from "./otp.services.js";
import {comparePassword, hashPassword} from '../utils/bcrypt.js'
import { findUserbyEmail, updateRole } from "../users/users.services.js";
import { OTP } from "../models/otp.js";
import { Sequelize } from "sequelize";
export const sendOTP = async ({email, subject, message, duration = 1, expiresAt}) => {
    
try {
    
    const deletedOTP = await deleteOTP({email})

    // const findOtp = await findOTP({email})

    // if(findOtp) = 


    const generatedOTP = await generateOTP()

    const mailOptions ={
        from: config.APP.user,
        to: email,
        subject,
        html: 
 `<p className="">${message}</p> <p style=''>${generatedOTP}</p> <p>This code expires in ${duration} hour(s)</p>`

       

    }
await sendEmail(mailOptions)

const hashData = await hashPassword(generatedOTP)

const expiresAt = Date.now() + 3600000 * +duration 

const newOTPs = await newOTP({email,
    otp: hashData,
     expiresAt})

return({newOTP: newOTPs})
} catch (error) {
    console.error(`Error sending otp to the user`, error);
    
   return  (`Internal Server Error`) 
}

}

export const createdOTP = async (req, res) => {
    try {

        // const loggedIn = req.user

        // if (!loggedIn) return res.status(401).json({error: `Kindly re-login`})

         const {error, value} = otpSchema.validate(req.body)
  
         if (error) return res.status(404).json(error.message)
    
        const {email, subject, message, duration = 1, expiresAt} = value 
    //  console.log(value.duration);
        const createdOTP = await sendOTP({
        email,
        subject,
        message,
        duration
        })

        return res.status(201).json({message: ``,createdOTP})
    
    } catch (error) {
        console.log(error, `Error creating OTP`);
     
        return res.status(500).json({message:`Internal Server Error`})
        
    }
}

export const verifyOtp = async (req, res) => {

    try {
        // const loggedIn = req.user

        // if (!loggedIn) return res.status(401).json({error: `Kindly re-login`})
        
        let {otp, email, verify, expires } = req.body

        if(!otp || !email ) return res.status(400).json({message: `Email and the required otp are required`})

        // const findEmail = await findUserbyEmail({email})

        // if(!findEmail) return res.status(400).json({message: `User is not found`})

        // find if the email has beeen verified
        const findOtp = await findOTP({email})

        if(!findOtp) return res.status(400).json({message: `Your account has been already verified, pls signUp or login`})
          
            // check if otp is correct
        const checkOtp = await comparePassword(otp, findOtp.otp)
        
        if(!checkOtp) return res.status(400).json({message: `Incorrect otp, pls request for a resend `, })
            
             // check the validity of the otp
         if(findOtp.expiresAt < Date.now()) 
            
        return res.status(400).json({error: `Your code is expired already, request for a new otp`})

             expires = Sequelize.literal(`NOW() + INTERVAL '4 WEEKS'`) 

        console.log(expires); 
        
        const updateVerify = await verifyOTP({verify: "true", expiresAt: expires}, {email})

        await deleteOTP({email})
        


       
        
       
        // await updateRole(req.body, {email})
        
        return res.status(200).json({message: `Your account has been successfully verified,`})



    } catch (error) {
        console.log(`Error verifying otp`, error);

        return res.status(500).json({error: `Inernal Server Error`})
        
    }
    
}

export const resendOTP = async (req, res) => {

    try {
        const {error, value} = otpSchema.validate(req.body)

        if(error) return res.status(400).json(error.message)

         const {email, subject, message, duration = 1, expiresAt} = value 

    //  console.log(value.duration);
    await deleteOTP({email})

        const createdOTP = await sendOTP({
email,
 subject,
  message,
duration
        })
        return res.status(201).json({message: ``,createdOTP})

    } catch (error) {
        console.log(`Error resending Otp`,error);

        return res.status(500).json({error: `Internal server error`})
        
    }
    
}