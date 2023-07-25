import { Modal, Button } from "react-bootstrap";

const ModalEliminarReclamo = ({
  show,
  handleClose,
  onModalAcept,
  idReclamoActual,
}) => {
  const handleModalAcept = () => {
    onModalAcept(idReclamoActual);
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
        <Modal.Title>Eliminar Reclamo</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-danger">
        Estas seguro que deseas Eliminar este Reclamo?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleModalAcept}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminarReclamo;
