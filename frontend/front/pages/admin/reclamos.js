import Head from 'next/head'
import Breadcrumb from '../../components/admin/common/breadcrumb'
import List from '../../components/admin/reclamos/list'
import PriorityLabelRef from '../../components/admin/reclamos/priorityLabelRef'
import { DragDropContext } from 'react-beautiful-dnd'
import { useEffect, useState } from 'react'
import Modal from '../../components/admin/reclamos/modal'
import useGetAll from '../../api-config/useGetAll'
import usePut from '../../api-config/usePut'
import Loader from '../../components/loader'
import { ToastContainer, toast } from 'react-toastify'

const Reclamos = () => {
    
    const fechaActual = new Date()
    const fechaDesde = new Date(fechaActual.setDate(fechaActual.getDate() - 30)).toISOString().split('T')[0]

    const [listaReclamos, setListaReclamos] = useState([])
    const [listEstados, setListEstados] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [reclamoActual, setReclamoActual] = useState({})

    const _reclamosGet = useGetAll(`/api/reclamos/fecha/${fechaDesde}`)
    const _reclamosPut = usePut('/api/reclamos')
    const _estados = useGetAll('/api/estados')


    const moveItems = result => {
        const {destination, draggableId} = result
        if(destination?.droppableId && draggableId) {
            const reclamo = listaReclamos.find(r => r.Id === Number(draggableId))
            const nuevaListaReclamos = listaReclamos.filter(r => r.Id !== Number(draggableId))
            reclamo.EstadoId = Number(destination?.droppableId)
            _reclamosPut.fetch(reclamo, draggableId)
            const PENDIENTES = nuevaListaReclamos.filter(r => r?.EstadoId === 1)
            const EN_PROGRESO = nuevaListaReclamos.filter(r => r?.EstadoId === 4)
            const ATENDIDOS = nuevaListaReclamos.filter(r => r?.EstadoId === 5)
            destination?.droppableId === '1'? PENDIENTES.splice(destination?.index, 0, reclamo) :
            destination?.droppableId === '4'? EN_PROGRESO.splice(destination?.index, 0, reclamo) :
            ATENDIDOS.splice(destination?.index, 0, reclamo)
            setListaReclamos(PENDIENTES.concat(EN_PROGRESO, ATENDIDOS))
        }
    }

    const showItem = (item) => {
        setShowModal(true)
        setReclamoActual(item)
    }

    const toastDanger = (message) => {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT
        })
    }

    const setPriorityInModal = (priorityId, priorityName) => {
        if(reclamoActual.PrioridadId !== priorityId) {
            const miReclamo = reclamoActual
            const miListaDeReclamo = listaReclamos

            miReclamo.PrioridadId = priorityId
            miReclamo['Prioridad'].Nombre = priorityName
            
            _reclamosPut.fetch(miReclamo, miReclamo.Id)
            const reclamoIndex = miListaDeReclamo.findIndex(l => l.Id === miReclamo.Id)

            miListaDeReclamo[reclamoIndex] = miReclamo

            setListaReclamos(miListaDeReclamo)
            setReclamoActual(miReclamo)
        }
    }

    useEffect(() => {
        if(_reclamosGet?.statusCode === 200) {
            setListaReclamos(_reclamosGet?.data)
        }
    }, [_reclamosGet?.statusCode])

    useEffect(() => {
        if(_reclamosPut?.statusCode !== 204 && _reclamosPut?.statusCode !== 0) {
            toastDanger('Ocurrió un error al actualizar los datos, por favor recarga la página')
        }
    }, [_reclamosPut?.statusCode])

    useEffect(() => {
        if(_estados?.statusCode === 200) {
            const lista = _estados?.data?.content?.filter(l => (l.Nombre === 'Pendiente' || l.Nombre === 'En Progreso' || l.Nombre === 'Atendido'))
            setListEstados(lista)
        }
    }, [_estados?.statusCode])

    return (
        <>
            <Head>
                <title>Reclamos</title>
            </Head>
            <div className='p-3 font-roboto'>
                <h4>Reclamos</h4>
                <div className='d-flex justify-content-between'>
                    <Breadcrumb links={[['Home', '/admin']]} currentPage='Reclamos'/>
                    <PriorityLabelRef />
                </div>

                <ToastContainer />

                {_reclamosGet.loading && 
                    <div className='d-flex justify-content-center m-5 p-5'><Loader /></div>
                }
                {!listaReclamos?.length && !_reclamosGet.loading && 
                    <h4>No hay reclamos...</h4>
                }
                {!!listaReclamos.length && <div className='d-flex justify-content-around'>
                    <Modal  show={showModal} 
                            reclamo={reclamoActual} 
                            handleClose={() => setShowModal(false)} 
                            setPriority={setPriorityInModal}/>
                    <DragDropContext onDragEnd={result => moveItems(result)}>
                        {!!listEstados.length && listEstados.map((estado, index) =>
                            <List key={index} onItemClick={showItem} estado={estado} lista={listaReclamos}/>
                        )}
                    </DragDropContext>
                </div>}
            </div>
        </>
    )
}

Reclamos.layout = 'AdminLayout'
export default Reclamos