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
    password: faker.internet.password()
  },

  publicDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph()
  },
  userDetails: {
    firstname: 'Beauty',
    lastname: 'Lady',
    username: 'bealad',
    email: 'blad@gmail.com',
    password: faker.internet.password()
  },
  documentAdmin: {
    title: 'admin'
  }
};
