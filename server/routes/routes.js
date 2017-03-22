const router = require('express').Router();
const authenticate = require('../middleware/Authentication');
// import UserController from '../controllers/user'

// default route
router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Document Management System!',
}));

const RoleController = require('../controllers/RoleController');
const UserController = require('../controllers/UserController');
const DocumentController = require('../controllers/DocumentController');

// roles routes

router.route('/roles')
.post(
  // authenticate.verifyToken, authenticate.validateAdmin,
RoleController.createRole)
.get(authenticate.verifyToken, authenticate.validateAdmin,
RoleController.findAllRoles);

router.route('/roles/:id')
.get(authenticate.verifyToken, authenticate.validateAdmin,
RoleController.findRole)
.put(authenticate.verifyToken, authenticate.validateAdmin,
RoleController.updateRole)
.delete(authenticate.verifyToken, authenticate.validateAdmin,
RoleController.deleteRole);

// user routes.
router.route('/users')
.post(UserController.createUser)
.get(authenticate.verifyToken, authenticate.validateAdmin,
UserController.findAllUsers);

router.post('/users/login', UserController.userLogin);
router.post('/users/logout', UserController.userLogout);

router.route('/users/:id')
.get(authenticate.verifyToken, authenticate.validateAdmin,
UserController.findUser)
.put(authenticate.verifyToken, authenticate.validateAdmin,
UserController.updateUser)
.delete(authenticate.verifyToken, authenticate.validateAdmin,
UserController.deleteUser);

router.route('/users/:id/documents')
.get(authenticate.verifyToken, authenticate.validateAdmin,
UserController.findUserDocuments);

// document routes
router.route('/documents')
.post(authenticate.verifyToken, DocumentController.createDocument)
.get(authenticate.verifyToken, authenticate.validateAdmin,
DocumentController.findAllDocuments);

router.get('/documents/search', authenticate.verifyToken,
DocumentController.searchDocument);
router.get('/documents/roles', authenticate.verifyToken,
authenticate.validateAdmin, DocumentController.findDocumentByRole);

router.route('/documents/:id')
.get(authenticate.verifyToken, DocumentController.findDocumentById)
.put(authenticate.verifyToken, DocumentController.updateDocument)
.delete(authenticate.verifyToken, DocumentController.deleteDocument);


module.exports = router;
