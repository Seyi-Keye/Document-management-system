// import chai from 'chai';
// import supertest from 'supertest';
// import { Document, Role, User } from '../../models';
// import app from '../../../server';
// import helper from '../helpers/specHelpers';

// const expect = chai.expect;
// const userDetails = helper.userDetails;
// const publicDocument = helper.publicDocument;
// const request = supertest.agent(app);

// let token;

// describe('Document Integration Test:', () => {
//   before((done) => {
//     Role.findOne({ where: { title: 'regular' } })
//     .then((found) => {
//       userDetails.RoleId = found.id;
//     });
//     User.create(userDetails)
//     .then(() => {
//       request.post('/api/users/login')
//       .send(userDetails)
//       .end((error, response) => {
//         if (error) return error;
//         token = response.body.token;
//         publicDocument.OwnerId = response.body.UserId;
//         done();
//       });
//     });
//   });

//   after((done) => {
//     User.destroy({ where: {} });
//     done();
//   });

//   describe('create document', () => {
//     it('passes always', () => {
//       expect(true).equal(true);
//     });
//   });
// });
