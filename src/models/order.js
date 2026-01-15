
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";
export class Order extends Model {}
Order.init(
  {
   id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4
      },
      userID: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {model: 'Users', key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      status:{
        allowNull: false,
        type: DataTypes.ENUM('pending', 'paid'),
        defaultValue: 'pending'
      },
    address:{
        allowNull:false,
    type: DataTypes.STRING
  },
      totalAmount:{
        allowNull: false,
        type: DataTypes.INTEGER
        
      },

  },
  {
    sequelize,
    modelName: "Order",
    tableName: "Orders",
  }
);


















// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Order extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Order.init({
//     userID: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Order',
//   });
//   return Order;
// };