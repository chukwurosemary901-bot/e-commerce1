
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";
export class orderProduct extends Model {}
orderProduct.init(
  {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4
      },
        orderID: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {model: 'Orders', key: 'id'},
        onDelete:'CASCADE',
        onUpdate: 'CASCADE'
      },
      productID: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {model: 'Products', key: 'id'},
        onDelete:'CASCADE',
        onUpdate: 'CASCADE'
      },
      quantity:{
        allowNull: false,
        type: DataTypes.INTEGER
      },
      unitPrice:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      totalAmount:{
        type: DataTypes.INTEGER,
        allowNull: false
      },

  },
  {
    sequelize,
    modelName: "orderProduct",
    tableName: "orderProducts",
  }
);