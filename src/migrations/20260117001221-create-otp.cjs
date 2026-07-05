'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OTPs', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: DataTypes.UUIDV4
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {model:'Users', key:'email'},
        onDelete: 'CASCADE'
      },
      otp:{
        type: Sequelize.STRING,
        allowNull: false
      },
      expiresAt:{
      allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('OTPs');
  }
};