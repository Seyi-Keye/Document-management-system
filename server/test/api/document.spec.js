import chai from 'chai';
import supertest from 'supertest';
import models from '../../models';
import app from '../../../server';
import helper from '../helpers/specHelpers';
import SeedHelper from '../helpers/seedHelper';

const expect = chai.expect;
const publicDocument = helper.publicDocument;
const adminUser = helper.adminUser;
const regularUser = helper.regularUser;
const privateDocument = helper.privateDocument;
const server = supertest.agent(app);

describe('Document API:', () => {
  let privateDoc,
    admin,
    regular,
    adminToken,
    regularToken,
    document;

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
      .then(() => promisify('/api/v1/users', adminUser))
      .then((res) => {
        admin = res.body.user;
        adminToken = res.body.token;
        privateDocument.OwnerId = admin.id;
        return promisify('/api/v1/users', regularUser);
      })
      .then((res) => {
        regular = res.body.user;
        regularToken = res.body.token;
        publicDocument.OwnerId = regular.id;
        done();
      });
  });
  after((done) => {
    models.sequelize.sync({
      force: true
    });
    done();
  });

  it('Create document: has published date', (done) => {
    server
        .post('/api/v1/documents')
        .set({ 'x-access-token': regularToken })
        .send(publicDocument)
        .expect(201)
        .end((err, res) => {
          document = res.body;
          expect(res.body)
            .to
            .have
            .property('createdAt');
          expect(res.body.createdAt)
            .not
            .to
            .equal(null);
          done();
        });
  });

  it('Create document: has valid attributes', (done) => {
    expect(document)
        .to
        .have
        .property('title');
    expect(document)
        .to
        .have
        .property('content');
    done();
  });

  it('Create document: ensures that document has an owner', (done) => {
    server
        .post('/api/v1/documents')
        .set({ 'x-access-token': adminToken })
        .send(privateDocument)
        .expect(200)
        .end((err, res) => {
          privateDoc = res.body;
          expect(res.body.OwnerId)
            .to
            .equal(admin.id);
          done();
        });
  });

  it('Create document: ensures that document has role accessing it', (done) => {
    expect(document.access)
        .to
        .equal('public');
    expect(privateDoc.access)
        .to
        .equal('private');
    done();
  });

  it('Create document: ensures title is not null', (done) => {
    const nullTitleDoc = {
      title: null,
      content: 'content',
      OwnerId: 1
    };
    server
        .post('/api/v1/documents')
        .set({ 'x-access-token': adminToken })
        .send(nullTitleDoc)
        .expect(422)
        .end((err, res) => {
          expect(res.body.message[0])
            .to
            .equal('title cannot be null');
          done();
        });
  });

  describe('Find document', () => {
    it('returns all documents with pagination', (done) => {
      server
          .get('/api/v1/documents')
          .set({ 'x-access-token': adminToken })
          .expect(200)
          .end((err, res) => {
            expect(typeof res.body)
              .to
              .equal('object');
            expect(res.body.documents.length)
              .to
              .be
              .greaterThan(0);
            /* eslint no-unused-expressions: "error" */
            expect(res.body.pagination).not.be.null;
            done();
          });
    });

    it('returns error message for invalid input', (done) => {
      server
          .get('/api/v1/documents?limit=1&offset=asd')
          .set({ 'x-access-token': adminToken })
          .expect(400)
          .end((err, res) => {
            expect(typeof res.body)
              .to
              .equal('object');
            expect(res.body.message)
              .to
              .equal('invalid input syntax for integer: "asd"');
            done();
          });
    });

    it('returns all document with specified id to its owner', (done) => {
      server
          .get('/api/v1/documents/2')
          .set({ 'x-access-token': adminToken })
          .expect(200)
          .end((err, res) => {
            expect(typeof res.body)
              .to
              .equal('object');
            expect(res.body.OwnerId)
              .to
              .equal(admin.id);
            expect(res.body.title)
              .to
              .equal(privateDoc.title);
            done();
          });
    });

    it('fails to return a non-existing document', (done) => {
      server
          .get('/api/v1/documents/123')
          .set({ 'x-access-token': adminToken })
          .expect(404)
          .end((err, res) => {
            expect(res.body.message)
              .to
              .equal('Document Not Found');
            done();
          });
    });

    it('fails to return a document to non-permited users', (done) => {
      server
          .get('/api/v1/documents/2')
          .set({ 'x-access-token': regularToken })
          .expect(401)
          .end((err, res) => {
            expect(typeof res.body)
              .to
              .equal('object');
            expect(res.body.message)
              .to
              .equal('You cannot view this document');
            done();
          });
    });
  });

  describe('Update Document', () => {
    it('returns error message for invalid input', (done) => {
      server
          .get('/api/v1/documents/hello')
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

    it('fails to edit if invalid id is provided', (done) => {
      const newContent = {
        content: 'replace previous document'
      };
      server
          .put('/api/v1/documents/123')
          .set({ 'x-access-token': regularToken })
          .send(newContent)
          .expect(404)
          .end((err, res) => {
            expect(res.body.message)
              .to
              .equal('Document Not Found');
            done();
          });
    });

    it('fails to edit for un-authorized User', (done) => {
      const newContent = {
        content: 'replace previous document'
      };
      server
          .put('/api/v1/documents/1')
          .send(newContent)
          .expect(401, done);
    });

    it('fails to edit document if request is not made by the owner', (done) => {
      const newContent = {
        content: 'replace previous document'
      };
      server
          .put('/api/v1/documents/2')
          .set({ 'x-access-token': regularToken })
          .send(newContent)
          .end((err, res) => {
            expect(res.status)
              .to
              .equal(401);
            expect(res.body.message)
              .to
              .equal('You cannot update this document');
            done();
          });
    });

    it('edits document if valid id is provided', (done) => {
      const newContent = {
        content: 'replace previous document'
      };
      server
          .put('/api/v1/documents/2')
          .set({ 'x-access-token': adminToken })
          .send(newContent)
          .end((err, res) => {
            expect(res.status)
              .to
              .equal(200);
            expect(res.body.content)
              .to
              .equal(newContent.content);
            done();
          });
    });
  });

  describe('Delete document', () => {
    it('returns error message for invalid input', (done) => {
      server
          .get('/api/v1/documents/hello')
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
  });

  it('Fails to delete if user is not authorized', (done) => {
    const newContent = {
      content: 'replace previous document'
    };
    server
        .delete('/api/v1/documents/2')
        .send(newContent)
        .expect(401, done);
  });

  it('Fails to delete a document if request is not made by owner', (done) => {
    server
        .delete('/api/v1/documents/2')
        .set({ 'x-access-token': regularToken })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(401);
          expect(res.body.message)
            .to
            .equal('You cannot delete this document');
          done();
        });
  });

  it('deletes a document', (done) => {
    server
        .delete('/api/v1/documents/1')
        .set({ 'x-access-token': regularToken })
        .expect(200)
        .end((err, res) => {
          expect(typeof res.body)
            .to
            .equal('object');
          expect(res.body.message)
            .to
            .equal('Document Deleted');
          done();
        });
  });

  it('Should fail if document does not exist', (done) => {
    server
        .delete('/api/v1/documents/123')
        .set({ 'x-access-token': regularToken })
        .expect(404)
        .end((err, res) => {
          expect(typeof res.body)
            .to
            .equal('object');
          expect(res.body.message)
            .to
            .equal('Document Not Found');
          done();
        });
  });
});

