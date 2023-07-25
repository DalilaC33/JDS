import { useEffect } from 'react';
import Navigation from '../../components/user/nav'
import userStore from '../../store/userStore';
import StaticPage from '../staticPage';
import Router from 'next/router';

const Contenedor = (props) => {

    const { user } = userStore()

    useEffect(() => {
        (user && user?.Rols.find(r => r.Nombre === 'Administrador')) && Router.push('/404')
    }, [user])

    return (
        (user && user?.Rols.find(r => r.Nombre === 'Cliente'))?
            <>
                <div className='contenedor' >
                    <Navigation />
                    {props.children}
                </div>
                <style jsx>{`     
                    .contenedor {
                        position: alsolute;
                        height: 100vh;
                        width: 100vw;
                        background: url('../../fondo.jpeg');
                        background-repeat:no-repeat;
                        background-position: center center;
                        -webkit-background-size: cover;
                        -moz-background-size: cover;
                        -o-background-size: cover;
                        background-size: cover;
                    }    
                `}</style>
            </> : 
            <StaticPage />
    )
}
export default Contenedor;