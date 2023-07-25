import { FiMenu } from 'react-icons/fi'

const MobileNavBar = ({onShowMenuChange}) => {
    return (
        <>
            <img src='/logo.svg' alt='logo' className='filter-white' width={42} />
            <FiMenu size='2.5em'color='#fff' onClick={() => onShowMenuChange()}/>
        </>
    )
}

export default MobileNavBar