import {  creatCartItem, createProduct, deleteProduct, findCart, findCategory, findID, findProduct, newCategory, productImages, updateCart, updateUnit, } from "./products.services.js";

import { addCartSchema, addProductSchema, addProductUnitSchema, categorySchema, deleteProductSchema } from "../validators/products.js";
import { Product } from "../models/product.js";
import { sanitize } from "../utils/sanitize.js";
// import wuw from 'mu'
import multer from 'multer';
import { router } from "../server.js";




export const createCategory = async (req, res) => {
    
try {
    const loggedIn = req.user

    if(!loggedIn) return res.status(401).json({error: `Kindly re-login`})

    const {error, value} = categorySchema.validate(req.body)

   if (error) return res.status(400).json(error.message)

    const { name} = value

    const findDescription = await findCategory({name:value.name})
    
    if(findDescription) return res.status(400).json({error:`Category already exist with that name`})

    const Category = await newCategory(value)


    return res.status(201).json({message: `You have succesfully added a new Category: ${description}` , Category})

} catch (error) {
    
console.error( `Error creating Category products`,error);
    
    return res.status(500).json({error:`Internal Server Error`})

}

}


export const allProductsController  =  async (req, res) => {
    
try {
    // const loggedIn = req.user

    //  if(!loggedIn) return res.status(401).json({error: `Kindly re-login`})

    
        const allProducts =  await Product.findAll({Product})
        
    return res.status(200).json({message:`All products are `,allProducts})
    
    

} catch (error) {
    console.error( `Error getting User's products`,error);
    
    return res.status(500).json({error:`Internal Server Error`})
}
}
    

export const addProductsController  =  async (req, res) => {
    
try {
    
    const loggedIn = req.user

    if(!loggedIn) return res.status(401).json({error: `Kindly re-login`})

    const {error, value} = addProductSchema.validate(req.body)

    if (error) return res.status(400).json(error.message)

    const { quantity, price,  productID, category, name, description, status, categoryID} = value
    // check if the category exists
    const checkCategory = await findCategory({id: value.categoryID})

    // happened because didnt find any category
    // console.log(checkCategory.id);

    if(!checkCategory) return res.status(400).json({error:`Category ${value.categoryID} not found`})

    // check if product exist
    // const checkProduct = await findProduct({id: value.productID})

    // console.log(checkProduct);

    
    // if (checkProduct) return res.status(400).json({error:`Product already exists`})

    // value.categoryID = checkCategory.id

    const newProduct = await createProduct(value)
    // const newProduct = products.push(value)

    return res.status(201).json({message: `Successfully added a new product`, newProduct})

} catch (error) {
      console.error( `Error adding User products`,error);
    
    return res.status(500).json({error:`Internal Server Error`})
}

    
}






export const deleteProductController  =  async (req, res) => {
   
    try {
    
    const {error, value} = deleteProductSchema.validate(req.body)

    if (error) return res.status(401).json(error.message)

    const { categoryID, productID,} = value
    // // check if the category exists
    const checkCategory = await findCategory({id: value.categoryID})

    if(!checkCategory) return res.status(400).json({error:`CategoryID ${value.categoryID} not found`})

    // check if product exist
    const checkProduct = await findProduct({id: value.productID})

    if (!checkProduct) return res.status(400).json({error:`Product does not exists`})
// filter remaining product
    // const Product = products.filter((prod)=> prod.id !== value.id)
    await deleteProduct({id: checkProduct.id})

   const remainingProducts = await Product.findAll({Product})

//   const remainingProducts =  await sanitize(remainingProduct)
    return res.status(200).json({message: `Successfully deleted`, remainingProducts})

} catch (error) {
  console.error( `Error deleting User's product`,error);
    
    return res.status(500).json({error:`Internal Server Error`})
}


}

export const addProductsUnitController = async (req, res) => {
    
try {
    const loggedIn = req.user

    console.log({log: loggedIn});

    if (!loggedIn) return res.status(401).json({error: `Kindly re-login`})

    const {error, value} = addProductUnitSchema.validate(req.body)

    if(error) return res.status(400).json({error: error.message})

    const {description, quantity,productID,  category, categoryID} = value

    const Category = await findCategory({id: value.categoryID})

    if(!Category) return res.status(400).json({error: `Category deosn't exist`})

    let Product = await findProduct({id: value.productID})
  

    if(!Product) return res.status(400).json({error: `Product doesn't exist`})

    let Unit = parseFloat(value.quantity)

    let prevUnit = parseFloat(Product.quantity)

    const totalUnit = Unit + prevUnit

    const newUnit = await updateUnit({quantity: totalUnit}, {id: value.productID})

   Product = await findProduct({id: value.productID})
    
   return res.status(200).json({message:`Succefully added more units to Products named ${value.description}`, Product})

} catch (error) {
    
    console.error(`Error adding units to products`, error);

    return res.status(500).json({error: `Internal Server Error`})
    
}

}

export const addToCartController = async (req, res) => {
    
try {
    const loggedIn = req.user

     if(!loggedIn) return res.status(401).json({error: `Kindly re-login`})

    const {error, value} = addCartSchema.validate(req.body)

    if(error) return res.status(400).json({error: error.message})

    const {description, quantity, productID, cartID} = value

    
// find the cart for cartID
   const userCart =  await findCart({userID: loggedIn.id})

    // value.cartID = userCart.id
console.log(value.cartID);

// find products for productID
    const Product = await findProduct({id: value.productID})

    // value.productID = Product.id
console.log(value.productID);

    if(!Product) return res.status(400).json({error: `Product not found`})

    let findCartID = await findID({productID: value.productID}, {cartID: value.cartID})
console.log({cart: findCartID});

if (value.quantity > Product.quantity) return res.status(400).json({message: `Not enough quantity, we have ${Product.quantity} products left  `})

    if (!findCartID){
    
    const newItem = await creatCartItem(value)
    console.log({createditem: newItem});
    
    return res.status(200).json({meassage: `Added a product to a cart successfully`, newItem})
}

   
    // const cartItem = await creatCartItem(value)
let newItem = parseFloat(findCartID.quantity) + parseFloat(value.quantity) 

    value.quantity = newItem

     const updatedItem = await updateCart({quantity: value.quantity}, {productID: value.productID}, {cartID: value.cartID})

     findCartID = await findID({productID: value.productID}, {cartID: value.cartID})

    return res.status(201).json({message: `Successfully added ${Product.name} to your cart `,  findCartID})

    } catch (error) {
    
    
    console.error(`Error adding products to carts`, error);

    return res.status(500).json({error: `Internal Server Error`})

}

}

// const fileStorageEngine = multer.diskStorage({
//     destination: async(req, file, cb) => {
//         cb(null, await Product.create(images) )
//     }, 
//     filename: (req, file, cb)=>{
// cb(null, Date.now() + '...' + file.originalname)
//     }
// })

//  export const upload = multer({storage: fileStorageEngine})

//  export const productImageController = async (req, res) => {
    
// try {
//     console.log(req.file);
    
// res.status(201).json({message: `Successfully added a new image for product`})

// } catch (error) {
//     console.log(`Error adding products images`, error);
    
//     return res.status(500).json({error: `Internal Server Error`})
// }

//  } 
// const storage = multer.memoryStorage()
// const upload = multer({storage})

// export const uploadImageController  = async (req, res) => {
    
// try {
//     const {productID} = req.body

//     const file = req.file

//     if(!file) return res.status(400).json({error: `No file uploaded`})

//       const baseImage = file.buffer.toString()  
// } catch (error) {
//     console.log(`error uploading image`, error);
//     return(`Internal Server Error`)
// }

// }