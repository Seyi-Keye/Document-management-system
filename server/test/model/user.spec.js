/* eslint no-unused-expressions: "off"*/
import chai from 'chai';
import models from '../../models';
import helper from '../helpers/specHelpers';
import SeedHelper from '../helpers/seedHelper';

const expect = chai.expect;

const userAttributes = [
  'firstname',
  'lastname',
  'username',
  'email',
  'password',
  'RoleId',
];
const regularUser = helper.regularUser;
const User = models.User;
let newUser;

describe('User Model Unit Test', () => {
  before((done) => {
    SeedHelper.init().then(() => {
      done();
    });
  });
  after((done) => {
    models.sequelize.sync({ force: true }).then(() => done());
  });

  describe('Create User', () => {
    it('ensures a new user is created', (done) => {
      User.create(regularUser).then((user) => {
        newUser = user;
        expect(newUser.firstname).equal(regularUser.firstname);
        expect(newUser.lastname).equal(regularUser.lastname);
        expect(newUser.username).equal(regularUser.username);
        expect(newUser.email).equal(regularUser.email);
        done();
      });
    });

    it('ensures password is hashed', () => {
      expect(newUser.password).to.not.equal(regularUser.password);
    });
  });

  describe('Unique Email and Username', () => {
    it('ensures no duplicate username', (done) => {
      User.create(regularUser).catch((error) => {
        expect(/SequelizeUniqueConstraintError/.test(error.name)).to.be.true;
        done();
      });
    });
    it('ensures no duplicate email address', (done) => {
      User.create(regularUser).catch((error) => {
        expect(/SequelizeUniqueConstraintError/.test(error.name)).to.be.true;
        done();
      });
    });
  });

  describe('Not Null Validations', () => {
    userAttributes.forEach((field) => {
      it(`fails without ${field}`, (done) => {
        const assignedUser = Object.assign({}, regularUser);
        assignedUser[field] = null;
        User.create(assignedUser)
          .then((nullUser) => expect(nullUser).to.not.exist)
          .catch((error) => {
            expect(/notNull Violation/.test(error.message)).to.be.true;
            done();
          });
      });
    });
  });

  describe('Mininmum characters', () => {
    it('ensures lastname is at least 3 characters', (done) => {
      expect(newUser.lastname.length).to.be.above(2);
      done();
    });

    it('ensures firstname is at least 3 characters', (done) => {
      expect(newUser.firstname.length).to.be.above(2);
      done();
    });

    it('ensures username is at least 3 characters', (done) => {
      expect(newUser.username.length).to.be.above(2);
      done();
    });
  });

  describe('Password Validation', () => {
    it('should be valid if compared', () => {
      User.findByPk(newUser.id).then((getUser) => {
        expect(getUser.validPassword(regularUser.password)).to.be.true;
      });
    });
  });
});
