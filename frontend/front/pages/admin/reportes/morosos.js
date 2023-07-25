import Head from 'next/head'
import estilos from '../../../styles/usuariosActivos.module.css'
import Container from '../../../components/admin/common/container'
import Breadcrumb from '../../../components/admin/common/breadcrumb'
import useGetPerPage from "../../../api-config/useGetPerPage";
import usePost from "../../../api-config/usePost"
import { FaUserCircle } from 'react-icons/fa'
import { BiSearch } from "react-icons/bi"
import LoaderPage from '../../../components/loaderPage'
import { useEffect, useState, Fragment } from 'react'
import { useFormik } from 'formik'
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { HiBan } from "react-icons/hi"
import { BiLockOpen } from "react-icons/bi"
import ModalConfirmacion from '../../../components/modalConfirmacion';
import Pagination from '../../../components/v2/pagination';
import useGet from '../../../api-config/v2/useGet';
const Morosos = () => {
    const LIST_SIZE = 5;
    const [lista, setLista] = useState([]) //lista donde se cargan los morosos
    const _morosos = useGet("/api/reportes/morosos");
    const [desconexion, setDesconexion] = useState(false)
    const [clienteId, setClienteId] = useState(null) //Actualizacion de id por cada seleccion de cliente(fila)
    const [activacion, setActivacion] = useState(false)
    const _desconexion = usePost("/api/desconexiones/desactivar/cliente");
    const _activacion = usePost("/api/desconexiones/activar/cliente");

    const formik = useFormik({

        initialValues: {
            CI: "",
            Nombre: "",
            Apellido: "",
        },

        onSubmit: (values) => {
            const busqueda = {
                ci: values.CI,
                nombre: values.Nombre,
                apellido: values.Apellido,
            }
            //pasa un obj y filtra con cualquier campo que se ingrese,ci,nombre o apellido
            _morosos.fetch({ ...busqueda })
        }
    })

    // se confirma la desconexion 
    const confirmarDesconexion = () => {
        const objectPost = {
            ClienteId: clienteId
        };
        console.log( objectPost )
        _desconexion.fetch(objectPost)
    }

    // confirmacion de  activacion 
    const confirmarActivacion = () => {
        const objectPost = {
            ClienteId: clienteId
        };
        console.log( objectPost )
        _activacion.fetch(objectPost)
    }

    //  DESCONEXION
    useEffect(() => {
        if (_desconexion?.statusCode === 200) {
            console.log( _desconexion?.data)
            _morosos.fetch({page:0 ,size:LIST_SIZE })
            toastInfo("Desconexion exitosa");
        }
        else if (_desconexion.statusCode === 404 | _desconexion.statusCode === 400) {
            warningMessage(_desconexion?.data?.message)
        }
    }, [_desconexion?.statusCode])


    //ACTIVACION
    useEffect(() => {
        if (_activacion?.statusCode === 200) {
            _morosos.fetch({page:0 ,size:LIST_SIZE})
            toastInfo("Activacion exitosa");
        }
        else if (_activacion.statusCode === 404 || _activacion.statusCode === 400) {
            warningMessage(_activacion?.data?.message)
        }
    }, [_activacion?.statusCode])


    //lista de morosos
    useEffect(() => {
        if (_morosos?.statusCode === 200 && _morosos.data) {
            setLista(_morosos?.data?.content)  
        }
    }, [_morosos?.statusCode,_morosos.data])

    useEffect(() => {
       _morosos.fetch(0 ,LIST_SIZE )
    }, [])


    //mensaje de warning para el usuario
    const warningMessage = (message) => {
        toast.warning(message, {
            position: toast.POSITION.TOP_RIGHT,
        })
    }

    //mensaje de exitoso para el usuario
    const toastInfo = (message) => {
        toast.info(message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    };

    //actualiza el id de cliente y cambia es estado de desbloqueo  true
    const handleModalDesconexionChange = (id) => {
        setClienteId(id)
        setDesconexion(true)
    };


    //actualiza el id de cliente y cambia el estado de activo a true
    const handleModalActivacionChange = (id) => {
        setClienteId(id)
        setActivacion(true)
    };


    const handlePaginationChange = page => {
        _morosos.fetch({ page: page,size:LIST_SIZE })
    }

    return (
        <>
            <Head>
                <title>Clientes</title>
            </Head>
            <div className='p-3 font-montserrat'>
                <h4>Lista de Morosos</h4>

                {(_morosos.loading ) &&
                    <LoaderPage />
                }
                <div className='d-flex justify-content-between align-self-end'>
                    <Breadcrumb links={[['Home', '/admin']]} currentPage='Morosos' />

                </div>



                {<Fragment>
                    <Container width={'100%'}>
                        <div className={estilos.desbordamiento}>
                            <div className='m-4 mt-4 mb-0'>
                                <form onSubmit={formik.handleSubmit}>
                                    <input type="text" placeholder="Ci" id="ci" className={estilos.inputs_filtro} autoComplete="off" name='CI' title="Ingrese solo numeros" pattern="[0-9]+" value={formik.values.CI} onChange={formik.handleChange} />
                                    <input type="text" placeholder="Apellido" id="apellido" className={estilos.inputs_filtro} autoComplete="off" name='Apellido' value={formik.values.Apellido} onChange={formik.handleChange} />
                                    <input type="text" placeholder="Nombre" id="nombre" className={estilos.inputs_filtro} autoComplete="off" name='Nombre' value={formik.values.Nombre} onChange={formik.handleChange} />


                                    <button type="submit" className={`btn shadow-none border-0 bg-transparent  ${estilos.btn_buscar} `}> <BiSearch size={29} ></BiSearch></button>

                                </form>

                            </div>

                            <div className='m-4 mt-3'>
                                <table className="table table-hover border border-top-0 ">
                                    <thead className='border border-2 '>
                                        <tr className={`${estilos.rowTitulos} `}>
                                            <th scope='col' className=''> C.I.Nº </th>
                                            <th scope="col">Apellidos</th>
                                            <th scope="col">Nombres</th>
                                            <th scope="col">Medidor</th>
                                            <th scope="col">Monto Adeudado</th>
                                            <th scope="col">Meses Adeudados</th>
                                            <th scope="col">Estado</th>
                                            <th scope="col">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className={estilos.fila_tabla}>
                                        {!!lista.length && lista.map((clienteMoroso, index) =>

                                            <tr key={index}>
                                                <td valign="middle">
                                                    <FaUserCircle className='m-0 pe-2' color={'grey'} size={30} />
                                                    <span >{new Intl.NumberFormat('es-CO').format(clienteMoroso?.Solicitud?.Usuario?.CI ?? 0)}</span>
                                                </td>
                                                <td valign="middle">{clienteMoroso?.Solicitud?.Usuario?.Apellido}</td>
                                                <td valign="middle">{clienteMoroso?.Solicitud?.Usuario?.Nombre}</td>
                                                <td valign="middle">{clienteMoroso?.Medidor}</td>
                                                <td valign="middle">{new Intl.NumberFormat('es-CO').format(clienteMoroso?.MontoAdeudado ?? 0)} Gs</td>
                                                <td valign="middle">{clienteMoroso?.MesesAdeudados}</td>
                                                <td >
                                                    {//------------------ESTADO
                                                        // : muestra un texto en vez de dato booleano
                                                        //si es true muetra en color verde y es es falso en rojo+

                                                        //si es true el estado de su conexion es activo con color verde
                                                        clienteMoroso?.Activo === true ?
                                                            <div className={"fw-bold text-success"}>Activo</div>
                                                            //si es falso  estado es desconectado con color rojo
                                                            : <div className={"fw-bold text-danger"}>Desconectado</div>
                                                    }
                                                </td>

                                                <td >
                                                    {//------------------ACCION
                                                        // : muestra iconos de acuerdo al estado true o false
                                                        //si esta activo muestra icono
                                                        clienteMoroso?.Activo === true ?
                                                            <HiBan color={'grey'} size={25} onClick={() => handleModalDesconexionChange(clienteMoroso?.Id)} />

                                                            //si esta desconectado muestra icono de candado
                                                            : <BiLockOpen color={'grey'} size={25} onClick={() => handleModalActivacionChange(clienteMoroso?.Id)} />

                                                    }


                                                    {/* confirmacion de desconexion */}
                                                    <ModalConfirmacion
                                                        show={desconexion}
                                                        handleClose={() => setDesconexion(false)}
                                                        onModalAcept={confirmarDesconexion}
                                                        mensaje={"esta seguro que desea desconectar?"}
                                                        titulo={"Confirmacion!"}
                                                        tipo={1} />


                                                    {/* confirmacion de activacion */}
                                                    <ModalConfirmacion
                                                        show={activacion}
                                                        handleClose={() => setActivacion(false)}
                                                        onModalAcept={confirmarActivacion}
                                                        mensaje={"esta seguro que desea activar?"}
                                                        titulo={"Confirmacion!"}
                                                        tipo={1} />


                                                </td>

                                            </tr>

                                        )}
                                    </tbody>
                                </table>
                                <Pagination axiosResponse={_morosos?.data} onChange={handlePaginationChange} />

                            </div>
                        </div>
                        <ToastContainer />
                    </Container>
                </Fragment>}
            </div>

        </>
    )
}

Morosos.layout = 'AdminLayout'
export default Morosos