import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Role } from '../models';

dotenv.config();

const authentication = {
  verifyToken(request, response, next) {
    const token =
      request.headers.authorization || request.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) {
          return response.status(401).send({
            message: 'Invalid token',
          });
        }
        request.decoded = decoded;
        next();
      });
    } else {
      return response.status(401).send({
        message: 'Token required for access',
      });
    }
  },

  /**
   * generateToken generates token for authentication
   * @param {Object} user object
   * @returns {Object} jwt
   */
  generateToken(user) {
    return jwt.sign(
      {
        UserId: user.id,
        RoleId: user.RoleId,
      },
      process.env.SECRET
    );
  },

  /**
   * validateAdmin
   * @param {Object} request object
   * @param {Object} response object
   * @param {Object} next object
   * @returns {Object} response message
   */
  validateAdmin(request, response, next) {
    Role.findByPk(request.decoded.RoleId)
      .then((role) => {
        if (role.title === 'admin') {
          next();
        } else {
          response.status(401).send({
            error: 'Not authorized',
          });
        }
      })
      .catch((error) => {
        response.status(500).send({
          errors: error,
        });
      });
  },
};
export default authentication;
