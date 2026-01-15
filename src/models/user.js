import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";
export class User extends Model {}
User.init(
  {
        id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue:DataTypes.UUIDV4
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
      },
      phoneNumber:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
      },
      password:{
        type: DataTypes.STRING,
        allowNull:false,
        
      },
      role:{
         type: DataTypes.ENUM('Administrator', 'Customer', 'Staff'),
        allowNull: false,
        defaultValue:"Customer"
      },

  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
  }
);














//  'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     email: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };