// import jwt from 'jsonwebtoken';
// import db from '../models';

const jwt = require('jsonwebtoken');
const Role = require('../models').Role;
require('dotenv').config();

const authentication = {
  verifyToken(request, response, next) {
    const token = request.body.token ||
      request.headers.authorization ||
      request.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) {
          response.status(401).send({
            message: 'Invalid token'
          });
        } else {
          request.decoded = decoded;
          next();
        }
      });
    } else {
      response.status(401).send({
        message: 'Token required to access this route'
      });
    }
  },

  /**
   * generateToken generates token for authentication
   * @param {Object} user object
   * @returns {Object} jwt
   */
  generateToken(user) {
    return jwt.sign({ UserId: user.id,
      RoleId: user.RoleId
    }, process.env.SECRET);
  },

  /**
   * validateAdmin
   * @param {Object} request object
   * @param {Object} response object
   * @param {Object} next object
   * @returns {Object} response message
   */
  validateAdmin(request, response, next) {
    Role.findById(request.decoded.RoleId)
      .then((role) => {
        if (role.title === 'admin') {
          next();
        } else {
          response.status(401).send({
            message: 'You are not permitted to perform this action'
          });
        }
      });
  }

};

module.exports = authentication;
