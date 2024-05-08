import React from "react";
import Modal from "react-bootstrap/Modal";
import { useUser } from "../Context/UserContext";

export const CustomModal = ({ children }) => {
  const { showForm, setShowForm, title } = useUser();
  return (
    <>
      <Modal
        show={showForm}
        onHide={setShowForm}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};
