import { useFormik } from "formik";
import { Modal, Button, Form } from "react-bootstrap";
import useGetAll from "../../api-config/useGetAll";

const ModalReclamos = ({ isOpen, onModalChange, onModalSave }) => {
  const { data } = useGetAll("/api/motivos");

  const formik = useFormik({
    initialValues: {
      MotivoId: 0,
      Descripcion: "",
    },
    onSubmit: (values, { resetForm }) => {
      const reclamo = {
        MotivoId: values.MotivoId ? Number(values.MotivoId) : data[0].Id,
        Descripcion: values.Descripcion,
      };
      onModalSave(reclamo)
      resetForm();
      onModalChange();
    },
  });

  return (
    <Modal
      show={isOpen}
      onHide={onModalChange}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="font-montserrat"
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Reclamo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Selecciona un motivo</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="MotivoId"
              value={formik.values.MotivoId}
              onChange={formik.handleChange}
            >
              {data &&
                data.map((motivo, index) => (
                  <option value={motivo.Id} key={index}>
                    {motivo.Nombre}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Agrega una descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="Descripcion"
              required
              value={formik.values.Descripcion}
              onChange={formik.handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onModalChange}>
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

export default ModalReclamos;
