/* eslint-disable no-unused-expressions */
import 'babel-polyfill';
import httpMocks from 'node-mocks-http';
import chai from 'chai';
import sinon from 'sinon';
import events from 'events';
import supertest from 'supertest';
import app from '../../../server';
import helper from '../helpers/specHelpers';
import authentication from '../../middleware/Authentication';
import models from '../../models';

const expect = chai.expect;
const request = supertest(app);
const userDetails = helper.userDetails;
const User = models.User;
const res = httpMocks.createResponse({
  eventEmitter: events.EventEmitter
});
let token;

describe('Middleware Unit Test', () => {
  before((done) => {
    User.create(userDetails)
      .then(() => {
        request.post('/api/users/login')
          .send(userDetails)
          .end((err, response) => {
            if (err) return err;
            token = response.body.token;
            done();
          });
      });
  });

  after((done) => {
    User.destroy({
      where: {}
    });
    done();
  });

  describe('Verify Token', () => {
    it('fails on null token', (done) => {
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users',
      });
      res.on('end', () => {
        /* eslint-disable no-underscore-dangle */
        expect(res._getData().message).to.equal(
          'Token required to access this route');
        done();
      });
      authentication.verifyToken(req, res);
    });

    // it('fails on wrong token', (done) => {
    //   const req = httpMocks.createRequest({
    //     method: 'GET',
    //     url: '/api/users',
    //     headers: {
    //       'x-access-token': 'goodmorning_andela'
    //     }
    //   });
    //   authentication.verifyToken(req, res);
    //   res.on('end', () => {
    //     /* eslint-disable no-underscore-dangle */
    //     expect(res._getData().message).to.equal('Invalid token');
    //     done();
    //   });
    // });

    it('calls the next function on valid token', (done) => {
      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/api/users/login',
        headers: {
          Authorization: token
        }
      });
      const middlewareStub = {
        callback: () => {}
      };

      sinon.spy(middlewareStub, 'callback');
      authentication.verifyToken(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });

    it('fails to call next function if null token', (
      done) => {
      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/api/users/login',
      });
      const middlewareStub = {
        callback: () => {}
      };

      sinon.spy(middlewareStub, 'callback');
      authentication.verifyToken(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).not.to.have.been.called;
      done();
    });
  });

  describe('Validate Admin', () => {
    // it('returns an error if user is not an admin', (done) => {
    //   const req = httpMocks.createRequest({
    //     method: 'GET',
    //     url: '/api/users',
    //     decoded: {
    //       RoleId: 2
    //     }
    //   });
    //   res.on('end', () => {
    //     expect(res._getData().message).to.equal(
    //       'Token required to access this route');
    //     done();
    //   });
    //   authentication.verifyToken(req, res);
    // });

    it('calls the next function for admin', (done) => {
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users',
        headers: { Authorization: token },
        decoded: {
          RoleId: 1
        }
      });
      const middlewareStub = {
        callback: () => {}
      };

      sinon.spy(middlewareStub, 'callback');
      authentication.validateAdmin(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });

    it('should not call next function for regular user', (
      done) => {
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users',
        decoded: {
          RoleId: 2
        }
      });
      const middlewareStub = {
        callback: () => {}
      };

      sinon.spy(middlewareStub, 'callback');
      authentication.validateAdmin(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).not.to.have.been.called;
      done();
  });
  });
});
