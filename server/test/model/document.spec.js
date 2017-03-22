/* eslint no-unused-expressions: "off"*/
import chai from 'chai';
import models from '../../models';
import helper from '../helpers/specHelpers';

const expect = chai.expect;

const documentAttributes = ['title', 'content', 'OwnerId', 'access'];
const testDocument = helper.testDocument;
const testUser = helper.regularUser;
const User = models.User;
const Document = models.Document;
let newDocument;
let newUser;

describe('Document Model Unit Test', () => {
  before((done) => {
    User.create(testUser)
      .then((user) => {
        newUser = user;
        done();
      });
  });

  after((done) => {
    User.destroy({ where: {} });
    done();
  });

  describe('Create Document', () => {
    it('ensures a new document is created', (done) => {
      testDocument.OwnerId = newUser.id;
      Document.create(testDocument)
        .then((document) => {
          newDocument = document;
          expect(newDocument.title).equal(testDocument.title);
          expect(newDocument.content).equal(testDocument.content);
          expect(newDocument).have.property('createdAt');
          expect(newDocument.OwnerId).equal(testDocument.OwnerId);
          done();
        });
    });
  });

  describe('Not Null Validations', () => {
    documentAttributes.forEach((field) => {
      it(`fails without ${field}`, (done) => {
        const assignedDocument = Object.assign({}, testDocument);
        assignedDocument[field] = null;
        Document.create(assignedDocument)
          .then(nullDocument =>
          expect(nullDocument).to.not.exist)
          .catch((error) => {
            expect(/notNull Violation/.test(error.message)).to.be.true;
            done();
          });
      });
    });
  });


  describe('Unique', () => {
    it('ensures no duplicate title', (done) => {
      Document.create(testDocument)
      .catch((error) => {
        expect(/SequelizeUniqueConstraintError/.test(error.name)).to.be.true;
        done();
      });
    });
  });



  describe('Mininmum characters', () => {
    it('ensures title is at least 3 characters', (done) => {
      expect(newDocument.title.length).to.be.above(2);
      done();
    });

    it('ensures content is at least 3 characters', (done) => {
      expect(newDocument.content.length).to.be.above(2);
      done();
    });
  });

  describe('Access Violation', () => {
    it('ensures access is public, private or role',
    (done) => {
      testDocument.OwnerId = newUser.id;
      testDocument.access = 'andela';
      Document.create(testDocument)
        .then()
        .catch((error) => {
          expect(/SequelizeValidationError/.test(error.name)).to.be.true;
          done();
        });
    });
  });
});
