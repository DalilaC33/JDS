import { useFormik } from "formik";
import { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap"
import useGetAll from "../../../api-config/useGetAll"

const RegistryUser = ({show, handleClose, handleSave}) => {

    const {data} = useGetAll('/api/categorias')
    const [categoria, setCategoria] = useState(0)
    const [cuentaCatastral, setCuentaCatastral] = useState('')
    const [medidor, setMedidor] = useState('')


    const handleCategoriaChange = (event) => {
        setCategoria(event.target.value)
    }

    const handleCtaCtralChange = (event) => {
        !(/[a-zA-Z]/.test(event.target.value)) && setCuentaCatastral(event.target.value)
    }

    const handleMedidorChange = (event) => {
        setMedidor(event.target.value.toUpperCase())
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const registro = {
            CuentaCatastral: cuentaCatastral,
            Medidor: medidor,
            CategoriaId: categoria? Number(categoria): data?.content[0].Id,
        }
        handleSave(registro)
        setCategoria(0)
        setCuentaCatastral('')
        setMedidor('')
        handleClose()
    }

    return (
        <Modal size="lg" show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered className='font-montserrat'>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Registro del Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Para completar el registro, complete los siguientes campos</Form.Label>
                    <Row className="my-2">
                        <Col>
                            <Form.Group>
                                <Form.Label>Cuenta Catastral del Inmueble</Form.Label>
                                <Form.Control type="text" required value={cuentaCatastral} onChange={handleCtaCtralChange}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Número del medidor</Form.Label>
                                <Form.Control type="text" required value={medidor} onChange={handleMedidorChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Categoría del Servicio</Form.Label>
                                <Form.Select aria-label="Default select example" name="MotivoId" 
                                    value={categoria} onChange={handleCategoriaChange}>
                                    {data?.content && data.content.map((motivo, index) =>
                                        <option value={motivo.Id} key={index}>{motivo.Nombre}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Rol del Usuario</Form.Label>
                                <Form.Control type="text" placeholder="Cliente" disabled/>
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button variant="primary" type="submit">Aceptar</Button>
                </Modal.Footer>
            </Form>
      </Modal>
    )
}

export default RegistryUser