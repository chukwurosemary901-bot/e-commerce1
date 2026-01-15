'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: DataTypes.UUIDV4
      },
      userID: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {model: 'Users', key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      status:{
        allowNull: false,
        type: Sequelize.ENUM('pending', 'paid'),
        defaultValue: 'pending'
      },
      totalAmount:{
        allowNull: false,
        type: Sequelize.INTEGER
        
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
    await queryInterface.dropTable('Orders');
  }
};