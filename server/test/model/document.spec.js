/* eslint no-unused-expressions: "off"*/
import chai from 'chai';
import models from '../../models';
import helper from '../helpers/specHelpers';
import SeedHelper from '../helpers/seedHelper';

const expect = chai.expect;

const documentAttributes = ['title', 'content', 'OwnerId', 'access'];
const publicDocument = helper.publicDocument;
const regularUser = helper.regularUser;

const adminRole = helper.adminRole;
const regularRole = helper.regularRole;
let newDocument;
let newUser;

describe('Document Model Unit Test', () => {
  before((done) => {
    SeedHelper
      .init()
      .then(() => {
        models
          .Role
          .findOne({
            where: {
              title: 'regular',
            },
          })
          .then((found) => {
            regularUser.RoleId = found.dataValues.id;
            models
              .User
              .create(regularUser)
              .then((user) => {
                newUser = user;
                done();
              });
          });
      });
  });

  after((done) => {
    models
      .sequelize
      .sync({ force: true })
      .then(() => done());
  });

  describe('Create Document', () => {
    it('ensures a new document is created', (done) => {
      publicDocument.OwnerId = newUser.id;
      models
        .Document
        .create(publicDocument)
        .then((document) => {
          newDocument = document;
          expect(newDocument.title).equal(publicDocument.title);
          expect(newDocument.content).equal(publicDocument.content);
          expect(newDocument)
            .have
            .property('createdAt');
          expect(newDocument.OwnerId).equal(publicDocument.OwnerId);
          done();
        });
    });
  });

  describe('Not Null Validations', () => {
    documentAttributes.forEach((field) => {
      it(`fails without ${field}`, (done) => {
        const assignedDocument = Object.assign({}, publicDocument);
        assignedDocument[field] = null;
        models
          .Document
          .create(assignedDocument)
          .then(nullDocument => expect(nullDocument).to.not.exist)
          .catch((error) => {
            expect(/notNull Violation/.test(error.message)).to.be.true;
            done();
          });
      });
    });
  });

  describe('Unique', () => {
    it('ensures no duplicate title', (done) => {
      models
        .Document
        .create(publicDocument)
        .catch((error) => {
          expect(/SequelizeUniqueConstraintError/.test(error.name)).to.be.true;
          done();
        });
    });
  });

  describe('Mininmum characters', () => {
    it('ensures title is at least 3 characters', (done) => {
      expect(newDocument.title.length)
        .to
        .be
        .above(2);
      done();
    });

    it('ensures content is at least 3 characters', (done) => {
      expect(newDocument.content.length)
        .to
        .be
        .above(2);
      done();
    });
  });

  describe('Access Violation', () => {
    it('ensures access is public, private or role', (done) => {
      publicDocument.OwnerId = newUser.id;
      publicDocument.access = 'andela';
      models
        .Document
        .create(publicDocument)
        .then()
        .catch((error) => {
          expect(/SequelizeValidationError/.test(error.name)).to.be.true;
          done();
        });
    });
  });
});
