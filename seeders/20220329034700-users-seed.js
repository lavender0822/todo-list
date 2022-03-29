'use strict';
const bcrypt = require('bcryptjs')

const DEFAULT_PASSWORD = '12345678'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'user1',
      email: 'user1@example.com',
      account: 'user1',
      password: await bcrypt.hash(DEFAULT_PASSWORD, 10),
      created_at: new Date(),
      updated_at: new Date()
    },{
      name: 'user2',
      email: 'user2@example.com',
      account: 'user2',
      password: await bcrypt.hash(DEFAULT_PASSWORD, 10),
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
