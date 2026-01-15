
import { aToken, rToken } from "../utils/tokens.js"
import { loginSchema,UpdateRoleSchema, userSchema, idSchema, userReviewsSchema } from "../validators/users.js"
import { findUserbyEmail, getUsers, signUpUser, signUpUserCart, updateRole, userCart } from "./users.services.js";
import { comparePassword, hashPassword } from '../utils/bcrypt.js'
import { User } from "../models/user.js";
import { Cart } from "../models/cart.js";

// import bcrypt 


export const allUsersController  =  async (req, res) => {
    
try {
    
    const loggedIn = req.user

    if (!loggedIn)return res.status(404).json({error:`Pls login to access this endpoint`})
    
    
    const allUsers = await User.findAll({User})

    return res.status(201).json({message: `All Users`, allUsers});

} catch (error) {
        console.error(`Error getting all Users`, error);
    
    
    return res.status(500).json({error:`Internal Server Error`})
}
    
}


export const userSignUpController  =  async (req, res) => {
    
try {

    

    const {error, value} = userSchema.validate(req.body)
   
    if (error)return res.status(404).json({error:error.message})

    const {firstName, lastName, email, phoneNumber, password, role} = value

    // check if email exists
    // const findEmail = users.find((user) => user.email == email)
    const findEmail = await findUserbyEmail({email: value.email})
    
    
    console.log({email:findEmail});

    if (findEmail) return res.status(404).json({error: `email already exists`})
    // encrypt the password
    value.password =  await hashPassword(password)
    // value.role = "customer"
    // store the new user
    const newUser =  await signUpUser(value)
// const find = users.findLast((f) => f.email == value.email )
    // carts.push()Ss
    const userCart = await signUpUserCart({userID: newUser.id})

    return res.status(201).json({message:`Successful registrations`, newUser, userCart})


} catch (error) {
     console.error(`Error signing up User`, error);
    
    
    return res.status(500).json({error:`Internal Server Error`})

     
}
    
}

export const usersLoginController  =  async (req, res) => {
    
try {
    
    const {error, value} = loginSchema.validate(req.body)

// console.log( req.headers.authorization.split(' ')[1]);
// console.log(`Happy`);

    if (error) return res.status(404).json(error.message)

    let {email, password, role} = value

    // check if email exists
    const findEmail = await findUserbyEmail({email:value.email})

    if (!findEmail) return res.status(404).json({error:`Email does not exists`}) 
console.log(findEmail);

    // check password
    const checkPass = await comparePassword(password, findEmail.password)

    if (!checkPass) return res.status(404).json({error: `Incorrect password`})
        // const id = {id}
    let id = findEmail.id      
    email = findEmail.email
    role = findEmail.role

    let accessToken = await aToken({ id, email, role})

    let refreshToken = await rToken({id, email, role})

   const findCart = await userCart({userID: findEmail.id}) 
   
    return res.status(201).json({message: `Successful Login`,findCart, findEmail, accessToken, refreshToken })

} catch (error) {

    console.error( `Error loginning User`,error);
    
    return res.status(404).json({error:`Internal Server Error`})


}
    
}




export const updateRoleController  =  async (req, res) => {
    
try {

const loggedIn = req.user

    if (!loggedIn) return res.status(401).json({error: `Kindly re-login`})

    const {error, value} = UpdateRoleSchema.validate(req.body)

    if (error) return res.status(404).json({error:error.message})

    let {email, phoneNumber, role} = value

    let checkEmail = await findUserbyEmail({email: value.email})

    if(!checkEmail) return res.status(404).json({error: `Email does not exist`})
    
    const checkPhone = checkEmail.phoneNumber === phoneNumber

    if(!checkPhone) return res.status(404).json({error: `Phone number is invalid`})

    if(value.role != "Administrator" && value.role != "Staff" && value.role != "Customer") return res.status(404).json({error: `Role can only be updated to Administrator, Staff or Customer`})
           // const checkPassword = await comparePassword(value.password, checkEmail.password)

    // if(!checkPassword) return res.status(404).json({error: `Incorrect password`})

    // Object.assign(checkEmail, value)
  const userRole = await updateRole(value, {email: checkEmail.email})

 checkEmail = await findUserbyEmail({email: value.email})
    return res.status(201).json({message: `You have successfully Update the role of user with email${value.email}` , checkEmail})

} catch (error) {
         console.error(`Error updating user's role`, error);
    
    
    return res.status(500).json({error:`Internal Server Error`})
}

    
}



export const usersIdController  =  async(req, res) => {
    
try {
    
  
const loggedIn = req.user

console.log({log: loggedIn});

    if (!loggedIn) return res.status(401).json({error: `Kindly re-login`})

    // const email= req.params.email

    const findEmail = await findUserbyEmail({id: loggedIn.id})
   
    // console.log(findEmail);
    

    if(!findEmail) return res.status(404).json({error:`Email no dey`

    })


    

    return res.status(201).json({message:`Your profile`, findEmail})




} catch (error) {
      console.error( `Error viewing User profile`,error);
    
    return res.status(404).json({error:`Internal Server Error`})
}
    
}


export const allCartController = async(req, res)=>{
    try {
        
        const carts = await Cart.findAll({Cart})
return res.status(201).json({message:`All Carts`, carts})

    } catch (error) {
        
  console.error( `Error getting all User's carts`,error);
    
    return res.status(404).json({error:`Internal Server Error`})

    }}


// export const allReviews = (req, res )=>{

// try {
    
// return res.status(404).json({message: `All reviews `, reviews})

// } catch (error) {

//        console.error( `Error viewing all User reviews `,error);
    
//     return res.status(404).json({error:`Internal Server Error`})
// }

//     }
// export const userReview = (req, res )=>{

// try {
   
//     const loggedIn = req.user

//     if(!loggedIn) return res.status(404).json({error: `Pls login`}) 

//     const {error, value} = userReviewsSchema.validate(req.body)

//      if(error) return res.status(404).json(error.message)

//     const {comment, id}  = value

//     reviews.push(value)

// const review= reviews.findLast((rev) => rev.id == value.id)

// return res.status(404).json({message: `Your review has been sent `, review})

// } catch (error) {

//        console.error( `Error reviewing a product `,error);
    
//     return res.status(404).json({error:`Internal Server Error`})
// }

//     }