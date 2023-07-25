import Head from "next/head"
import Container from "../../components/admin/common/container"
import Breadcrumb from "../../components/admin/common/breadcrumb"
import Paginacion from "../../components/pagination"
import PaginacionUsePost from "../../components/paginationUsePost"
import NuevaLectura from "../../components/admin/medidor/cargarLectura"
import EditarLectura from "../../components/admin/medidor/editarLectura"
import estilos from "../../styles/comunAdmin.module.css"
import { VscEdit } from "react-icons/vsc"
import { BiSearch } from "react-icons/bi"
import { GrNotes } from "react-icons/gr"
import { MdOutlineClose } from "react-icons/md"
import useGet from "../../api-config/useGet"
import useGetPerPage from "../../api-config/useGetPerPage"
import usePostPerPage from "../../api-config/usePostPerPage"
import usePost from "../../api-config/usePost"
import usePut from "../../api-config/usePut"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Col, Row } from "react-bootstrap"
import LoaderPage from "../../components/loaderPage"
import Link from "next/link"


const Medidor = () => {
  const LIST_SIZE = 1 //necesario para listar la cantidad de clientes en cada paginacion
  const [list, setList] = useState([]) //lista donde se cargan los usuarios
  const [idLecturaEditar, setIdLecturaEditar] = useState(null) //necesario para guardar el id de la lectura a editar
  const [clientActual, setClientActual] = useState(null) // cliente actual
  const [lecturas, setLecturas] = useState([]) //lesturas del cliente
  const [isFilter, setIsFilter] = useState(false) //necesario para manejar si se esta filtrando o no
  const [objRequest, setObjRequest] = useState({}) //necesario para enviar a la paginacion el objeto filtrado
  const [fecha, setFecha] = useState(" ") //necesario para mostrar la fecha actual
  const [mostrarEditarLectura, setMostrarEditarLectura] = useState(false)
  const _clientes = useGetPerPage("/api/clientes", 0, LIST_SIZE)
  const _clientesFiltrados = usePostPerPage("/api/clientes/find", 0, LIST_SIZE)
  const _lecturasGet = useGet("/api/lecturas/client")
  const _cargarLectura = usePost("/api/lecturas")
  const _editarLectura = usePut("/api/lecturas")

  //necesario para hacer el put de lectura
  const editarLectura = (values) => {
    const objectPost = {
      Id: values.Id,
      LecturaActual: values.LecturaActual,
    }
    _editarLectura.fetch(objectPost, objectPost.Id)
  }

  const habilitarFormularioEditarLectura = (id) => {
    setIdLecturaEditar(id)
    setMostrarEditarLectura(true)
  }

  //necesario para hacer el post de lectura
  const cargarLectura = (values) => {
    const objectPost = {
      LecturaActual: values.LecturaActual,
      ClienteId: clientActual !== null ? clientActual[0]?.Id : 0,
    }
    _cargarLectura.fetch(objectPost)
  }

  const formik = useFormik({
    initialValues: {
      CI: "",
      Nombre: "",
      Apellido: "",
      Medidor: "",
    },
    onSubmit: (values) => {
      const search = {
        CI: values.CI,
        Nombre: values.Nombre,
        Apellido: values.Apellido,
        Medidor: values.Medidor.toUpperCase(),
      }
      filter(search)
    },
  })

  //para manejar la funcionalidad de filtrar
  const filter = (search) => {
    const request = {
      CI: search.CI,
      Nombre: search.Nombre,
      Apellido: search.Apellido,
      Medidor: search.Medidor,
    }
    sessionStorage.clear()
    sessionStorage.setItem("filter_Medidor", JSON.stringify(request))
    setObjRequest(request)
    _clientesFiltrados.fetch(request, 0, LIST_SIZE)
  }
  //necesario para volver a listar los clientes sin distincion
  const undoFilter = () => {
    sessionStorage.clear()
    setIsFilter(false)
    setMostrarEditarLectura(false)
    formik.handleReset()
    setObjRequest({})
    resetList()
  }
  //controla si hay algo en sessionStorage
  useEffect(() => {
    if (Storage) {
      const data = sessionStorage.getItem("filter_Medidor")
      if (data) {
        const ls = JSON.parse(data)
        formik.setFieldValue("CI", ls.CI)
        formik.setFieldValue("Apellido", ls.Apellido)
        formik.setFieldValue("Nombre", ls.Nombre)
        formik.setFieldValue("Medidor", ls.Medidor)
        setObjRequest(data)
      }
    }
  }, [])

  //para manejar el put de lecturas con la api
  useEffect(() => {
    if (_editarLectura.statusCode === 200) {
      _lecturasGet.fetch(0, 0, clientActual !== null ? clientActual[0]?.Id : 0)
      message("Lectura editada correctamente...")
      setMostrarEditarLectura(false)
    } else if (
      _editarLectura.statusCode === 400 ||
      _editarLectura.statusCode === 500
    ) {
      errorMessage(_editarLectura?.data?.message)
    }
  }, [_editarLectura.statusCode])

  //para manejar el post de lecturas con la api
  useEffect(() => {
    if (_cargarLectura.statusCode === 200) {
      _lecturasGet.fetch(0, 0, clientActual !== null ? clientActual[0]?.Id : 0)
      message("Lectura cargada correctamente...")
    } else if (
      _cargarLectura.statusCode === 400 ||
      _cargarLectura.statusCode === 500
    ) {
      warningMessage(_cargarLectura?.data.message)
    }
  }, [_cargarLectura.statusCode])
  //para manejo de estados del filtro con la api
  useEffect(() => {
    if (_clientesFiltrados.statusCode === 200) {
      if (_clientesFiltrados?.data?.content.length > 0) {
        setIsFilter(true)
        setList(_clientesFiltrados?.data?.content)
        setClientActual(_clientesFiltrados?.data?.content)
        setMostrarEditarLectura(false)
        _lecturasGet.fetch(
          0,
          0,
          _clientesFiltrados?.data?.content.length
            ? _clientesFiltrados?.data?.content[0]?.Id
            : 0
        )
      } else {
        warningMessage("No existe el usuario que estas buscando")
        sessionStorage.clear()
      }
    }
    if (
      _clientesFiltrados.statusCode === 400 ||
      _clientesFiltrados.statusCode === 500
    ) {
      warningMessage(_clientesFiltrados?.data?.message)
    }
  }, [_clientesFiltrados.statusCode])

  //listar desde la api para actualizar
  const resetList = () => {
    _clientes.fetch(0, LIST_SIZE)
    _lecturasGet.fetch(0, 0, clientActual !== null ? clientActual[0]?.Id : 0)
  }
  //para obtener los clientes de la api al inicio
  useEffect(() => {
    if (_clientes?.statusCode === 200 && !isFilter) {
      const data = sessionStorage.getItem("filter_Medidor")
      if (!data) {
        setList(_clientes?.data?.content)
        setClientActual(_clientes?.data?.content)
        setMostrarEditarLectura(false)
        _lecturasGet.fetch(
          0,
          0,
          _clientes?.data?.content.length ? _clientes?.data?.content[0]?.Id : 0
        )
      } else {
        _clientesFiltrados.fetch(
          sessionStorage.getItem("filter_Medidor"),
          0,
          LIST_SIZE
        )
      }
    }
  }, [_clientes?.statusCode])

  //para obtener los lecturas de la api al inicio
  useEffect(() => {
    if (_lecturasGet?.statusCode === 200) {
      setLecturas(_lecturasGet?.data)
    } else {
      warningMessage(_lecturasGet?.data?.message)
    }
  }, [_lecturasGet?.statusCode])
  useEffect(() => {
    let fecha_aux = 0
    let f = new Date()
    fecha_aux = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear()
    setFecha(fecha_aux)
  }, [])

  //nencesarios para mostrar un mesaje con toast
  const errorMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }

  const message = (message) => {
    toast.info(message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
  //mensaje de warning para el usuario
  const warningMessage = (message) => {
    toast.warning(message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
  return (
    <>
      <Head>
        <title>Medidor</title>
      </Head>
      <div className=" p-3 font-montserrat">
        <h4>Medidor</h4>
        {(_clientes.loading ||
          _lecturasGet.loading ||
          _editarLectura.loading ||
          _cargarLectura.loading ||
          _clientesFiltrados.loading) && <LoaderPage />}
        <Breadcrumb links={[["Home", "/admin"]]} currentPage="Medidor" />
        <div className="d-flex justify-content-between">
          {_clientes?.data === null ? (
            <h4>No existen clientes...</h4>
          ) : (
            <>
              <Container width={"68%"}>
                <div className={estilos.desbordamiento}>
                  <div className="m-4 mt-4 mb-0">
                    <form onSubmit={formik.handleSubmit}>
                      <input
                        type="text"
                        placeholder="Ci"
                        id="ci"
                        className={estilos.inputs_filtro}
                        autoComplete="off"
                        name="CI"
                        title="Ingrese solo numeros"
                        pattern="[0-9]+"
                        value={formik.values.CI}
                        onChange={formik.handleChange}
                      />
                      <input
                        type="text"
                        placeholder="Apellido"
                        id="apellido"
                        className={estilos.inputs_filtro}
                        autoComplete="off"
                        name="Apellido"
                        value={formik.values.Apellido}
                        onChange={formik.handleChange}
                      />
                      <input
                        type="text"
                        placeholder="Nombre"
                        id="nombre"
                        className={estilos.inputs_filtro}
                        autoComplete="off"
                        name="Nombre"
                        value={formik.values.Nombre}
                        onChange={formik.handleChange}
                      />
                      <input
                        type="text"
                        placeholder="Nº Medidor"
                        id="medidor"
                        className={`me-0 ${estilos.inputs_filtro}`}
                        autoComplete="off"
                        name="Medidor"
                        value={formik.values.Medidor}
                        onChange={formik.handleChange}
                      />
                      {isFilter && (
                        <button
                          type="button"
                          onClick={undoFilter}
                          className={`btn shadow-none border-0 bg-transparent  ${estilos.btn_buscar} `}
                        >
                          {" "}
                          <MdOutlineClose size={32}></MdOutlineClose>
                        </button>
                      )}
                      <button
                        type="submit"
                        className={`btn shadow-none border-0 bg-transparent ${estilos.btn_buscar} `}
                      >
                        {" "}
                        <BiSearch size={29}></BiSearch>
                      </button>
                    </form>
                  </div>
                  <div className=" m-4 mb-0 mt-3 pt-2 border-top border-2">
                    <div className="d-flex">
                      <div>
                        <h6 className="font-montserrat fw-bold">Nombres:</h6>
                        <h6 className="font-montserrat fw-bold">Apellidos:</h6>
                        <h6 className="font-montserrat fw-bold">Ruc/C.I Nº:</h6>
                        <h6 className="font-montserrat fw-bold">Dirección:</h6>
                        <h6 className="font-montserrat fw-bold">Medidor Nº:</h6>
                      </div>
                      {!!list.length &&
                        list.map((cliente, index) => (
                          <div key={index} className="flex-grow-1 ps-1">
                            <h6 className="font-montserrat bold">
                              {cliente?.Solicitud?.Usuario?.Nombre}
                            </h6>
                            <h6 className="font-montserrat bold">
                              {cliente?.Solicitud?.Usuario?.Apellido}
                            </h6>
                            <h6 className="font-montserrat bold">
                              {cliente?.Solicitud?.Usuario?.CI}
                            </h6>
                            <h6 className="font-montserrat bold">
                              {cliente?.Solicitud?.Referencia}
                            </h6>
                            <h6 className="font-montserrat bold">
                              {cliente?.Medidor}
                            </h6>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className= {`${estilos.table_box} m-4 mt-1`}>
                    <table className="table border border-top-0 ">
                      <thead className="border border-2 ">
                        <tr className={`${estilos.rowTitulos} `}>
                          <th scope="col" className="">
                            {" "}
                            Fecha Anterior{" "}
                          </th>
                          <th scope="col">Fecha Actual</th>
                          <th scope="col">Lectura Anterior</th>
                          <th scope="col">Lectura Actual</th>
                          <th scope="col">Consumo</th>
                          <th scope="col">Estado</th>
                          <th scope="col">Acción</th>
                        </tr>
                      </thead>
                      <tbody className={estilos.fila_tabla}>
                        {!!lecturas.length &&
                          lecturas.map((lectura, index) => (
                            <tr key={index}>
                              <td valign="middle">
                                {lectura?.Lectura?.FechaAnterior
                                  ? new Date(
                                      lectura?.Lectura?.FechaAnterior
                                    ).toLocaleDateString()
                                  : "---"}
                              </td>
                              <td valign="middle">
                                {new Date(
                                  lectura?.Lectura?.FechaActual
                                ).toLocaleDateString()}
                              </td>
                              <td valign="middle">
                                {lectura?.Lectura?.LecturaAnterior} m³
                              </td>
                              <td valign="middle">
                                {lectura?.Lectura?.LecturaActual} m³
                              </td>
                              <td valign="middle">
                                {lectura?.Lectura?.LecturaActual -
                                  lectura?.Lectura?.LecturaAnterior} m³
                              </td>
                              <td>
                                <span className={`fw-bold ${lectura?.Estado?.Nombre === 'Pendiente' ? 'text-warning' :
                              lectura?.Estado?.Nombre === 'Pagado' ? 'text-success' :
                              lectura?.Estado?.Nombre === 'Recargado' ? 'text-secondary' :
                              lectura?.Estado?.Nombre === 'Anulado' ? 'text-danger' : ''
                              }`} >{lectura?.Estado?.Nombre}</span>
                              </td>
                              <td valign="middle">
                                <VscEdit
                                  title="Editar Lectura"
                                  type="button"
                                  size={23}
                                  onClick={() =>
                                    habilitarFormularioEditarLectura(
                                      lectura?.Lectura?.Id
                                    )
                                  }
                                />
                                <Link
                                  key={index}
                                  href={`/admin/caja/facturaDetalle/${lectura.FacturaId}`}
                                >
                                  <a title="Ver Factura" className="text-black">
                                    <GrNotes
                                      className="ps-2"
                                      type="button"
                                      size={25}
                                    />
                                  </a>
                                </Link>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  {!isFilter ? (
                    <Paginacion getPerPageObject={_clientes} size={LIST_SIZE} />
                  ) : (
                    <PaginacionUsePost
                      getPerPageObject={_clientesFiltrados}
                      size={LIST_SIZE}
                      request={objRequest}
                    />
                  )}
                </div>
              </Container>

              <Container width={"30%"}>
                <div className={estilos.desbordamiento}>
                  <div className="m-3 mt-4">
                    {mostrarEditarLectura && (
                      <Row>
                        <Col>
                          <div className="text-end ">
                            <MdOutlineClose
                              className="mt-0"
                              type="button"
                              size={25}
                              onClick={() => setMostrarEditarLectura(false)}
                            ></MdOutlineClose>
                          </div>
                        </Col>
                      </Row>
                    )}
                    <Row className="justify-content-center mb-1">
                      <Col lg="8">
                        <div className="d-flex inline  flex-wrap">
                          <h6 className="font-montserrat fw-bold">
                            Medidor Nº:{" "}
                          </h6>
                          <h6>{clientActual?.[0].Medidor}</h6>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <h6 className="font-montserrat fw-bold">
                          Fecha Anterior
                        </h6>
                        <h6>
                          {lecturas[0]?.Lectura?.FechaActual
                            ? new Date(
                                lecturas[0]?.Lectura?.FechaActual
                              ).toLocaleDateString()
                            : "---"}
                        </h6>
                      </Col>
                      <Col>
                        <h6 className="font-montserrat fw-bold">
                          Fecha Actual
                        </h6>
                        <h6>
                          { fecha }
                        </h6>
                      </Col>
                    </Row>
                    {mostrarEditarLectura ? (
                      <EditarLectura
                        handleSave={editarLectura}
                        handleClose={() => setMostrarEditarLectura(false)}
                        idLecturaEditar={idLecturaEditar}
                      />
                    ) : (
                      <NuevaLectura handleSave={cargarLectura} />
                    )}
                  </div>
                </div>
              </Container>
            </>
          )}
          <ToastContainer />
        </div>
      </div>
    </>
  )
}

Medidor.layout = "AdminLayout"
export default Medidor
