import { useRouter } from 'next/router'
import Container from "../../../../components/admin/common/container"
import Head from "next/head"
import Breadcrumb from '../../../../components/admin/common/breadcrumb'
import FacturaDetalle from '../../../../components/admin/caja/factura_detalle'
import useGetPerPage from "../../../../api-config/useGetPerPage";
import { useEffect, useState } from 'react'
import { BiArrowBack } from "react-icons/bi"
import Link from "next/link";
import LoaderPage from '../../../../components/loaderPage'
import estilos from '../../../../styles/comunAdmin.module.css'
const Clientes = () => {
    const LIST_SIZE = 1000;//necesario para listar la cantidad de clientes en cada paginacion
    const [list, setList] = useState([]) //lista donde se cargan las facturas
    const router = useRouter()
    const _factura = useGetPerPage("/api/facturas", 0, LIST_SIZE);
    const [pid, setPid] = useState(router.query.pid)

    useEffect(() => {
        if (router.isReady) {
            // Code using query
            setPid(router.query.pid)
        }
    }, [router.isReady]);
    //para listar las factura al inicio
    useEffect(() => {
        if (_factura?.statusCode === 200) {
            setList(_factura?.data?.content.filter(l => l.Id === parseInt(pid)))

        }

    }, [_factura?.statusCode])

    return (
        <>
            <Head>
                <title>Factura Detalles</title>
            </Head>
            <div className="p-4 pb-0  font-montserrat">
                <h3 >{`Factura Detalles`}</h3>
                {((_factura.loading)) &&
                    <LoaderPage />
                }
                <Breadcrumb links={[['Home', '/admin'], ['Medidor', '/admin/medidor']]} currentPage='Factura Detalles' />
            </div>
            <div className='d-flex justify-content-center'>
                <Container width={'80%'}>
                    <div className={estilos.desbordamiento}>
                        <Link href="/admin/medidor">
                            <a>
                                <BiArrowBack className="m-2 ms-3" size={30} type="button" ></BiArrowBack>
                            </a>
                        </Link>
                        {(list.length === 0) &&
                            <h5 className='m-4'>La factura detalle que deseas visualizar no existe...</h5>
                        }
                        {!!list.length && list.map((factura, index) =>
                            <div className='mb-5' key={index} >
                                <FacturaDetalle factura={factura}></FacturaDetalle>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        </>

    )

}

Clientes.layout = 'AdminLayout'
export default Clientes