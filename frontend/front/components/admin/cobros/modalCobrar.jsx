import { useFormik } from "formik";
import { Modal, Button, Form } from "react-bootstrap";


/* Modal para ingresar el numero de recibo de factura al cobrar */
const ModalCobrar = ({
  show,
  handleClose,
  handleSave,
  idFacturaCobrar,
  props,
}) => {
  const formik = useFormik({
    initialValues: {
      Id: 0,
      Numero: "",
    },
    onSubmit: (values, { resetForm }) => {
      const ObjCobrar = {
        Id: idFacturaCobrar,
        Numero: values.Numero,
      };
      handleSave(ObjCobrar);
      resetForm();
      handleClose();
    },
  });

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="font-montserrat"
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Cobrar Factura</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mt-3">
            <Form.Label>
              Para confirmar el cobro, ingrese el Nº del Recibo al cual sera
              impreso
            </Form.Label>
            <input
              className="form-control"
              required
              placeholder="Nº Recibo"
              id="numero"
              autoComplete="off"
              title="Ingrese solo numeros y guion medio"
              pattern="[0-9-]+$"
              name="Numero"
              value={formik.values.Factura}
              onChange={formik.handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Aceptar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalCobrar;