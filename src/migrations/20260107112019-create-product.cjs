'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: DataTypes.UUIDV4
      },
      categoryID:{
        allowNull:false,
        type: Sequelize.STRING,
      references: {model:'Categories', key: 'id'},
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
      },
      description: {
        type: Sequelize.STRING,
        allowNull:false
      },
      unit: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      price:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status:{
        type: Sequelize.ENUM('available', 'sold out'),
        defaultValue: 'available' ,
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
    await queryInterface.dropTable('Products');
  }
};