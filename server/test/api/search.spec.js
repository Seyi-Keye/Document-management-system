/* eslint-disable no-unused-expressions */
import chai from 'chai';
import supertest from 'supertest';
import models from '../../models';
import app from '../../../server';
import helper from '../helpers/specHelpers';
import SeedHelper from '../helpers/seedHelper';

const server = supertest.agent(app);
const expect = chai.expect;

const adminRole = helper.adminRole;
const regularRole = helper.regularRole;
const adminUserDetails = helper.adminUser;
const regularUserDetails = helper.regularUser;
const publicDocument = helper.publicDocument;
const privateDocument = helper.privateDocument;

describe('Search document', () => {
  // eslint-disable-line no-unused-vars
  let document, regularToken, privDocument, regularUser, adminUser, adminToken;

  before((done) => {
    SeedHelper
      .init()
      .then(() => {
        server
          .post('/api/v1/users')
          .send(adminUserDetails)
          .end((error, response) => {
            adminUser = response.body.user;
            adminToken = response.body.token;
            privateDocument.OwnerId = response.body.user.id;

            server
              .post('/api/v1/users')
              .send(regularUserDetails)
              .end((err, res) => {
                regularUser = res.body.user;
                regularToken = res.body.token;
                publicDocument.OwnerId = res.body.user.id;

                server
                  .post('/api/v1/documents')
                  .set({ 'x-access-token': adminToken })
                  .send(privateDocument)
                  .end((err, res) => {
                    privDocument = res.body;

                    server
                      .post('/api/v1/documents')
                      .set({ 'x-access-token': regularToken })
                      .send(publicDocument)
                      .end((err, res) => {
                        document = res.body;
                        done();
                      });
                  });
              });
          });
      });
  });

  after(() => {
    models.sequelize.sync({ force: true });
  });

  describe('Search document', () => {
    it('searches document for a string query', (done) => {
      server
        .get('/api/v1/search/documents/?query=out&limit=1&offset=0')
        .set({ 'x-access-token': adminToken })
        .expect(201)
        .end((err, res) => {
          expect(typeof res.body)
            .to
            .equal('object');
          expect(res.body.documents).to.exist;
          expect(res.body.documents[0].title)
            .to
            .equal('Its out there');
          expect(res.body.pagination).to.not.be.null;
          done();
        });
    });

    it('returns error message for invalid input', (done) => {
      server
        .get('/api/v1/search/documents?q=out&limit=1&offset=hello')
        .set({ 'x-access-token': adminToken })
        .expect(200)
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



    it('returns error message for invalid input', (done) => {
      server
        .get('/api/v1/documents/limit=1&offset=hello')
        .set({ 'x-access-token': regularToken })
        .expect(200)
        .end((err, res) => {
          expect(typeof res.body)
            .to
            .equal('object');
          expect(res.body.message)
            .to
            .equal('invalid input syntax for integer: "limit=1&offset=hello"');
          done();
        });
    });
  });

  describe('Search User :', () => {
    it('Search User', () => {
      expect(true).equal(true);
    });
  });
});
