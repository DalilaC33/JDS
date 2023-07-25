import Contenedor from '../../components/user/contenedor'
import estilos from '../../styles/user.module.css';
import Image from 'next/image';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';
const Home = () => {
  const [fecha, setFecha] = useState(" ");
  useEffect(() => {
    let aux = 0;
    let meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    let diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
    let f = new Date();
    aux = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " del " + f.getFullYear();
    setFecha(aux);
  }, []);
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Contenedor>
        <div className={estilos.encabezado}>
          <h1>Bienvenido!!!</h1>
          <p>{fecha}</p>
        </div>

        <div className={estilos.contenedor_padre}>

          <Link  href="/user/reclamos">
          <a className={estilos.contenedor_hijo}>
            <div className={estilos.detalle_azul}></div>
            <div className={estilos.contenido_tarjeta}>
              <Image className=" " src="/hombre.png" alt="img" width={65} height={45} />
              <p> Mis Reclamos</p>
            </div>
          </a>
          </Link>

          <Link href="/user/consumos">
          <a  className={estilos.contenedor_hijo}>
            <div className={estilos.detalle_azul}></div>
            <div className={estilos.contenido_tarjeta}>
              <Image className=" " src="/grifo-de-agua.png" alt="img" width={65} height={45} />
              <p>Mi Consumo</p>
            </div>
          </a>
          </Link>

          <Link  href="/user/facturas" >
          <a className={estilos.contenedor_hijo}>
            <div className={estilos.detalle_azul}></div>
            <div className={estilos.contenido_tarjeta}>
              <Image className=" " src="/factura.png" alt="img" width={65} height={45} />
              <p>Mis facturas</p>
            </div>
          </a>
          </Link>

          <Link href="/user/nosotros">
          <a  className={estilos.contenedor_hijo}>
            <div className={estilos.detalle_azul}></div>
            <div className={estilos.contenido_tarjeta}>
              <Image className=" " src="/informacion.png" alt="img" width={65} height={45} />
              <p>Sobre nosotros</p>
            </div>
          </a>
          </Link>


        </div>
      </Contenedor>

    </div>
  )
}

export default Home;