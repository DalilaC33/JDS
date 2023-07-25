
/* Componente para mostrar el encabezado de la factura */
import { Col, Row } from "react-bootstrap"
const FacturaEncabezado = ({ factura }) => {
    return (
        <>
            <div className=' m-4 mb-0 mt-2 pt-2 border-top border-2'>
                <Row>
                    <Col sm={12} md={12} lg={9}>
                        <div>
                            <div className='d-flex  flex-wrap'>
                                <h6 className='font-montserrat fw-bold pe-1'>Nombres:</h6>
                                <h6 className='font-montserrat bold '>{factura?.Cliente?.Solicitud?.Usuario?.Nombre}</h6>
                            </div>
                            <div className='d-flex flex-wrap'>
                                <h6 className='font-montserrat fw-bold pe-1 '>Apellidos:</h6>
                                <h6 className='font-montserrat bold'>{factura?.Cliente?.Solicitud?.Usuario?.Apellido}</h6>
                            </div>
                            <div className='d-flex  flex-wrap'>
                                <h6 className='font-montserrat fw-bold pe-1'>Ruc/C.I Nº:</h6>
                                <h6 className='font-montserrat bold'>{new Intl.NumberFormat('es-CO').format(Number(factura?.Cliente?.Solicitud?.Usuario?.CI) ?? 0)}</h6>
                            </div>
                            <div className='d-flex  flex-wrap'>
                                <h6 className='font-montserrat fw-bold'>Dirección:&nbsp;</h6>

                                <h6 className='font-montserrat bold'>{factura?.Cliente?.Solicitud?.Referencia}</h6>
                            </div>
                            <div className='d-flex  flex-wrap'>
                                <h6 className='font-montserrat fw-bold pe-1'>Medidor Nº:</h6>

                                <h6 className='font-montserrat bold'>{factura?.Cliente?.Medidor}</h6>
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={12} lg={3}>
                        <div >
                            <div className='d-flex  flex-wrap'>
                                <h6 className='font-montserrat fw-bold pe-1'>Factura Nº:</h6>
                                <h6 className='font-montserrat bold'>{(factura?.Numero) ? factura?.Numero : "----"}</h6>
                            </div>
                            <div className='d-flex  flex-wrap'>
                                <h6 className='font-montserrat fw-bold pe-1'>Estado:</h6>
                                <h6 className='font-montserrat bold'>{factura?.Estado.Nombre}</h6>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default FacturaEncabezado