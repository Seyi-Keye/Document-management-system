import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User, Document } from '../models';
import authentication from '../middleware/Authentication';
import ControllerHelpers from '../helpers/ControllerHelpers';

dotenv.config();

/**
 * UserDetails controller
 */
const UserController = {

  /**
   * transformUser
   * @function
   * @param {object} user
   * @return {object} returns newUser
   */
  transformUser(user) {
    const newUser = {
      id: user.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      RoleId: user.RoleId
    };
    return newUser;
  },
  /**
   * create User
   * @function
   * @param {object} req is request object
   * @param {object} res is response object
   * @return {undefined} returns undefined
   */
  createUser(req, res) {
    User.create(req.body)
      .then((user) => {
        user = UserController.transformUser(user);
        const token = jwt.sign({
          UserId: user.id,
          RoleId: user.RoleId
        }, process.env.SECRET, { expiresIn: '1h' });
        return res.status(200).json({
          user,
          token
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: ControllerHelpers.errorHandler(error.errors)
        });
      });
  },

  /**
   * user login
   * @function
   * @param {object} req is request object
   * @param {object} res is response object
   * @return {undefined} returns undefined
   * **/
  userLogin(req, res) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          const token = authentication.generateToken(user);
          return res.status(200).json({
            message: 'You are successfully Logged in',
            token
          });
        }
        return res.status(404).json({
          message: 'User not found'
        });
      })
      .catch(error => res.status(500).json({
        message: error.message
      }));
  },

  /**
   * find user
   * @function
   * @param {object} req is request object
   * @param {object} res is response object
   * @return {undefined} returns undefined
   * **/
  findUser(req, res) {
    User.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((user) => {
        if (!user) {
          res.status(404).json({
            message: 'User not found'
          });
        } else {
          user = UserController.transformUser(user);
          res.status(200).json({
            message: 'User found',
            user
          });
        }
      })
      .catch(error => res.status(500).json({
        message: error.message
      }));
  },

  /**
   * find users
   * @function
   * @param {object} req is request object
   * @param {object} res is response object
   * @return {undefined} returns undefined
   * **/
  findAllUsers(req, res) {
    const limit = req.query.limit || '10';
    const offset = req.query.offset || '0';
    return User
      .findAndCountAll({
        attributes: ['id', 'username', 'firstname',
          'lastname', 'email', 'RoleId'
        ],
        limit,
        offset,
        order: '"createdAt" DESC'
      })
      .then((users) => {
        const pagination = limit && offset ? {
          totalCount: users.count,
          pages: Math.ceil(users.count / limit),
          currentPage: Math.floor(offset / limit) + 1,
          pageSize: users.rows.length
        } : null;
        return res.status(200).send({
          users: users.rows,
          pagination
        });
      })
      .catch(error => res.status(500).json({
        message: error.message
      }));
  },

  /**
   * update user
   * @function
   * @param {object} req is request object
   * @param {object} res is response object
   * @return {undefined} returns undefined
   * **/
  updateUser(req, res) {
  User
  .findById(req.params.id, {})
  .then((user) => {
    if (!user) {
      return res.status(404).send({
        message: 'User not found',
      });
    }
    return user
      .update(req.body)
      .then(() => res.status(200).send(UserController.transformUser(user)));
  })
  .catch(error => res.status(400).send({
    message: error.message
  }));
  },

  /**
   * delete user
   * @function
   * @param {object} req is request object
   * @param {object} res is response object
   * @return {undefined} returns undefined
   **/
  deleteUser(req, res) {
    User.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found'
          });
        }
        user.destroy()
          .then(res.status(200).json({
            message: 'User is deleted'
          }));
      })
      .catch(error => res.status(400).json({
        message: error.message
      }));
  },

  /**
   * find user documents
   * @function
   * @param {object} req is request object
   * @param {object} res is response object
   * @return {undefined} returns undefined
   **/
  findUserDocuments(req, res) {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || '0';
    const order = '"createdAt" DESC';
    Document.findAndCountAll({
      where: {
        id: req.params.id
      },
      limit,
      offset,
      order
    })
      .then((documents) => {
        const pagination = limit && offset ? {
          totalCount: documents.count,
          pages: Math.ceil(documents.count / limit),
          currentPage: Math.floor(offset / limit) + 1,
          pageSize: documents.rows.lenght
        } : null;
        res.status(200).json({
          documents: documents.rows,
          pagination
        });
      })
      .catch(error =>
        res.status(500).json({
          error: error.message
        }));
  },

  /**
   *  user logout
   * @function
   * @param {object} req is request object
   * @param {object} res is response object
   * @return {undefined} returns undefined
   * */
  userLogout(req, res) {
    User.findOne({
      where: {
        id: req.body.id
      }
    })
      .then(() => {
        res.status(200).json({
          message: 'You have been Logged out'
        });
      })
      .catch(error =>
        res.status(500).json({
          message: error.message
        }));
  }

  // searchUser(req, res) {
  //   let limit = req.query.limit || 10,
  //   offset = req.query.offset || 0;
  //   if (limit === 'undefined') {
  //     limit = 10;
  //   }
  //   if (offset === 'undefined') {
  //     offset = 0;
  //   }
  //   const query = req.query.q;
  //   const nextOffset = offset + limit;
  //   const previousOffset = (offset - limit < 1) ? 0 : offset - limit;
  //   return User
  //     .findAll({
  //       where: {
  //         $or: [
  //           { email: {
  //             $iLike: `%${req.query.q}%`
  //           },
  //             username: {
  //               $iLike: `%${req.query.q}%`
  //             } }
  //         ]
  //       }
  //     })
  //     .then((user) => {
  //       if (user.length <= 0) {
  //         return res.status(404)
  //           .send({
  //             message: 'Users Not Found',
  //           });
  //       }
  //       const meta = {
  //         limit,
  //         next: util.format(
  //           '?q=%s&limit=%s&offset=%s', query, limit, nextOffset),
  //         offset,
  //         previous: util.format(
  //           '?q=%s&limit=%s&offset=%s', query, limit, previousOffset),
  //         total_count: user.length
  //       };
  //       const result = Helpers.getPaginatedItems(user, offset, limit);
  //       return res.status(200).send({
  //         user: result, pageMeta: meta });
  //     })
  //   .catch(error => res.status(400).send({
  //     error,
  //     message: 'Error occurred while retrieving Users'
  //   }));
  // },

};

export default UserController;
