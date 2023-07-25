import { useFormik } from "formik"
import { useEffect, useRef, useState } from "react"
import { Modal, Button, Form, Row, Col } from "react-bootstrap"
import { toast } from "react-toastify"
import usePost from "../../../api-config/usePost"
import {BlobProvider } from "@react-pdf/renderer";
import FacturaPDF from "../../../pages/admin/caja/facturaPDF"
import { formatDate, numberWithCommas } from "../../../utils"
import Loader from "../../loader"

const ConfirmPrint = ({invoice, onClose, onRefresh}) => {

    const printInvoice = usePost('/api/facturas/imprimir')
    const [props, setProps] = useState({})
    const [serie1, setSerie1] = useState('001')
    const [serie2, setSerie2] = useState('001')
    const [correlative, setCorrelative] = useState('')
    const innerRef = useRef()
    const pdfRef = useRef()

    const handleSubmit = event => {
        event.preventDefault()
        printInvoice.fetch({ Id: invoice.Id, Numero: `${serie1}-${serie2}-${correlative}`})
    }

    const setCurrentData = (_serie1, _serie2, _correlative) => {
        const invoiceContent = {
            Nombre: invoice?.Cliente?.Solicitud?.Usuario?.Nombre, 
            Apellido: invoice?.Cliente?.Solicitud?.Usuario?.Apellido, 
            RUC: invoice?.Cliente?.Solicitud?.Usuario?.CI, 
            Direccion: invoice?.Cliente?.Solicitud?.Referencia, 
            Fecha: formatDate(new Date()), 
            ConsumoMinimo: numberWithCommas(String(invoice?.ConsumoMinimo)), 
            ConsumoExcedente: numberWithCommas(String(invoice?.ConsumoExcedente)), 
            IVA: numberWithCommas(String(invoice?.IVA)), 
            Deuda: numberWithCommas(String(invoice?.Deuda)), 
            ESSAN: numberWithCommas(String(invoice?.Essan)), 
            Total: numberWithCommas(String(invoice?.Total)), 
            Numero: `${_serie1} ${_serie2} ${_correlative}`
        }
        setProps(invoiceContent)
    }

    const resetForm = () => {
        setSerie1('001')
        setSerie2('001')
        setCorrelative('')
    }

    const handleChangeSerie1 = event => {
        setSerie1(event.target.value)
        setCurrentData(event.target.value, serie2, correlative)
    }

    const handleChangeSerie2 = event => {
        setSerie2(event.target.value)
        setCurrentData(serie1, event.target.value, correlative)
    }

    const handleChangeCorrelative = event => {
        setCorrelative(event.target.value)
        setCurrentData(serie1, serie2, event.target.value)
    }

    useEffect(() => {
        if (printInvoice.statusCode === 200) {
            pdfRef.current.click(); 
            onRefresh()
            toast.success('La Factura fue impresa correctamente', { position: toast.POSITION.TOP_RIGHT })
            resetForm()
            onClose() 
        } else if (printInvoice.statusCode === 400) {
            toast.warning(printInvoice?.data?.message, { position: toast.POSITION.TOP_RIGHT })
            resetForm()
            onClose() 
        }
    }, [printInvoice.statusCode])

    return (
        <Modal  show={invoice}  
                onHide={onClose} 
                aria-labelledby="contained-modal-title-vcenter" 
                centered 
                className='font-montserrat'
                onShow={() => {innerRef.current.focus()}}>
            {printInvoice.loading && 
                <div className="loader">
                    <Loader />
                </div>
            }
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Imprimir Factura</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Ingresa el número de Factura</Form.Label>
                    <Row className="my-2">
                            <Col>
                                <Form.Control   type="text" 
                                                name="serie1"
                                                required 
                                                pattern="[0-9]{3}"
                                                title="Solo tres números"
                                                value={serie1} 
                                                onChange={handleChangeSerie1}
                                                autoComplete="off"/>
                            </Col>
                            -
                            <Col>
                                <Form.Control   type="text" 
                                                name="serie2"
                                                required 
                                                pattern="[0-9]{3}"
                                                title="Solo tres números"
                                                value={serie2} 
                                                onChange={handleChangeSerie2}
                                                autoComplete="off"/>
                            </Col>
                            -
                            <Col>
                                <Form.Control   type="text" 
                                                name="correlative"
                                                required 
                                                value={correlative} 
                                                pattern="[0-9]+"
                                                title="Solo números"
                                                autoComplete="off"
                                                onChange={handleChangeCorrelative}
                                                ref={innerRef}/>
                            </Col>
                        </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={onClose}>Cancelar</Button>
                    <Button variant="outline-success" type="submit" >Imprimir</Button>
                </Modal.Footer>
            </Form>
            <BlobProvider document={<FacturaPDF {...props} />}>
                {({ url }) => (
                    <a id="facturaPDF" href={url} target="_blank" className="d-none" rel="noreferrer" ref={pdfRef}/>
                )}
            </BlobProvider>
            <style jsx>{`
                .loader {
                    position: absolute;
                    display: flex;
                    width: 100%;
                    height: 100%;
                    align-items: center;
                    justify-content: center;
                    z-index: 20;
                }
            `}</style>
      </Modal>
    )
}

export default ConfirmPrint