import PriorityLabel from "./priorityLabel"

const PriorityLabelRef = () => {
    return (
        <div className='d-flex mx-3'>
            <PriorityLabel bg_color='bg_red'/>
            <span>Alta</span>
            <PriorityLabel bg_color='bg_yellow'/>
            <span>Media</span>
            <PriorityLabel bg_color='bg_green'/>
            <span>Baja</span>
            <style jsx>{`
                span{
                    font-size: small;
                }
            `}</style>
        </div>
    )
}

export default PriorityLabelRef