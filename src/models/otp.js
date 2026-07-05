import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";
export class OTP extends Model{}

OTP.init(
  {
 id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
     
      },
      otp:{
        type: DataTypes.STRING,
        allowNull: false
      },
      expiresAt:{
      allowNull: false,
        type: DataTypes.DATE
      },
  },
  {
    sequelize,
    modelName: "OTP",
    tableName: "OTPs"

  }
)













// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class OTP extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   OTP.init({
//     email: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'OTP',
//   });
//   return OTP;
// };