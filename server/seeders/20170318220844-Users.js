const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      id: 1,
      username: process.env.username,
      firstname: process.env.firstname,
      lastname: process.env.lastname,
      email: process.env.email,
      password: bcrypt.hashSync(process.env.password,
        bcrypt.genSaltSync(8)),
      RoleId: process.env.RoleId,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], { returning: true });
  },

  down (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users',
    { username: [process.env.USERNAME] }
    );
  }
};
