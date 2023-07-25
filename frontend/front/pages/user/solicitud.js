
import Head from 'next/head';
import estilos from '../../styles/solicitud_user.module.css'

import Image from 'next/image'
const myLoader = ({ src, width, quality }) => {
    return `/${src}`
}


const Solicitud = () => {
    const getValoresInput = () => {
        let inputCiudad ="Encarnacion" ;
        let inputNombre = document.getElementById("nombreTextElement").value;
        inputNombre = "";
        let inputApellido = document.getElementById("apellidoTextElement").value;
        inputApellido= "";
        let inputCI = document.getElementById("ciTextElement").value;
        inputApellido= "";
        let inputTelefono = document.getElementById("telefonoTextElement").value;
        inputTelefono= "";
        let inputDireccion = document.getElementById("direccionTextElement").value;
        inputDireccion= "";
        let inputReferencia = document.getElementById("referenciaTextElement").value;
        inputReferencia= "";

       
        
        

    }
    return (
        <div >
            <Head className={estilos.fondo}>
            </Head>

            <div className={estilos.contenedor_padre}>
                <h3>Solicitud de conexión</h3>
                <div className={estilos.bloque}>
                    <form className={estilos.contenedor_columna1} >
                        <div className={estilos.bloque}>
                            <p> <span>Ciudad*:&nbsp;&nbsp; &nbsp;&nbsp;</span> <input className="form-control" type="text" placeholder="Encarnacion" disabled /></p>
                            <p><span> &nbsp;&nbsp;Barrio *:</span>
                                <select className="form-select form-select-sm"  >

                                    <option selected></option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select></p>
                        </div>

                        < p><span>Nombre/s *:</span> <input className="form-control" id="nombreTextElement" type="text" placeholder="" /></p>
                        <p><span>Apellido/s *:</span> <input className="form-control" id="apellidoTextElement" type="text" /></p>

                        <div className={estilos.bloque}>
                            <p><span>Nro de CI *:</span> <input className="form-control" id="ciTextElement" type="text" placeholder="" /></p>
                            <p><span>&nbsp;&nbsp;Teléfono *:</span> <input className="form-control" id="telefonoTextElement"type="text" placeholder="" /></p>

                        </div>

                        <p><span>Dirección *:</span> <input className="form-control" id="direccionTextElement"type="text" placeholder="" /></p>
                        <p><span>Referencia*:</span> <input className="form-control"id="referenciaTextElement" type="text" placeholder="" /></p>
                        <p className="col"><span>Correo *:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> <input id="tabulacion" className="form-control " type="text" placeholder="" /></p>
                    </form>
                    <div className={estilos.contenedor_columna2}>
                        <h5>Adjuntar Documentos</h5>
                        <div >
                            <p>Cédula de Identidad</p>
                            <Image alt="" src="/ci.jpg" width={400} height={90} />

                            <p>Factura Ande</p>
                            <Image alt="" src="/factura.jpg" width={400} height={90} />

                            <p>Agregar Ubicación Satelital</p>
                            <Image alt="" src="/ubicacion.jpg" width={400} height={90} />

                        </div>
                    </div>
                </div>
                <div className="row " >
                    <div className="col "> </div>
                    <div className="col-2 " >
                        <button type="button"onClick="getValoresInput" className="btn btn-primary ml-auto">Solicitar conexion</button>
                    </div>

                </div>
            </div>
            <p className={estilos.efecto} >Una vez solicitada la conexion, en la brevedad posible estaremos comunicando con usted para más información</p>


        </div>

    )
}




export default Solicitud;