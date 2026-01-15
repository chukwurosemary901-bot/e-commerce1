'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orderProducts', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: DataTypes.UUIDV4
      },
      orderID: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {model: 'Orders', key: 'id'},
        onDelete:'CASCADE',
        onUpdate: 'CASCADE'
      },
      productID: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {model: 'Products', key: 'id'},
        onDelete:'CASCADE',
        onUpdate: 'CASCADE'
      },
    
      quantity:{
        allowNull: false,
        type: Sequelize.INTEGER
      },
      unitPrice:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      totalAmount:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orderProducts');
  }
};