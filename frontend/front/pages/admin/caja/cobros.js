import Head from "next/head";
import Breadcrumb from "../../../components/admin/common/breadcrumb";
import Container from "../../../components/admin/common/container";
import Paginacion from "../../../components/pagination";
import PaginacionUsePost from "../../../components/paginationUsePost";
import estilos from '../../../styles/comunAdmin.module.css'
import { BiSearch } from "react-icons/bi"
import { MdOutlineClose } from "react-icons/md"
import { useFormik } from 'formik'
import { useEffect, useState} from 'react'
import useGetPerPage from "../../../api-config/useGetPerPage";
import usePostPerPage from "../../../api-config/usePostPerPage";
import usePost from "../../../api-config/usePost";
import LoaderPage from '../../../components/loaderPage'
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ModalCobrar from '../../../components/admin/cobros/modalCobrar'
import FacturaDetalle from '../../../components/admin/caja/factura_detalle'
import {BlobProvider } from "@react-pdf/renderer";
import ReciboPDF from "./reciboPDF";

const Cobros = () => {
  const CONSUMO_MINIMO = 5; //necesario para saber el consumo minimo por el momento hasta que haya el endpoit de config
  const LIST_SIZE = 1; //necesario para listar la cantidad de clientes en cada paginacion
  const [list, setList] = useState([]); //lista donde se cargan las facturas
  const [isFilter, setIsFilter] = useState(false); //necesario para manejar si se esta filtrando o no
  const [objRequest, setObjRequest] = useState({}); //necesario para enviar a la paginacion el objeto filtrado
  const [mostrarModalCobrar, setMostrarModalCobrar] = useState(false); //necesario para mostrar el modal
  const [idFacturaCobrar, setIdFacturaCobrar] = useState(null); //necesario para guardar el id de la factura a cobrar
  const _factura = useGetPerPage("/api/facturas/porCobrar", 0, LIST_SIZE);
  const _facturaFiltradas = usePostPerPage("/api/facturas/find", 0, LIST_SIZE);
  const _cobrarFactura = usePost("api/facturas/cobrar");
  const [props, setProps] = useState({});
  const [reciboNumero, setReciboNumero] = useState(null);

    const formik = useFormik({
        initialValues: {
            Ci: "", Nombre: "", Apellido: "", Factura: ""
        },
        onSubmit: (values) => {
            const search = {
                Ci: values.Ci,
                Nombre: values.Nombre,
                Apellido: values.Apellido,
                Factura: values.Factura
            }
            filter(search)
        }
    })

  //necesario para mostrar el modal
  const habilitarFormularioCobrar = (factura) => {
    if (
      factura.Estado.Nombre !== "Anulado" &&
      factura.Estado.Nombre !== "Pagado" &&
      factura.Numero
    ) {
      const date = new Date();
      setProps({
        facturaNumero: factura?.Numero,
        total: factura?.Total,
        nombre: factura?.Cliente?.Solicitud?.Usuario?.Nombre,
        apellido: factura?.Cliente?.Solicitud?.Usuario?.Apellido
      });
      setIdFacturaCobrar(factura.Id);
      setMostrarModalCobrar(true);
    } else if (factura.Estado.Nombre === "Anulado") {
      warningMessage(
        "No se puedo cobrar esta factura porque ya ha sido Anulada"
      );
    } else if (factura.Estado.Nombre === "Pagado") {
      warningMessage(
        "No se puedo cobrar esta factura porque ya ha sido Pagada"
      );
    } else {
      warningMessage(
        "No se puedo cobrar esta factura porque todavia no se Imprimio"
      );
    }
  };
  //necesario para hacer el post de cobrar
  const cobrarFactura = (values) => {
    const objectPostCobrar = {
      FacturaId: values.Id,
      Numero: values.Numero, //Numero de recibo en el que sera impreso
    };
    setReciboNumero(values.Numero)
    _cobrarFactura.fetch(objectPostCobrar);
  };

  //para manejar el post de cobrar una factura
  useEffect(() => {
    if (_cobrarFactura.statusCode === 200) {
      message("Factura cobrada correctamente...");
      document.getElementById("reciboPDF").click();
      resetList();
      undoFilter();
    } else if (
      _cobrarFactura.statusCode === 400 ||
      _cobrarFactura.statusCode === 500
    ) {
      warningMessage(
        "No se puede cobrar esta factura, ya existe el Nº de recibo ingresado"
      );
    }
  }, [_cobrarFactura.statusCode]);
  //para manejar la funcionalidad de filtrar
  const filter = (search) => {
    const request = {
      CI: search.Ci,
      Nombre: search.Nombre,
      Apellido: search.Apellido,
      Numero: search.Factura,
    };
    _facturaFiltradas.fetch(request, 0, LIST_SIZE);
    setObjRequest(request);
  };
  //necesario para volver a listar los clientes sin distincion
  const undoFilter = () => {
    setIsFilter(false);
    formik.handleReset();
    setObjRequest({});
    resetList();
  };
  //para manejo de estados del filtro con la api
  useEffect(() => {
    if (_facturaFiltradas.statusCode === 200) {
      if (_facturaFiltradas?.data?.content.length > 0) {
        setIsFilter(true);
        setList(_facturaFiltradas?.data?.content);
      } else {
        warningMessage("No existe la factura que estas buscando");
      }
    }
    if (
      _facturaFiltradas.statusCode === 400 ||
      _facturaFiltradas.statusCode === 500
    ) {
      warningMessage("Debes ingresar al menos unos de los campos para buscar");
    }
  }, [_facturaFiltradas.statusCode]);

  //listar desde la api para actualizar
  const resetList = () => {
    _factura.fetch(0, LIST_SIZE);
  };
  //para listar las factura al inicio
  useEffect(() => {
    if (_factura?.statusCode === 200 && !isFilter) {
      setList(_factura?.data?.content);
    }
  }, [_factura?.statusCode]);

  //nencesarios para mostrar un mesaje con toast
  const errorMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const message = (message) => {
    toast.info(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  //mensaje de warning para el usuario
  const warningMessage = (message) => {
    toast.warning(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
<>
            <Head>
                <title>Cobros</title>
            </Head>
            <div className=' p-3 font-montserrat'>
                <h4>Caja</h4>
                {((_factura.loading) || (_facturaFiltradas.loading)) &&
                    <LoaderPage />
                }

                <Breadcrumb links={[['Home', '/admin']]} currentPage='Cobros' />

                <div className='d-flex justify-content-center'>
                    <Container width={'80%'}>

                        <div className={estilos.desbordamiento}>
                            <div className='m-4 mt-4 mb-0'>
                                <form onSubmit={formik.handleSubmit}>
                                    <input type="text" placeholder="Ci" id="ci" className={estilos.inputs_filtro} autoComplete="off" title="Ingrese solo numeros" pattern="[0-9]+" name='Ci' value={formik.values.Ci} onChange={formik.handleChange} />
                                    <input type="text" placeholder="Apellido" id="apellido" className={estilos.inputs_filtro} autoComplete="off" name='Apellido' value={formik.values.Apellido} onChange={formik.handleChange} />
                                    <input type="text" placeholder="Nombre" id="nombre" className={estilos.inputs_filtro} autoComplete="off" name='Nombre' value={formik.values.Nombre} onChange={formik.handleChange} />
                                    <input type="text" placeholder="Nº Factura" id="factura" className={`me-0 ${estilos.inputs_filtro}`} autoComplete="off" title="Ingrese solo numeros y guion medio" pattern="[0-9-]+$" name='Factura' value={formik.values.Factura} onChange={formik.handleChange} />
                                    {isFilter && <button type="button" onClick={undoFilter} className={`btn shadow-none border-0 bg-transparent  ${estilos.btn_buscar} `}> <MdOutlineClose size={32} ></MdOutlineClose></button>}
                                    <button type="submit" className={`btn shadow-none border-0 bg-transparent ${estilos.btn_buscar} `}> <BiSearch size={29} ></BiSearch></button>
                                </form>
                            </div>
                            {(list.length === 0) &&
                                <h5 className='m-4'>No existen Facturas por cobrar...</h5>
                            }

                            {!!list.length && list.map((factura, index) =>
                                <div key={index}>
                                    <FacturaDetalle key={index} factura={factura}></FacturaDetalle>
                                    <div className='text-end me-4 mb-1'>
                                        <button className='btn btn-primary' onClick={() => habilitarFormularioCobrar(factura)} >Cobrar</button>
                                    </div>
                                </div>

                            )}

                            {!isFilter ? <Paginacion getPerPageObject={_factura}
                                size={LIST_SIZE} /> :
                                <PaginacionUsePost getPerPageObject={_facturaFiltradas}
                                    size={LIST_SIZE}
                                    request={objRequest}
                                />}
                        </div>
                        <ModalCobrar
                            show={mostrarModalCobrar}
                            handleSave={cobrarFactura}
                            handleClose={() => setMostrarModalCobrar(false)}
                            idFacturaCobrar={idFacturaCobrar}
                            props={props}
                        />
                        <BlobProvider document={<ReciboPDF props={props} reciboNumero ={reciboNumero}></ReciboPDF>}>
                          {({ url }) => (
                            <a
                              id="reciboPDF"
                              href={url}
                              target="_blank"
                              className="d-none"
                              rel = "noreferrer"
                            >
                            </a>
                          )}
                        </BlobProvider>
                    </Container>
                    <ToastContainer />
                </div>
            </div>

        </>
  );
};

Cobros.layout = "AdminLayout";
export default Cobros;
