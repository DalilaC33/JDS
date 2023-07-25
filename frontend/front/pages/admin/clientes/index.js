import Head from 'next/head'
import estilos from '../../../styles/comunAdmin.module.css'
import Container from '../../../components/admin/common/container'
import Breadcrumb from '../../../components/admin/common/breadcrumb'
import NewClient from '../../../components/admin/clientes/newClient'
import Paginacion from "../../../components/pagination";
import PaginacionUsePost from "../../../components/PaginationUsePost";
import useGetPerPage from "../../../api-config/useGetPerPage";
import useGetAll from "../../../api-config/useGetAll"
import usePostPerPage from "../../../api-config/usePostPerPage";
import { FaUserCircle } from 'react-icons/fa'
import { BiSearch } from "react-icons/bi"
import { MdOutlineClose } from "react-icons/md"
import LoaderPage from '../../../components/loaderPage'
import { useEffect, useState, Fragment } from 'react'
import { useFormik } from 'formik'
import Link from 'next/link';
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const UsuariosActivos = () => {
    const LIST_SIZE = 5;
    const [barrios, setBarrios] = useState(null) //necesario para listar en el formulario
    const [lista, setLista] = useState([]) //lista donde se cargan los usuarios
    const [showNewCliente, setShowNewCliente] = useState(false) //necesario para mostrar formulario 
    const [estaFiltrando, setEstaFiltrando] = useState(false) //necesario para mostrar formulario 
    const [objRequest, setObjRequest] = useState({})//necesario para enviar a la paginacion el objeto
    const _usuariosActivos = useGetPerPage("/api/clientes", 0, LIST_SIZE);
    const _barrios = useGetAll("/api/barrios/all")
    const _usuariosFiltrados = usePostPerPage('/api/clientes/find', 0, LIST_SIZE)

    const formik = useFormik({

        initialValues: {
            CI:"",
            Nombre:"",
            Apellido: "",
            BarrioId: 0
        },
        onSubmit: (values) => {
            const busqueda = {
                CI: values.CI,
                Nombre: values.Nombre,
                Apellido: values.Apellido,
                BarrioId: values.BarrioId ? Number(values.BarrioId) : 0
            }

            filtrar(busqueda)
        }
    })

    //para manejar la funcionalidad de filtrar
    const filtrar = (busqueda) => {
        const request = {
            CI: busqueda.CI,
            Nombre: busqueda.Nombre,
            Apellido: busqueda.Apellido,
            BarrioId: busqueda.BarrioId
        }
        sessionStorage.clear()
        sessionStorage.setItem('filter', JSON.stringify(request));
        _usuariosFiltrados.fetch(request, 0, LIST_SIZE)
        setObjRequest(request)
    }
    //necesario para volver a listar los usuarios sin distincion
    const deshacerFiltro = () => {
        sessionStorage.clear()
        setEstaFiltrando(false)
        formik.handleReset()
        setObjRequest({})
        resetearLista()
    }
    //listar desde la api para actualizar
    const resetearLista = () => {
        _usuariosActivos.fetch(0, LIST_SIZE)
    }
    //controla si hay algo en sessionStorage
    useEffect(() => {
        if (Storage) {
            const data = sessionStorage.getItem('filter');
            if (data) {
               const ls = JSON.parse(data);
               formik.setFieldValue("CI",ls.CI)
               formik.setFieldValue("Apellido",ls.Apellido)
               formik.setFieldValue("Nombre",ls.Nombre)
               formik.setFieldValue("BarrioId",(ls.BarrioId)?ls.BarrioId:0)
               setObjRequest(data)
            }
        }
    }, []);

    //para manejo de estados del filtro con la api
    useEffect(() => {
        if (_usuariosFiltrados.statusCode === 200) {
            if (_usuariosFiltrados?.data?.content.length > 0) {
                setEstaFiltrando(true)
                setLista(_usuariosFiltrados?.data?.content)
            } else {
                warningMessage("No existe el usuario que estas buscando")
            }

        }
        if (
            _usuariosFiltrados.statusCode === 400 ||
            _usuariosFiltrados.statusCode === 500
        ) {
            warningMessage(_usuariosFiltrados?.data?.message)
        }
    }, [_usuariosFiltrados.statusCode])

//para manejo de estados de usuarios con la api
useEffect(() => {
    if (_usuariosActivos?.statusCode === 200 && !estaFiltrando) {
        const data = sessionStorage.getItem('filter');
        if (!data) {
            setLista(_usuariosActivos?.data?.content)
        } else {
            _usuariosFiltrados.fetch(JSON.parse(sessionStorage.getItem('filter')), 0, LIST_SIZE)
            setEstaFiltrando(true)
        }
    }
}, [_usuariosActivos?.statusCode])

//para manejo de estados de barrios con la api
useEffect(() => {
    if (_barrios.statusCode === 200) {
        setBarrios(
            (_barrios.data).sort((a, b) =>
                a.Nombre > b.Nombre ? 1 : b.Nombre > a.Nombre ? -1 : 0
            )
        )
    }
}, [_barrios.statusCode])


//mensaje de warning para el usuario
const warningMessage = (message) => {
    toast.warning(message, {
        position: toast.POSITION.TOP_RIGHT,
    })
}
return (
    <>
        <Head>
            <title>Clientes</title>
        </Head>
        <div className='p-3 font-montserrat'>
            <h4>Clientes</h4>

            {((_usuariosActivos.loading) || (_barrios.loading) || (_usuariosFiltrados.loading)) &&
                <LoaderPage />
            }
            <div className='d-flex justify-content-between align-self-end'>
                <Breadcrumb links={[['Home', '/admin']]} currentPage='Clientes' />
                {!showNewCliente &&
                    <button className={`btn btn-primary  mb-1 `} onClick={() => setShowNewCliente(true)}> Nuevo</button>}
            </div>

            <div className='d-flex justify-content-center'>
                {showNewCliente && <NewClient
                    handleCancel={() => setShowNewCliente(false)}
                    handleRecargar={resetearLista}>
                </NewClient>}

                {!showNewCliente && <Fragment>
                    <Container width={'100%'}>
                        <div className={estilos.desbordamiento}>
                            <div className='m-4 mt-4 mb-0'>
                                <form onSubmit={formik.handleSubmit}>
                                    <input type="text" placeholder="Ci" id="ci" className={estilos.inputs_filtro} autoComplete="off" name='CI'  title="Ingrese solo numeros" pattern="[0-9]+" value={formik.values.CI} onChange={formik.handleChange} />
                                    <input type="text" placeholder="Apellido" id="apellido" className={estilos.inputs_filtro} autoComplete="off" name='Apellido' value={formik.values.Apellido} onChange={formik.handleChange} />
                                    <input type="text" placeholder="Nombre" id="nombre" className={estilos.inputs_filtro} autoComplete="off" name='Nombre' value={formik.values.Nombre} onChange={formik.handleChange} />

                                    <select className={`me-0 ${estilos.inputs_filtro}`} name='BarrioId' id="barrio" value={formik.values.BarrioId} onChange={formik.handleChange}  >
                                        <option defaultValue value={"Barrio"}>Barrio</option>
                                        {barrios &&
                                            barrios.map((barrio, index) => (
                                                <option value={barrio?.Id} key={index}>
                                                    {barrio?.Nombre}
                                                </option>
                                            ))}
                                    </select>
                                    {estaFiltrando && <button type="button" onClick={deshacerFiltro} className={`btn shadow-none border-0 bg-transparent ${estilos.btn_buscar} `}> <MdOutlineClose size={32} ></MdOutlineClose></button>}
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
                                            <th scope="col">Telefono</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Barrio</th>
                                        </tr>
                                    </thead>
                                    <tbody className={estilos.fila_tabla}>
                                        {!!lista.length && lista.map((usuarioActivo, index) =>
                                            <Link key={index} href={`/admin/clientes/detalleCliente/${usuarioActivo?.Id}`}>
                                                <tr key={index}>
                                                    <td valign="middle">
                                                        <FaUserCircle className='m-0 pe-2' color={'grey'} size={30} />
                                                        <span >  {new Intl.NumberFormat('es-CO').format(Number(usuarioActivo?.Solicitud?.Usuario?.CI) ?? 0)}</span>
                                                      
                                                    </td>
                                                    <td valign="middle">{usuarioActivo?.Solicitud?.Usuario?.Apellido}</td>
                                                    <td valign="middle">{usuarioActivo?.Solicitud?.Usuario?.Nombre}</td>
                                                    <td valign="middle">{usuarioActivo?.Solicitud?.Usuario?.Celular}</td>
                                                    <td valign="middle">{usuarioActivo?.Solicitud?.Usuario?.Email}</td>
                                                    <td valign="middle">{usuarioActivo?.Solicitud?.Barrio?.Nombre}</td>
                                                </tr>
                                            </Link>
                                        )}
                                    </tbody>
                                </table>
                                {!estaFiltrando ? <Paginacion getPerPageObject={_usuariosActivos}
                                    size={LIST_SIZE}
                                /> : <PaginacionUsePost getPerPageObject={_usuariosFiltrados}
                                    size={LIST_SIZE}
                                    usePost={true}
                                    request={objRequest}
                                />}

                            </div>
                        </div>
                        <ToastContainer />
                    </Container>
                </Fragment>}
            </div>
        </div>
    </>
)
}
UsuariosActivos.layout = 'AdminLayout'
export default UsuariosActivos