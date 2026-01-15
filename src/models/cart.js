
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";
export class Cart extends Model {}
Cart.init(
  {
   id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4
      },
      userID: {
        type: DataTypes.STRING,
        allowNull:false,
        references: {model: 'Users', key:'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

  },
  {
    sequelize,
    modelName: "Cart",
    tableName: "Carts",
  }
);






























// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Cart extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Cart.init({
//     userID: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Cart',
//   });
//   return Cart;
// };