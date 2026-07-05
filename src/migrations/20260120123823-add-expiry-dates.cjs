'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 await queryInterface.addColumn('Users', 'expiresAt', {
  type: Sequelize.DATE,
  allowNull: false,
defaultValue: Sequelize.literal(`NOW() + INTERVAL '4 WEEKS'`)

 })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'expiresAt')
  }
};
