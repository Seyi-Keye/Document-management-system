const router = require('express').Router();

// const authenticate = require('../middleware/Authentication');

const RoleController = require('../controllers/RoleController');
const UserController = require('../controllers/UserController');
const DocumentController = require('../controllers/DocumentController');
// import UserController from '../controllers/user'

// roles routes
router.post('/roles', RoleController.createRole);
router.get('/roles', RoleController.findAllRoles);
router.get('/roles/:id', RoleController.findRole);
router.put('/roles/:id', RoleController.updateRole);
router.delete('/roles/:id', RoleController.deleteRole);

// user routes.
router.post('/users', UserController.createUser);
router.post('/users/login', UserController.userLogin);
router.post('/users/logout', UserController.userLogout);
router.get('/users', UserController.findAllUsers);
router.get('/users/:id', UserController.findUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);
router.get('/users/:id/documents', UserController.findUserDocuments);

// document routes
router.post('/documents', DocumentController.createDocument);
router.get('/documents', DocumentController.findAllDocuments);
router.get('/documents/search', DocumentController.searchDocument);
router.get('/documents/roles', DocumentController.findDocumentByRole);
router.get('/documents/:id', DocumentController.findDocumentById);
router.put('/documents/:id', DocumentController.updateDocument);
router.delete('/documents/:id', DocumentController.deleteDocument);


module.exports = router;
