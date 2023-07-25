import { useFormik } from "formik";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import FileInput from "../../../components/solicitarConexion/fileInput"
import LeafletMap from "../../../components/leafletMap"
import { BiSearch, BiArrowBack } from "react-icons/bi"
import { useEffect, useState } from "react"
import AWS from "aws-sdk"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Contenedor from '../../../components/admin/common/container'
import useGetAll from "../../../api-config/useGetAll"
import usePost from "../../../api-config/usePost"
import useGetPerPage from "../../../api-config/useGetPerPage";
import { v4 as uuid } from 'uuid'
import LoaderPage from '../../../components/loaderPage'
import ModalMensaje from "./modalMensaje";
import Link from "next/link";

const NewClient = ({ handleCancel,  handleRecargar }) => {
    const DEFAULT_POSITION = "-27.332332268368248, -55.865640490329"
    const LIST_SIZE = 100;
    const [currentPosition, setCurrentPosition] = useState(DEFAULT_POSITION)
    const [buscadorPosition, setbuscadorPosition] = useState("")
    const [buscadorCedula, setbuscadorCedulaPosition] = useState("")
    const [clienteActual, setClienteActual] = useState(null)
    const [clienteEncontrado, setClienteEncontrado] = useState(false)
    const [telefono, setTelefono] = useState("") //Para input como componentes controlados por react
    const [cedula, setCedula] = useState("") //Para input como componentes controlados por react
    const [cuentaCatastral, setCuentaCatastral] = useState("")//Para input como componentes controlados por react
    const [medidor, setMedidor] = useState("") //Para input como componentes controlados por react
    const [barrios, setBarrios] = useState(null) //necesario para listar en el formulario
    const [categorias, setCategorias] = useState(null) //necesario para listar en el formulario
    const [fileTitulo, setFileTitulo] = useState(null) //contiene el archivo cargado desde el formulario
    const [fileCI, setFileCI] = useState(null) //contiene el archivo cargado desde el formulario
    const [modalMensajeCancelar, setModalMensajeCancelar] = useState(false)
    const etagCI = `${uuid()}.pdf`
    const etagTitulo = `${uuid()}.pdf`
    const _barrios = useGetAll("/api/barrios/all")
    const _categorias = useGetAll("/api/categorias")
    const _clientes = useGetPerPage("/api/clientes", 0, LIST_SIZE);
    const _requestCliente = usePost("/api/clientes/create")
    const formik = useFormik({
        initialValues: {
            Nombre: "",
            Apellido: "",
            CI: "",
            Celular: "",
            Email: "",
            BarrioId: 0,
            EsPropietario: true,
            Referencia: "",
            CuentaCatastral: "",
            Medidor: "",
            CategoriaId: 0,
        },
        onSubmit: (values) => {
            if (currentPosition !== DEFAULT_POSITION) {
                if (fileCI && fileTitulo) {
                    const request = {
                        Nombre: (clienteEncontrado) ? clienteActual?.Solicitud?.Usuario?.Nombre : values.Nombre,
                        Apellido: (clienteEncontrado) ? clienteActual?.Solicitud?.Usuario?.Apellido : values.Apellido,
                        CI: (clienteEncontrado) ? clienteActual?.Solicitud?.Usuario?.CI : cedula,
                        Celular: (clienteEncontrado) ? clienteActual?.Solicitud?.Usuario?.Celular : telefono,
                        Email: (clienteEncontrado) ? clienteActual?.Solicitud?.Usuario?.Email : values.Email,
                        Referencia: values.Referencia,
                        ReferenciaSatelital: currentPosition,
                        BarrioId: values.BarrioId ? Number(values.BarrioId) : barrios[0].Id,
                        EsPropietario: values.EsPropietario,
                        Fecha: new Date(),
                        EtagCI: etagCI,
                        EtagTitulo: etagTitulo,
                        Medidor: medidor,
                        CuentaCatastral: cuentaCatastral,
                        CategoriaId: values.CategoriaId ? Number(values.CategoriaId) : categorias[0].Id,
                    }
                    _requestCliente.fetch(request)
                } else {
                    errorMessage("Los documentos son requeridos.")
                }
            } else {
                errorMessage("Debe ingresar su ubicación.")
            }

        },
        onReset: () => {
            setTelefono("")
            setCedula("")
            setCuentaCatastral("")
            setMedidor("")
            setCurrentPosition(DEFAULT_POSITION)
            setbuscadorPosition("")
            setFileCI(null)
            setFileTitulo(null)
            handleRecargar()
        },
    })

    const searchCi = () => {
        setClienteEncontrado(false)
        setClienteActual("")
        if (buscadorCedula !== "") {
            if (_clientes.statusCode === 200) {
                setClienteActual(_clientes?.data?.content?.find(c => c?.Solicitud?.Usuario?.CI === buscadorCedula))
                console.log(_clientes?.data?.content?.find(c => c?.Solicitud?.Usuario?.CI === buscadorCedula))
                if (_clientes?.data?.content?.find(c => c?.Solicitud?.Usuario?.CI === buscadorCedula)) {
                    setClienteEncontrado(true);
                } else {
                    errorMessage("Cliente no encontrado.")
                }
            } else {
                errorMessage("Vuelve a intentar, nuestro sistema esta con algunos problemas.")
            }
        } else {
            errorMessage("Debes ingresar un Nº de Cedula para buscar.")
        }
    }
    //Creditos: https://www.lawebdelprogramador.com/codigo/JavaScript/5982-Validar-coordenadas-geograficas.html
    const getPosition = () => {
        if (buscadorPosition !== "") {
            if (!buscadorPosition.match(/^[-]?\d+[\.]?\d*, [-]?\d+[\.]?\d*$/)) {
                errorMessage("Ingrese una Coordenada Geografica correcta.")
            } else {
                setCurrentPosition(buscadorPosition)
            }

        } else {
            errorMessage("Debes ingresar una Coordenada Geografica para buscar.")
        }
    }

    const handlePhoneChange = (e) => {
        if (!isNaN(Number(e.target.value)) && !e.target.value.includes(".")) {
            setTelefono(e.target.value)
        }
    }
    const handleCiBusquedaChange = (e) => {
        if (!isNaN(Number(e.target.value)) && !e.target.value.includes(".")) {
            setbuscadorCedulaPosition(e.target.value)
        }
    }
    const handleCiChange = (e) => {
        if (!isNaN(Number(e.target.value)) && !e.target.value.includes(".")) {
            setCedula(e.target.value)
        }
    }
    const handleCtaCtralChange = (e) => {
        !(/[a-zA-Z]/.test(e.target.value)) && setCuentaCatastral(e.target.value)
    }
    const handleMedidorChange = (event) => {
        setMedidor(event.target.value.toUpperCase())
    }
    const handleBuscadorPositionChange = (e) => {
        !(/[a-zA-Z]/.test(e.target.value)) && setbuscadorPosition(e.target.value)
    }

    useEffect(() => {
        if (_requestCliente.statusCode === 200) {
            handleAddFileS3(fileCI, _requestCliente.data?.EtagCI)
            handleAddFileS3(fileTitulo, _requestCliente.data?.EtagTitulo)
            message("Cliente guardado correctamente!")
            setClienteEncontrado(false)
            setClienteActual("")
            setbuscadorCedulaPosition("")
            formik.handleReset()
        } else if (
            _requestCliente.statusCode === 400 ||
            _requestCliente.statusCode === 500
        ) {
            errorMessage(_requestCliente?.data?.message)
        }
    }, [_requestCliente.statusCode])



    useEffect(() => {
        if (_barrios.statusCode === 200) {
            setBarrios(
                (_barrios.data).sort((a, b) =>
                    a.Nombre > b.Nombre ? 1 : b.Nombre > a.Nombre ? -1 : 0
                )
            )
        }
    }, [_barrios.statusCode])

    useEffect(() => {
        if (_categorias.statusCode === 200) {
            setCategorias(
                (_categorias.data?.content).sort((a, b) =>
                    a.Nombre > b.Nombre ? 1 : b.Nombre > a.Nombre ? -1 : 0
                )
            )
        }
    }, [_categorias.statusCode])

    useEffect(() => {
        if (_categorias.statusCode === 200) {
            setCategorias(
                (_categorias.data?.content).sort((a, b) =>
                    a.Nombre > b.Nombre ? 1 : b.Nombre > a.Nombre ? -1 : 0
                )
            )
        }
    }, [_categorias.statusCode])


    const handleAddFileS3 = (file, key) => {
        console.log(key)
        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
            region: process.env.AWS_S3_REGION,
        })

        const reader = new FileReader()
        reader.readAsArrayBuffer(file)

        reader.onloadend = (e) => {
            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: key,
                Body: e.target.result,
            }

            s3.putObject(params, (err, data) => {
                if (err) throw err
            })
        }
    }


    const errorMessage = (message) => {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
        })
    }

    const activateFlagError = (texto) => {
        console.log(texto)
    }

    const message = (message) => {
        toast.info(message, {
            position: toast.POSITION.TOP_RIGHT,
        })
    }
    return (
        <>
            <div className="w-100 py-0">
                {((_requestCliente.loading) || (_barrios.loading) || (_categorias.loading) || (_clientes.loading)) &&
                    <LoaderPage />
                }
                <Form className="mt-0 " onSubmit={formik.handleSubmit}>
                    <Contenedor width={'100%'}>
                        <div className=" mt-0">
                            <Link href="/admin/clientes">
                                <a>
                                <BiArrowBack size={30} type="button" onClick={handleCancel}></BiArrowBack>
                                </a>       
                            </Link>
                        </div>
                        <ModalMensaje
                            show={modalMensajeCancelar}
                            handleClose={() => setModalMensajeCancelar(false)}
                            onModalAcept={handleCancel}
                            mensaje={"Estas seguro que deseas Cancelar"}
                            titulo={"Advertencia!"}
                        />

                        <Container className="pt-0">
                            <Container>
                                <Row>
                                    <Col className="mb-2" sm={12} md={12} lg={8}>

                                        <Col sm={12} md={3}>
                                            <Form.Group>
                                                <Form.Label
                                                    htmlFor="bCi"
                                                    className="font-montserrat fw-normal fs-6"
                                                >
                                                    Buscar C.I
                                                </Form.Label>
                                                <div className="d-flex flex-row">
                                                    <Form.Control
                                                        size="sm"
                                                        type="text"
                                                        id="bCi"
                                                        autoComplete="off"
                                                        name="Bci"
                                                        placeholder="4856726..."
                                                        value={buscadorCedula}
                                                        onChange={handleCiBusquedaChange}
                                                    />
                                                    <BiSearch type="button" size={29} onClick={searchCi}></BiSearch>
                                                </div>
                                            </Form.Group>
                                        </Col>

                                        <Row className="mb-2">
                                            <Col sm={12} md={4}>
                                                <Form.Group>
                                                    <Form.Label
                                                        htmlFor="nombre"
                                                        className="font-montserrat fw-normal fs-6"
                                                    >
                                                        Nombre/s
                                                    </Form.Label>
                                                    <Form.Control
                                                        size="sm"
                                                        type="text"
                                                        id="nombre"
                                                        autoComplete="off"
                                                        required
                                                        name="Nombre"
                                                        className={(clienteEncontrado) ? "bg-secondary bg-opacity-10 shadow-none border-0" : ""}
                                                        value={(clienteEncontrado) ? clienteActual?.Solicitud?.Usuario?.Nombre : formik.values.Nombre}
                                                        onChange={formik.handleChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={12} md={4}>
                                                <Form.Group>
                                                    <Form.Label
                                                        htmlFor="apellido"
                                                        className="font-montserrat fw-normal fs-6"
                                                    >
                                                        Apellido/s
                                                    </Form.Label>
                                                    <Form.Control
                                                        size="sm"
                                                        type="text"
                                                        id="apellido"
                                                        autoComplete="off"
                                                        required
                                                        name="Apellido"
                                                        className={(clienteEncontrado) ? "bg-secondary bg-opacity-10 shadow-none border-0" : ""}
                                                        value={(clienteEncontrado) ? formik.values = clienteActual?.Solicitud?.Usuario?.Apellido : formik.values.Apellido}
                                                        onChange={formik.handleChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={12} md={4}>
                                                <Form.Group>
                                                    <Form.Label
                                                        htmlFor="cin"
                                                        className="font-montserrat fw-normal fs-6"
                                                    >
                                                        C.I. N°
                                                    </Form.Label>
                                                    <Form.Control
                                                        size="sm"
                                                        type="text"
                                                        id="ci"
                                                        autoComplete="off"
                                                        required
                                                        name="CI"
                                                        className={(clienteEncontrado) ? "bg-secondary bg-opacity-10 shadow-none border-0" : ""}
                                                        value={(clienteEncontrado) ? clienteActual?.Solicitud?.Usuario?.CI : cedula}
                                                        onChange={handleCiChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col sm={12} md={6}>
                                                <Form.Group>
                                                    <Form.Label
                                                        htmlFor="telefono"
                                                        className="font-montserrat fw-bold"
                                                    >
                                                        Teléfono
                                                    </Form.Label>
                                                    <Form.Control
                                                        size="sm"
                                                        type="text"
                                                        id="telefono"
                                                        autoComplete="off"
                                                        required
                                                        name="Celular"
                                                        className={(clienteEncontrado) ? "bg-secondary bg-opacity-10 shadow-none border-0" : ""}
                                                        value={(clienteEncontrado) ? clienteActual?.Solicitud?.Usuario?.Celular : telefono}
                                                        onChange={handlePhoneChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={12} md={6}>
                                                <Form.Group>
                                                    <Form.Label
                                                        htmlFor="correo"
                                                        className="font-montserrat fw-normal fs-6"
                                                    >
                                                        Correo Electrónico
                                                    </Form.Label>
                                                    <Form.Control
                                                        size="sm"
                                                        type="email"
                                                        id="correo"
                                                        autoComplete="off"
                                                        required
                                                        name="Email"
                                                        className={(clienteEncontrado) ? "bg-secondary bg-opacity-10 shadow-none border-0" : ""}
                                                        value={(clienteEncontrado) ? clienteActual?.Solicitud?.Usuario?.Email : formik.values.Email}
                                                        onChange={formik.handleChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col sm={12} md={4}>
                                                <Form.Group>
                                                    <Form.Label className="font-montserrat fw-normal fs-6">
                                                        Ciudad
                                                    </Form.Label>
                                                    <Form.Control
                                                        size="sm"
                                                        type="text"
                                                        id="ciudad"
                                                        placeholder="Encarnación"
                                                        disabled
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={12} md={4}>
                                                <Form.Group>
                                                    <Form.Label className="font-montserrat fw-normal fs-6">
                                                        Barrio
                                                    </Form.Label>
                                                    <Form.Select
                                                        size="sm"
                                                        name="BarrioId"
                                                        value={formik.values.BarrioId}
                                                        onChange={formik.handleChange}
                                                    >
                                                        {barrios &&
                                                            barrios.map((barrio, index) => (
                                                                <option value={barrio?.Id} key={index}>
                                                                    {barrio?.Nombre}
                                                                </option>
                                                            ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col sm={12} md={4}>
                                                <Form.Group>
                                                    <Form.Label className="font-montserrat fw-normal fs-6">
                                                        Dueño del Terreno
                                                    </Form.Label>
                                                    <Form.Select
                                                        size="sm"
                                                        name="EsPropietario"
                                                        value={formik.values.EsPropietario}
                                                        onChange={formik.handleChange}
                                                    >
                                                        <option value={true}>Sí</option>
                                                        <option value={false}>No</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col sm={12} md={12}>
                                                <Form.Group>
                                                    <Form.Label
                                                        htmlFor="referencia"
                                                        className="font-montserrat fw-normal fs-6"
                                                    >
                                                        Dirección de referencia
                                                    </Form.Label>
                                                    <Form.Control
                                                        size="sm"
                                                        as="textarea"
                                                        rows={1}
                                                        type="text"
                                                        id="referencia"
                                                        autoComplete="off"
                                                        required
                                                        name="Referencia"
                                                        value={formik.values.Referencia}
                                                        onChange={formik.handleChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row className="mb-2">
                                            <Col sm={12} md={4}>
                                                <Form.Group>
                                                    <Form.Label
                                                        htmlFor="cuentaCatastral"
                                                        className="font-montserrat fw-normal fs-6"
                                                    >
                                                        Cta. Catastral del Inmueble
                                                    </Form.Label>
                                                    <Form.Control
                                                        size="sm"
                                                        type="text"
                                                        id="cuentaCatastral"
                                                        autoComplete="off"
                                                        required
                                                        name="CuentaCatastral"
                                                        value={cuentaCatastral}
                                                        onChange={handleCtaCtralChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={12} md={4}>
                                                <Form.Group>
                                                    <Form.Label
                                                        htmlFor="numeroMedidor"
                                                        className="font-montserrat fw-normal fs-6"
                                                    >
                                                        Número del medidor
                                                    </Form.Label>
                                                    <Form.Control
                                                        size="sm"
                                                        type="text"
                                                        id="numeroMedidor"
                                                        autoComplete="off"
                                                        required
                                                        name="NumeroMedidor"
                                                        value={medidor}
                                                        onChange={handleMedidorChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={12} md={4}>
                                                <Form.Group>
                                                    <Form.Label className="font-montserrat fw-normal fs-6">
                                                        Categoria del Servicio
                                                    </Form.Label>
                                                    <Form.Select
                                                        size="sm"
                                                        name="CategoriaId"
                                                        value={formik.values.CategoriaId}
                                                        onChange={formik.handleChange}
                                                    >
                                                        {categorias &&
                                                            categorias.map((categoria, index) => (
                                                                <option value={categoria?.Id} key={index}>
                                                                    {categoria?.Nombre}
                                                                </option>
                                                            ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col sm={12} md={6}>
                                                <Form.Group>
                                                    <Form.Label
                                                        htmlFor="ciFile"
                                                        className="font-montserrat fw-normal fs-6"
                                                    >
                                                        Escaneado de C.I.
                                                    </Form.Label>
                                                    <FileInput
                                                        id="1"
                                                        file={fileCI}
                                                        setFile={setFileCI}
                                                        accept=".pdf"
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={12} md={6}>
                                                <Form.Group>
                                                    <Form.Label
                                                        htmlFor="tituloFile"
                                                        className="font-montserrat fw-normal fs-6"
                                                    >
                                                        Escaneado de Título del Inmueble
                                                    </Form.Label>
                                                    <FileInput
                                                        id="2"
                                                        file={fileTitulo}
                                                        setFile={setFileTitulo}
                                                        accept=".pdf"
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={12} md={12} lg={4}>
                                        <Col sm={12} md={11}>
                                            <Form.Group>
                                                <Form.Label
                                                    htmlFor="posicion"
                                                    className="font-montserrat fw-normal fs-6"
                                                >
                                                    Coordenada Geografica
                                                </Form.Label>
                                                <div className="d-flex flex-row">
                                                    <Form.Control
                                                        size="sm"
                                                        type="text"
                                                        id="posicion"
                                                        autoComplete="off"
                                                        name="Posicion"
                                                        placeholder="-27.332332268368248, -55.865640490329..."
                                                        value={buscadorPosition}
                                                        onChange={handleBuscadorPositionChange}
                                                    />
                                                    <BiSearch type="button" size={29} onClick={getPosition}></BiSearch>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <div className="position-relative mt-3">
                                            <LeafletMap
                                                default_center={currentPosition}
                                                setCenter={setCurrentPosition}
                                                activateFlagError={activateFlagError}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                            <ToastContainer />
                        </Container>

                    </Contenedor>
                    <div className="text-end mt-1">
                        <Button className="me-2" variant="secondary" onClick={() => setModalMensajeCancelar(true)}>Cancelar</Button>
                        <Button variant="primary" type="submit"  >Guardar</Button>
                    </div>
                </Form>
            </div>

        </>
    )
}
export default NewClient