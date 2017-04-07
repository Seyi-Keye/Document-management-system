import supertest from 'supertest';
import chai from 'chai';
import app from '../../../server';
import specHelpers from '../helpers/specHelpers';
import Authentication from '../../middleware/Authentication';
import {Document, Role, User} from '../../models';
import SeedHelper from '../helpers/seedHelper';

const request = supertest.agent(app);
const expect = chai.expect;
const adminUser = specHelpers.adminUser;
let token;
let role;

describe('Document Api', () => {
  before((done) => {
    SeedHelper
      .init()
      .then(() => {
        Role
          .findOne({
          where: {
            title: 'admin'
          }
        })
          .then((foundAdmin) => {
            adminUser.RoleId = foundAdmin.dataValues.id;
            User
              .create(adminUser)
              .then(() => {
                request
                  .post('/users/login')
                  .send(adminUser)
                  .end((err, res) => {
                    if (err)
                      return err;
                    token = res.body.token;
                    done();
                  });
              });
          });
      });
  });

  after((done) => {
    User.destroy({where: {}});
    Document.destroy({where: {}});
    done();
  });

  describe('Create Role', () => {
    Role
      .findOne({
      where: {
        title: 'regular'
      }
    })
      .then((regular) => {
        role = regular;
      });
    it('fails to get all roles without authorized token', (done) => {
      request
        .get('/api/v1/roles')
        .end((err, res) => {
          if (err)
            return err;
          expect(res.status)
            .to
            .equal(401);
          expect(res.body.message)
            .to
            .equal('Token required for access');
          done();
        });
    });

    it('returns all roles to an admin user', (done) => {
      const token = Authentication.generateToken();
      console.log(token)
      request
        .get('/api/v1/roles')
        .set({Authorization: token})
        .end((err, res) => {
          if (err)
            return err;
          expect(res.status)
            .to
            .equal(200);
          done();
        });
    });

    it('fails to create new role on null title', () => {
      request
        .post('/api/v1/roles')
        .set({Authorization: token})
        .send({})
        .end((err, response) => {
          if (err)
            return err;
          expect(response.status)
            .to
            .equal(403);
        });
    });

    it('fails to create duplicate role', () => {
      request
        .post('/api/v1/roles')
        .set({Authorization: token})
        .send({title: 'admin'})
        .end((err, response) => {
          if (err)
            return err;
          expect(response.status)
            .to
            .equal(409);
        });
    });

    it('fails for invalid attributes', () => {
      request
        .post('/api/v1/roles')
        .send({name: 'hello'})
        .set({Authorization: token})
        .end((err, response) => {
          if (err)
            return err;
          expect(response.status)
            .to
            .equal(403);
        });
    });

    it('returns correct role when a valid id is passed', (done) => {
      request
        .get(`/api/v1/roles/${role.id}`)
        .set({Authorization: token})
        .end((err, response) => {
          if (err)
            return err;
          expect(response.status)
            .to
            .equal(200);
          done();
        });
    });

    it('should update an existing role', (done) => {
      request
        .put(`/api/v1/roles/${role.id}`)
        .send({title: 'role'})
        .set({Authorization: token})
        .end((err, response) => {
          if (err)
            return err;
          expect(response.status)
            .to
            .equal(200);
          done();
        });
    });

    it('deletes a role', (done) => {
      request
        .delete(`/api/v1/roles/${role.id}`)
        .set({Authorization: token})
        .end((err, response) => {
          if (err)
            return err;
          expect(response.status)
            .to
            .equal(200);
          done();
        });
    });
  });
});
