
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";
export class cartItem extends Model {}
cartItem.init(
  {
         id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4
      },
      cartID:{
        allowNull: false,
        type: DataTypes.STRING,
        references: {model: 'Carts', key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      productID:{
        allowNull: false,
        type: DataTypes.STRING,
        references: {model: 'Products', key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      quantity:{
        type: DataTypes.INTEGER,
        allowNull:false,

      },

  },
  {
    sequelize,
    modelName: "cartItem",
    tableName: "cartItems",
  }
);































// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class cartItem extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   cartItem.init({
//     description: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'cartItem',
//   });
//   return cartItem;
// };