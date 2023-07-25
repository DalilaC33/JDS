import { useEffect, useState } from "react"
import React, { Component } from "react"
import estilos from "../../styles/usuariosActivos.module.css"
import Container from "../../components/admin/common/container"
import useGetPerPage from "../../api-config/useGetPerPage"
import usePostPerPage from "../../api-config/usePostPerPage"
import Loader from "../../components/loader"
import { Table } from "react-bootstrap"
import Paginacion from "../../components/pagination"
import { formatDate } from "../../utils"
import DatePicker, { registerLocale } from "react-datepicker"
import { BiSearch } from "react-icons/bi"
import useGet from "../../api-config/v2/useGet"
import Pagination from "../../components/v2/pagination"
import { dateWithFormat } from "../../utils"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import es from "date-fns/locale/es"
import ModalConfirmacion from "../../components/modalConfirmacion"
import { BlobProvider } from "@react-pdf/renderer"
import ArqueoPDF from "../../pages/admin/reportes/arqueoPDF"
import ReactHTMLTableToExcel from "react-html-table-to-excel"

registerLocale("es", es)
const Arquear = () => {
  const LIST_SIZE = 5
  const [lista, setLista] = useState([])
  const _datosReportes = useGet("/api/reportes/arqueo")
  const _datosReporte = useGetPerPage("/api/reportes/arqueo", 0, LIST_SIZE)
  const _clientesFiltrados = usePostPerPage(
    `/api/reportes/arqueo`,
    0,
    LIST_SIZE
  )
  const loading = _datosReportes.loading
  const [Desde, setdesdeDate] = useState(new Date())
  const [Hasta, sethastaDate] = useState(new Date())

  const [searchValues, setSearchValues] = useState({
    FechaDesde: new Date(),
    FechaHasta: new Date(),
  })
  const [filtra, setfiltro] = useState(false)
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] =
    useState(false)
  const [props, setProps] = useState({})
  let f = new Date()

  const [fechaDInicial, setfechaDDate] = useState(null)
  const [fechaHInicial, setfechaHDate] = useState()
  const request = {
    FechaDesde: Desde,
    FechaHasta: Hasta,
  }

  const mifiltro = () => {
    setfiltro(true)
    setSearchValues(request)
    _datosReportes.fetch({ page: 0, size: LIST_SIZE, ...request })
  }
  useEffect(() => {
    if (_datosReporte?.statusCode === 200) {
      setLista(_datosReporte?.data?.content)
    }
  }, [_datosReporte?.statusCode])

  const handlePaginationChange = (page) => {
    _datosReportes.fetch({ page: page, size: LIST_SIZE, ...searchValues })
    setLista(_datosReportes?.data?.content)
  }

  useEffect(() => {
    _datosReportes.fetch({ page: 0, size: LIST_SIZE, ...searchValues })
    if (_datosReporte?.data?.content.total == 0) {
      warningMessage("No hay datos en esa fecha")
    }
  }, [])

  const warningMessage = (message) => {
    toast.warning(message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }

  const setDesde = (desde) => {
    setdesdeDate(desde)
    setfechaDDate(desde)
  }

  const setHasta = (desde) => {
    sethastaDate(desde)
    setfechaHDate(desde)
  }

  const imprimirReporte = () => {
    document.getElementById("reporteImprimir").click()
  }

  return (
    <div className="p-3">
      <Container width={"100%"}>
        <div className={estilos.desbordamiento}>
          <div className="d-flex pt-3 ps-4">
            <label className="pt-2 ps-3">Filtrar:</label>
            <div className="d-flex">
              <label className="pt-2 ps-4">desde </label>
              <div className=" ps-1 col-lg-1  pt-2  ">
                <DatePicker
                  className={estilos.inputs_filtro}
                  selected={fechaDInicial}
                  placeholderText="dd/mm/yyyy"
                  onChange={(Desde) => setDesde(Desde)}
                  locale="es"
                  dateFormat="dd'/'MM'/'yyyy"
                />
              </div>
            </div>
            <div className="d-flex">
              <label className="pt-2 mx-1">hasta </label>
              <div className="ms-0  col-lg-1   pt-2 ">
                <DatePicker
                  className={estilos.inputs_filtro}
                  selected={fechaHInicial}
                  placeholderText="dd/mm/yyyy"
                  onChange={(Hasta) => setHasta(Hasta)}
                  locale="es"
                  dateFormat="dd'/'MM'/'yyyy"
                />
              </div>
              <button
                type="submit"
                className={`btn shadow-none border-0 bg-transparent  ${estilos.buscmargen} `}
                onClick={mifiltro}
              >
                {" "}
                <BiSearch size={29}></BiSearch>
              </button>
            </div>
            <div className={estilos.btnExportar}>
              <button
                onClick={() => setMostrarModalConfirmacion(true)}
                className={`btn btn-primary mb-1  `}
              >
                {" "}
                Exportar
              </button>
            </div>
          </div>

          {loading ? (
            <div className="d-flex justify-content-center m-5 p-5">
              <Loader />
            </div>
          ) : (
            <>
              <div className="m-4 mt-3">
                <table
                  className="table table-hover border border-top-0 mx-3 "
                  id="reporte"
                >
                  <thead className="border border-2 ">
                    <tr>
                      <th style={{ display: "none" }}>
                        Junta de Saneamiento Ñande Y - Reporte Arqueo de Caja
                      </th>
                    </tr>
                    <tr className={`${estilos.rowTitulos} `}>
                      <th scope="col" className="">
                        {" "}
                        C.I.Nº{" "}
                      </th>
                      <th scope="col">Apellidos</th>
                      <th scope="col">Nombres</th>
                      <th scope="col">Factura N°</th>
                      <th scope="col">Recibo N°</th>
                      <th scope="col">Estado</th>
                      <th scope="col">Monto</th>
                    </tr>
                  </thead>
                  {!filtra ? (
                    <tbody className={estilos.fila_tabla}>
                      {!!_datosReporte?.data?.content?.recibos.length &&
                        _datosReporte?.data?.content?.recibos.map(
                          (data, index) => (
                            <tr key={index}>
                              <td valign="middle">
                                {Intl.NumberFormat("de-DE").format(
                                  data?.Factura?.Cliente?.Solicitud?.Usuario.CI
                                )}
                              </td>
                              <td valign="middle">
                                {
                                  data?.Factura?.Cliente?.Solicitud?.Usuario
                                    .Apellido
                                }
                              </td>
                              <td valign="middle">
                                {
                                  data?.Factura?.Cliente?.Solicitud?.Usuario
                                    .Nombre
                                }
                              </td>
                              <td valign="middle">{data?.Factura.Numero}</td>
                              <td valign="middle">{data?.Numero}</td>
                              <td
                                valign="middle"
                                className={
                                  data?.Factura?.Estado.Nombre === "Pagado"
                                    ? "text-success"
                                    : "text-danger"
                                }
                              >
                                {data?.Factura?.Estado.Nombre}
                              </td>
                              <td valign="middle">
                                {Intl.NumberFormat("de-DE").format(
                                  data?.Factura.Total
                                )}{" "}
                                Gs.
                              </td>
                            </tr>
                          )
                        )}
                    </tbody>
                  ) : (
                    <tbody className={estilos.fila_tabla}>
                      {!!_datosReportes?.data?.content?.recibos.length &&
                        _datosReportes?.data?.content?.recibos.map(
                          (data, index) => (
                            <tr key={index}>
                              <td valign="middle">
                                {Intl.NumberFormat("de-DE").format(
                                  data?.Factura?.Cliente?.Solicitud?.Usuario.CI
                                )}
                              </td>
                              <td valign="middle">
                                {
                                  data?.Factura?.Cliente?.Solicitud?.Usuario
                                    .Apellido
                                }
                              </td>
                              <td valign="middle">
                                {
                                  data?.Factura?.Cliente?.Solicitud?.Usuario
                                    .Nombre
                                }
                              </td>
                              <td valign="middle">{data?.Factura.Numero}</td>
                              <td valign="middle">{data?.Numero}</td>
                              <td
                                valign="middle"
                                className={
                                  data?.Factura?.Estado.Nombre === "Pagado"
                                    ? "text-success"
                                    : "text-danger"
                                }
                              >
                                {data?.Factura?.Estado.Nombre}
                              </td>
                              <td valign="middle">
                                {Intl.NumberFormat("de-DE").format(
                                  data?.Factura.Total
                                )}{" "}
                                Gs.
                              </td>
                            </tr>
                          )
                        )}
                    </tbody>
                  )}
                </table>
              </div>
              <div style={{ display: "none" }}>
                <ReactHTMLTableToExcel
                  id="reporteImprimir"
                  table="reporte"
                  filename="Reporte Arqueo Caja"
                  sheet="Pagina 1"
                  onClick={() => alert("hi")}
                />
              </div>
              <ModalConfirmacion
                show={mostrarModalConfirmacion}
                handleClose={() => setMostrarModalConfirmacion(false)}
                onModalAcept={imprimirReporte}
                mensaje={
                  "Estas seguro que deseas exportar esta lista de reportes?"
                }
                titulo={"Exportar"}
                tipo={1}
              />
              {!filtra ? (
                <Paginacion getPerPageObject={_datosReporte} size={LIST_SIZE} />
              ) : (
                <Pagination
                  axiosResponse={_datosReportes.data}
                  onChange={handlePaginationChange}
                />
              )}
            </>
          )}
          <ToastContainer></ToastContainer>

          <ModalConfirmacion
            show={mostrarModalConfirmacion}
            handleClose={() => setMostrarModalConfirmacion(false)}
            onModalAcept={imprimirReporte}
            mensaje={"Estas seguro que deseas exportar esta lista de reportes?"}
            titulo={"Exportar"}
            tipo={1}
          />
          <div align="center">
            <div style={{ display: "none" }}>
              <ReactHTMLTableToExcel
                id="reporteImprimir"
                table="reporte"
                filename="Reporte Arqueo Caja"
                sheet="Pagina 1"
                onClick={() => alert("hi")}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
export default Arquear
