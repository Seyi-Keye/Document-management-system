/* eslint-disable no-unused-expressions, no-unused-vars */
import chai from 'chai';
import supertest from 'supertest';
import models from '../../models';
import app from '../../../server';
import helper from '../helpers/specHelpers';
import SeedHelper from '../helpers/seedHelper';

const server = supertest.agent(app);
const expect = chai.expect;

const adminRoleParam = helper.adminRole;
const regularRoleParam = helper.regularRole;
const adminUserParam = helper.adminUser;
const regularUserParam = helper.regularUser;
const testUserParam = helper.userDetails;

describe('User api', () => {
  let
    adminRole,
    regularRole,
    adminUser,
    regularUser,
    adminToken,
    testUser,
    regularToken;

  const promisify = (path, data, token) => new Promise((resolve, reject) => {
    server
      .post(path)
      .set('Content-Type', 'application/json')
      .send(data)
      .end((err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
  });

  before((done) => {
    SeedHelper
      .init()
      .then((res) => {
        adminUser = res[1];
        return promisify('/api/v1/users/login', adminUserParam);
      })
      .then((res) => {
        adminToken = res.body.token;
        done();
      });
  });

  after((done) => {
    models
      .sequelize
      .sync({ force: true })
      .then(() => done());
  });

  describe('User sign in', () => {
    it('signs a user in with correct email and password', (done) => {
      server
        .post('/api/v1/users/login')
        .send({ email: adminUser.email, password: adminUserParam.password })
        .expect(200)
        .end((err, res) => {
          expect(typeof res.body.token)
            .to
            .equal('string');
          done();
        });
    });

    it('fails on incorrect email and/or password', (done) => {
      server
        .post('/api/v1/users/login')
        .send({ username: 'incorrect user', password: 'incorrect password' })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
            .to
            .equal('User not found');
          done();
        });
    });

    it('logs a user out', (done) => {
      server
        .post('/api/v1/users/logout')
        .expect(200)
        .end((err, res) => {
          expect(res.body.message)
            .to
            .equal('You have been Logged out');
          done();
        });
    });
  });

  describe('Create an Admin user: Validation:', () => {
    it('fails to create an admin user', (done) => {
      server
        .post('/api/v1/users')
        .send(adminUserParam)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message)
            .to
            .equal('Creation of Admin User Forbidden');
          done();
        });
    });

    it('tests if new user has first name and last name', (done) => {
      server
        .post('/api/v1/users')
        .set({ 'x-access-token': adminToken })
        .send(regularUserParam)
        .expect(200)
        .end((err, res) => {
          regularUser = res.body.user;
          regularToken = res.body.token;
          expect(regularUser.firstname).to.exist;
          expect(regularUser.lastname).to.exist;
          done();
        });
    });

    it('ensures new user has a role', (done) => {
      server
        .post('/api/v1/users')
        .set({ 'x-access-token': adminToken })
        .expect(200)
        .end((err, res) => {
          expect(regularUser)
            .to
            .have
            .property('RoleId');
          expect(regularUser.RoleId)
            .to
            .equal(2);
          done();
        });
    });

    it(`ensures user cannot be created if one of email or
     password is lacking.`, (done) => {
      testUserParam.email = null;
      testUserParam.password = null;
      server
        .post('/api/v1/users')
        .set({ 'x-access-token': adminToken })
        .send(testUserParam)
        .expect(422)
        .end((err, res) => {
          expect(res.body.message[0])
            .to
            .equal('email cannot be null');
          expect(res.body.message[1])
            .to
            .equal('password cannot be null');
          done();
        });
    });
  });

  describe('Find a user', () => {
    it('fails to get request if token is invalid', (done) => {
      server
        .get('/api/v1/users/')
        .set({ 'x-access-token': 'invalidXYZABCtoken' })
        .expect(406)
        .end((err, res) => {
          expect(res.body.message)
            .to
            .be
            .equal('Invalid token');
          done();
        });
    });

    it('returns error message for invalid input', (done) => {
      server
        .get('/api/v1/users/hello')
        .set({ 'x-access-token': adminToken })
        .expect(400)
        .end((err, res) => {
          expect(typeof res.body)
            .to
            .equal('object');
          expect(res.body.message)
            .to
            .equal('invalid input syntax for integer: "hello"');
          done();
        });
    });

    it('fails to return a user if id is invalid', (done) => {
      server
        .get('/api/v1/users/123')
        .set({ 'x-access-token': adminToken })
        .expect(404)
        .end((err, res) => {
          expect(res.body.message)
            .to
            .be
            .equal('User not found');
          done();
        });
    });

    it('returns all users with pagination', (done) => {
      const fields = ['id', 'username', 'lastname', 'email', 'RoleId'];
      server
        .get('/api/v1/users?limit=1&offset=0')
        .set({ 'x-access-token': adminToken })
        .expect(200)
        .end((err, res) => {
          expect(Array.isArray(res.body.users))
            .to
            .equal(true);
          fields.forEach((field) => {
            expect(res.body.users[0])
              .to
              .have
              .property(field);
          });
          expect(res.body.pagination).to.not.be.null;
          done();
        });
    });

    it('returns user with a correct id', (done) => {
      server
        .get(`/api/v1/users/${regularUser.id}`)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(200);
          expect(regularUser.email)
            .to
            .equal(regularUserParam.email);
          done();
        });
    });
  });

  describe('Update user', () => {
    it('returns error message for invalid input', (done) => {
      server
        .get('/api/v1/users/hello')
        .set({ 'x-access-token': adminToken })
        .expect(400)
        .end((err, res) => {
          expect(typeof res.body)
            .to
            .equal('object');
          expect(res.body.message)
            .to
            .equal('invalid input syntax for integer: "hello"');
          done();
        });
    });

    it('fails to update a user that does not exist', (done) => {
      server
        .put('/api/v1/users/783')
        .set({ 'x-access-token': adminToken })
        .expect(404)
        .end((err, res) => {
          expect(typeof res.body)
            .to
            .equal('object');
          expect(res.body.message)
            .to
            .equal('User not found');
          done();
        });
    });

    it('returns all users with pagination', (done) => {
      const fields = ['id', 'username', 'lastname', 'email', 'RoleId'];
      server
        .get('/api/v1/users?limit=1&offset=0')
        .set({ 'x-access-token': adminToken })
        .expect(200)
        .end((err, res) => {
          expect(Array.isArray(res.body.users))
            .to
            .equal(true);
          fields.forEach((field) => {
            expect(res.body.users[0])
              .to
              .have
              .property(field);
          });
          expect(res.body.pagination).to.not.be.null;
          done();
        });
    });

    it('returns user with a correct id', (done) => {
      server
        .get(`/api/v1/users/${regularUser.id}`)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(200);
          expect(regularUser.email)
            .to
            .equal(regularUserParam.email);
          done();
        });
    });

    it('fails to update a user if user is not authorized', (done) => {
      server
        .put('/api/v1/users/783')
        .expect(401)
        .end((err, res) => {
          expect(typeof res.body)
            .to
            .equal('object');
          expect(res.body.message)
            .to
            .equal('Token required for access');
          done();
        });
    });

    it('fails if a regular user is assigned an admin role by non-admin ', (done) => {
      server
        .put('/api/v1/users/2')
        .set({ 'x-access-token': regularToken })
        .send({ RoleId: 1, lastname: 'Ben' })
        .expect(401)
        .end((err, res) => {
          expect(typeof res.body)
            .to
            .equal('object');
          expect(res.body.error)
            .to
            .equal('Not authorized');
          done();
        });
    });

    it('fails to update a user if request is not made by the user', (done) => {
      server
        .put('/api/v1/users/1')
        .set({ 'x-access-token': regularToken })
        .send({ firstname: 'Oluwaseyi', lastname: 'Aromokeye' })
        .expect(401)
        .end((err, res) => {
          expect(typeof res.body)
            .to
            .equal('object');
          expect(res.body.error)
            .to
            .equal('Not authorized');
          done();
        });
    });

    it('edits and updates a user', (done) => {
      server
        .put(`/api/v1/users/${adminUser.id}`)
        .set({ 'x-access-token': adminToken })
        .send({ firstname: 'Aromokeye', lastname: 'Omolade', password: 'new password' })
        .expect(200)
        .end((err, res) => {
          expect(typeof res.body)
            .to
            .equal('object');
          expect(res.body.firstname)
            .to
            .equal('Aromokeye');
          expect(res.body.lastname)
            .to
            .equal('Omolade');
          done();
        });
    });
  });

  describe('Delete user', () => {
    it('returns error message for invalid input', (done) => {
      server
        .get('/api/v1/users/hello')
        .set({ 'x-access-token': adminToken })
        .expect(400)
        .end((err, res) => {
          expect(typeof res.body)
            .to
            .equal('object');
          expect(res.body.message)
            .to
            .equal('invalid input syntax for integer: "hello"');
          done();
        });
    });

    it('fails to delete a user by non-admin user', (done) => {
      server
        .delete(`/api/v1/users/${regularUser.id}`)
        .set({ 'x-access-token': regularToken })
        .expect(401)
        .end((err, res) => {
          expect(typeof res.body)
            .to
            .equal('object');
          expect(res.body.error)
            .to
            .equal('Not authorized');
          done();
        });
    });

    it('fails when admin wants to delete self', (done) => {
      server
        .delete(`/api/v1/users/${adminUser.id}`)
        .set({ 'x-access-token': adminToken })
        .expect(401)
        .end((err, res) => {
          expect(typeof res.body)
            .to
            .equal('object');
          expect(res.body.message)
            .to
            .equal('User is deleted');
          done();
        });
    });
    it('fails to delete a user if user is not authorized', (done) => {
      server
        .delete('/api/v1/users/1')
        .expect(401)
        .end((err, res) => {
          expect(typeof res.body)
            .to
            .equal('object');
          expect(res.body.message)
            .to
            .equal('Token required for access');
          done();
        });
    });

    it('fail to delete a user that does not exist', (done) => {
      server
        .delete('/api/v1/users/123')
        .set({ 'x-access-token': adminToken })
        .expect(404)
        .end((err, res) => {
          expect(typeof res.body)
            .to
            .equal('object');
          expect(res.body.message)
            .to
            .equal('User not found');
          done();
        });
    });

    it('finds and deletes a user if user exist', (done) => {
      server
        .delete(`/api/v1/users/${regularUser.id}`)
        .set({ 'x-access-token': adminToken })
        .expect(200)
        .end((err, res) => {
          expect(typeof res.body)
            .to
            .equal('object');
          expect(res.body.message)
            .to
            .equal('User is deleted');
          done();
        });
    });
  });
});
