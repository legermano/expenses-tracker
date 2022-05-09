'use strict';

module.exports = {
  async up (queryInterface, _) {
    return queryInterface.bulkInsert(`user`, [{
        username: 'John Doe',
        email: 'john.doe@gmail.com',
        // johndoe
        password: '$2y$08$8nstDmbpDOwwoiSKKUMSjeixz0xDWrPo86LcjRJkLxw8Oe7cvaIb6',
        createdAt: new Date(),
        updatedAt: new Date()
    }])
  },

  async down (queryInterface, _) {
    return queryInterface.bulkDelete(`user`, null, {} );
  }
};
