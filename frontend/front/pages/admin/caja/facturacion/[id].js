import Head from "next/head"
import { useRouter } from "next/router"
import useGet from "../../../../api-config/useGet"
import { Breadcrumb, Container } from "../../../../components/admin/common"
import LoaderPage from "../../../../components/loaderPage"
import { BiArrowBack } from "react-icons/bi"
import FacturaDetalle from "../../../../components/admin/caja/factura_detalle"
import { ToastContainer } from "react-toastify"
import { useEffect } from "react"

const Detalles = () => {

    const router = useRouter()
    const FACTURA_ID = router.query.id
    const factura = useGet(`/api/facturas`)

    useEffect(() => {
        console.log(factura)
    }, [factura.statusCode])

    useEffect(() => {
        factura.fetch(0, 0,FACTURA_ID)
    }, [])

    return (
        <>
            <Head>
                <title>Factura Detalles</title>
            </Head>

            <div className='p-3 font-roboto'>
                <h4>Facturación</h4>
                <Breadcrumb links={[['Home', '/admin'], ['Facturación', '/admin/caja/facturacion']]} currentPage='Detalles de Factura' />
            </div>

            {factura?.loading &&
                <LoaderPage />
            }
            <div className='d-flex justify-content-center'>
                {factura?.data &&
                    <Container width={'80%'}>
                        <div>
                                <div className='mb-5'>
                                    <FacturaDetalle factura={factura?.data}></FacturaDetalle>
                                </div>
                        </div>
                        <ToastContainer />
                    </Container>
                }
            </div>
        </>
    )
}

Detalles.layout = 'AdminLayout'
export default Detalles