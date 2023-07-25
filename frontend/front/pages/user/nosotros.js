import Contenedor from '../../components/user/contenedor'
import Head from 'next/head';
import { Card, Col, Container, Row } from "react-bootstrap"
const Nosotros = () => {
    //Informacion necesaria para mostrar por pantalla
    const ÑANDEY = "Somos una Junta de Saneamiento transparente y ordenada que tiene como objetivo brindar a sus clientes el servicio de agua potable con responsabilidad a más de 5 barrios de la ciudad de Encarnación.";
    const CLIENTES = "Buscamos siempre complacer a nuestros clientes con la excelencia de nuestros servicios, realizando mantenimientos, y escuchando sus reclamos para mejorar día a día.";
    const SITIO = "Unos de nuestros principales propósitos es la de ofrecer comodidad, por lo cual usted podrá en este sitio realizar sus reclamos, y hacer un seguimientos de todos sus consumos y facturas.";
    const CONTACTO = "Nuestra oficina se encuentra ubicada en el barrio Chaipe, sobre las calles Juana María de Lara y Carlos Antonio López";
    const HORARIO = "8:00 a 17:00hs";
    const TELEFONO = "0985822041";
    const CORREO = "ñande.y@gmail.com";
    return (
        <div>
            <Head>
                <title>Sobre nosotros</title>
                <link rel="icon" href="/logo.svg" />
            </Head>
            <Contenedor>
                <Row className='bg-white d-flex justify-content-center m-0 p-0'>
                    <Col className="m-0 p-0" sm={12} md={12} lg={7}>
                        <div className="py-3 d-flex m-0">
                            <Card
                                style={{
                                    backgroundColor: "rgba(255, 255, 255, 255)",
                                    borderRadius: "1rem",
                                    marginTop: "3px",
                                    width: "100%"
                                }}
                                className="p-2"
                                border="primary fill"
                            >
                                <Container>
                                    <h5 className="mt-1 font-montserrat fw-bold">¿Que es Ñande Y?</h5>
                                </Container>

                                <Container>
                                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-indicators">
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                        </div>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img src="/nosotros1.jpg" className="d-block w-100" alt="..." />
                                            </div>
                                            <div className="carousel-item">
                                                <img src="/nosotros2.jpg" className="d-block w-100" alt="..." />
                                            </div>
                                            <div className="carousel-item">
                                                <img src="/nosotros3.jpeg" className="d-block w-100" alt="..." />
                                            </div>
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                    <p className=''>{ÑANDEY}</p>
                                </Container>

                            </Card>
                        </div>
                    </Col>
                    <Col className='m-0 p-0 ' sm={12} md={12} lg={4}>
                        <div className="py-3 d-flex justify-content-center">
                            <Card
                                style={{
                                    backgroundColor: "rgba(255, 255, 255, 255)",
                                    borderRadius: "1rem",
                                    marginTop: "3px",
                                    marginLeft: "1rem",
                                    marginRight: "1rem",
                                    width: "30rem"
                                }}
                                className="p-2"
                                border="primary fill"
                            >
                                <Container>
                                    <h5 className="mt-1 font-montserrat fw-bold">Sobre nuestros clientes</h5>
                                </Container>
                                <Container>
                                    <p className=''>{CLIENTES}</p>
                                </Container>
                            </Card>
                        </div>
                        <div className="py-3 d-flex justify-content-center">
                            <Card
                                style={{
                                    backgroundColor: "rgba(255, 255, 255, 255)",
                                    borderRadius: "1rem",
                                    marginTop: "3px",
                                    marginLeft: "1rem",
                                    marginRight: "1rem",

                                    width: "30rem"
                                }}
                                className="p-2"
                                border="primary fill"
                            >
                                <Container>
                                    <h5 className="mt-1 font-montserrat fw-bold">Sobre el sitio Ñande Y</h5>
                                </Container>
                                <Container>
                                    <p className=''> {SITIO} </p>
                                </Container>
                            </Card>
                        </div>
                        <div className="py-3 d-flex justify-content-center">
                            <Card
                                style={{
                                    backgroundColor: "rgba(255, 255, 255, 255)",
                                    borderRadius: "1rem",
                                    marginTop: "3px",
                                    marginLeft: "1rem",
                                    marginRight: "1rem",
                                    marginBottom: "15%",
                                    width: "30rem"

                                }}
                                className="p-2"
                                border="primary fill"
                            >
                                <Container>
                                    <h5 className="mt-1 font-montserrat fw-bold">¿Donde más encontrarnos?</h5>
                                </Container>
                                <Container>
                                    <p className=''>{CONTACTO}</p>
                                    <Row>
                                        <Col>
                                            <p className='fw-bold m-0'> Horarios</p>
                                            <p className='m-0'>{HORARIO}</p>
                                        </Col>
                                        <Col>
                                            <p className='fw-bold m-0'>Telefono</p>
                                            <p className='m-0'>{TELEFONO}</p>
                                        </Col>
                                        <Col>
                                            <p className='fw-bold m-0'>Correo </p>
                                            <p className='m-0'>{CORREO}</p>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Contenedor>
        </div>
    )
}
export default Nosotros;