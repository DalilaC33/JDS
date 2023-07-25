import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { removeCookie, removeJWT } from '../../../../../utils'

const DesktopNavBar = ({user, setUser}) => {

    const [showCard, setShowCard] = useState(false)
    const letra = user? user.Nombre.charAt(0) : '-'
    const router = useRouter()

    const logOut = () => {
        setUser(null)
        removeCookie()
        removeJWT()
        router.push('/auth/login')
        sessionStorage.clear()
    }

    return (
        <>
            <div className='navbar-brand y-center'>
                <Link href='/admin'>
                    <a className='text-decoration-none'>
                        <img src='/logo.svg' alt='logo' className='filter-white mx-2' width={42} />
                        <span className='titulo'>Ñande Y</span>          
                    </a>
                </Link>
            </div>
            <div className='fondo-blanco d-flex align-items-center'>
                <div className='fondo-letra d-flex justify-content-center align-items-center' 
                     onClick={() => setShowCard(!showCard)}>
                    <h4 className='text-center m-0'>
                        {letra}
                    </h4>
                </div>
            </div>
            {showCard && <div className='tarjeta'>
                <div>
                    <Link href='/admin/configuracion'>
                        <a className='text-decoration-none'>
                            <div className='contenido-tarjeta'>Configuración</div>
                        </a>
                    </Link>
                    <div className='contenido-tarjeta' onClick={logOut}>Cerrar Sesión</div>
                </div>
            </div>}
            <style jsx>{`
                .titulo {
                    font-size: 23px;
                    font-weight: 600;
                    color: black;
                }
                .fondo-blanco {
                    background: white;
                    position: absolute;
                    height: 100%;
                    top: 0px;
                    right: 10px;
                    border-radius: 10px;
                    padding: 0 10px 0 10px;
                }
                .fondo-letra {
                    background: #86B4FA;
                    width: 40px;
                    height: 40px;
                    color: white;
                    border-radius: 50%;
                    cursor: pointer;
                }
                .tarjeta {
                    position: absolute;
                    border-radius: 5px;
                    box-shadow: 0 0 2px 2px #ebebeb;
                    right: 10px;
                    z-index: 1;
                    width: 8rem;
                    
                }
                .contenido-tarjeta {
                    color: black;
                    font-size: 12px;
                    cursor: pointer;
                    text-align: center;
                    padding: 0.5rem;
                    border-bottom: 1px solid #ddd;
                    background: white;
                }
                .contenido-tarjeta:hover {
                    color: #86B4FA;
                    font-weight: 600;
                }
            `}</style>
        </>
    )
}

export default DesktopNavBar