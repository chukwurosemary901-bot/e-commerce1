import { sequelize } from "../config/sequelize.js"
import { User } from "./user.js";
import { Cart } from "./cart.js";
import { Category } from "./category.js";
import { Product } from "./product.js";
import { cartItem } from "./cartitem.js";
import { orderProduct } from "./orderproduct.js";
import { Order } from "./order.js";

User.hasOne(Cart, {
  foreignKey: 'userID',
  as: 'cart'
})

Cart.belongsTo(User, {
  foreignKey: 'userID',
  as: 'owner'
})

Category.hasMany(Product, {
  foreignKey: 'categoryID',
  as: 'categoryProducts'
})

Product.belongsTo(Category, {
  foreignKey: 'categoryID',
  as: 'category'
})

Cart.hasMany(cartItem, {
  foreignKey: 'cartID',
  // foreignKey: 'productID',
  as: 'storedItems'
})
Product.hasMany(cartItem, {
  // foreignKey: 'cartID',
  foreignKey: 'productID',
  as: 'productItems'
})

cartItem.belongsTo(Cart, {
   foreignKey: 'cartID',
  // foreignKey: 'productID',
  as: 'storageCart'
})
cartItem.belongsTo(Product, {
  //  foreignKey: 'cartID',
  foreignKey: 'productID',
  as: 'productsItems'
})

Product.hasMany(orderProduct, {
  // foreignKey : 'orderID',
  foreignKey: 'productID',
  as: 'purchasedProduct'
})
Order.hasMany(orderProduct, {
  // foreignKey : 'orderID',
  foreignKey: 'orderID',
  as: 'ordered Products'
})
orderProduct.belongsTo(Order, {
foreignKey: 'orderID',
as: 'userOrder'
})
orderProduct.belongsTo(Product, {
foreignKey: 'orderID',
as: 'userProduct'
})













export const initDB = async () => {
  
  try {
    await sequelize.authenticate()
     console.log('Connection has been established successfully.');

  } catch (error) {

    console.error(`Database connecting error`, error);
  }
  
}




export {Cart, User, Category, Product, cartItem, orderProduct, Order }
























// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/database.js')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
