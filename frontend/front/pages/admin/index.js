import Head from 'next/head'
import { useEffect } from 'react'
import useGet from '../../api-config/v2/useGet'
import Container from '../../components/admin/common/container'
import LoaderPage from '../../components/loaderPage'
import { numberWithCommas } from '../../utils'

const Home = () => {

    const {data, loading, fetch} = useGet('/api/reportes')

    useEffect(() => {
        fetch()
    }, [])

    useEffect(() => {
    }, [data])

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            {loading && <LoaderPage /> }
            <div className='d-flex justify-content-around my-5 flex-wrap'>
                <div className='card-container mb-5' style={{ minWidth: '330px'}}>
                    <Container>
                        <div className='p-3'>
                            <h5 className='text-primary mb-3'>Cobros</h5>
                            <div className='d-flex justify-content-between'>
                                <h6>Recaudación del día</h6>
                                <h6>{numberWithCommas(data?.recaudacionDelDia ?? 0)} ₲</h6>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <h6>Recaudación del mes</h6>
                                <h6>{numberWithCommas(data?.recaudacionDelMes ?? 0)} ₲</h6>
                            </div>
                        </div>
                    </Container>
                </div>
                <div className='card-container mb-5' style={{ minWidth: '330px'}}>
                    <Container>
                    <div className='p-3'>
                            <h5 className='text-primary mb-3'>Facturación</h5>
                            <div className='d-flex justify-content-between'>
                                <h6>Facturas Pendiendes del mes</h6>
                                <h6>{data?.facturasPendientesDelMes ?? 0}</h6>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <h6>Facturas Pagadas del mes</h6>
                                <h6>{data?.facturasPagadasDelMes ?? 0}</h6>
                            </div>
                        </div>
                    </Container>
                </div>
                <div className='card-container mb-5' style={{ minWidth: '330px'}}>
                    <Container>
                    <div className='p-3'>
                            <h5 className='text-primary mb-3'>Reclamos</h5>
                            <div className='d-flex justify-content-between'>
                                <h6>Reclamos Pendiendes del mes</h6>
                                <h6>{data?.reclamosPendientesDelMes ?? 0}</h6>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <h6>Reclamos En Progreso del mes</h6>
                                <h6>{data?.reclamosEnProgresoDelMes ?? 0}</h6>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    )
}

Home.layout = 'AdminLayout'

export default Home