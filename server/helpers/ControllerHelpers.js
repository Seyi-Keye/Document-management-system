const ControllerHelpers = {
/**
 * method to handle error
 * @param {Object} errors object
 * @returns {array} error message
 */
  errorHandler(errors) {
    return errors && errors.map(error => error.message);
  }

};

module.exports = ControllerHelpers;
