import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ show, handleClose, handleConfirm, message, action, type }) => {

  return (

    <Modal show={ show } onHide={ handleClose } backdrop='static'>
        <Modal.Header closeButton={ type !== 'rules' }>
            <Modal.Title>Confirm { action }</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            { message }
        </Modal.Body>

        <Modal.Footer>

            { type != 'rules' && (
              <Button variant='secondary' onClick={ handleClose }>Cancel</Button>
            )}
            <Button variant='danger' onClick={ handleConfirm }>Confirm</Button>

        </Modal.Footer>
    </Modal>

  );
}

export default ConfirmModal