const router = require('express').Router();

// const router = express.Router();

const UserController = require('../controllers/user');
// import UserController from '../controllers/user'
//Creates a new user.
router.post('/users', UserController.createUser);

//Logs a user in.
router.post('/users/login', UserController.userLogin);

// //Logs a user out.
router.post('/users/logout', UserController.userLogout);

// //Find matching instances of user.
router.get('/users', UserController.findUsers);

// //Find user.
router.get('/users/:id', UserController.findUser);

// //Update user attributes.
router.put('/users/:id', UserController.updateUser);

// //Delete user.
router.delete('/users/:id', UserController.deleteUser);

router.get('/users/:id/documents', UserController.findUserDocuments);

module.exports = router;
