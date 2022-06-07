'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Lists', 'description', {
      type: Sequelize.TEXT
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Lists', 'description')
  }
};
