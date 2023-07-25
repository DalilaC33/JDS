import {BiTargetLock} from 'react-icons/bi'

const TargetButton = ({onClick}) => {
    return (
        <button type="button" className="btn btn-outline-dark rounded-circle" onClick={onClick}>
            <BiTargetLock size={32}/>
            <style jsx>{`
                button {
                    position: absolute;
                    padding: 2px;
                    top: 10px;
                    right: 10px;
                    z-index: 999;
                }
                .btn:focus {
                    box-shadow: none;
                }
            `}</style>
        </button>
    )
}

export default TargetButton