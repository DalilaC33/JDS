import Contenedor from '../../components/user/contenedor'
import Head from 'next/head';
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Link from "next/link";
import usePost from "../../api-config/usePost"
import useGetAll from '../../api-config/useGetAll'
import userStore from '../../store/userStore';
import ModalConfirmacion from '../../components/modalConfirmacion';
import LoaderPage from "../../components/loaderPage"

const Desconexion = () => {
    const { user, setUser } = userStore() //necesario para obtener el user logeado
    const _desconexion = usePost("api/desconexiones") //ruta a la api tipo post
    const _clienteGet = useGetAll(`api/clientes/usuario/${user.Id}`)
    const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false)
    const [listaClientes, setListaClientes] = useState(null)


    const formik = useFormik({
        initialValues: {
            ClienteId: 0,
            Motivo: "",
        },

        onSubmit: (values) => {
            if (values.Motivo) { //validacion de campo vacio 
                const request = {
                    ClienteId: values.Medidor ? values.Medidor : listaClientes[0]?.ClienteId,
                    Motivo: values.Motivo,
                }
                //realizo la llamada a la api              
                _desconexion.fetch(request)
            } else {
                warningMessage("Por favor, ingrese el motivo de su desconexion ")
            }
        },
    })
    // se confirma la desconexion
    const confirmarDesconexion = () => {
        formik.handleSubmit()
    }


    // necesario para manejar los estados de conexion a la api
    useEffect(() => {
        if (_desconexion.statusCode === 201) {
            message("Recibimos tu Solicitud de Desconexion, una vez aprobada su desconexion nos comunicaremos contigo!")
            formik.handleReset()
        } else if (
            _desconexion.statusCode === 400
        ) {
            warningMessage(_desconexion?.data?.message)
        }
    }, [_desconexion.statusCode])

    // necesario para manejar los estados y traer el clienteId y sus medidores
    useEffect(() => {
        if (_clienteGet.statusCode === 200) {
            if (_clienteGet.data.length) {
                setListaClientes(_clienteGet?.data)
            }
        }
    }, [_clienteGet.statusCode])

    //mensaje de warning para el usuario
    const warningMessage = (message) => {
        toast.warning(message, {
            position: toast.POSITION.TOP_RIGHT,
        })
    }
    //mensaje de informacion para el usuario
    const message = (message) => {
        toast.info(message, {
            position: toast.POSITION.TOP_RIGHT,
        })
    }
    return (
        <div>
            <Head>
                <title>Solicitar Desconexion</title>
                <link rel="icon" href="/logo.svg" />
            </Head>

            {(_clienteGet.loading ||
                _desconexion.loading 
                ) && <LoaderPage />}
            <Contenedor>
                <Container>
                    <div className="py-3 d-flex justify-content-center">
                        <Card
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                                borderRadius: "1rem",
                                marginTop: "3rem",
                                marginLeft: "1rem",
                                marginRight: "1rem",
                                width: "80%"
                            }}
                            className="p-2"
                        >
                            <Link href="/user/perfil">
                                <a>
                                    <BiArrowBack className="m-2 ms-3" size={30} type="button" ></BiArrowBack>
                                </a>
                            </Link>
                            <Container>
                                <h5 className="mt-1 font-montserrat fw-bold">Solicitud de Desconexion</h5>
                            </Container>
                            <Container>
                                <Form className="mb-2" onSubmit={formik.handleSubmit} >
                                    <Card
                                        style={{
                                            backgroundColor: "transparent",
                                            borderRadius: "1rem",
                                            marginTop: "2rem",
                                            marginLeft: "0.5rem",
                                            marginRight: "0.5rem"
                                        }}
                                        className="p-3 mb-3"
                                        border="primary fill"
                                    >
                                        <Container>
                                            <Row>
                                                <Col sm={12} md={4}>

                                                    <Form.Group>
                                                        <Form.Label className="font-montserrat fw-bold">
                                                            Medidor a dar de baja
                                                        </Form.Label>
                                                        <Form.Select
                                                            size="sm"
                                                            name="Medidor"
                                                            value={formik.values.Medidor}
                                                            onChange={formik.handleChange}
                                                        >
                                                            {listaClientes &&
                                                                listaClientes.map((cliente, index) => (
                                                                    <option defaultValue value={cliente?.ClienteId} key={index}>
                                                                        {cliente?.Medidor}
                                                                    </option>
                                                                ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>

                                            </Row>
                                            <Row className="mb-2">
                                                <Col sm={12} md={12}>
                                                    <Form.Group>
                                                        <Form.Label
                                                            htmlFor="Motivo"
                                                            className="font-montserrat fw-bold"
                                                        >
                                                            Motivo de Desconexion
                                                        </Form.Label>
                                                        <Form.Control
                                                            size="sm"
                                                            as="textarea"
                                                            rows={5}
                                                            type="text"
                                                            id="Motivo"
                                                            autoComplete="off"
                                                            required
                                                            name="Motivo"
                                                            value={formik.values.Motivo}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                        </Container>
                                    </Card>
                                    <div className="text-end">
                                        <Button onClick={() => setMostrarModalConfirmacion(true)}>Solicitar Desconexion</Button>
                                    </div>
                                </Form>
                                <ModalConfirmacion
                                    show={mostrarModalConfirmacion}
                                    handleClose={() => setMostrarModalConfirmacion(false)}
                                    onModalAcept={confirmarDesconexion}
                                    mensaje={"Estas seguro que deseas solicitar tu desconexion"}
                                    titulo={"Confirmacion de Desconexion!"}
                                    tipo={1}
                                />
                            </Container>
                        </Card>
                    </div>
                </Container>
                <ToastContainer />
            </Contenedor>
        </div>
    )
}
export default Desconexion;