import Contenedor from "../../components/user/contenedor";
import ModalEliminarReclamo from "../../components/user/reclamos/modalEliminarReclamo";
import Pagination from '../../components/v2/pagination'
import Head from "next/head";
import ModalReclamos from "../../components/user/modalReclamos";
import usePost from "../../api-config/usePost";
import userStore from "../../store/userStore";
import { useState, useEffect } from "react";
import useGetAll from "../../api-config/useGetAll";
import { map } from "lodash";
import { MdDelete } from "react-icons/md";
import { AiFillFileAdd, AiOutlineConsoleSql } from "react-icons/ai";
import Image from "next/image";
import useDelete from "../../api-config/useDelete";
import useGet from "../../api-config/v2/useGet";
import Loader from "../../components/loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";
import { useFormik } from "formik";
import estilos from "../../styles/usuariosActivos.module.css";

const Reclamo = () => {
  const LIST_SIZE = 5;
  const PRIORIDAD = 1; //es priorida 1 que es igual a baja en la BD, esto es cuando un usuario lo crea
  const ESTADO = 1; //es estado 1 que es igual a pendiente en la BD, esto es cuando un usuario lo crea y luego lo atiende un admin
  const [listaReclamosFiltrado, setListaReclamosFiltrado] = useState([]);
  const [modalEliminarReclamo, setModalEliminarReclamo] = useState(false);
  const [idReclamoEliminar, setIdReclamoEliminar] = useState(null);
  const [modalReclamo, setModalReclamo] = useState(false);
  const { user } = userStore();
  const [medidor, setMedidor] = useState(0)
  const [cliente, setCliente] = useState(0)

  const _reclamosDelete = useDelete("/api/reclamos");
  const _reclamoPost = usePost("/api/reclamos");

  const _clientes = useGetAll("/api/clientes/usuario/" + user.Id);
  const _reclamosGet = useGet(`/api/reclamos/usuario/${user.Id}`);

  const queriGet = (page)=>{
    const queries = {page: 0, size: LIST_SIZE}
    if (cliente) {
      queries.clientId = cliente.ClienteId
    }
    _reclamosGet.fetch(queries)
  }
  const handleMedidorChange = event => {
    const _medidor = event.target.value
    const _cliente = _clientes?.data?.find(c => c.Medidor === _medidor)
    let queries = {page: 0, size: LIST_SIZE}
    setMedidor(_medidor)
    setCliente(_cliente)
    if (_cliente) {
      queries.clientId = _cliente.ClienteId
    }
    _reclamosGet.fetch(queries)
  }
  
  const crearReclamos = (values) => {
    const objectPost = {
      MotivoId: values.MotivoId,
      Descripcion: values.Descripcion,
      ClienteId: cliente.ClienteId,
      Fecha: new Date(),
      Referencia: cliente.Solicitud.Referencia,
      PrioridadId: PRIORIDAD,
      EstadoId: ESTADO,
    };
    _reclamoPost.fetch(objectPost);
  };

  const handleModalEliminarReclamoChange = (id) => {
    setIdReclamoEliminar(id);
    setModalEliminarReclamo(true);
  };

  const eliminarReclamo = (id) => {
    _reclamosDelete.fetch(id);
  };

  const handlePaginationChange = page => {
    queriGet(page)
  }
  
  const toastInfo = (message) => {
    toast.info(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(()=>{
    _reclamosGet.fetch({page: 0, size: LIST_SIZE})
  },[]);

  useEffect(() => {
    if (_reclamosGet?.statusCode === 200) {
      setListaReclamosFiltrado(_reclamosGet?.data?.content);
    }
  }, [_reclamosGet?.statusCode, _reclamosGet.data]);

  useEffect(() => {
    if (_reclamosDelete.statusCode === 200) {
      const page = 0;
      queriGet(page);
      toastInfo("Reclamo Eliminado Correctamente");
    }
  }, [_reclamosDelete.statusCode]);

  useEffect(() => {
    if (_reclamoPost.statusCode === 201) {
      const page = 0;
      queriGet(page);
      toastInfo("Reclamo Creado Correctamente");
    } 
  }, [_reclamoPost.statusCode]);

  return (
    <div>
      <Head>
        <title>Reclamos</title>
        <link rel="icon" href="/logo.svg" />
      </Head>

      <Contenedor>
        <div className="fondo_blanco position-relative w-100 h-100 y-scroll">
          {(_reclamosGet.loading || _reclamoPost.loading || _reclamosDelete.loading) && 
            <div className='loader'>
              <Loader />
            </div>
          }
          <div className="d-flex justify-content-between">
            <div className="_titulo">
              <h4>
                <Image src="/hombre.png" alt="img" width={40} height={40}/>
                Mis Reclamos
              </h4>
            </div>
            <div className="_titulo">
              <div className="d-flex px-md-5 px-sm-2">
                <h5 className="text-secondary px-4">Medidor Nº: </h5>
                <select className={estilos.inputs_filtrodate} name="Medidor" value={medidor} onChange={handleMedidorChange}>
                  <option value={0}>TODOS</option>
                  {_clientes?.data?.map((cliente, index) => (
                    <option value={cliente?.Id} key={index}>
                      {cliente?.Medidor}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="espaciado_btn">
              {cliente? 
                <Button variant="primary" id="btnNuevo" onClick={() => setModalReclamo(true)}>
                  <AiFillFileAdd className="me-1" size={23} />
                  Nuevo
                </Button> : 
                <Button variant="primary" id="btnNuevo" disabled>
                  <AiFillFileAdd className="me-1" size={23} />
                  Nuevo
                </Button>
              }
            </div>
          </div>

          <div className="px-5">
            <div className="px-4">
              <hr />
            </div>
          </div>

          <ToastContainer />

          <ModalReclamos isOpen={modalReclamo} onModalSave={crearReclamos} onModalChange={() => setModalReclamo(false)}/>
          <ModalEliminarReclamo show={modalEliminarReclamo} handleClose={() => setModalEliminarReclamo(false)} onModalAcept={eliminarReclamo} idReclamoActual={idReclamoEliminar} />
          
          <div className="d-flex ">
            <table className="table table-striped borde_tabla  w-70 ">
              <thead className="fondo_tabla">
                <tr>
                  <th scope="col">Nº</th>
                  <th scope="col">Tipo de reclamo</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Hora</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Accion</th>
                </tr>
              </thead>
              <tbody className="fila_tabla">
                {listaReclamosFiltrado &&
                  map(listaReclamosFiltrado, (comp) => (
                    <tr key={comp.Id}>
                      <th scope="row">{comp.Id}</th>
                      <td>{comp.Motivo.Nombre}</td>
                      <td>{new Date(comp.Fecha).toLocaleDateString()}</td>
                      <td>{new Date(comp.Fecha).toLocaleTimeString()} </td>
                      <td
                        className={
                          comp.Estado.Nombre == "Atendido"
                            ? "text-success fw-bold"
                            : comp.Estado.Nombre == "En Progreso"
                            ? "text-primary fw-bold"
                            : comp.Estado.Nombre == "Pendiente"
                            ? "text-danger fw-bold"
                            : ""
                        }
                      >
                        {comp.Estado.Nombre}
                      </td>
                      <td>{comp.Descripcion}</td>
                      <td>
                        <MdDelete
                          type="button"
                          size={25}
                          color="#dc3545"
                          onClick={() =>
                            handleModalEliminarReclamoChange(comp.Id)
                          }
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <footer className="d-flex justify-content-center footer_margin">
          <Pagination axiosResponse={_reclamosGet.data} onChange={handlePaginationChange}/>
          </footer>
        </div>
      </Contenedor>
      <style jsx>{`
        .fondo_blanco {
          width: 100%;
          height: 41.2rem;
          background: white;
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
        .loader {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 40;
          display: flex;
          justify-content: center;
          align-items: center;
      }
      `}</style>
    </div>
  );
};

export default Reclamo;