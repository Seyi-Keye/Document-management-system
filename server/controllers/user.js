const User = require('../models/index').User;
const Document = require('../models/index').Document;
const bcrypt = require('bcrypt');

/**
 * UserDetails class
 */
class UserController {

  /**
   * Static create User
   * @function
   * @param {object} req is request object
   * @param {object} res is response object
   * @return {undefined} returns undefined
   */
  static createUser(req, res) {
    console.log(req.body);
    User.create({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation,
      RoleId: 1
    }).then((user) => {
      res.status(200).json({
        message: 'User is created', user
      });
    }).catch((err) => {
      res.status(400).json({
        message: err.message
      });
    });
  }

  /**
   * static user login
   * @function
   * @param {object} req is request object
   * @param {object} res is response object
   * @return {undefined} returns undefined
   * **/
  static userLogin(req,res) {
    console.log(req.body);
    User.findOne({where: {email: req.body.email}})
      .then((user) => {
        if (!user) {
          res.status(404).json({message: 'User not found'});
        } else {
          if (bcrypt.compareSync(req.body.password,user.password)) {
            res.status(200).json({message: 'You are successfully Logged in'})
          } else {
            res.status(400).json({message: 'An Error occured'});
          }
        }
      })
      .catch((err) => {
        res.status(500).json({message: err.message});
      });
  }

  /**
   * static find user
   * @function
   * @param {object} req is request object
   * @param {object} res is response object
   * @return {undefined} returns undefined
   * **/
  static findUser(req,res) {
    User.findOne({where: {id: req.params.id}})
    .then((user) => {
      if (!user){
        res.status(404).json({message: 'User not found'});
      } else {
        res.status(200).json({message: 'User found', user:user});
      }
    })
    .catch((err) => {
      res.status(500).json({message: err.message})
    });
  }

  /**
   * static find users
   * @function
   * @param {object} req is request object
   * @param {object} res is response object
   * @return {undefined} returns undefined
   * **/
  static findUsers(req,res) {
    User.findAll()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({message: 'Error occcured'});
    });
  }

  /**
   * static update user
   * @function
   * @param {object} req is request object
   * @param {object} res is response object
   * @return {undefined} returns undefined
   * **/
  static updateUser(req, res) {
    User.findOne({where: {id: req.params.id }})
    .then((user) => {
      user.username = req.body.username;
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.password = req.body.password;
      user.passwordConfirmation = req.body.passwordConfirmation;
      user.save().then((user) => {
        res.status(200).json({message: 'User details updated'});
        })
      .catch((err) => {
        res.status(500).json({message: err.message});
      });
    })
  }

  /**
   * static delete user
   * @function
   * @param {object} req is request object
   * @param {object} res is response object
   * @return {undefined} returns undefined
   **/
  static deleteUser(req, res) {
    User.findOne({where: {id: req.params.id}})
    .then((user) => {
      user.destroy()
      .then(() => {
        res.status(200).json({message: 'User is deleted'})
      });
    })
    .catch((err) => {
      res.status(500).json({message: error.message})
    });
  }

  /**
   * static find user documents
   * @function
   * @param {object} req is request object
   * @param {object} res is response object
   * @return {undefined} returns undefined
   **/
  static findUserDocuments(req, res){
    User.findOne({where: {id: req.params.id}})
    .then((user) => {
      user.getDocuments().then((documents) => {
      res.status(200).json({message: 'Documents Found', documents: documents})
      });
    })
    .catch((err) => {
      res.status(500).json({error: error.message})
    });
  }

  /**
   * static  user logout
   * @function
   * @param {object} req is request object
   * @param {object} res is response object
   * @return {undefined} returns undefined
   * */
  static userLogout(req, res) {
    User.findOne({where: {id: req.body.id}})
    .then((user) => {
      res.status(200).json({message: 'You have been Logged out'});
    })
    .catch((err) => {
      res.status(500).json({message: error.message})
    });
  }

}

// export default UserController;
module.exports = UserController;
