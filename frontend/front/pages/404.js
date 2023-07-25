import Head from 'next/head'

import styles from '../styles/404.module.css'

const NotFound = () => {

    return (
      <div className='position-absolute h-100 w-100 bg-white'>
        <Head>
            <title>Not Found</title>
        </Head>
        <div>
            <div className='p-3'>
                <h1 className='display-4 mb-5'>Página no encontrada</h1>
                <p className='lead'>Parece que siguió un enlace roto, ingresó una URL que no existe</p>
                <p className='lead'>o no tiene la autorización para ingresar a este sitio</p>
            </div>
        </div>
        <img id={styles.paisaje} src='/desert.svg' alt='desierto' />
        <div id={styles.trasladar}><img id={styles.rotar} src='/tumbleweed.svg' alt='planta rodadora' width={90} /></div>    
      </div>
    )

}

export default NotFound