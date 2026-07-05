'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn('Products','images', {
  type: Sequelize.STRING,
  defaultValue: 'null'

   })
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.removeColumn('Products', 'images')
  }
};
