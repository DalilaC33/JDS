import Contenedor from '../../components/user/contenedor'
import Head from 'next/head';
import Encabezado from '../../components/user/Consumo/Consumo'
const Consumo = () => {
  return (
    <div>
      <Head>
        <title>Consumo</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Contenedor>
        <div className="fondo_blanco y-scroll">
          <div className="me-5  pt-0">
            <div className="p-lg-4 pt-lg-0">
              <div className="px-lg-5 pt-0">
                <Encabezado />
              </div>
            </div>
          </div>
        </div>
      </Contenedor>
      <style jsx>{`
        .fondo_blanco {
          width: 100%;
          height: 41.2rem;
          background: white;
          overflow: scroll;
        }

        .espaciado_btn {
          margin-right: 10%;
          margin-top: 4%;
        }
        ._titulo {
          margin-left: 12%;
          color: #8a8a8a;
          margin-top: 4%;
        }
        .footer_margin {
          margin-top: 3%;
        }

        .y-scroll::-webkit-scrollbar {
          display: none;
          overflow-y: scroll;
        }
      `}</style>
    </div>
  )
}

export default Consumo;