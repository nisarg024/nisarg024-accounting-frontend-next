"use client";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import Loader from "./BtnLoader";

const DeleteModal = ({
  show,
  handleClose,
  deleteModalInfo,
  handleDelete,
  deleteModalLoading,
}) => {
  return (
    <Modal size="md" centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{deleteModalInfo?.header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{deleteModalInfo?.description}</Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          No
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={deleteModalLoading}
        >
          {deleteModalLoading ? <Loader /> : "Yes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
