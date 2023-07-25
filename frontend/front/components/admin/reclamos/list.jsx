import Container from '../common/container'
import Card from './card'
import { Droppable } from 'react-beautiful-dnd'

const List = ({onItemClick, estado, lista}) => {

    const filteredList = lista?.filter(l => l.EstadoId === estado.Id)

    return (
        <div className='list_container'>
            <div>
                <Container>
                    <h6 className='py-2 px-3 list_title'>{estado?.Nombre?.toUpperCase()}</h6>
                </Container>
            </div>
            <Droppable droppableId={`${estado?.Id}`}>
                {(droppableProvided) => 
                    <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef} className='h-100'>
                        {filteredList && 
                            filteredList.map((reclamo, index) => 
                                <Card key={index} content={reclamo} index={index} onItemClick={onItemClick}/> 
                            )
                        }
                        {droppableProvided.placeholder}
                    </div>
                }
            </Droppable>
            <style jsx>{`
                .list_container {
                    width: 30%;
                }
                .list_title {
                    font-weight: 800;
                    font-size: 14px;
                    color:blue;
                }
            `}</style>
        </div>
    )
}

export default List