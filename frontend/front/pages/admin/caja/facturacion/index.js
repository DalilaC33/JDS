import Head from 'next/head'
import { useEffect, useState } from 'react'

import { FilterBox, InvoiceTable, ConfirmSendEmail, ConfirmPrint, ConfirmCancel } from '../../../../components/admin/facturas'
import { Breadcrumb, Container } from '../../../../components/admin/common'
import Pagination from '../../../../components/v2/pagination'
import useGet from '../../../../api-config/v2/useGet'
import { dateWithFormat } from '../../../../utils'
import { ToastContainer, toast } from 'react-toastify'

const Facturacion = () => {

    const LIST_SIZE = 8

    const filteredInvoices = useGet('/api/facturas/search')

    const [InvoiceToPrint, setInvoiceToPrint] = useState(null)
    const [invoiceToSend, setInvoiceToSend] = useState(null)
    const [invoiceToCancel, setInvoiceToCancel] = useState(null)

    const [searchValues, setSearchValues] = useState({FechaDesde: dateWithFormat(new Date(), 30), FechaHasta: dateWithFormat(new Date(), 0)})

    const handleFilterSubmit = values => {          
        setSearchValues(values)
        filteredInvoices.fetch({page: 0, size: LIST_SIZE, ...values})
    }

    const handlePrintInvoice = invoice => {
        setInvoiceToPrint(invoice)
    }

    const handleSendInvoice = invoice => {
        setInvoiceToSend(invoice)
    }
    
    const handleCancelInvoice = invoice => {
        setInvoiceToCancel(invoice)
    }
    
    const handlePaginationChange = page => {
        filteredInvoices.fetch({page: page, size: LIST_SIZE, ...searchValues})
    }

    const handleRefresh = () => {
        filteredInvoices.fetch({page: filteredInvoices?.data?.actualPage, size: LIST_SIZE, ...searchValues})
    }
    
    useEffect(() => {
        filteredInvoices.fetch({page: 0, size: LIST_SIZE, ...searchValues})
    }, [])

    return (
        <>
            <ConfirmPrint   invoice={InvoiceToPrint} 
                            onClose={() => setInvoiceToPrint(null)}
                            onRefresh={handleRefresh} />
            <ConfirmSendEmail   invoice={invoiceToSend} 
                                onClose={() => setInvoiceToSend(null)}/>
            <ConfirmCancel  invoice={invoiceToCancel} 
                            onClose={() => setInvoiceToCancel(null)}
                            onRefresh={handleRefresh} />


            <div className='position-relative w-100 h-100'>
                <Head>
                    <title>Facturación</title>
                </Head>

                <div className='p-3 font-roboto'>
                    <h4>Facturación</h4>
                    <Breadcrumb links={[['Home', '/admin']]} currentPage='Facturación' />
                </div>

                <div className='d-flex justify-content-center'>
                    <Container width={'95%'}>
                        <div className='p-3'>  
                            <FilterBox onSubmit={handleFilterSubmit} />
                            <InvoiceTable invoices={filteredInvoices.data?.content ?? []} 
                                          onPrint={handlePrintInvoice}
                                          onSend={handleSendInvoice}
                                          onCancel={handleCancelInvoice}
                                          isDataLoading={filteredInvoices.loading}/>
                            <Pagination axiosResponse={filteredInvoices.data} onChange={handlePaginationChange}/>
                        </div>
                    </Container>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

Facturacion.layout = 'AdminLayout'
export default Facturacion