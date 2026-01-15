'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cartItems', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: DataTypes.UUIDV4
      },
      cartID:{
        allowNull: false,
        type: Sequelize.STRING,
        references: {model: 'Carts', key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      productID:{
        allowNull: false,
        type: Sequelize.STRING,
        references: {model: 'Products', key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      quantity:{
        type: Sequelize.INTEGER,
        allowNull:false,

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
    await queryInterface.dropTable('cartItems');
  }
};