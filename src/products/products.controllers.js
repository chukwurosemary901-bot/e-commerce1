import {  creatCartItem, createProduct, deleteProduct, findCart, findCategory, findID, findProduct, newCategory, updateCart, updateUnit, } from "./products.services.js";

import { addCartSchema, addProductSchema, addProductUnitSchema, categorySchema, deleteProductSchema } from "../validators/products.js";
import { Product } from "../models/product.js";



export const createCategory = async (req, res) => {
    
try {
    const loggedIn = req.user

    if(!loggedIn) return res.status(404).json({error: `Kindly re-login`})

    const {error, value} = categorySchema.validate(req.body)

   if (error) return res.status(404).json(error.message)

    const { description} = value

    const findDescription = await findCategory({description:value.description})
    
    if(findDescription) return res.status(404).json({error:`Category already exist`})

    const Category = await newCategory(value)


    return res.status(201).json({message: `You have succesfully added a new Category: ${description}` , Category})

} catch (error) {
    
console.error( `Error creating Category products`,error);
    
    return res.status(404).json({error:`Internal Server Error`})

}

}


export const allProductsController  =  async (req, res) => {
    
try {
    const loggedIn = req.user

     if(!loggedIn) return res.status(404).json({error: `Kindly re-login`})

    
        const allProducts =  await Product.findAll({Product})
        
    return res.status(201).json({message:`All products are `,allProducts})
    
    

} catch (error) {
    console.error( `Error getting User's products`,error);
    
    return res.status(404).json({error:`Internal Server Error`})
}
}
    

export const addProductsController  =  async (req, res) => {
    
try {
    
    const loggedIn = req.user

    if(!loggedIn) return res.status(404).json({error: `Kindly re-login`})

    const {error, value} = addProductSchema.validate(req.body)

    if (error) return res.status(404).json(error.message)

    const { unit, price, category, description, status, categoryID} = value
    // check if the category exists
    const checkCategory = await findCategory({description: value.category})
    // happened because didnt find any category
    // console.log(checkCategory.id);

    if(!checkCategory) return res.status(404).json({error:`Category ${value.category} not found`})

    // check if product exist
    const checkProduct = await findProduct({description: value.description})

    console.log(checkProduct);

    
    if (checkProduct) return res.status(404).json({error:`Product already exists`})

        value.categoryID = checkCategory.id

    const newProduct = await createProduct(value)
    // const newProduct = products.push(value)

    return res.status(201).json({message: `Successfully added a new product`, newProduct})

} catch (error) {
      console.error( `Error adding User products`,error);
    
    return res.status(404).json({error:`Internal Server Error`})
}

    
}






export const deleteProductController  =  async (req, res) => {
   
    try {
    
    const {error, value} = deleteProductSchema.validate(req.body)

    if (error) return res.status(404).json(error.message)

    const {id, unit, price, category, description,} = value
    // // check if the category exists
    const checkCategory = findCategory({description: category})

    if(!checkCategory) return res.status(404).json({error:`CategoryID ${value.categoryID} not found`})

    // check if product exist
    const checkProduct = await findProduct({description})

    if (!checkProduct) return res.status(404).json({error:`Product does not exists`})
// filter remaining product
    // const Product = products.filter((prod)=> prod.id !== value.id)
    await deleteProduct({description: checkProduct.description})
   const remainingProduct = await Product.findAll({Product})
    return res.status(201).json({message: `Successfully deleted`, remainingProduct})

} catch (error) {
  console.error( `Error deleting User's product`,error);
    
    return res.status(404).json({error:`Internal Server Error`})
}


}

export const addProductsUnitController = async (req, res) => {
    
try {
    
    const {error, value} = addProductUnitSchema.validate(req.body)

    if(error) return res.status(404).json({error: error.message})

    const {description, unit, category, categoryID} = value

    const Category = await findCategory({description: category})

    if(!Category) return res.status(404).json({error: `Category deosn't exist`})

    let Product = await findProduct({description: value.description})
  

    if(!Product) return res.status(404).json({error: `Product doesn't exist`})

    let Unit = parseFloat(value.unit)

    let prevUnit = parseFloat(Product.unit)

    const totalUnit = Unit + prevUnit

    const newUnit = await updateUnit({unit: totalUnit}, {description: value.description})

   Product = await findProduct({description: value.description})
    
   return res.status(201).json({message:`Succefully added more units to Products named ${value.description}`, Product})

} catch (error) {
    
    console.error(`Error adding units to products`, error);

    return res.status(404).json({error: `Internal Server Error`})
    
}

}

export const addToCartController = async (req, res) => {
    
try {
    const loggedIn = req.user

     if(!loggedIn) return res.status(404).json({error: `Kindly re-login`})

    const {error, value} = addCartSchema.validate(req.body)

    if(error) return res.status(404).json({error: error.message})

    const {description, quantity, productID, cartID} = value

    
// find the cart for cartID
   const userCart =  await findCart({userID: loggedIn.id})

    value.cartID = userCart.id
console.log(value.cartID);

// find products for productID
    const Product = await findProduct({description: value.description})

    value.productID = Product.id
console.log(value.productID);

    if(!Product) return res.status(404).json({error: `Product not found with that description`})

    let findCartID = await findID({productID: value.productID}, {cartID: value.cartID})
console.log({cart: findCartID});

    if(value.quantity > Product.quantity) return res.status(400).json({message: `Not enough quantity, we have ${Product.quantity} left  `})
    if(!findCartID){

    const newItem = await creatCartItem(value)
console.log({createditem: newItem});

    return res.status(201).json({meassage: `Added a new cart successfully`, newItem})
}
    
   
    // const cartItem = await creatCartItem(value)
let newItem = parseFloat(findCartID.quantity) + parseFloat(value.quantity) 

    value.quantity = newItem

     const updatedItem = await updateCart({quantity: value.quantity}, {productID: value.productID}, {cartID: value.cartID})

     findCartID = await findID({productID: value.productID}, {cartID: value.cartID})

    return res.status(201).json({message: `Successfully added ${value.description} to your cart `,  findCartID})

    } catch (error) {
    
    
    console.error(`Error adding products to carts`, error);

    return res.status(404).json({error: `Internal Server Error`})

}

}