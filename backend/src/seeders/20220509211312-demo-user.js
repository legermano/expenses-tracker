module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(`user`, [
      {
        username: 'John Doe',
        email: 'john.doe@gmail.com',
        // Johdo&123
        password:
          '$2y$08$.9lfhjkNUQyCH2PFbgiDEu0ZQtVauCIQOmeC0klQr2g2AraxEyoO.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    queryInterface.bulkDelete(`expense`, null, {});
    return queryInterface.bulkDelete(`user`, null, {});
  },
};
