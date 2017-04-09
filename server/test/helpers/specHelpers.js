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
    firstname: 'admin',
    lastname: 'admin',
    username: 'admin',
    email: 'admin@gmail.com',
    password: 'password',
    RoleId: '1'
  },
  adminUser1: {
    firstname: 'fatima',
    lastname: 'fathia',
    username: 'fati',
    email: 'fatima@gmail.com',
    password: 'fatima',
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
    title: 'Its out there',
    content: faker.lorem.paragraph()
  },
  privateDocument: {
    title: 'My Secret',
    content: faker.lorem.paragraph(),
    access: 'private',
    OwnerId: 1
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
