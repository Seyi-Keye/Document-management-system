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
import SeedHelper from '../helpers/seedHelper';

const expect = chai.expect;
const server = supertest(app);
const userDetails = helper.userDetails;


describe('Middleware Unit Test', () => {
  let
    token,
    res;
  beforeEach(() => {
    res = httpMocks.createResponse({
      eventEmitter: events.EventEmitter,
    });
  });
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
    SeedHelper.init()
    .then(() => models.Role.findOne({ where: { title: 'regular' } }))
    .then((res) => {
      userDetails.RoleId = res.dataValues.id;
    })
    .then(() => promisify('/api/v1/users', userDetails))
    .then(() => promisify('/api/v1/users/login', userDetails))
    .then((res) => {
      token = res.body.token;
      done();
    });
  });

  after((done) => {
    models.sequelize.sync({
      force: true,
    }).then(() => done());
  });

  describe('Verify Token', () => {
    it('fails on null token', (done) => {
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/v1/users',
      });
      res.on('end', () => {
        /* eslint-disable no-underscore-dangle */
        expect(res._getData().message).to.equal(
          'Token required for access');
        done();
      });
      authentication.verifyToken(req, res);
    });

    it('fails on wrong token', (done) => {
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/v1/users',
        headers: {
          'x-access-token': 'goodmorning_andela',
        },
      });
      authentication.verifyToken(req, res);
      res.on('end', () => {
        /* eslint-disable no-underscore-dangle */
        expect(res._getData().message).to.equal('Invalid token');
        done();
      });
    });

    it('calls the next function on valid token', (done) => {
      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/api/v1users/login',
        headers: {
          Authorization: token,
        },
      });
      const middlewareStub = {
        callback: () => {},
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
        url: '/api/v1/users/login',
      });
      const middlewareStub = {
        callback: () => {},
      };

      sinon.spy(middlewareStub, 'callback');
      authentication.verifyToken(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).not.to.have.been.called;
      done();
    });
  });

  describe('Validate Admin', () => {
    it('returns an error if user is not an admin', (done) => {
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/v1/users',
        decoded: {
          RoleId: 2,
        },
      });
      res.on('end', () => {
        expect(res._getData().message).to.equal(
          'Token required for access');
        done();
      });
      authentication.verifyToken(req, res);
    });

    it('calls the next function for admin', (done) => {
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/v1/users',
        headers: { Authorization: token },
        decoded: {
          RoleId: 1,
        },
      });
      const middlewareStub = {
        callback: () => {},
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
        url: '/api/v1/users',
        decoded: {
          RoleId: 2,
        },
      });
      const middlewareStub = {
        callback: () => {},
      };

      sinon.spy(middlewareStub, 'callback');
      authentication.validateAdmin(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).not.to.have.been.called;
      done();
    });
  });
});
