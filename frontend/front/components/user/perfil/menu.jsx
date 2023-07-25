import { FaUserTie, FaUserCircle } from 'react-icons/fa'
import {RiForbid2Line} from 'react-icons/ri'
import    {BsPencil} from 'react-icons/bs'
import { useRouter } from 'next/router'
import Link from 'next/link'
const PerfilMenu = () => {
 
    const { pathname: currentPage } = useRouter() 
    const path1 ='/user/perfil'
    const path2 ='/user/editar'
    const path3 ='/user/desconexion'
    return (
        <>
            <div className='d-flex  flex-column  '>
                <div className='d-flex justify-content-center p-1 py-4 filter-gray'>
                    <FaUserCircle size={150}/>
                </div>

                <Link href={path1} >
                <a className='text-decoration-none d-flex border-bottom-0'>
                    <div className= {`${ (currentPage===path1)? 'selected': 'not-selected'} p-1 d-flex position-relative flex-fill `}>       
                        <div className={`ps-1 y-center ${(currentPage===path1)? 'filter-blue' : 'filter-dark-gray'}`}>
                            <FaUserTie size={22} />
                        </div>
                        <span className='text '>Mi Perfil</span>
                    </div>
                </a>
                </Link>

                <Link href={path2} >
                <a className='text-decoration-none d-flex border-bottom-0'>
                    <div className={`${ (currentPage===path2)? 'selected': 'not-selected'} p-1 d-flex position-relative flex-fill `}>
                        <div className={`ps-1 y-center ${(currentPage===path2)? 'filter-blue' : 'filter-dark-gray'}`}>
                            <BsPencil size={22} />
                        </div>
                        <span className='text' >Editar Perfil</span>
                    </div>
                </a>
                </Link>

                <Link href={path3} >
                <a className='text-decoration-none d-flex '>
                    <div className={`${ (currentPage===path3)? 'selected': 'not-selected'} p-1 d-flex position-relative flex-fill `}>
                        <div className={`ps-1 y-center ${(currentPage===path3)? 'filter-blue' : 'filter-dark-gray'}`}>
                            <RiForbid2Line size={22} />
                        </div>
                        <span className='text'>Desconexión</span>
                    </div>
                </a>
                </Link>
            </div>
            <style jsx>{`
            .text {
                font-weight: 400; 
                font-size: 15px;
                padding: 2px
                
            }
            .selected{
                background: #D8FDFF;
                color: blue;
            
            }
            .not-selected {
                color:#555;
            }
            a{
                border-top: 1px solid gray;
                border-bottom: 1px solid gray;
             
            }
            a:hover{
                background: #D8FDFF;
                cursor: pointer;
            }
           
            `}</style>
        </>
    )
}

export default PerfilMenu