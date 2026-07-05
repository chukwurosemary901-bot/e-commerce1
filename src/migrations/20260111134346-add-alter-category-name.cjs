'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.renameColumn('Categories', 'description', 'name'
  )
  },

  async down (queryInterface, Sequelize) {
await queryInterface.renameColumn('Categories', 'name', 'description')
  }
};
