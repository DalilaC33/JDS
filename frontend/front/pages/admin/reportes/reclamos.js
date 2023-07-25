import Head from "next/head"
import estilos from "../../../styles/reclamosAdmin.module.css"
import Container from "../../../components/admin/common/container"
import Breadcrumb from "../../../components/admin/common/breadcrumb"
import useGetPerPage from "../../../api-config/useGetPerPage"
import usePut from "../../../api-config/usePut"
import useGetAll from "../../../api-config/useGetAll"
import { useEffect, useState } from "react"
import Paginacion from "../../../components/pagination"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Form, Table } from "react-bootstrap"
import { formatDate } from "../../../utils"
import Loader from "../../../components/loader"

const HomeR = () => {
  const LIST_SIZE = 5
  const _reclamos = useGetPerPage("/api/reclamos", 0, LIST_SIZE)
  const _reclamosPut = usePut("/api/reclamos")
  const { data: prioridades } = useGetAll("/api/prioridades")
  const { data: estados } = useGetAll("/api/estados/all")
  const [lista, setLista] = useState([])

  const handleUpdatePriority = (value, reclamoId) => {
    const prioridadId = parseInt(value.target.value)
    const reclamoActual = lista.filter(r => r.Id == reclamoId)[0]
    _reclamosPut.fetch({ ...reclamoActual, PrioridadId: prioridadId }, reclamoId)
  }

  const handleUpdateState = (value, reclamoId) => {
    const estadoId = parseInt(value.target.value)
    const reclamoActual = lista.filter(r => r.Id == reclamoId)[0]
    _reclamosPut.fetch({ ...reclamoActual, EstadoId: estadoId }, reclamoId)
  }

  useEffect(() => {
    if (_reclamos?.statusCode === 200) {
      setLista(_reclamos?.data?.content)
    }
  }, [_reclamos?.statusCode])

  useEffect(() => {
    if (_reclamosPut.statusCode === 204) {
      _reclamos.fetch(_reclamos?.data?.actualPage, LIST_SIZE)
      toastInfo("Reclamo modificado correctamente")
    }
  }, [_reclamosPut.statusCode])

  const toastInfo = (message) => {
    toast.info(message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }

  const loading = _reclamos.loading || _reclamosPut.loading

  return (
    <>
      <Head>
        <title>Reclamos</title>
      </Head>
      <div className="p-3 font-roboto">
        <h4>Lista de Reclamos</h4>
        <Breadcrumb links={[["Home", "/admin"]]} currentPage="Reclamos" />
        <ToastContainer />
        <Container>
          {loading ? (
            <div className="d-flex justify-content-center m-5 p-5">
              <Loader />
            </div>
          ) : (
            <>
              <Table
                variant="light"
                bordered
                responsive
                className="align-items-start"
              >
                <thead>
                  <tr className={`${estilos.rowTitulos}table-active`}>
                    <th scope="col">Nro</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Motivo</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Barrio</th>
                    <th scope="col">Referencia</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Prioridad</th>
                  </tr>
                </thead>
                <tbody>
                  {!!lista.length &&
                    lista.map((reclamo, index) => (
                      <tr key={index}>
                        <th scope="row">{reclamo?.Id}</th>
                        <td>
                          {reclamo?.Cliente?.Solicitud?.Usuario?.Nombre +
                            " " +
                            reclamo?.Cliente?.Solicitud?.Usuario?.Apellido}
                        </td>
                        <td className="text-nowrap">
                          {formatDate(new Date(reclamo?.Fecha))}
                        </td>
                        <td>{reclamo?.Motivo?.Nombre}</td>
                        <td>{reclamo?.Descripcion}</td>
                        <td className="text-nowrap">
                          {reclamo?.Cliente?.Solicitud?.Barrio?.Nombre}
                        </td>
                        <td className="text-nowrap">
                          {reclamo?.Cliente?.Solicitud?.Referencia}
                        </td>
                        <td>
                          <Form.Select
                            name="estadoId"
                            size="sm"
                            className={
                              reclamo?.EstadoId === 1
                                ? "fw-bold text-danger"
                                : reclamo?.EstadoId === 4
                                ? "fw-bold text-warning"
                                : "fw-bold text-success"
                            }
                            value={reclamo?.EstadoId}
                            onChange={(selectedOption) =>
                              handleUpdateState(selectedOption, reclamo.Id)
                            }
                          >
                            {estados &&
                              estados
                                .filter(
                                  (e) => e.Id == 1 || e.Id == 4 || e.Id == 5
                                )
                                .map((estado, index) => (
                                  <option
                                    className={
                                      estado.Id === 1
                                        ? "text-danger"
                                        : estado.Id === 4
                                        ? "text-warning"
                                        : "text-success"
                                    }
                                    value={estado.Id}
                                    key={index}
                                  >
                                    {estado.Nombre}
                                  </option>
                                ))}
                          </Form.Select>
                        </td>
                        <td>
                          <Form.Select
                            name="prioridadId"
                            size="sm"
                            className={
                              reclamo?.PrioridadId === 1
                                ? "fw-bold text-success"
                                : reclamo?.PrioridadId === 2
                                ? "fw-bold text-warning"
                                : "fw-bold text-danger"
                            }
                            value={reclamo?.PrioridadId}
                            onChange={(selectedOption) =>
                              handleUpdatePriority(selectedOption, reclamo.Id)
                            }
                          >
                            {prioridades &&
                              prioridades.map((prioridad, index) => (
                                <option
                                  className={
                                    prioridad.Id === 1
                                      ? "text-success"
                                      : prioridad.Id === 2
                                      ? "text-warning"
                                      : "text-danger"
                                  }
                                  value={prioridad.Id}
                                  key={index}
                                >
                                  {prioridad.Nombre}
                                </option>
                              ))}
                          </Form.Select>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <Paginacion getPerPageObject={_reclamos} size={LIST_SIZE} />
            </>
          )}
        </Container>
      </div>
    </>
  )
}

HomeR.layout = "AdminLayout"
export default HomeR
