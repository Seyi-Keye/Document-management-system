import { Router } from 'express';
import RoleController from '../controllers/RoleController';
import UserController from '../controllers/UserController';
import DocumentController from '../controllers/DocumentController';
import authentication from '../middleware/Authentication';
// import UserController from '../controllers/user'
const router = Router();
// default route
router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Document Management System!',
}));

// roles routes

router.route('/roles')
.post(RoleController.createRole)
.get(authentication.verifyToken, authentication.validateAdmin,
RoleController.findAllRoles);

router.route('/roles/:id')
.get(authentication.verifyToken, authentication.validateAdmin,
RoleController.findRole)
.put(authentication.verifyToken, authentication.validateAdmin,
RoleController.updateRole)
.delete(authentication.verifyToken, authentication.validateAdmin,
RoleController.deleteRole);

// user routes.
router.route('/users')
.post(UserController.createUser)
.get(authentication.verifyToken, authentication.validateAdmin,
UserController.findAllUsers);

router.post('/users/login', UserController.userLogin);
router.post('/users/logout', UserController.userLogout);

router.route('/users/:id')
.get(authentication.verifyToken, authentication.validateAdmin,
UserController.findUser)
.put(authentication.verifyToken, authentication.validateAdmin,
UserController.updateUser)
.delete(authentication.verifyToken, authentication.validateAdmin,
UserController.deleteUser);

router.route('/users/:id/documents')
.get(authentication.verifyToken, authentication.validateAdmin,
UserController.findUserDocuments);

// document routes
router.route('/documents')
.post(authentication.verifyToken, DocumentController.createDocument)
.get(authentication.verifyToken, authentication.validateAdmin,
DocumentController.findAllDocuments);

router.get('/documents/search', authentication.verifyToken,
DocumentController.searchDocument);
router.get('/documents/roles', authentication.verifyToken,
authentication.validateAdmin, DocumentController.findDocumentByRole);

router.route('/documents/:id')
.get(authentication.verifyToken, DocumentController.findDocumentById)
.put(authentication.verifyToken, DocumentController.updateDocument)
.delete(authentication.verifyToken, DocumentController.deleteDocument);


export default router;