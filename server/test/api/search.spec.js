/* eslint-disable no-unused-expressions */
import chai from 'chai';
import supertest from 'supertest';
import { Docment, Role, User } from '../../models';
import app from '../../../server';
import helper from '../helpers/specHelpers';

const request = supertest.agent(app);
const expect = chai.expect;

const adminRole = helper.adminRole;
const regularRole = helper.regularRole;
const adminUserDetails = helper.adminUser;
const regularUserDetails = helper.regularUser;
const publicDocument = helper.publicDocument;
const privateDocument = helper.privateDocument;

describe('Search document', () => {
  let document; // eslint-disable-line no-unused-vars
  let regularToken;
  let privDocument;
  let regularUser;
  let adminUser
  let adminToken;

  before((done) => {
    Role.findOne({ where: { title: 'admin' } })
    .then((foundAdmin) => {
      adminUser.RoleId = foundAdmin.dataValues.id;
      console.log('adminUser.RoleId......', adminUser.RoleId);
      Role.findOne({ where: { title: 'regular' } })
      .then((foundRegular) => {
        regularUser.RoleId = foundRegular.dataValues.id;

        request.post('/users')
          .send(adminUserDetails)
          .end((error, response) => {
            adminUser = response.body.user;
            adminToken = response.body.token;
            privateDocument.OwnerId = adminUser.id;

            request.post('/users')
              .send(regularUserDetails)
              .end((err, res) => {
                regularUser = res.body.user;
                regularToken = res.body.token;
                publicDocument.OwnerId = regularUser.id;

                request.post('/documents')
                .set({ 'x-access-token': adminToken })
                .send(privateDocument)
                .end((err, res) => {
                  privDocument = res.body;

                  request.post('/documents')
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
  });

  after(() => {
    User.sequelize.sync({ force: true });
    Docment.sequelize.sync({ force: true });
  });

  describe('find document', () => {
    it('searches document for a string query', (done) => {
      request.get('/documents/search?query=Secret&limit=1&offset=0')
        .set({ 'x-access-token': adminToken })
        .expect(201)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.documents).to.exist;
          expect(res.body.documents[0].title).to.equal('My Secret');
          expect(res.body.pagination).to.not.be.null;
          done();
        });
    });
  });
});

