import { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import usePut from "../../../api-config/usePut"
import { formatDate } from "../../../utils"
import PriorityLabel from "./priorityLabel"

const InfoModal = ({reclamo, show, handleClose, setPriority}) => {

    const solicitud = reclamo?.Cliente?.Solicitud
    const usuario = solicitud?.Usuario

    const _reclamos = usePut('/api/reclamos')


    return (
        <Modal  show={show} 
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter" 
                centered
                className='font-roboto'>
            <Modal.Header closeButton>
            <Modal.Title>{`${usuario?.Nombre} ${usuario?.Apellido}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h6 className='fw-bold'>Datos del Cliente</h6>
                    <div className='font-montserrat px-2 d-flex'>
                        <div className='flex-grow-1'>
                            <h6 className='content_text'>
                                <b>C.I.:</b> {Number(usuario?.CI).toLocaleString('en-US')}
                            </h6>
                            <h6 className='content_text'><b>Celular:</b> {usuario?.Celular}</h6>
                        </div>
                        <div className='flex-grow-1'>
                            <h6 className='content_text'><b>Email:</b> {usuario?.Email}</h6>
                            <h6 className='content_text'><b>Barrio:</b> {solicitud?.Barrio?.Nombre}</h6>
                        </div>
                    </div>
                    <h6 className='fw-bold'>Datos del Reclamo</h6>
                    <div className='font-montserrat px-2 d-flex'>
                        <div className='flex-grow-1'>
                            <h6 className='content_text'><b>Fecha de reclamo: </b> {formatDate(new Date(reclamo?.Fecha))}</h6>
                            <h6 className='content_text'><b>Motivo: </b> {reclamo?.Motivo?.Nombre}</h6>
                            <h6 className='content_text'><b>Descripción: </b> {reclamo?.Descripcion}</h6>
                            <h6 className='content_text'><b>Referencia: </b> {reclamo?.Referencia}</h6>
                            <div className="d-flex">
                                <h6 className='content_text col-auto'><b>Prioridad: </b></h6>
                                <div className="cursor-pointer" onClick={() => setPriority(3, 'Alta')}>
                                    <PriorityLabel title={'Alta'} bg_color={reclamo?.Prioridad?.Nombre === 'Alta'? 'bg_red' : 'border_red'}/>
                                </div>
                                <div className="cursor-pointer" onClick={() => setPriority(2, 'Media')}>
                                    <PriorityLabel title={'Media'} bg_color={reclamo?.Prioridad?.Nombre === 'Media'? 'bg_yellow' : 'border_yellow'}/>
                                </div>
                                <div className="cursor-pointer" onClick={() => setPriority(1, 'Baja')}>
                                    <PriorityLabel title={'Baja'} bg_color={reclamo?.Prioridad?.Nombre === 'Baja'? 'bg_green' : 'border_green'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <style jsx>{`
                .content_text {
                    font-size: small;
                }
                .cursor-pointer {
                    cursor: pointer;
                }
            `}</style>
      </Modal>
    )
}

export default InfoModal