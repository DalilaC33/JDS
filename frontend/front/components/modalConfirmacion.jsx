import { Modal, Button } from "react-bootstrap";

const ModalConfirmacion = ({
  show,
  handleClose,
  onModalAcept,
  mensaje,
  titulo,
  tipo,
}) => {
  const handleModalAcept = () => {
    onModalAcept();
    handleClose();
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="font-montserrat"
    >
      <Modal.Header className="bg-rojo-300" closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={(tipo===1)?"fw-normal":"text-danger"}>
        {mensaje}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant={(tipo===1)?"primary":"danger"} onClick={handleModalAcept}>
          Si
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmacion;