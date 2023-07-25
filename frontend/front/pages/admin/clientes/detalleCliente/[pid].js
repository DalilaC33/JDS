import { useRouter } from "next/router"
import useGetAll from "../../../../api-config/useGetAll"
import useGet from "../../../../api-config/useGet"
import Container from "../../../../components/admin/common/container"
import { Table } from "react-bootstrap"
import Head from "next/head"
import estilos from "../../../../styles/comunAdmin.module.css"
import { useEffect, useState } from "react"
import Paginacion from "../../../../components/pagination"
import "react-toastify/dist/ReactToastify.css"
import { formatDate } from "../../../../utils"
import Loader from "../../../../components/loader"
import DatosPersonales from "../../../../components/admin/clientesDetalles/DatosPersonales"
import Link from "next/link"
import { BiArrowBack } from "react-icons/bi"
import Breadcrumb from "../../../../components/admin/common/breadcrumb"
import useGetPerPage from "../../../../api-config/useGetPerPage"
const Clientes = () => {
  const router = useRouter()
  const LIST_SIZE = 3
  const [lista, setLista] = useState([])
  const [pid, setPid] = useState(router.query.pid)
  const [clienteactual, setCliente] = useState([])

  useEffect(() => {
    if (router.isReady) {
      // Code using query
      setPid(router.query.pid)
    }
  }, [router.isReady])

  const _cliente = useGetAll(`/api/clientes/${pid}`)
  const _lectura = useGetPerPage(`/api/lecturas/cliente/${pid}`, 0, LIST_SIZE)
  useEffect(() => {
    if (_cliente.statusCode === 200) {
      setCliente(_cliente)
    }
  }, [_cliente?.statusCode])

  useEffect(() => {
    if (_lectura?.statusCode === 200) {
      setLista(_lectura?.data?.content)
    }
  }, [_lectura?.statusCode])

  const cliente = {
    Nombre: clienteactual?.data?.Solicitud?.Usuario?.Nombre,
    Apellido: clienteactual?.data?.Solicitud?.Usuario?.Apellido,
    CI: clienteactual?.data?.Solicitud?.Usuario?.CI,
    Celular: clienteactual?.data?.Solicitud?.Usuario?.Celular,
    Barrio: clienteactual?.data?.Solicitud?.Barrio?.Nombre,
    Referencia: clienteactual?.data?.Solicitud?.Referencia,
    Email: clienteactual?.data?.Solicitud?.Usuario?.Email,
    Cta_Ctral: clienteactual?.data?.CuentaCatastral,
    Estado: clienteactual?.data?.Solicitud?.Estado?.Nombre,
    Medidor_Nro: clienteactual?.data?.Medidor,
    Inscripcion: formatDate(new Date(clienteactual?.data?.Solicitud?.Fecha)),
  }
  return (
    <>
      <Head>
        <title>Detalles del Cliente</title>
      </Head>
      <div className="p-4 pb-0  font-montserrat">
        <h3>Clientes</h3>
        <Breadcrumb
          links={[
            ["Home", "/admin"],
            ["Clientes", "/admin/clientes"],
          ]}
          currentPage="Clientes detalle"
        />
      </div>

      <div className="d-flex justify-content-center p-4   font-roboto">
        <Container width={"100%"}>
          <div className={estilos.desbordamiento}>
            <div className="pt-2">
              <DatosPersonales ClienteActual={cliente} />
            </div>
            <h4 className="text-center p-2 pb-2">Historial de Cosumo</h4>
            <div className="p-3 pb-0 pt-0">
              {_lectura?.loading ? (
                <div className="d-flex justify-content-center m-5 p-5">
                  <Loader />
                </div>
              ) : (
                !!lista.length && (
                  <div className="m-4 mt-3 col-lg-11 col-md-6 col-sm-1">
                    <table className="table table-hover border border-top-0 col-lg-4 col-md-6 col-sm-1 ">
                      <thead className="border border-2 col-lg-11 col-md-6 col-sm-1">
                        <tr className="m-4 mt-3">
                          <th scope="col">Fecha de lectura</th>
                          <th scope="col">Lectura</th>
                          <th scope="col">Cosumo</th>
                          <th scope="col">Monto</th>
                          <th scope="col">Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lista.map((lectura, index) => (
                          <tr key={index}>
                            <td className="text-nowrap">
                              {formatDate(
                                new Date(lectura?.Lectura?.FechaActual)
                              )}
                            </td>
                            <td>{lectura?.Lectura?.LecturaActual} m³</td>
                            <td>
                              {lectura?.Lectura?.LecturaActual -
                                lectura?.Lectura?.LecturaAnterior} m³
                            </td>
                         
                            <td>{new Intl.NumberFormat('es-CO').format(lectura?.Total ?? 0)} ₲s</td>
                            <td>
                              <span
                                className={`fw-bold ${
                                  lectura?.Estado?.Nombre === "Pendiente"
                                    ? "text-warning"
                                    : lectura?.Estado?.Nombre === "Pagado"
                                    ? "text-success"
                                    : lectura?.Estado?.Nombre === "Recargado"
                                    ? "text-secondary"
                                    : lectura?.Estado?.Nombre === "Anulado"
                                    ? "text-danger"
                                    : ""
                                }`}
                              >
                                {lectura?.Estado?.Nombre}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              )}
              <Paginacion getPerPageObject={_lectura} size={LIST_SIZE} />
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

Clientes.layout = "AdminLayout"
export default Clientes
