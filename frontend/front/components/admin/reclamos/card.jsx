import PriorityLabel from './priorityLabel'
import { Draggable } from 'react-beautiful-dnd'
import { formatDate } from '../../../utils'

const Card = ({content, index, onItemClick}) => {

    const usuario = content.Cliente.Solicitud.Usuario
    const priority_label_color = (content?.Prioridad?.Nombre === 'Alta')? 'bg_red' : 
                                 (content?.Prioridad?.Nombre === 'Media')? 'bg_yellow' : 'bg_green'

    return (
        <>
            <Draggable draggableId={`${content.Id}`} key={content.Id} index={index}>
                {(draggableProvided)=>
                    <div className='card p-2 font-montserrat' 
                            onClick={() => onItemClick(content)}
                            ref={draggableProvided.innerRef} 
                            {...draggableProvided.draggableProps} 
                            {...draggableProvided.dragHandleProps}>
                        <div className='d-flex justify-content-between aling-items-center'>
                            <div>
                                <span>{`${usuario?.Nombre} ${usuario?.Apellido}`}</span>
                            </div>
                            <PriorityLabel bg_color={priority_label_color}/>
                        </div>
                        <div className='d-flex'>
                            <div>
                                <h6><span>Motivo: </span>{content?.Motivo?.Nombre}</h6>
                                <h6><span>Barrio: </span>{content?.Cliente?.Solicitud?.Barrio?.Nombre}</h6>
                                <h6><span>Referencia: </span>{content?.Referencia}</h6>
                            </div>
                        </div>
                        <div className='date'>
                            {formatDate(new Date(content?.Fecha))}
                        </div>
                    </div>
                }
            </Draggable>
            <style jsx>{`
                h6{
                    font-size: 12px;
                    margin: 5px;
                }
                span {
                    font-weight: 700;
                }
                .card {
                    background: white;
                    box-shadow: 0 0 3px 1px #d0d0d0;
                    width: 100%;
                    margin-bottom: 0.5rem;
                    font-size: 12px;
                    cursor: pointer;
                }
                .date {
                    display: flex;
                    justify-content: end;
                    font-size: 10px;
                    font-weight: 300;
                }
            `}</style>
        </>
    )
}

export default Card