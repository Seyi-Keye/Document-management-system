import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const ModalComponent = ({
  title,
  children,
  closeText,
  showModal,
  successText,
  history,
}) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    history.goBack();
  };
  const handleShow = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <div className="modal-header">
          <button type="button" className="close" onClick={handleClose}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <Modal.Body>{children}</Modal.Body>
        {closeText ||
          (successText && (
            <Modal.Footer>
              {closeText && (
                <Button variant="secondary" onClick={handleClose}>
                  {closeText}
                </Button>
              )}
              {successText && <Button variant="primary">{successText}</Button>}
            </Modal.Footer>
          ))}
      </Modal>
    </>
  );
};

export default ModalComponent;
