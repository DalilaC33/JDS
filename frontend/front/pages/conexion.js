import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import ConexionLayout from "../components/solicitarConexion"
import LeafletMap from "../components/leafletMap"
import FileInput from "../components/solicitarConexion/fileInput"
import useGetAll from "../api-config/useGetAll"
import usePost from "../api-config/usePost"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import LoaderPage from "../components/loaderPage"
import TargetButton from "../components/solicitarConexion/targetButton"
import AWS from "aws-sdk"
import { v4 as uuid } from 'uuid'

const Conexion = () => {
  const DEFAULT_POSITION = "-27.332332268368248, -55.865640490329"
  const [currentPosition, setCurrentPosition] = useState(DEFAULT_POSITION)
  const [fileTitulo, setFileTitulo] = useState(null) //contiene el archivo cargado desde el formulario
  const [fileCI, setFileCI] = useState(null) //contiene el archivo cargado desde el formulario
  const [barrios, setBarrios] = useState(null) //necesario para listar en el formulario
  const [telefono, setTelefono] = useState("") //Para input como componentes controlados por react
  const [cedula, setCedula] = useState("") //Para input como componentes controlados por react
  const [positionRequired, setPositionRequired] = useState(false) //flag para validad seleccion en el mapa
  const _barrios = useGetAll("/api/barrios/all")
  const _solicitudes = usePost("/api/solicitudes/create")
  const etagCI = `${uuid()}.pdf`
  const etagTitulo = `${uuid()}.pdf`

  const formik = useFormik({
    initialValues: {
      Nombre: "",
      Apellido: "",
      CI: "",
      Celular: "",
      Email: "",
      Referencia: "",
      BarrioId: 0,
      EsPropietario: true,
    },
    onSubmit: (values) => {
      if (currentPosition !== DEFAULT_POSITION) {
        if(fileCI && fileTitulo){
          const request = {
            Nombre: values.Nombre,
            Apellido: values.Apellido,
            CI: cedula,
            Celular: telefono,
            Email: values.Email,
            EsPropietario: values.EsPropietario,
            ReferenciaSatelital: currentPosition,
            Referencia: values.Referencia,
            Fecha: new Date(),
            BarrioId: values.BarrioId ? Number(values.BarrioId) : barrios[0].Id,
            EtagCI:  etagCI,
            EtagTitulo: etagTitulo
          }
          _solicitudes.fetch(request)
        } else {
          errorMessage("Los documentos son requeridos.")
        }
      } else {
        setPositionRequired(true)
      }
    },
    onReset: () => {
      setTelefono("")
      setCedula("")
      setCurrentPosition(DEFAULT_POSITION)
      setPositionRequired(false)
      setFileCI(null)
      setFileTitulo(null)
    },
  })

  const getPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition(
          `${position.coords.latitude}, ${position.coords.longitude}`
        )
      },
      (error) => {
        console.log(error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  }

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

  const handlePhoneChange = (e) => {
    if (!isNaN(Number(e.target.value)) && !e.target.value.includes(".")) {
      setTelefono(e.target.value)
    }
  }

  const handleCiChange = (e) => {
    if (!isNaN(Number(e.target.value)) && !e.target.value.includes(".")) {
      setCedula(e.target.value)
    }
  }

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
    if (_solicitudes.statusCode === 201) {
      handleAddFileS3(fileCI, _solicitudes.data.EtagCI)
      handleAddFileS3(fileTitulo, _solicitudes.data.EtagTitulo)
      message("Recibimos tu solicitud, nos Comunicaremos contigo en breve!")
      formik.handleReset()
    } else if (
      _solicitudes.statusCode === 400 ||
      _solicitudes.statusCode === 500
    ) {
      errorMessage(_solicitudes?.data?.message)
    }
  }, [_solicitudes.statusCode])


  
  const handleAddFileS3 = (file, key) => {
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

  return (
    <ConexionLayout>
      <Container>
        <div className="py-3">
          <Card
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              borderRadius: "1rem",
            }}
            className="p-2"
          >
            <Container>
              <h4 className="font-montserrat fw-bold">Solicitud de Conexión</h4>
            </Container>
            {_solicitudes.loading && <LoaderPage />}
            <Container>
              <Form className="mb-2" onSubmit={formik.handleSubmit}>
                <Card
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: "1rem",
                  }}
                  className="p-3 mb-3"
                  border="primary fill"
                >
                  <Container>
                    <Row>
                      <Col className="mb-2" sm={12} md={12} lg={8}>
                        <Row className="mb-2">
                          <Col sm={12} md={4}>
                            <Form.Group>
                              <Form.Label className="font-montserrat fw-bold">
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
                              <Form.Label className="font-montserrat fw-bold">
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
                              <Form.Label className="font-montserrat fw-bold">
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
                          <Col sm={12} md={4}>
                            <Form.Group>
                              <Form.Label
                                htmlFor="nombre"
                                className="font-montserrat fw-bold"
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
                                value={formik.values.Nombre}
                                onChange={formik.handleChange}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={12} md={4}>
                            <Form.Group>
                              <Form.Label
                                htmlFor="apellido"
                                className="font-montserrat fw-bold"
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
                                value={formik.values.Apellido}
                                onChange={formik.handleChange}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={12} md={4}>
                            <Form.Group>
                              <Form.Label
                                htmlFor="cin"
                                className="font-montserrat fw-bold"
                              >
                                C.I. N°
                              </Form.Label>
                              <Form.Control
                                size="sm"
                                type="text"
                                id="cin"
                                autoComplete="off"
                                required
                                name="CI"
                                value={cedula}
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
                                value={telefono}
                                onChange={handlePhoneChange}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={12} md={6}>
                            <Form.Group>
                              <Form.Label
                                htmlFor="correo"
                                className="font-montserrat fw-bold"
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
                                value={formik.values.Email}
                                onChange={formik.handleChange}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col sm={12} md={12}>
                            <Form.Group>
                              <Form.Label
                                htmlFor="referencia"
                                className="font-montserrat fw-bold"
                              >
                                Dirección de referencia
                              </Form.Label>
                              <Form.Control
                                size="sm"
                                as="textarea"
                                rows={2}
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
                          <Col sm={12} md={6}>
                            <Form.Group>
                              <Form.Label
                                htmlFor="ciFile"
                                className="font-montserrat fw-bold"
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
                                className="font-montserrat fw-bold"
                              >
                                Escaneado de Título de Inmueble
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
                        <Form.Label className="font-montserrat fw-bold">
                          Seleccione su ubicación
                        </Form.Label>
                        <div className="position-relative">
                          <LeafletMap
                            default_center={currentPosition}
                            setCenter={setCurrentPosition}
                          />
                          <TargetButton onClick={getPosition} />
                        </div>
                        {positionRequired && (
                          <h6 className="text-end text-danger">
                            Debe ingresar su ubicación
                          </h6>
                        )}
                      </Col>
                    </Row>
                  </Container>
                </Card>
                <ToastContainer />
                <div className="text-end">
                  <Button type="submit">Solicitar Conexión</Button>
                </div>
              </Form>
            </Container>
          </Card>
        </div>
      </Container>
    </ConexionLayout>
  )
}

export default Conexion
