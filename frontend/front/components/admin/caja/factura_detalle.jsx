import FacturaEncabezado from './factura_encabezado.jsx'
import { Col, Row } from "react-bootstrap"
/* Componente para mostrar todo el detalle de la factura */
const FacturaDetalle = ({ factura }) => {
    const CONSUMO_MINIMO = 5; //necesario para saber el consumo minimo por el momento hasta que haya el endpoit de config
    const diasFacturados = Math.round((new Date(factura?.Lectura?.FechaActual) - new Date(factura?.Lectura?.FechaAnterior))/(1000 * 3600 * 24))
    return (
        <>
            <FacturaEncabezado factura={factura}></FacturaEncabezado>
          
            <div className='m-4 mt-1 mb-0'>
                <Row className='border border-2 bg-primary bg-opacity-50 m-0 p-0'>
                    <Col>
                        <h6 className='text-center m-0 p-1 pb-0 fw-bold'>DETALLES DEL MEDIDOR</h6>
                    </Col>
                </Row>

                <Row className=' m-0 p-0' >
                    <Col className='border border-2 m-0 p-0'>
                        <Row className='m-0 p-0'>
                            <Col>
                                <h6 className='text-center m-0 fw-bold '>FECHA</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h6 className='text-center m-0 p-1 fw-bold'>Anterior</h6>
                                <h6 className='text-center'>{(factura?.Lectura?.FechaAnterior) ? new Date(factura?.Lectura?.FechaAnterior).toLocaleDateString() : "---"}</h6>
                            </Col>
                            <Col>
                                <h6 className='text-center m-0 p-1 fw-bold'> Actual</h6>
                                <h6 className='text-center'>{new Date(factura?.Lectura?.FechaActual).toLocaleDateString()}</h6>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs lg="1" className='border border-2  m-0 p-0'>
                        <Row className='m-0 p-0'>
                            <Col>
                                <h6 className='text-center m-0 p-1'></h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h6 className='text-center m-0 p-1 fw-bold'> DIAS</h6>
                                <h6 className='text-center'>{diasFacturados}</h6>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='border border-2  m-0 p-0'>
                        <Row className=' m-0 p-0'>
                            <Col>
                                <h6 className='text-center m-0 fw-bold'>ESTADO MEDIDOR</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h6 className='text-center m-0 p-1 fw-bold'> Anterior</h6>
                                <h6 className='text-center'>{factura?.Lectura?.LecturaAnterior}m³</h6>
                            </Col>
                            <Col>
                                <h6 className='text-center m-0 p-1 fw-bold'>Actual</h6>
                                <h6 className='text-center'>{factura?.Lectura?.LecturaActual}m³</h6>
                            </Col>
                        </Row>

                    </Col>
                    <Col className='border border-2 m-0 p-0'>
                        <Row className='m-0 p-0'>
                            <Col>
                                <h6 className='text-center m-0 fw-bold'>CONSUMO</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h6 className='text-center m-0 p-1 fw-bold'>Mínimo</h6>
                                <h6 className='text-center'>{CONSUMO_MINIMO}m³</h6>
                            </Col>
                            <Col>
                                <h6 className='text-center m-0 p-1 fw-bold'>Exced.</h6>
                                <h6 className='text-center'>{factura?.Lectura?.LecturaActual - CONSUMO_MINIMO}m³</h6>
                            </Col>
                            <Col>
                                <h6 className='text-center m-0 p-1 fw-bold'>Total</h6>
                                <h6 className='text-center'>{factura?.Lectura?.LecturaActual}m³</h6>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </div>

            <div className=' border border-2 m-4 mt-0 mb-1'>
                <Row className=' m-0 p-0'>
                    <Col className=' m-0 p-0' >
                        <h6 className=' m-0 ps-1 fw-bold'>Descripción</h6>
                        <h6 className=' m-0 ps-1 text-nowrap '>Consumo minimo</h6>
                        <h6 className=' m-0 ps-1 text-nowrap '>Consumo excedente</h6>
                        <h6 className=' m-0 ps-1 text-nowrap '>Iva</h6>
                        <h6 className=' m-0 ps-1 text-nowrap '>Deuda </h6>
                        <h6 className=' m-0 ps-1 text-nowrap '>2% ESSAN</h6>
                        <h6 className=' m-0 ps-1 text-nowrap fw-bold'>Total</h6>
                    </Col>
                    <Col className=' m-0 p-0' xs lg="4">
                        <h6 className='text-end m-0 pe-1 fw-bold'> Monto</h6>
                        <h6 className='text-end m-0 pe-1'>{new Intl.NumberFormat('es-CO').format(factura?.ConsumoMinimo ?? 0)} ₲s</h6>
                        <h6 className='text-end m-0 pe-1'>{new Intl.NumberFormat('es-CO').format(factura?.ConsumoExcedente ?? 0)}  ₲s</h6>
                        <h6 className='text-end m-0 pe-1'>{new Intl.NumberFormat('es-CO').format(factura?.IVA ?? 0)} ₲s</h6>
                        <h6 className='text-end m-0 pe-1'>{new Intl.NumberFormat('es-CO').format(factura?.Deuda ?? 0)}  ₲s</h6>
                        <h6 className='text-end m-0 pe-1'>{new Intl.NumberFormat('es-CO').format(factura?.Essan ?? 0)}  ₲s</h6>
                        <h6 className='text-end m-0 pe-1 fw-bold'>{new Intl.NumberFormat('es-CO').format(factura?.Total ?? 0)}  ₲s</h6>
                    </Col>
                </Row>
            </div>

        </>
    )
}

export default FacturaDetalle