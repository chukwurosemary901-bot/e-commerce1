'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
await queryInterface.addColumn('Users', 'role', {
  type: Sequelize.ENUM('Administrator', 'Customer', 'Staff'),
  allowNull: false,
  defaultValue: "Customer"

})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'role')
  }
};
