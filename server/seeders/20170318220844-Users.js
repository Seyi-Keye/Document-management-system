const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      id: 1,
      username: process.env.USERNAME,
      firstName: process.env.FIRSTNAME,
      lastName: process.env.LASTNAME,
      email: process.env.EMAIL,
      password: bcrypt.hashSync(process.env.password,
        bcrypt.genSaltSync(8)),
      token: process.env.TOKEN,
      RoleId: process.env.ROLEID,
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
