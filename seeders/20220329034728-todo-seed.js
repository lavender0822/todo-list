'use strict';
const faker = require('faker')

const DEFAULT_COUNT = 10

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    await queryInterface.bulkInsert('Todos', 
    Array.from({ length: users.length * DEFAULT_COUNT }).map((_, i) =>
    ({
      name: faker.lorem.text().substring(0, 10),
      user_id: users[Math.floor(i/DEFAULT_COUNT)].id,
      is_done: false,
      date:  new Date(2022, 8, i),
      start_time: new Date(2022, 8, i, 8, 10),
      end_time: new Date(2022, 8, i, 9, 10),
      created_at: new Date(),
      updated_at: new Date()
    })
  ), {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Todos', null, {})
  }
};
