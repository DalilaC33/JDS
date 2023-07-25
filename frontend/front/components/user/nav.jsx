import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router'
import { removeCookie, removeJWT } from '../../utils';
import userStore from '../../store/userStore';
import {HiMenu} from 'react-icons/hi'

const Navigation = () => {
    const [showCard, setShowCard] = useState(false)
    const {user, setUser} = userStore()
    const router = useRouter()

    const letra = user? user.Nombre.charAt(0) : '-'

    const logOut = () => {
        setUser(null)
        removeCookie()
        removeJWT()
        router.push('/auth/login')
    }
    return (

        <nav className='fondo-celeste navbar navbar-expand-lg mb-0'>
            <div className=" container-fluid ">
                <Image className="filter-white" src="/logo.svg" alt="Logo" width={65} height={37} />
                <Link href="/user">
                <a  className="navbar-brand nombre-junta">Ñande Y</a>
                </Link>
                <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    < HiMenu color="white"  size={50}/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ">

                        <div className="d-flex justify-content-evenly">
                            <div className=" ">
                                <li className="nav-item">
                                    <Link href="/user">
                                        <a className="nav-link active" aria-current="page" >Inicio</a>
                                    </Link>
                                </li>
                            </div>
                            <div className="">
                                <li className="nav-item">
                                    <Link href="/user/reclamos">
                                        <a className="nav-link">Reclamos</a>
                                    </Link>
                                </li>
                            </div>
                            <div className=" ">
                                <li className="nav-item dropdown">
                                    <Link  href="/">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Historial
                                    </a>
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li>
                                        <Link href="/user/consumos">
                                            <a className="dropdown-item text-black" >Mis consumo</a>
                                        </Link>
                                        </li>
                                        <li>
                                        <Link href="/user/facturas">  
                                            <a className="dropdown-item text-black" >Mis Facturas</a>
                                        </Link>
                                        </li>
                                    </ul>
                                </li>
                            </div>
                        </div>


                    </ul>
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
                            <div className='nombre'>{`${user.Nombre} ${user.Apellido}`}</div>
                            <Link href="/user/perfil">
                            <a className='text-decoration-none '>
                                <div className='contenido-tarjeta'>Mi Perfil</div>
                            </a>
                            </Link>
                            <div className='contenido-tarjeta' onClick={logOut}>Cerrar Sesión</div>
                        </div>
                    </div>}
                </div>
            </div>

            <style jsx>{`
             .fondo-celeste{
                background-color: #86B4FA;
             }
             @media only screen and (max-width: 767px){
                .fondo-blanco, fondo-letra{
                    display: none;
                }
             }
             .nombre-junta{
                color: black;
                font-size: 23px;
                font-weight: 600;
             }
             .nombre-junta:hover {
                font-weight: 700;
            

             }

             .text-black{
                color: black;
                font-size: 15px;
                text-decoration: none;
             }

             .text-black:focus {
                background: white;
             }
             a{
                color: white;
                font-size: 20px;
             }

             a:hover {
                font-weight: 500;
                color: black;
            }
             a:focus {
                font-weight: 600;
                color: white;
            }

             .fondo-blanco {
                background: white;
                position: absolute;
                height: 62px;
                top: 0px;
                right: 10px;
                border-radius: 10px;
                padding: 0 10px 0 10px;
            }
            .fondo-letra {
                background: #86B4FA;
                width: 43px;
                height: 40px;
                color: white;
                border-radius: 50%;
                cursor: pointer;
            }
            .tarjeta {
                position: absolute;
                border-radius: 5px;
                box-shadow: 0 0 2px 2px #ebebeb;
                top: 4rem;
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

            .nombre {
                color: #64646b;
                font-size: 12px;
                cursor: pointer;
                text-align: center;
                padding: 0.5rem;
                border-bottom: 1px solid #ddd;
                background: white;
            }
            .contenido-tarjeta:hover {
                color: black;
                font-weight: 600;
            }
                
            `}</style>
        </nav>
    )
}

export default Navigation;