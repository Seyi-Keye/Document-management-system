import path from 'path';
import { Router } from 'express';
import RoleController from '../controllers/RoleController';
import UserController from '../controllers/UserController';
import DocumentController from '../controllers/DocumentController';
import authentication from '../middleware/Authentication';
const router = Router();
// default route


// roles routes

router.route('/api/v1/roles')
.post(authentication.verifyToken,authentication.validateAdmin, RoleController.createRole)
.get(authentication.verifyToken, authentication.validateAdmin,
RoleController.findAllRoles);

router.route('/api/v1/roles/:id')
.get(authentication.verifyToken, authentication.validateAdmin,
RoleController.findRole)
.put(authentication.verifyToken, authentication.validateAdmin,
RoleController.updateRole)
.delete(authentication.verifyToken, authentication.validateAdmin,
RoleController.deleteRole);

// user routes.
router.route('/api/v1/users')
.post(UserController.createUser)
.get(authentication.verifyToken, authentication.validateAdmin,
UserController.findAllUsers);

router.post('/api/v1/users/login', UserController.userLogin);
router.post('/api/v1/users/logout', UserController.userLogout);

router.route('api/v1/users/:id')
.get(authentication.verifyToken,
UserController.findUser)
.put(authentication.verifyToken,
authentication.validateAdmin,
UserController.updateUser)
.delete(authentication.verifyToken,
authentication.validateAdmin,
UserController.deleteUser);

router.route('/api/v1/users/:id/documents')
.get(authentication.verifyToken,
UserController.findUserDocuments);

// document routes
router.route('/api/v1/documents')
.post(authentication.verifyToken, DocumentController.createDocument)
.get(authentication.verifyToken,
DocumentController.findAllDocuments);

router.get('/api/v1/search/documents/',
DocumentController.searchDocument);
router.get('/api/v1/search/users/', authentication.verifyToken,
authentication.validateAdmin, UserController.searchUser);

router.route('/api/v1/documents/:id')
.get(authentication.verifyToken, DocumentController.findDocumentById)
.put(authentication.verifyToken, DocumentController.updateDocument)
.delete(authentication.verifyToken, DocumentController.deleteDocument);

export default router;
