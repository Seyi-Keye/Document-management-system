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
    return jwt.sign(user.id, process.env.SECRET);
  }

};

module.exports = authentication;
