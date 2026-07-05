
import express from 'express'
import { Router } from 'express'
import  {config}  from './config/env.js'
// import path from 'path'
import { routes } from './utils/routes.js'
import { sequelize } from './config/sequelize.js'
import { initDB } from './models/index.js'
import cors from 'cors'
import { corsOptions } from './cors/cors.js'
const app  = express()

app.use(express.json())

app.use(cors(corsOptions))
export const router = Router()

app.use(router)
app.use(routes)
// app.use(express.static('src'))

// app.get('/ded', (req, res) => {
//   res.send(`
//     <h1>Static Files Example</h1>
//     <img src="src/logo.JPG" alt="Logo">
    
//   `);
// });

// USERS
// auth
// router.get('/users',  (req, res)=>{
    
    

// })

// // REGISTRATION
// router.post('/users/signUp', async(req, res) =>{




// } )

// // LOGIN

// router.post('/users/login', async(req, res) => {



// })

// router.post('/users/profile/:id', async(req, res) => {


// })


// // UPDATE USERS TO STAFFS/ ADMINS
// router.patch('users/Role', auth, staffAuth,async(req, res) => {



// })

// // CATEGORY

// // PRODUCTS


// router.get('/allProducts',  (req, res) => {



// })

// router.post('/addProduct', (req, res) => {

// })


// router.post('/deleteProduct', (req, res) => {

// })

// // CART


// router.get('/users/allCarts', (req, res) => {

   
// })

// // ORDER

// router.get('/allOrders', (req, res) => {



// })


// router.get('/user/orders/:id', (req, res) => {

    
// })

// router.post('/user/order/:id', async(req, res) => {


// })

































app.listen((config.port), async()=>{

    try {
        await initDB();
    console.log(`app running on http://localhost:${config.port}`);
    
    } catch (error) {
        console.error(`Unable to connect to Database`);
        
    }
    
})