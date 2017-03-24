/* eslint no-unused-expressions: "off"*/
import chai from 'chai';
import models from '../../models';
import helper from '../helpers/specHelpers';

const Role = models.Role;
const expect = chai.expect;

let role;


describe('Role Model:', () => {
  describe('Create Role', () => {
    it('should create new role and have it exist', (done) => {
      Role.create(helper.newRole)
        .then((createdRole) => {
          role = createdRole;
          expect(role).to.exist;
          expect(role.title).to.exist;
          done();
        });
    });
  });

  describe('Role Validation', () => {
    it('ensures role title is unique', (done) => {
      Role.create(helper.newRole)
      .then()
      .catch((error) => {
        expect(/SequelizeUniqueConstraintError/.test(error.name)).to.be.true;
        done();
      });
    });

    it('ensures role title cannot be null', (done) => {
      const emptyTitle = { };
      Role.create(emptyTitle)
      .then()
      .catch((error) => {
        expect(/notNull Violation/.test(error.message)).to.be.true;
        done();
      });
    });
  });

  describe('DELETE role', () => {
    it('should delete a role', (done) => {
      Role.destroy({ where: { title: role.title } }).then((response) => {
        Role.findOne({ where: { title: role.title } }).then((error) => {
          expect(error).equal(null);
          done();
        });
      });
    });
  });
});
