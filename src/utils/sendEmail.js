import nodemailer from 'nodemailer'
import { config } from '../config/env.js'
import { log } from 'console';

let transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    auth:{
        user: config.APP.user,
        pass: config.APP.pass
    }
})

transporter.verify((error, success) =>{
    if(error){
        console.log(error);
        
    }else{
        console.log(`Ready for message`);
        console.log(`Success`);
        
    }
})

export const sendEmail = async (mailOptions) => {

    try {
         await transporter.sendMail(mailOptions)
         console.log(`SEcond step ready`);
         
return
    } catch (error) {
        
        console.log(error.message);
        
        return (`Internal Server Error`)
    }
}