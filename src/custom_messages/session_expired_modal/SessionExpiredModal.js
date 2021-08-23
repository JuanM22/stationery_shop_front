import { useState } from 'react';

import { Modal, Button } from 'react-bootstrap';

const SessionExpiredModal = (props) => {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Su sesión ha expirado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Por favor, inicie sesión nuevamente
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    )
}


export default SessionExpiredModal;