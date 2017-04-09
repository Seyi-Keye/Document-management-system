/* eslint-disable no-unused-expressions */
import chai from 'chai';
import supertest from 'supertest';
import models from '../../models';
import app from '../../../server';
import helper from '../helpers/specHelpers';
import SeedHelper from '../helpers/seedHelper';

const server = supertest.agent(app);
const expect = chai.expect;

// const adminRole = helper.adminRole;
// const regularRole = helper.regularRole;
const adminUserDetails = helper.adminUser;
const regularUserDetails = helper.regularUser;
const publicDocument = helper.publicDocument;
const privateDocument = helper.privateDocument;

describe('Search document', () => {
  // eslint-disable-line no-unused-vars
  let document, regularToken, privDocument, regularUser, adminUser, adminToken;

  const promisify = (path, data, header) => new Promise((resolve, reject) => {
    server
      .post(path)
      .set('Content-Type', 'application/json')
      .set({ 'x-access-token': header || '' })
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
        return promisify('/api/v1/users/login', adminUserDetails);
      })
      .then((res) => {
        adminToken = res.body.token;
        privateDocument.OwnerId = adminUser.id;
      })
      .then(() => promisify('/api/v1/users', regularUserDetails))
      .then((res) => {
        regularUser = res.body.user;
        regularToken = res.body.token;
        publicDocument.OwnerId = res.body.user.id;
      })
      .then(() => promisify('/api/v1/documents', privateDocument, adminToken))
      .then((res) => {
        privDocument = res.body;
      })
      .then(() => promisify('/api/v1/documents', publicDocument, regularToken))
      .then((res) => {
        document = res.body;
        done();
      });
  });

  after((done) => {
    models.sequelize.sync({
      force: true
    }).then(() => done());
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
});
