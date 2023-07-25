import { HiOutlineBan } from 'react-icons/hi'
import { BiPrinter, BiMailSend } from 'react-icons/bi'
import { CgNotes } from 'react-icons/cg'

import { formatDate, numberWithCommas } from '../../../utils'
import Loader from '../../../components/loader'
import Link from 'next/link'

const InvoiceTable = ({invoices, onPrint, onSend, onCancel, isDataLoading}) => {

    return (
        <div className='position-relative'>
            {isDataLoading && <div className='loader'>
                <Loader />
            </div>}
            <div className='table-responsive'>
                <table className="table table-borderless mt-3">
                    <thead className='border border-1'>
                        <tr>
                            <th scope="col">C.I. N°</th>
                            <th scope="col">Nombre/s y Apellido/s</th>
                            <th scope="col">Medidor N°</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Factura N°</th>
                            <th scope="col">Estado</th>
                            <th scope="col" className='text-end  pe-3'>Total</th>
                            <th scope="col" className='text-center'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice, index) => 
                                <tr key={index} className='border border-1 content-row'>
                                    <th scope="row">{new Intl.NumberFormat('es-CO').format(invoice?.Cliente?.Solicitud?.Usuario?.CI)}</th>
                                    <td className='nombres'>{invoice?.Cliente?.Solicitud?.Usuario?.Nombre} {invoice?.Cliente?.Solicitud?.Usuario?.Apellido}</td>
                                    <td className='medidor'>{invoice?.Cliente?.Medidor}</td>
                                    <td className='fecha'>{formatDate(new Date(invoice?.Fecha))}</td>
                                    <td className='facturas'>{invoice?.Numero ?? '- - - -'}</td>
                                    <td className={`fw-bold ${invoice?.Estado?.Nombre === 'Pagado'? 'text-success' :
                                                    invoice?.Estado?.Nombre === 'Anulado'? 'text-danger' : 
                                                    invoice?.Estado?.Nombre === 'Pendiente'? 'text-warning' :
                                                    'text-secondary'  }`}>
                                        {invoice?.Estado?.Nombre}
                                    </td>
                                    <td className='text-end pe-3 total'>{numberWithCommas(invoice?.Total)} ₲  </td>
                                    <td>
                                        <div className='iconos'>
                                            {invoice?.Numero?
                                                <span title="Imprimir" className='disabledIcon'>
                                                    <BiPrinter size={20} />
                                                </span> :
                                                <span title="Imprimir" className='print' onClick={() => onPrint(invoice)}>
                                                    <BiPrinter size={20} />
                                                </span> 
                                            }
                                            {(invoice?.Numero && invoice?.Estado?.Nombre === 'Pendiente')? 
                                                <span title="Enviar por Email" className='mail mx-2' onClick={() => onSend(invoice)}>
                                                    <BiMailSend size={22} />
                                                </span> :
                                                <span title="Enviar por Email" className='mx-2 disabledIcon'>
                                                    <BiMailSend size={22} />
                                                </span>
                                            }
                                            {(invoice?.Numero && invoice?.Estado?.Nombre !== 'Anulado' && invoice?.Estado?.Nombre !== 'Recargado' && invoice?.Estado?.Nombre !== 'Pagado')? 
                                                <span title="Anular" className='cancel' onClick={() => onCancel(invoice)}>
                                                    <HiOutlineBan size={20} />
                                                </span> :
                                                <span title="Anular" className='disabledIcon' >
                                                    <HiOutlineBan size={20} />
                                                </span>
                                            }
                                            <Link href={`/admin/caja/facturacion/${invoice.Id}`}>
                                                <span title="Ver Detalles" className='ms-2 details'>
                                                    <CgNotes size={18} />
                                                </span>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
                .nombres {
                    min-width: 220px;
                    text-overflow: ellipsis; 
                    white-space: nowrap;
                    overflow: hidden;
                }
                .medidor {
                    min-width: 110px;
                }
                .fecha {
                    min-width: 110px;
                }
                .iconos {
                    min-width: 120px;
                }
                .facturas {
                    min-width: 150px;
                }
                .total {
                    min-width: 100px;
                }
                .details:hover {
                    cursor: pointer;
                    color: blue;
                }
                .loader {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    z-index: 40;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .disabledIcon {
                    color: #AAAAAA;
                }
                .print:hover {
                    cursor: pointer;
                    color: green;
                }
                .mail:hover {
                    cursor: pointer;
                    color: #92B4EC;
                }
                .cancel:hover {
                    cursor: pointer;
                    color: red;
                }
            `}</style>
        </div>
    )
}

export default InvoiceTable