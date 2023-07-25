import { useFormik } from "formik";
import { Modal, Button, Form } from "react-bootstrap"
import useGetAll from "../../../api-config/useGetAll"

const RejectRequest = ({show, handleClose, handleSave}) => {

    const {data} = useGetAll('/api/motivo/rechazo')

    const formik = useFormik({
        initialValues: { 
            MotivoId: 0, 
            Descripcion: "" 
        },
        onSubmit: (values, { resetForm }) => {
            const rechazo = {
                MotivoRechazoId: values.MotivoId? Number(values.MotivoId) : data?.content[0].Id,
                Descripcion: values.Descripcion
            }
            handleSave(rechazo)
            resetForm()
            handleClose()
        }
    });

    return (
        <Modal  show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered className='font-montserrat'>
            <Form onSubmit={formik.handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Rechazar Solicitud</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Selecciona un motivo</Form.Label>
                        <Form.Select aria-label="Default select example" name="MotivoId" 
                            value={formik.values.MotivoId} onChange={formik.handleChange}>
                            {data?.content && data.content.map((motivo, index) =>
                                <option value={motivo.Id} key={index}>{motivo.Nombre}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Agrega una descripción</Form.Label>
                        <Form.Control as="textarea" rows={3} name="Descripcion" required
                                      value={formik.values.Descripcion} onChange={formik.handleChange}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button variant="primary" type="submit">Aceptar</Button>
                </Modal.Footer>
            </Form>
      </Modal>
    )
}

export default RejectRequest