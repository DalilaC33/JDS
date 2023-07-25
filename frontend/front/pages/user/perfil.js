import PerfilLayout from '../../components/user/perfil/perfiLayout'
import PerfilMenu from '../../components/user/perfil/menu'
import Contenedor from '../../components/user/contenedor'
import styles from '../../styles/Perfil.module.css'
import LeafletMap from '../../components/leafletMap'
import DownloadPdf from '../../components/user/perfil/downloadPdf'
import Head from 'next/head';
import userStore from '../../store/userStore';
import { useState, useEffect } from 'react'
import useGetAll from '../../api-config/useGetAll'
import LoaderPage from '../../components/loaderPage'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Form } from "react-bootstrap"
import React, { Component } from "react";
import { useFormik } from "formik"
const Perfil = () => {
  const LIST_SIZE = 10
  const [Archivo, setArchivo] = useState(null)
  const [Cliente, setCliente] = useState(null)
  const { user, setUser } = userStore()
  const _archivosGet = useGetAll(`api/solicitudes/usuario/${user.Id}`)
  const _clienteGet = useGetAll(`api/clientes/usuario/${user.Id}`)

  /* trae los valores de cliente segun el campo seleccionado en el select
  e.target.value= la posicion del cliente en el arreglo _clienteGet.data
  el value se define en el select
  */
  const actualizarCliente = (e) => {
     let posicion=e.target.value;
    setCliente(_clienteGet.data[posicion]);
    
  }
 
  /**trae datos de los pdf */
  useEffect(() => {
    if (_archivosGet.statusCode === 200) {
      const dato = _archivosGet?.data
      setArchivo(dato[0])
    }
  }, [_archivosGet.statusCode])

  /**trae datos del cliente */
  useEffect(() => {
    if (_clienteGet.statusCode === 200) {
      if (_clienteGet.data.length) {
        setCliente(_clienteGet.data[0])
      }
    }
  }, [_clienteGet.statusCode])


 
  return (
    <>
      <Head>
        <title>Mi perfil</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Contenedor>
        <PerfilLayout>
          {(_archivosGet.loading) ?
            <LoaderPage /> :
            <div className={styles.fondo} >
              {Cliente && <div className=' w-100'>
                {/**este menu se muestra solo cuando la pantalla es pequeña,
                 se mantiene en display:none cuando la pantalla es grande
                 */}
                <div className={styles.boxHorizontal}>
                  <PerfilMenu></PerfilMenu>
                </div>
                <div className={styles.disposicion}>
                  {/**este menu muestra cuando la pantalla es grande */}
                  <div className={styles.box1}>
                    <PerfilMenu></PerfilMenu>
                  </div>
                  <div className={styles.box2}>
                    <div className='w-100 '>
                      <div className={` d-flex`}>
                        <div>
                          <h6 className='font-montserrat fw-bold'>Nombres:</h6>
                          <h6 className='font-montserrat fw-bold'>Apellidos:</h6>
                          <h6 className='font-montserrat fw-bold'>C.I.:</h6>
                          <h6 className='font-montserrat fw-bold'>Barrio:</h6>
                          <h6 className='font-montserrat fw-bold'>Referencia:</h6>
                          <h6 className='font-montserrat fw-bold'>Cta. Ctral.:</h6>
                          <h6 className='font-montserrat fw-bold'>Celular:</h6>
                          <h6 className='font-montserrat fw-bold'>Medidor:</h6>
                        </div>

                        <div 
                        className={`${styles.ancho} `}
                          /*trae el cliente con sus datos actualizados segun el medidor que selecciono */
                            onChange={ actualizarCliente} >
                          <h6 className='font-montserrat bold' name="nombre">{Cliente?.Solicitud?.Usuario?.Nombre} </h6>
                          <h6 className='font-montserrat bold' name="apellido">{Cliente?.Solicitud?.Usuario?.Apellido}</h6>
                          <h6 className='font-montserrat bold' name="ci">{Cliente?.Solicitud?.Usuario?.CI}</h6>
                          <h6 className='font-montserrat bold' name="barrio">{Cliente?.Solicitud?.Barrio?.Nombre}</h6>
                          <h6 className='font-montserrat bold' name="referencia">{Cliente?.Solicitud?.Referencia}</h6>
                          <h6 className='font-montserrat bold' name="cta catastral">{Cliente?.CuentaCatastral}</h6>
          
                          <h6 className='font-montserrat bold' name="celular">{Cliente?.Solicitud?.Usuario?.Celular}</h6>

                          {/**trae los medidores segun el usuario usuario */}
                          <Form.Select className={styles.selectMedidor}>
                            {
                              _clienteGet?.data?.length && _clienteGet.data.map((item, index) =>
                                <option key={index} value={index}>{item?.Medidor} </option>
                              )
                            }
                          </Form.Select >
                        </div>
                      </div>
                      <div className={`${styles.anchoMapa}`}>
                        <h6 className={` font-montserrat fw-bold`}>Referencia Satelital:</h6>
                        <LeafletMap default_center={(Cliente) ? Cliente?.Solicitud?.ReferenciaSatelital : '-27.312125369790436, -55.880672768763304'} />

                      </div>
                    </div>
                    <div className='w-50 ps-3'>
                      <div className='d-flex'>
                        <div>
                          <h6 className='font-montserrat fw-bold'>Email:</h6>

                        </div>
                        <div className='flex-grow-1 ps-2'>
                          <h6 className='font-montserrat bold'>{Cliente?.Solicitud?.Usuario?.Email}</h6>

                        </div>
                      </div>
                      <div className={`${styles.ancho} me-5`}>
                        <div className={` mt-3`}>
                          <h6 className='font-montserrat fw-bold'>Escaneado de Cédula de Identidad:</h6>
                          <DownloadPdf text={_archivosGet?.data[0].Id + '_' + Cliente?.Solicitud?.Usuario?.Nombre + '_' + Cliente?.Solicitud?.Usuario?.Apellido + '_CI.pdf'} fileKey={_archivosGet?.data[0].EtagCI} />
                        </div>
                        <div className={` mt-3`}>
                          <h6 className='font-montserrat fw-bold'>Escaneado de Título o Pago de Impuesto</h6>
                          <DownloadPdf text={_archivosGet?.data[0].Id + '_' + Cliente?.Solicitud?.Usuario?.Nombre + '_' + Cliente?.Solicitud?.Usuario?.Apellido + '_TITULO.pdf'} fileKey={_archivosGet?.data[0].EtagTitulo} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
            </div >}
        </PerfilLayout>
        <ToastContainer />
      </Contenedor>

    </>

  )
}

export default Perfil;