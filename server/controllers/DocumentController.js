import { Document, User } from '../models';
import ControllerHelpers from '../helpers/ControllerHelpers';

const DocumentController = {
  /**
   * createDocument - create a new Document
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Object} res Response object
   */
  createDocument(req, res) {
    const doc = req.body;
    doc.OwnerId = req.decoded.UserId;
    Document.create(doc)
      .then((document) => {
        res.status(201).json(document);
      }, (err) => {
        res.status(500).json({
          message: ControllerHelpers.errorHandler(err.errors)
        });
      }).catch((error) => {
        res.status(500).json({
          message: ControllerHelpers.errorHandler(error.errors)
        });
      });
  },

  /**
   * findAllDocuments - Lists all created documents
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {Object} Response Object
   */
  findAllDocuments(req, res) {
    const limit = req.query.limit || '10';
    const offset = req.query.offset || '0';
    return Document
    .findAndCountAll({
      limit,
      offset,
      order: '"createdAt" DESC',
      include: [{
        model: User,
        attributes: ['RoleId']
      }]
    })
    .then((result) => {
      const allDocuments = result.rows;
      if (allDocuments.length <= 0) {
        return res.status(404)
        .send({
          message: 'No document(s) found'
        });
      }
      const documents = allDocuments.filter((document) => {
        if (document.dataValues.access === 'public') {
          return true;
        }
        if ((document.dataValues.access === 'private') &&
        ((document.dataValues.OwnerId === req.decoded.UserId) ||
        req.decoded.RoleId === 1)) {
          return true;
        }
        if (
          document.dataValues.access === 'role' &&
          ((req.decoded.RoleId === document.dataValues.User.RoleId) ||
          (req.decoded.RoleId === 1))) {
          return true;
        }
        return false;
      });

      const pagination = limit && offset ? { totalCount: result.count,
        pages: Math.ceil(result.count / limit),
        currentPage: Math.floor(offset / limit) + 1,
        pageSize: result.rows.length } : null;
      res.status(200).send({ documents, pagination });
    })
    .catch(error => res.status(400).send({
      message: error.message
    }));
  },

  /**
   * findDocumentById - Gets document by id
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {Object} Response Object
   */
  findDocumentById(req, res) {
    Document.findById(req.params.id)
      .then((foundDocument) => {
        if (!foundDocument) {
          return res.status(404)
          .send({
            message: 'Document Not Found'
          });
        }
        if (foundDocument.access === 'public') {
          return res.status(200)
            .send(foundDocument);
        }
        if ((foundDocument.access === 'private') &&
          (foundDocument.OwnerId === req.decoded.UserId)) {
          return res.status(200)
            .send(foundDocument);
        }
        if (foundDocument.access === 'role') {
          return User.findById(foundDocument.OwnerId)
            .then((documentOwner) => {
              if (documentOwner.RoleId === req.decoded.RoleId) {
                return res.status(200)
                  .send(foundDocument);
              }
              return res.status(401)
                .send({
                  message: 'You cannot view this document'
                });
            });
        }
        return res.status(401)
          .send({
            message: 'You cannot view this document'
          });
      })
      .catch(error => res.status(400).send({
        message: error.message
      }));
  },

  /**
   * findDocumentByRole - Gets document by role that can access it
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {Object} Response Object
   */
  findDocumentByRole(req, res) {
    const limit = req.query.limit;
    const offset = req.query.offset;
    return Document
    .findAndCountAll({
      where: { access: req.query.access },
      limit,
      offset,
      order: '"createdAt" DESC'
    })
    .then((documents) => {
      const pagination = limit && offset ? { totalCount: documents.count,
        pages: Math.ceil(documents.count / limit),
        currentPage: Math.floor(offset / limit) + 1,
        pageSize: documents.rows.length } : null;
      res.status(200).send({ documents: documents.rows, pagination });
    })
    .catch(error => res.status(400).send({
      message: error.message
    }));
  },

  /**
   * searchDoc - search documents
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {Object} Response Object
   */
  searchDocument(req, res) {
    const userQuery = req.query.query;
    const query = {
      where: {
        $and: [{ $or: [
          { access: 'public' }
        ] }],
      },
      limit: req.query.limit || 10,
      offset: req.query.offset || 0,
      order: '"createdAt" DESC'
    };

    if (userQuery) {
      query.where.$and.push({ $or: [
        { title: { $like: `%${userQuery}%` } },
        { content: { $like: `%${userQuery}%` } }
      ] });
    }
    Document.findAndCountAll(query)
      .then((documents) => {
        const pagination = query.limit && query.offset
        ? { totalCount: documents.count,
          pages: Math.ceil(documents.count / query.limit),
          currentPage: Math.floor(query.offset / query.limit) + 1,
          pageSize: documents.rows.length } : null;
        res.send({ documents: documents.rows, pagination });
      })
      .catch(error => res.status(400).send({
        message: error.message
      }));
  },

  /**
   * updateDoc - Update document by id
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {Object} Response Object
   */
  updateDocument(req, res) {
    return Document
    .findById(req.params.id)
    .then((document) => {
      if (!document) {
        return res.status(404).send({
          message: 'Document Not Found',
        });
      }
      if (document.OwnerId !== req.decoded.UserId) {
        return res.status(401).send({
          message: 'You cannot update this document'
        });
      }
      return document
        .update(req.body)
        .then(() => res.status(200).send(document));
    })
    .catch(error => res.status(400).send({
      message: error.message
    }));
  },

  /**
   * deleteDoc - Delete document by id
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {Object} Response Object
   */
  deleteDocument(req, res) {
    return Document
      .findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(400).send({
            message: 'Document Not Found',
          });
        }
        if (document.OwnerId !== req.decoded.UserId) {
          return res.status(401).send({
            message: 'You cannot delete this document'
          });
        }
        return document
          .destroy()
          .then(() => res.status(200).send({
            message: 'Document Deleted'
          }));
      })
      .catch(error => res.status(400).send({
        message: error.message
      }));
  },
};

export default DocumentController;
