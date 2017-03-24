import { Role } from '../models';
import ControllerHelpers from '../helpers/ControllerHelpers';
/**
 * RoleController class
 */
const RoleController = {

  /**
   * create Role
   * @function
   * @param {object} req is request object
   * @param {object} res is response object
   * @return {undefined} returns undefined
   */
  createRole(req, res) {
    Role.create(req.body)
       .then(() =>
         res.status(201).send({
           message: 'Role is Created'
         })
         )
         .catch(error => res.status(400).send({
           error: ControllerHelpers.errorHandler(error.errors),
         }));
  },

  findAllRoles(req, res) {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || '0';
    const order = '"createdAt" DESC';
    Role.findAndCountAll({ limit, offset, order })
    .then((role) => {
      const pagination = limit && offset ? {
        totalCount: role.count,
        pages: Math.ceil(role.count / limit),
        currentPage: Math.floor(offset / limit) + 1,
        pageSize: role.rows.lenght } : null;
      res.status(200).json({ role: role.rows, pagination });
    }).catch(error => res.status(400).json({ error: error.message }));
  },

  findRole(req, res) {
    Role.findById(req.params.id)
    .then((role) => {
      if (!role) {
        res.status(404).json({ message: 'Role not found' });
      }
      res.status(200).json(role);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
  },

  updateRole(req, res) {
    Role.findById(req.params.id)
    .then((role) => {
      if (!role) {
        res.status(404).json({ message: 'Role not found' });
      } else {
        role.update(req.body).then(() =>
        res.status(200).json(role));
      }
    })
    .catch(error =>
        res.status(500).json({ error: error.message }));
  },

  deleteRole(req, res) {
    Role.findById(req.params.id)
    .then((role) => {
      if (!role) {
        res.status(404).json({ message: 'Role not found' });
      } else {
        role.destroy(req.body).then(() =>
        res.status(200).json({ message: 'Role deleted' }));
      }
    })
    .catch(error =>
        res.status(500).json({ error: error.message }));
  }

};
export default RoleController;
