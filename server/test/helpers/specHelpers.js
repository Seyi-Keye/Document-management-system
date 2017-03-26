import faker from 'faker';

if (process.env.NODE_ENV !== 'test') {
  process.exit(1);
}
module.exports = {
  adminRole: {
    title: 'admin'
  },

  regularRole: {
    title: 'regular'
  },
  newRole: {
    title: 'spatacus'
  },

  regularUser: {
    firstname: 'oluwaseyi',
    lastname: 'Aromokeye',
    username: 'seyikeye',
    email: 'aromokeyes2@gmail.com',
    password: faker.internet.password(),
    RoleId: 2
  },

  adminUser: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 1
  },

  createdByAdmin: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },


  publicDocument: {
    title: 'Gottta',
    content: faker.lorem.paragraph()
  },
  userDetails: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  documentAdmin: {
    title: 'admin'
  }
};
