


import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";
export class Product extends Model {}
Product.init(
  {
       id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4
      },
      categoryID:{
        allowNull:false,
        type: DataTypes.STRING,
      references: {model:'Categories', key: 'id'},
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
      },
      description: {
        type: DataTypes.STRING,
        allowNull:false
      },
      unit: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      price:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status:{
        type: DataTypes.ENUM('available', 'sold out'),
        defaultValue: 'available' ,
        allowNull: false
      }
    },
  {
    sequelize,
    modelName: "Product",
    tableName: "Products",
  }
);


























// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Product extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Product.init({
//     description: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Product',
//   });
//   return Product;
// };