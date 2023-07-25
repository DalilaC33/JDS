import Contenedor from '../../components/user/contenedor'
import useGetAll from "../../api-config/useGetAll";
import { map } from "lodash";
import { useFormik } from "formik"
import Head from 'next/head';
import estilos from '../../styles/factura.module.css'
import userStore from "../../store/userStore";
import Paginacion from "../../components/pagination";
import usePostPerPage from "../../api-config/usePostPerPage";
import useGetPerPage from "../../api-config/useGetPerPage";
import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap"
import { BiSearch } from 'react-icons/bi'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PaginacionUsePost from "../../components/paginationUsePost";
import Pagination from '../../components/v2/pagination';
import { toast } from 'react-toastify';
import useGet from './../../api-config/v2/useGet';
import Loader from './../../components/loader';
import es from 'date-fns/locale/es';
import LoaderPage from "../../components/loaderPage"

registerLocale("es", es);

const Factura = () => {
  const LIST_SIZE = 10;
  const [listaFactura, setListaFactura] = useState([]);
  const { user, setUser } = userStore();

  //obtiente factura del cliente, el el metodo actualizarCliente le pasi el id
  //const _facturasGet = useGetPerPage("/api/facturas/cliente" , 0 , LIST_SIZE)
  const _facturasGet = useGet(`/api/facturas/cliente`)
  const _clienteGet = useGetAll(`api/clientes/usuario/${user.Id}`)//para obtener medidor, trae clientes
  const [listaCliente, setCliente] = useState(null);
  const [desde, setDesde] = useState(new Date("2022/05/01"));
  const [hasta, setHasta] = useState(new Date());
  const [clienteActual, setClienteActual] = useState(null)


  const fecha = {
    Desde: desde,
    Hasta: hasta
  }

  //accion  que se activa cuando se hace clic en el boton buscar
  const mifiltro = () => {
    _facturasGet.fetch({ page: 0, size: LIST_SIZE, ClienteId: clienteActual, ...fecha })
    setClienteActual(clienteActual)
    console.log(listaFactura)
  }
  /***/
  useEffect(() => {
    if (_clienteGet.statusCode === 200) {
      if (_clienteGet?.data?.length > 0) {
        _facturasGet.fetch({ page: 0, size: LIST_SIZE, ClienteId: _clienteGet.data[0].ClienteId })
        setClienteActual(_clienteGet.data[0].ClienteId)
        console.log("alg")
        setCliente(_clienteGet.data[0])
      }
    }

  }, [_clienteGet.statusCode])
  /**trae datos de factura*/
  useEffect(() => {
    if (_facturasGet?.statusCode === 200 && _facturasGet?.data) {
      setListaFactura(_facturasGet?.data?.content);
    }
  }, [_facturasGet?.statusCode, _facturasGet?.data]);

  /* trae los valores de cliente segun el campo seleccionado en el select
  e.target.value es el id de uasuario
  */
  const actualizarCliente = (e) => {
    let idUsuario = e.target.value;
    _facturasGet.fetch({ page: 0, size: LIST_SIZE, ClienteId: idUsuario })
    setClienteActual(idUsuario)
  }

  const handlePaginationChange = page => {
    _facturasGet.fetch({ page: page, size: LIST_SIZE, ClienteId: clienteActual, ...fecha })
  }


  return (
    <>
      <Head>
        <title>Factura</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Contenedor className={`  `}>
        <div className={`${estilos.fondo}  p-3 font-roboto`}>
          <div className={`${estilos.filtro} m-4 mt-5 mb-0 d-block`}>
            <h4 className={estilos.tituloPrincipal}>Factura</h4>

            {/**carga la pagina */
            (_facturasGet.loading || _clienteGet.loading) && <LoaderPage />}
            <form>
              <div className={`${estilos.rowFiltro}`}>
                <label className={`${estilos.tituloFiltro}`}>Medidor: </label>
                {/**trae los medidores segun el usuario */}
                <Form.Select className={`${estilos.inputs_filtro} ${estilos.inputsMedidor}  `} onChange={actualizarCliente}>
                  {
                    _clienteGet?.data?.length && _clienteGet.data.map((item, index) =>
                      <option key={index} value={item?.ClienteId}>{item?.Medidor} </option>
                    )
                  }
                </Form.Select >
                {/**fecha DESDE */}
                <label className={`${estilos.tituloFiltro} style="padding-left: 10px;"`}>Desde:</label>
                <div className={`${estilos.rowFiltro}`}>
                  <DatePicker
                    className={estilos.inputs_filtro}
                    locale="es" dateFormat="dd'/'MM'/'yyyy"
                    selected={desde}
                    selectsStart
                    onChange={(desde) => setDesde(new Date(desde))} />
                  {/**fecha HASTA*/}
                  <label className={`${estilos.tituloFiltro}`}>Hasta:</label>
                  <DatePicker
                    className={estilos.inputs_filtro}
                    locale="es" dateFormat="dd'/'MM'/'yyyy"
                    selected={hasta}
                    selectsEnd
                    onChange={(hasta) => setHasta(new Date(hasta))}
                  />

                  <Button onClick={mifiltro} className={estilos.inputs_filtrosearch} variant="primary" >
                    <div className="vertical-align: initial " >
                      {<BiSearch size={25} className="pb-2 vertical-align: initial " />}
                    </div>
                  </Button>


                </div>
              </div>
            </form>
          </div>
          <div className="px-lg-5">
            <div className="px-lg-4">
              <hr className={` ${estilos.tam} px-lg-5`} />
            </div>
          </div>
          <div className={` ${estilos.espacioTabla}  `} >
            <table className={` ${estilos.tamTabla} table mx-lg-3  px-lg-5 table-striped borde_tabla    `} >
              <thead className="fondo_tabla border-2 ">
                <tr className={`${estilos.tablaTitulo} ${estilos.bordeTabla}`}>
                  <th scope="col">Nro</th>
                  <th scope="col">Nro de factura</th>
                  <th scope="col"> Fecha </th>
                  <th scope="col">Monto</th>
                  <th scope="col">IVA</th>
                  <th scope="col">Medidor</th>
                </tr>
              </thead>
              <tbody
                onChange={actualizarCliente}
              >
                {map(listaFactura, (comp) => (
                  <tr key={comp.Id}  >
                    <th scope="row">{comp.Id}</th>
                    {//si no hay nro de factura muestra "-" caso contrario el nra de factura
                      comp.Numero == null ? <td >-----</td> : <td>{comp.Numero}</td>}
                    <td>{new Date(comp.Fecha).toLocaleDateString()}</td>
                    <td>{new Intl.NumberFormat('es-CO').format(comp.Total?? 0)} Gs</td>
                    <td>{new Intl.NumberFormat('es-CO').format(comp.IVA?? 0)} Gs</td>
                    <td>{comp.Cliente.Medidor}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
          <footer className="d-flex justify-content-center footer_margin">
            <Pagination axiosResponse={_facturasGet?.data} onChange={handlePaginationChange} />
          </footer>
        </div>
      </Contenedor>
    </>
  )
}

export default Factura;