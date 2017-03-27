import { Document } from '../models';
import ControllerHelpers from '../helpers/ControllerHelpers';

const DocumentController = {
  /**
   * createDocument - create a new Document
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Object} res Response object
   */
  createDocument(req, res) {
    Document.create(req.body)
      .then((document) => {
        res.status(201).json(document);
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
      order: '"createdAt" DESC'
    })
    .then((documents) => {
      const pagination = limit && offset ? { totalCount: documents.count,
        pages: Math.ceil(documents.count / limit),
        currentPage: Math.floor(offset / limit) + 1,
        pageSize: documents.rows.length } : null;
      res.status(200).send({ documents: documents.rows, pagination, });
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
          (foundDocument.ownerId === req.decoded.UserId)) {
          return res.status(200)
            .send(foundDocument);
        }
        if (foundDocument.access === 'role') {
          return model.User.findById(foundDocument.ownerId)
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
          { access: 'public' },
          // { ownerId: req.decoded.UserId }
        ] }],
      },
      limit: req.query.limit,
      offset: req.query.offset,
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
    .findById(req.params.id, {})
    .then((document) => {
      if (!document) {
        return res.status(404).send({
          message: 'Document Not Found',
        });
      }
      if (document.ownerId !== req.decoded.UserId) {
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
        if (document.ownerId !== req.decoded.UserId) {
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
