import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalComponent = ({
  title,
  children,
  closeText,
  showModal,
  successText,
}) => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header> */}
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

// ModalComponent.defaultProps = {
//   show: true,
// };

export default ModalComponent;
