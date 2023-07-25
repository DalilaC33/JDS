import { useEffect } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { toast } from "react-toastify"
import usePost from "../../../api-config/usePost"

const ConfirmSendEmail = ({invoice, onClose}) => {

    const sendInvoice = usePost('/api/facturas/sendByEmail')

    const handleSubmit = () => {
        sendInvoice.fetch({FacturaId: invoice.Id})
        onClose()
    }

    useEffect(() => {
        if (sendInvoice.statusCode === 200) {
            toast.success('La Factura fue enviada correctamente', { position: toast.POSITION.TOP_RIGHT })
        } else if (sendInvoice.statusCode === 400) {
            toast.warning('No se pudo enviar la Factura', { position: toast.POSITION.TOP_RIGHT })
        }
    }, [sendInvoice.statusCode])

    return (
        <Modal  show={invoice} onHide={onClose} aria-labelledby="contained-modal-title-vcenter" centered className='font-montserrat'>
            <Modal.Header closeButton>
                <Modal.Title>Enviar Factura por Email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>
                    {`Confirma que quieres enviar los detalles de la Factura N° ${invoice?.Numero} 
                        a ${invoice?.Cliente?.Solicitud?.Usuario?.Nombre} ${invoice?.Cliente?.Solicitud?.Usuario?.Apellido}`}
                </Form.Label>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>Cancelar</Button>
                <Button variant="outline-primary" onClick={handleSubmit}>Enviar</Button>
            </Modal.Footer>
      </Modal>
    )
}

export default ConfirmSendEmail