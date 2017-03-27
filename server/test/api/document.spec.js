import chai from 'chai';
import supertest from 'supertest';
import { Document, Role, User } from '../../models';
import app from '../../../server';
import helper from '../helpers/specHelpers';
import jwt from 'jsonwebtoken';

const expect = chai.expect;
const publicDocument = helper.publicDocument;
const adminUser = helper.adminUser;
const regularUser = helper.regularUser;
const privateDocument = helper.privateDocument;
const request = supertest.agent(app);

describe('Document API:', () => {
  let privateDoc;
  let admin;
  let regular;
  let adminToken;
  let regularToken;
  let document;

  // Login users to access this endpoint
  before((done) => {
    request.post('/users')
      .send(adminUser)
      .end((err, res) => {
        admin = res.body.user;
        adminToken = res.body.token;
        privateDocument.OwnerId = admin.id;

        request.post('/users')
          .send(regularUser)
          .end((err, res) => {
            regular = res.body.user;
            regularToken = res.body.token;
            publicDocument.OwnerId = regular.id;
            done();
          });
      });
  });

  after((done) => {
    User.destroy({
      where: {}
    });
    Document.destroy({
      where: {}
    });
    Role.destroy({
      where: {}
    });
    done();
  });

  describe('Create document', () => {
    // beforeEach((done) => {
    //   request.post('/documents')
    //     .send(publicDocument)
    //     .set({ Authorization: regularToken })
    //     .end((err, res) => {
    //       if (err) return err;
    //       documentResponse = res;
    //       done();
    //     });
    // });
    it('has published date', (done) => {
      request.post('/documents')
        .set({ 'x-access-token': regularToken })
        .send(publicDocument)
        .expect(201)
        .end((err, res) => {
          document = res.body;
          expect(res.body).to.have.property('createdAt');
          expect(res.body.createdAt).not.to.equal(null);
          done();
        });
    });

    it('Should have valid attributes', (done) => {
      expect(document).to.have.property('title');
      expect(document).to.have.property('content');
      done();
    });

    it('Should ensure that document has an owner', (done) => {
      request.post('/documents')
        .set({ 'x-access-token': adminToken })
        .send(privateDocument)
        .expect(200)
        .end((err, res) => {
          privateDoc = res.body;
          console.log('Private doc///////', privateDoc);
          expect(res.body.ownerId).to.equal(adminUser.id);
          done();
        });
    });

    it('Should ensure that document has a role that can access it', (done) => {
      expect(document.access).to.equal('public');
      // expect(privateDoc.access).to.equal('private');
      done();
    });
  });
});
