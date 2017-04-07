import supertest from 'supertest';
import chai from 'chai';
import app from '../../../server';
import specHelpers from '../helpers/specHelpers';
import models from '../../models';
import SeedHelper from '../helpers/seedHelper';

const server = supertest.agent(app);
const expect = chai.expect;
const adminUser = specHelpers.adminUser;

describe('Role Api:', () => {
  let token, regularRole;

  const promisify = (path, data) => new Promise((resolve, reject) => {
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
      .then(() => models.Role
      .findOne({
        where: {
          title: 'admin'
        }
      }))
  .then((foundAdmin) => {
    adminUser.RoleId = foundAdmin.dataValues.id;
    return models.User.create(adminUser);
  })
  .then(() => promisify('/api/v1/users/login', adminUser))
  .then((res) => {
    token = res.body.token;
    return models.Role
    .findOne({
      where: {
        title: 'regular'
      }
    });
  })
  .then((regular) => {
    regularRole = regular;
    done();
  });
  });

  after((done) => {
    models
      .sequelize
      .sync({ force: true });
    done();
  });

  describe('Create Role', () => {
    it('fails to create new role on null title', () => {
      server
      .post('/api/v1/roles')
      .set({ Authorization: token })
      .send({})
      .end((err, response) => {
        if (err) {
          return err;
        }
        expect(response.status)
          .to
          .equal(400);
      });
    });

    it('fails to create duplicate role', () => {
      server
      .post('/api/v1/roles')
      .set({ Authorization: token })
      .send({ title: 'admin' })
      .end((err, response) => {
        if (err) {
          return err;
        }
        expect(response.status)
          .to
          .equal(400);
      });
    });

    it('fails for invalid attributes', () => {
      server
      .post('/api/v1/roles')
      .send({ name: 'hello' })
      .set({ Authorization: token })
      .end((err, response) => {
        if (err) {
          return err;
        }
        expect(response.status)
          .to
          .equal(400);
      });
    });
  });

  describe('Get Roles: ', () => {
    it('Finds role: fails to get all roles without authorized token', (done) => {
      server
      .get('/api/v1/roles')
      .end((err, res) => {
        if (err) {
          return err;
        }
        expect(res.status)
          .to
          .equal(401);
        expect(res.body.message)
          .to
          .equal('Token required for access');
        done();
      });
    });

    it('Finds role: returns all roles to an admin user', (done) => {
      server
      .get('/api/v1/roles')
      .set({ Authorization: token })
      .end((err, res) => {
        if (err) {
          return err;
        }
        expect(res.status)
          .to
          .equal(200);
        done();
      });
    });

    it('Find role: returns correct role when a valid id is passed', (done) => {
      server
      .get(`/api/v1/roles/${regularRole.dataValues.id}`)
      .set({ Authorization: token })
      .end((err, response) => {
        if (err) {
          return err;
        }
        expect(response.status)
          .to
          .equal(200);
        done();
      });
    });
  });

  describe('Update and delete Role: ', () => {
    it('Update role: should update an existing role', (done) => {
      server
      .put(`/api/v1/roles/${regularRole.dataValues.id}`)
      .send({ title: 'role' })
      .set({ Authorization: token })
      .end((err, response) => {
        if (err) {
          return err;
        }
        expect(response.status)
          .to
          .equal(200);
        done();
      });
    });

    it('Delete role: deletes a role', (done) => {
      server
      .delete(`/api/v1/roles/${regularRole.dataValues.id}`)
      .set({ Authorization: token })
      .end((err, response) => {
        if (err) {
          return err;
        }
        expect(response.status)
          .to
          .equal(200);
        done();
      });
    });
  });
});
