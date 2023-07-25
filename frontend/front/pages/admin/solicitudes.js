import Head from 'next/head'
import { useState, useEffect } from 'react'

import { RequestData, RejectRequest, RegistryUser, TableRow } from '../../components/admin/solicitudes'
import { Container, Breadcrumb } from '../../components/admin/common'
import LoaderPage from '../../components/loaderPage'
import Loader from '../../components/loader'
import { GrNext, GrPrevious } from 'react-icons/gr'
import { BiCheckCircle } from 'react-icons/bi'
import { FaTrashAlt } from 'react-icons/fa'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import usePost from '../../api-config/usePost'
import useGetPerPage from '../../api-config/useGetPerPage'

import styles from '../../styles/Solicitudes.module.css'


const Solicitudes = () => {

    const LIST_SIZE = 10

    const [modalRegistrar, setModalRegistrar] = useState(false)
    const [modalRechazar, setModalRechazar] = useState(false)

    const [lista, setLista] = useState([])
    const [solicitudActual, setSolicitudActual] = useState(null)
    const [resetearLista, setResetearLista] = useState(false)

    const _solicitudesGet = useGetPerPage('/api/solicitudes/pendientes', 0, LIST_SIZE)
    const _aprobarSolicitud = usePost('/api/solicitudes/aprobar')
    const _rechazarSolicitud = usePost('/api/solicitudes/rechazar')

    const registrarUsuario = (values) => {
        const objectPost = {
            Medidor: values.Medidor,
            CuentaCatastral: values.CuentaCatastral,
            SolicitudId: solicitudActual.Id,
            CategoriaId: values.CategoriaId,
            UsuarioId: solicitudActual.UsuarioId
        }
        setResetearLista(true)
        _aprobarSolicitud.fetch(objectPost)
    }

    const rechazarSolicitud = ({ MotivoRechazoId, Descripcion }) => {
        setResetearLista(true)
        _rechazarSolicitud.fetch({ SolicitudId: solicitudActual.Id, UsuarioId: solicitudActual.UsuarioId, MotivoRechazoId, Descripcion })
    }

    const handleModalRegistrarChange = () => {
        setModalRegistrar(!modalRegistrar);
    }

    const handleSolicitudActualChange = (id) => {
        const solicitud = lista.find(l => l.Id === id)
        setSolicitudActual(solicitud)
    }

    const verMas = () => {
        _solicitudesGet.fetch(_solicitudesGet.data.nextPage, LIST_SIZE)
    }

    const cambiarSolicitud = (avanzar) => {
        const positionActual = lista.findIndex(e => e.Id === solicitudActual.Id)
        if(avanzar) {
            if(!lista[positionActual + 2] && _solicitudesGet?.data?.nextPage) {
                verMas()
            }
            setSolicitudActual(lista[positionActual + 1])
        } else {
            setSolicitudActual(lista[positionActual - 1])
        }
    }
    
    useEffect(() => {
        if (_solicitudesGet.statusCode === 200) {
            const newList = resetearLista? 
                _solicitudesGet?.data?.content :
                lista.concat(_solicitudesGet?.data?.content)
            setLista(newList)
            !newList.find(l => l.Id === solicitudActual?.Id) && setSolicitudActual(newList[0])
            setResetearLista(false)
        }
    }, [_solicitudesGet.statusCode,])

    useEffect(() => {
        if (_aprobarSolicitud.statusCode === 200) {
            _solicitudesGet.fetch(0, LIST_SIZE)
            toastInfo("La solicitud fue aceptada correctamente")
        }
    }, [_aprobarSolicitud.statusCode])

    useEffect(() => {
        if (_rechazarSolicitud.statusCode === 200) {
            _solicitudesGet.fetch(0, LIST_SIZE)
            toastInfo("La solicitud fue rechazada correctamente")
        }
    }, [_rechazarSolicitud.statusCode])

    const toastInfo = (message) => {
        toast.info(message, {
            position: toast.POSITION.TOP_RIGHT
        })
    }

    return (
        <>
            <RejectRequest  show={modalRechazar} handleClose={() => setModalRechazar(false)} handleSave={rechazarSolicitud}/>
            <RegistryUser  show={modalRegistrar} handleClose={() => setModalRegistrar(false)} handleSave={registrarUsuario}/>
            {lista[lista.findIndex(e => e.Id === solicitudActual.Id) - 1] &&
                <GrPrevious size={30} className={styles.previousButton} onClick={() => cambiarSolicitud(false)}/>
            }
            {lista[lista.findIndex(e => e.Id === solicitudActual.Id) + 1] &&
                <GrNext size={30} className={styles.nextButton} onClick={() => cambiarSolicitud(true)}/>
            }
            <div className='position-relative w-100 h-100'>
                <Head>
                    <title>Solicitudes</title>
                </Head>
                <div className='p-3 font-roboto'>
                    <h4>Solicitudes</h4>
                    <Breadcrumb links={[['Home', '/admin']]} currentPage='Solicitudes' />

                    {((_aprobarSolicitud.loading || _rechazarSolicitud.loading) || (_solicitudesGet.loading)) &&
                        <LoaderPage />
                    }
                    {!lista?.length && !_solicitudesGet.loading && 
                        <h4>No hay solicitudes...</h4>
                    }
                    {solicitudActual && 
                        <div className='d-flex justify-content-between'>
                            <div className={styles.contenedorA}>
                                <Container width={'100%'}>
                                    <div className='p-3'>
                                        <RequestData solicitudActual={solicitudActual}/>
                                        <div className={styles.buttonsBox}>
                                            <button className='btn btn-outline-danger me-2' 
                                                    onClick={() => setModalRechazar(true)}>
                                                <FaTrashAlt size={24}/> Rechazar
                                            </button>
                                            <button className='btn btn-outline-success' onClick={handleModalRegistrarChange}>
                                                <BiCheckCircle size={30}/> Aceptar
                                            </button>
                                        </div>
                                    </div>
                                </Container>
                            </div>
                            <div className={styles.contenedorB}>
                                <Container width={'100%'}>
                                    <div className='p-3'>
                                        <div className='d-flex justify-content-center border-bottom border-primary mb-2'>
                                                <h6><b>Solicitudes Entrantes</b></h6>
                                            </div>
                                            <TableRow lista={lista} 
                                                    idActivo={solicitudActual.Id} 
                                                    onSolicitudActualChange={handleSolicitudActualChange}
                                                    verMas={verMas}
                                                    siguientePag={_solicitudesGet?.data?.nextPage} />
                                    </div>
                                </Container>
                            </div>
                        </div>
                    }
                    <ToastContainer />
                </div>
            </div>
        </>
    )

}

Solicitudes.layout = 'AdminLayout'
export default Solicitudes 