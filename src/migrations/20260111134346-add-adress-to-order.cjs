'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.addColumn('Orders', 'address',{
    allowNull:false,
    type: Sequelize.STRING
  })
  },

  async down (queryInterface, Sequelize) {
await queryInterface.removeColumn('Orders', 'address')
  }
};
