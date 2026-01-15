



import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";
export class Category extends Model {}
Category.init(
  {
  id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4
      },
  description: {
        type: DataTypes.STRING,
        allowNull: false
      },

  },
  {
    sequelize,
    modelName: "Category",
    tableName: "Categories",
  }
);























// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Category extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Category.init({
//     description: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Category',
//   });
//   return Category;
// };