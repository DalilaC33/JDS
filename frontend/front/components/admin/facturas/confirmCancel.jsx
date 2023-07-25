import { useEffect } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { toast } from "react-toastify"
import useDelete from "../../../api-config/useDelete"

const ConfirmCancel = ({invoice, onClose, onRefresh}) => {

    const cancelInvoice = useDelete('/api/facturas/anular')

    const handleSubmit = () => {
        cancelInvoice.fetch(invoice.Id)
        onClose()
    }

    useEffect(() => {
        if (cancelInvoice.statusCode === 200) {
            onRefresh()
            toast.success('La Factura fue anulada correctamente', { position: toast.POSITION.TOP_RIGHT })
        } else if (cancelInvoice.statusCode === 400) {
            toast.warning(cancelInvoice?.data?.message, { position: toast.POSITION.TOP_RIGHT })
        }
    }, [cancelInvoice.statusCode])

    return (
        <Modal  show={invoice} onHide={onClose} aria-labelledby="contained-modal-title-vcenter" centered className='font-montserrat'>
            <Modal.Header closeButton>
                <Modal.Title>Anular Factura</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>
                    {`Confirma que quieres anular la Factura N° ${invoice?.Numero} 
                        de ${invoice?.Cliente?.Solicitud?.Usuario?.Nombre} ${invoice?.Cliente?.Solicitud?.Usuario?.Apellido}`}
                </Form.Label>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>Cancelar</Button>
                <Button variant="outline-danger" onClick={handleSubmit}>Anular</Button>
            </Modal.Footer>
      </Modal>
    )
}

export default ConfirmCancel