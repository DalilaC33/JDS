
import { useEffect, useState } from 'react'
import useGetAll from "../../../api-config/useGetAll"
import useGet from "../../../api-config/useGet"
import estilos from '../../../styles/usuariosActivos.module.css'
import Loader from "../../../components/loader";
import DatePicker, { registerLocale } from "react-datepicker";
import { BsSearch } from 'react-icons/bs'
import { Button } from "react-bootstrap";
import usePostPerPage from "../../../api-config/usePostPerPage";
import "react-datepicker/dist/react-datepicker.css";
import userStore from '../../../store/userStore'
import PaginacionUsePost from "../../../components/PaginationUsePost";
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Pagination from '../../../components/v2/pagination'
import es from 'date-fns/locale/es';

registerLocale("es", es);

const Consumo = () => {
  const { user, setUser } = userStore()
  const [clientes, setClientes] = useState(null) //necesario para listar en el formulario
  const _clientes = useGetAll(`api/clientes/usuario/${user.Id}`)
  const [objRequest, setObjRequest] = useState({})//necesario para enviar a la paginacion el objeto filtrado
  const [desde, setdesdeDate] = useState(new Date());
  const [hasta, sethastaDate] = useState(new Date());
  const [fechaDInicial, setfechaDDate] = useState(null);
  const [fechaHInicial, setfechaHDate] = useState();
  const [medidor, setCliente] = useState(0);
  const _clientesFiltrados = usePostPerPage(`api/lecturas/cliente/${medidor}`, 0, LIST_SIZE)
  const [filtra, setfiltro] = useState(false)
  const LIST_SIZE = 10;

  useEffect(() => {
    if (_clientes.statusCode === 200) {
      setClientes(_clientes.data)
      _consumosGet.fetch(0, LIST_SIZE, _clientes.data?.[0].ClienteId)
      setCliente(_clientes.data?.[0].ClienteId)

    }
  }, [_clientes.statusCode])
  const _consumosGet = useGet(`api/lecturas/cliente`)

  const setDesde = (desde) => {
    setfechaDDate(desde)
    setdesdeDate(desde)
  }

  const setHasta = (hasta) => {
    setfechaHDate(hasta)
    sethastaDate(hasta)
  }
  const request = {
    Desde: new Date(desde),
    Hasta: new Date(hasta.getTime() + (24 * 60 * 60 * 1000))
  }

  useEffect(() => {
    if (medidor == 0) {
      setCliente(medidor)
    }
  }, [medidor]);

  useEffect(() => {
    if (_clientesFiltrados.statusCode === 200) {

      if (_clientesFiltrados?.data?.content?.length > 0) {
        setObjRequest(_clientesFiltrados?.data?.content)
      } else {
        warningMessage("No hay datos en esa fecha")
        setObjRequest(_clientesFiltrados?.data?.content)

      }


    }
    if (
      _clientesFiltrados.statusCode === 400 ||
      _clientesFiltrados.statusCode === 500
    ) {

    }
  }, [_clientesFiltrados?.statusCode])

  const cambiarLista = (medi) => {
    _consumosGet.fetch(0, LIST_SIZE, medi)
    setObjRequest(_consumosGet?.data?.content)
    apagarFiltro()
  }
  const cambiar = (med) => {
    setCliente(med)
    cambiarLista(med)
    apagarFiltro()
  }

  const apagarFiltro = () => {
    setfiltro(false)
  }

  const warningMessage = (message) => {
    toast.warning(message, {
      position: toast.POSITION.TOP_RIGHT,
    })

  }

  const handlePaginationChange = page => {
    _consumosGet.fetch(page, LIST_SIZE, medidor)
    setObjRequest(_consumosGet?.data?.content)
  }

  useEffect(() => {
    if (_consumosGet?.statusCode === 200 && !filtra) {
      setObjRequest(_consumosGet?.data?.content)
    }
  }, [_consumosGet?.statusCode]);


  const mifiltroa = () => {
    if (fechaDInicial !== null) {
      setCliente(medidor)
      cambiarFiltro()
    } else {
      setfechaHDate(null)
      warningMessage("Ingresa la fecha desde donde quieres filtrar")
    }
  }

  const cambiarFiltro = () => {
    setfiltro(true)
    _clientesFiltrados.fetch(request, 0, LIST_SIZE)
  }


  return (
    <div className='mx-lg-5'>
      <div className='d-flex ps-5 row mx-lg-5 px-lg-1'>
        <h4 className="p-lg-3 pt-3 text-secondary pt-2">Mi Consumo</h4>

        <h5 className="text-secondary  mx-lg-2   col-lg-1  pt-2 ">Medidor: </h5>
        <div className=' mx-lg-4 px-lg-1 col-lg-2  pt-2'>

          <select className={estilos.inputs_filtrodatecon} name='Cliente' value={medidor} onChange={(event) => cambiar(event.target.value)} >
            {clientes &&
              clientes.map((cliente, index) => (
                <option value={cliente?.ClienteId} key={index}>
                  {cliente?.Medidor}
                </option>
              ))}
          </select>

        </div>
        <h5 className="text-secondary col-lg-1   pt-2">Fecha:</h5>
        <div className=" mx-4 col-lg-1  pt-2  ">
          <DatePicker className={estilos.inputs_filtrodate} locale="es" dateFormat="dd'/'MM'/'yyyy" selected={fechaDInicial} placeholderText="dd/mm/yyyy" onChange={(desde) => setDesde(new Date(desde))} />
        </div>
        <div className="mx-4  col-lg-1   pt-2 ">
          <DatePicker className={estilos.inputs_filtrodate} locale="es" dateFormat="dd'/'MM'/'yyyy" selected={fechaHInicial} placeholderText="dd/mm/yyyy" onChange={(hasta) => setHasta(new Date(hasta))} />
        </div>
        <div className="mx-lg-4  col-lg-1  pt-2">
          <Button onClick={mifiltroa} className={estilos.inputs_filtrosearch} variant="primary" >
            <div className="vertical-align: initial " >
              {<BsSearch size={20} className="pb-2 vertical-align: initial " />}
            </div>
          </Button>
        </div>
      </div>
      <div className="px-lg-5">
        <div className="px-lg-4">
          <hr className="width: 20% px-lg-5" />
        </div>



      </div>
      {(_clientesFiltrados.loading || _consumosGet.loading) ? (
        <div className="d-flex justify-content-center m-lg-5 p-lg-5">
          <Loader />
        </div>
      ) : (
        <div className="d-flex px-lg-5 pb-3 ">
          <table className="table mx-lg-3  px-lg-5 table-striped borde_tabla  w-70 m-0 ">
            <thead className="fondo_tabla border-2 ">
              <tr>
                <th scope="col">Nº</th>
                <th scope="col">Consumo</th>
                <th scope="col">Fecha</th>
                <th scope="col">Lectura Actual</th>
                <th scope="col">Hora de ultima modificación</th>
              </tr>
            </thead>
            <tbody className="fila_tabla">

              {!!objRequest.length &&
                objRequest.map((lectura, index) => (
                  <tr key={index}>
                    <td>{objRequest?.[index]?.LecturaId}</td>
                    <td>{objRequest?.[index]?.Lectura?.LecturaActual - objRequest?.[index]?.Lectura?.LecturaAnterior} m³</td>
                    <td>{new Date(objRequest?.[index]?.Lectura?.FechaActual).toLocaleDateString()}</td>
                    <td>{objRequest?.[index]?.Lectura?.LecturaActual} m³</td>
                    <td>{new Date(objRequest?.[index]?.Lectura?.FechaAnterior).toLocaleTimeString()} </td>
                  </tr>
                ))}

            </tbody>
          </table>
        </div>
      )}
      {!filtra ?
        <Pagination axiosResponse={_consumosGet.data} onChange={handlePaginationChange}></Pagination>
        :
        <PaginacionUsePost getPerPageObject={_clientesFiltrados}
          size={LIST_SIZE}
          usePost={true}
          request={request}
        ></PaginacionUsePost>}
      <ToastContainer></ToastContainer>
    </div>
  )
}
export default Consumo;